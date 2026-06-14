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
import { useTranslation } from 'react-i18next'
import { getErrorMessage } from '@/lib/utils'

interface PublishModalProps {
  project: ProjectDetail
  children: React.ReactNode
}

export function PublishModal({ project, children }: PublishModalProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const { address } = useAccount()
  const publicClient = usePublicClient()

  const { writeContractAsync: createProjectAsync } = useWriteContract()

  const handlePublish = async () => {
    if (!address) {
      toast.error(t('toast.connect_wallet_required'))
      return
    }

    setIsSubmitting(true)
    try {
      const campaignIdUint256 = BigInt('0x' + project.id)
      const goal = parseEther(project.totalAmount.toString())

      // Demo Mode: override fundDeadline = now + 5 phút để có đủ thời gian test thủ công
      // Normal Mode: dùng Target Launch Date của dự án
      const fundDeadline = isDemoMode
        ? Math.floor(Date.now() / 1000) + 300
        : Math.floor(new Date(project.startDate).getTime() / 1000)

      // Prepare milestone arrays: Thời gian giải ngân là đầu ngày bắt đầu giai đoạn
      // Nhưng phải >= fundDeadline (yêu cầu của Smart Contract)
      // → dùng max(startOfDay, fundDeadline) để đảm bảo cả hai điều kiện
      const milestoneTimes = project.milestones.map((m, idx) => {
        if (isDemoMode) {
          // Demo Mode: Milestone 1 giải ngân sau 5 phút (bằng fundDeadline).
          // Các milestone tiếp theo giải ngân cách nhau 1 phút để test nhanh.
          return fundDeadline + idx * 60
        }
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
        toast.error(t('toast.target_launch_date_past'))
        setIsSubmitting(false)
        return
      }

      let totalMilestoneAmount = BigInt(0)
      let lastTime = BigInt(fundDeadline)

      for (let i = 0; i < milestoneTimes.length; i++) {
        if (BigInt(milestoneTimes[i]) < lastTime) {
          toast.error(t('toast.milestone_time_invalid', { order: i + 1 }))
          setIsSubmitting(false)
          return
        }
        totalMilestoneAmount += milestoneAmounts[i]
        lastTime = BigInt(milestoneTimes[i])
      }

      if (totalMilestoneAmount !== goal) {
        toast.error(t('toast.milestone_total_mismatch'))
        setIsSubmitting(false)
        return
      }
      // --- END PRE-VALIDATION ---

      toast.info(t('toast.confirm_tx_wallet'))

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

      toast.info(t('toast.waiting_tx_mined'))

      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash: txHash })
      }

      // Lên BE báo cáo
      await apiClient.put(`/projects/${project.id}/launch`, { txHash })

      toast.success(t('toast.launch_blockchain_success'))
      setOpen(false)
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error: any) {
      console.error(error)
      toast.error(getErrorMessage(error, t('toast.contract_call_error')))
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
            {t('publish.title')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-[#a9abb3] text-sm">{t('publish.description')}</p>
          <div className="p-4 rounded-xl bg-[#1c2028] border border-[#2e323b]/50 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#73757d]">
                {t('publish.funding_goal')}
              </span>
              <span className="font-bold font-mono">
                {project.totalAmount} USDT
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#73757d]">
                {t('publish.milestones_count')}
              </span>
              <span className="font-bold font-mono">
                {project.milestones.length}
              </span>
            </div>
          </div>

          {/* Demo Mode Toggle */}
          <div
            onClick={() => setIsDemoMode((v) => !v)}
            className={`w-full flex items-center justify-between p-4 rounded-xl border cursor-pointer select-none transition-all ${
              isDemoMode
                ? 'bg-[#f59e0b]/10 border-[#f59e0b]/40 text-[#f59e0b]'
                : 'bg-[#1c2028]/60 border-[#2e323b] text-[#ecedf6] hover:border-[#2e323b]/80'
            }`}
          >
            <div className="space-y-1 pr-4">
              <div className="flex items-center gap-2">
                <Zap
                  className={`w-4 h-4 ${isDemoMode ? 'text-[#f59e0b] animate-pulse' : 'text-[#73757d]'}`}
                />
                <span className="text-xs font-bold uppercase tracking-wider font-['Space_Grotesk']">
                  {t('publish.demo_mode')}
                </span>
              </div>
              <p className="text-[11px] text-[#73757d] font-sans leading-relaxed">
                {isDemoMode ? t('publish.demo_on') : t('publish.demo_off')}
              </p>
            </div>

            {/* Switch Toggle */}
            <div
              className={`w-10 h-6 rounded-full p-1 transition-all duration-300 relative shrink-0 ${
                isDemoMode ? 'bg-[#f59e0b]' : 'bg-[#2e323b]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-[#10131a] shadow-md transition-all duration-300 transform ${
                  isDemoMode ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
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
            {t('publish.confirm_btn')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
