import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2, Rocket, Zap } from 'lucide-react'
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
  const [isDemoMode, setIsDemoMode] = useState(false)
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

      // Demo Mode: override fundDeadline = now + 2 phút (rút tiền ngay sau 2 phút)
      // Normal Mode: dùng Target Launch Date của dự án
      const fundDeadline = isDemoMode
        ? Math.floor(Date.now() / 1000) + 2 * 60
        : Math.floor(new Date(project.startDate).getTime() / 1000)

      // Prepare milestone arrays: Thời gian giải ngân là đầu ngày bắt đầu giai đoạn
      // Nhưng phải >= fundDeadline (yêu cầu của Smart Contract)
      // → dùng max(startOfDay, fundDeadline) để đảm bảo cả hai điều kiện
      const milestoneTimes = project.milestones.map((m) => {
        const d = new Date(m.startDate)
        d.setHours(0, 0, 0, 0)
        const startOfDay = Math.floor(d.getTime() / 1000)
        return Math.max(startOfDay, fundDeadline)
      })
      const milestoneAmounts = project.milestones.map((m) =>
        parseEther(m.amount.toString())
      )

      // --- PRE-VALIDATION CHECK ---
      const currentTime = Math.floor(Date.now() / 1000)
      if (fundDeadline <= currentTime) {
        toast.error(
          'Ngày Target Launch Date đã qua! Vui lòng chọn ngày bắt đầu dự án ở tương lai hoặc bật Demo Mode.'
        )
        setIsSubmitting(false)
        return
      }

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

          {/* Demo Mode Toggle */}
          <button
            type="button"
            onClick={() => setIsDemoMode((v) => !v)}
            className={`w-full flex items-center gap-2 px-4 py-3 rounded-xl border text-[11px] font-bold uppercase tracking-widest transition-all ${
              isDemoMode
                ? 'bg-[#f59e0b]/15 border-[#f59e0b]/50 text-[#f59e0b]'
                : 'bg-[#22262f]/50 border-[#2e323b] text-[#73757d] hover:border-[#f59e0b]/30 hover:text-[#f59e0b]/70'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="flex-1 text-left">Demo Mode</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${isDemoMode ? 'bg-[#f59e0b]/20' : 'bg-[#2e323b]'}`}
            >
              {isDemoMode
                ? 'BẬT — Rút tiền sau 2 phút'
                : 'TẮT — Dùng Launch Date thực'}
            </span>
          </button>

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
