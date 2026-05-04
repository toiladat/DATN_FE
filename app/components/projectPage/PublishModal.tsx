import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Zap, Loader2, Rocket } from 'lucide-react'
import { useState } from 'react'
import { useAccount, useWriteContract, usePublicClient } from 'wagmi'
import { parseEther } from 'viem'
import { contractAbi, contractAddress } from '@/contract/ContractClient'
import { toast } from 'sonner'
import type { ProjectDetail } from '@/schemas/projectSchema'
import { apiClient } from '@/apis/axios'

interface PublishModalProps {
  project: ProjectDetail
  children: React.ReactNode
}

export function PublishModal({ project, children }: PublishModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { address } = useAccount()
  const publicClient = usePublicClient()

  const { writeContractAsync: createProjectAsync } = useWriteContract()

  const handlePublish = async () => {
    if (!address) {
      toast.error('Vui lòng kết nối ví trước')
      return
    }

    setIsSubmitting(true)
    try {
      const campaignIdUint256 = BigInt('0x' + project.id)
      const goal = parseEther(project.totalAmount.toString())
      const fundDeadline = Math.floor(
        new Date(project.endDate).getTime() / 1000
      )

      // Prepare milestone arrays
      const milestoneTimes = project.milestones.map((m) =>
        Math.floor(new Date(m.endDate).getTime() / 1000)
      )
      const milestoneAmounts = project.milestones.map((m) =>
        parseEther(m.amount.toString())
      )

      // --- PRE-VALIDATION CHECK ---
      let totalMilestoneAmount = BigInt(0)
      let lastTime = BigInt(fundDeadline)

      for (let i = 0; i < milestoneTimes.length; i++) {
        if (BigInt(milestoneTimes[i]) < lastTime) {
          toast.error(
            `Thời gian Milestone ${i + 1} không hợp lệ (phải sau ngày kết thúc gọi vốn và sau Milestone trước đó)`
          )
          setIsSubmitting(false)
          return
        }
        totalMilestoneAmount += milestoneAmounts[i]
        lastTime = BigInt(milestoneTimes[i])
      }

      if (totalMilestoneAmount !== goal) {
        toast.error(`Tổng tiền các Milestones không khớp với Mục tiêu gọi vốn!`)
        setIsSubmitting(false)
        return
      }
      // --- END PRE-VALIDATION ---

      toast.info('Vui lòng xác nhận giao dịch trên ví...')

      const txHash = await createProjectAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'createProject',
        args: [
          campaignIdUint256,
          goal,
          BigInt(fundDeadline),
          milestoneTimes.map((t) => BigInt(t)),
          milestoneAmounts
        ]
      })

      toast.info('Đang chờ transaction được mined...')

      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash: txHash })
      }

      // Lên BE báo cáo
      await apiClient.put(`/projects/${project.id}/launch`, { txHash })

      toast.success('Dự án đã được Launch lên Blockchain thành công!')
      setOpen(false)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error: any) {
      console.error(error)
      toast.error(error.message || 'Có lỗi xảy ra khi gọi contract')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-[#10131a] border-[#2e323b] text-[#ecedf6] sm:max-w-md font-['Space_Grotesk']">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-[#8ff5ff] font-['Space_Grotesk']">
            <Rocket className="w-5 h-5 text-[#8ff5ff]" />
            Publish to Blockchain
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-[#a9abb3] text-sm">
            Dự án của bạn đã được Admin duyệt. Bây giờ bạn cần tạo Smart
            Contract cho dự án này trên chuỗi (Tốn phí Gas mạng Sepolia).
          </p>
          <div className="p-4 rounded-xl bg-[#1c2028] border border-[#2e323b]/50 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#73757d]">Funding Goal:</span>
              <span className="font-bold font-mono">
                {project.totalAmount} USDT
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#73757d]">Milestones:</span>
              <span className="font-bold font-mono">
                {project.milestones.length}
              </span>
            </div>
          </div>

          <Button
            onClick={handlePublish}
            disabled={isSubmitting}
            className="w-full font-bold uppercase tracking-widest flex items-center justify-center gap-2 font-['Space_Grotesk']"
            size="lg"
          >
            {isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Rocket className="w-5 h-5" />
            )}
            Xác nhận & Launch
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
