import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Banknote,
  Loader2,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useWriteContract, usePublicClient } from 'wagmi'
import { contractAbi, contractAddress } from '@/contract/ContractClient'
import { useWithdrawMilestone } from '@/apis/queries/project'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/utils'
import type { MilestoneRest } from '@/schemas/projectSchema'
import { useTranslation } from 'react-i18next'

interface WithdrawMilestoneModalProps {
  projectId: string
  milestone: MilestoneRest
  children: React.ReactNode
}

export function WithdrawMilestoneModal({
  projectId,
  milestone,
  children
}: WithdrawMilestoneModalProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const publicClient = usePublicClient()

  const { writeContractAsync, isPending: isContractPending } =
    useWriteContract()
  const { mutateAsync: withdrawMilestone } = useWithdrawMilestone(projectId)

  const isPending = isContractPending || isProcessing

  const [blockchainReleaseTime, setBlockchainReleaseTime] = useState<
    number | null
  >(null)

  useEffect(() => {
    async function fetchReleaseTime() {
      if (!publicClient) return
      try {
        const projectIdUint256 = BigInt('0x' + projectId)
        const milestoneIndex = BigInt(milestone.order - 1)
        const milestoneData = await publicClient.readContract({
          address: contractAddress,
          abi: contractAbi,
          functionName: 'projectMilestones',
          args: [projectIdUint256, milestoneIndex]
        })
        if (Array.isArray(milestoneData) && milestoneData.length > 0) {
          setBlockchainReleaseTime(Number(milestoneData[0]))
        }
      } catch (e) {
        console.error('Failed to fetch blockchain milestone release time:', e)
      }
    }
    fetchReleaseTime()
  }, [projectId, milestone.order, publicClient, open])

  // Sử dụng blockchainReleaseTime nếu có (dành cho Demo Mode/Normal Mode đồng bộ chính xác),
  // ngược lại fallback về database date.
  const releaseDate = blockchainReleaseTime
    ? new Date(blockchainReleaseTime * 1000)
    : new Date(milestone.startDate)

  const isReleaseDatePassed = blockchainReleaseTime
    ? Math.floor(Date.now() / 1000) >= blockchainReleaseTime
    : new Date() >= releaseDate

  const handleWithdraw = async () => {
    if (isPending) return

    setIsProcessing(true)
    try {
      // Chuyển MongoDB ObjectId (24 char hex) sang uint256 BigInt — giống pattern invest
      const projectIdUint256 = BigInt('0x' + projectId)

      toast.info(t('toast.sending_tx_blockchain'))

      // 1. Gọi contract.withdrawMilestone(projectId)
      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'withdrawMilestone',
        args: [projectIdUint256]
      })

      // 2. Ghi nhận lên BE

      await withdrawMilestone({ milestoneId: milestone.id, txHash: tx })

      toast.success(t('toast.withdraw_success'))
      setOpen(false)
    } catch (error: any) {
      console.error('Withdrawal error:', error)
      toast.error(getErrorMessage(error, t('toast.error_occurred')))
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-[#10131a] border-[#2e323b] text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#8ff5ff] font-['Space_Grotesk'] tracking-wide flex items-center gap-2">
            <Banknote className="w-5 h-5" />
            {t('withdraw.title')}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Milestone Info */}
          <div className="p-4 rounded-xl bg-[#161a21] border border-[#2e323b]/70 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#73757d] mb-1">
                  {t('withdraw.milestone_label')}
                </p>
                <p className="text-[#ecedf6] font-['Space_Grotesk'] font-bold">
                  {milestone.title}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#73757d] mb-1">
                  {t('withdraw.amount_label')}
                </p>
                <p className="text-[#8ff5ff] font-['Space_Grotesk'] font-bold text-lg">
                  {milestone.amount.toLocaleString()} USDT
                </p>
              </div>
            </div>

            {/* Release time status */}
            <div
              className={`flex items-center gap-2 text-xs rounded-lg px-3 py-2 border ${
                isReleaseDatePassed
                  ? 'bg-[#8ff5ff]/5 border-[#8ff5ff]/20 text-[#8ff5ff]'
                  : 'bg-[#ff716c]/5 border-[#ff716c]/20 text-[#ff716c]'
              }`}
            >
              {isReleaseDatePassed ? (
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              ) : (
                <Clock className="w-3.5 h-3.5 shrink-0" />
              )}
              <span className="font-mono">
                {isReleaseDatePassed
                  ? t('withdraw.release_passed', {
                      date: releaseDate.toLocaleString()
                    })
                  : t('withdraw.release_pending', {
                      date: releaseDate.toLocaleString()
                    })}
              </span>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#ff716c]/5 border border-[#ff716c]/20">
            <AlertTriangle className="w-4 h-4 text-[#ff716c] shrink-0 mt-0.5" />
            <div className="text-xs text-[#a9abb3] leading-relaxed">
              <span className="text-[#ff716c] font-bold">
                {t('withdraw.note')}
              </span>
              {t('withdraw.warning_prefix')}
              <span className="text-[#ecedf6] font-bold">
                {milestone.amount.toLocaleString()} USDT
              </span>
              {t('withdraw.warning_suffix')}
            </div>
          </div>

          {/* Verification badge */}
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#ac89ff]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t('withdraw.admin_approved')}</span>
          </div>

          {/* CTA Button */}
          <button
            id={`withdraw-btn-${milestone.id}`}
            onClick={handleWithdraw}
            disabled={isPending || !isReleaseDatePassed}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8ff5ff] to-[#ac89ff] text-[#10131a] font-bold uppercase tracking-widest hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-['Space_Grotesk'] shadow-[0_0_20px_rgba(143,245,255,0.3)]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {t('invest.processing_btn')}
              </>
            ) : !isReleaseDatePassed ? (
              <>
                <Clock className="w-4 h-4" />
                {t('withdraw.not_ready_btn')}
              </>
            ) : (
              <>
                <Banknote className="w-4 h-4" />
                {t('withdraw.confirm_btn')}
              </>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
