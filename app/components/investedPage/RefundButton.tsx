import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { contractAbi, contractAddress } from '@/contract/ContractClient'
import { Button } from '@/components/ui/button'
import { Loader2, Coins } from 'lucide-react'
import { toast } from 'sonner'
import { apiClient } from '@/apis/axios'
import { useQueryClient } from '@tanstack/react-query'
import { projectKeys } from '@/apis/queries/project'
import { getErrorMessage } from '@/lib/utils'
import { useTranslation } from 'react-i18next'

export function RefundButton({
  projectId,
  amount
}: {
  projectId: string
  amount?: number
}) {
  const { t } = useTranslation()
  const [isProcessing, setIsProcessing] = useState(false)
  const queryClient = useQueryClient()

  const {
    data: hash,
    writeContractAsync,
    isPending: isContractPending
  } = useWriteContract()

  // Chờ Blockchain xác nhận Transaction
  const { isLoading: isWaitingTx, isSuccess: isTxSuccess } =
    useWaitForTransactionReceipt({
      hash
    })

  const handleRefund = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isProcessing || isContractPending || isWaitingTx) return

    setIsProcessing(true)
    try {
      // Chuyển MongoDB ObjectId (24 char hex) sang uint256 BigInt
      const projectIdUint256 = BigInt('0x' + projectId)

      toast.info(t('refund.confirm_tx'))

      const txHash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: contractAbi,
        functionName: 'refund',
        args: [projectIdUint256]
      })

      toast.info(t('refund.tx_sent'))

      // Gửi txHash cho Backend ngay lập tức
      await apiClient.post(`/projects/${projectId}/refund`, { txHash })

      // Invalidate cache
      queryClient.invalidateQueries({ queryKey: projectKeys.all })

      toast.success(t('refund.success'))
    } catch (error: any) {
      console.error(error)
      toast.error(getErrorMessage(error, t('refund.error')))
    } finally {
      setIsProcessing(false)
    }
  }

  const isLoading = isProcessing || isContractPending || isWaitingTx

  if (isTxSuccess) {
    return (
      <Button
        variant="outline"
        size="sm"
        disabled
        className="h-8 text-xs font-semibold uppercase tracking-wider text-green-500 border-green-500/30 bg-green-500/10 rounded-none"
      >
        {t('compact.refunded')}
      </Button>
    )
  }

  return (
    <Button
      onClick={handleRefund}
      disabled={isLoading}
      variant="outline"
      size="sm"
      className="h-8 text-xs font-semibold uppercase tracking-wider text-neon-rose border-neon-rose/30 bg-neon-rose/10 hover:bg-neon-rose/20 hover:text-neon-rose transition-all cursor-pointer rounded-none shadow-[1px_1px_0px_var(--neon-rose)]"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t('refund.processing')}
        </>
      ) : (
        <>
          <Coins className="mr-2 h-4 w-4" />
          {t('refund.claim')} {amount ? `(${amount} mUSDT)` : ''}
        </>
      )}
    </Button>
  )
}
