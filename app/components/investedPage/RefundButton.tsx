import { useState } from 'react'
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { contractAbi, contractAddress } from '@/contract/ContractClient'
import { Button } from '@/components/ui/button'
import { Loader2, Coins } from 'lucide-react'
import { toast } from 'sonner'
import { apiClient } from '@/apis/axios'
import { useQueryClient } from '@tanstack/react-query'
import { projectKeys } from '@/apis/queries/project'

export function RefundButton({
  projectId,
  amount
}: {
  projectId: string
  amount?: number
}) {
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

      toast.info('Vui lòng xác nhận giao dịch trên ví...')

      const txHash = await writeContractAsync({
        address: contractAddress as `0x${string}`,
        abi: contractAbi,
        functionName: 'refund',
        args: [projectIdUint256]
      })

      toast.info('Giao dịch đã được gửi, đang chờ mạng lưới xác nhận...')

      // Gửi txHash cho Backend ngay lập tức
      await apiClient.post(`/project/${projectId}/refund`, { txHash })

      // Invalidate cache
      queryClient.invalidateQueries({ queryKey: projectKeys.all })

      toast.success('Rút tiền hoàn trả thành công!')
    } catch (error: any) {
      console.error(error)
      toast.error(
        'Lỗi giao dịch: ' +
          (error.shortMessage || error.message || 'Không xác định')
      )
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
        className="h-8 text-xs font-semibold uppercase tracking-wider text-green-500 border-green-500/30 bg-green-500/10"
      >
        Refunded
      </Button>
    )
  }

  return (
    <Button
      onClick={handleRefund}
      disabled={isLoading}
      variant="outline"
      size="sm"
      className="h-8 text-xs font-semibold uppercase tracking-wider text-[#ff716c] border-[#ff716c]/30 bg-[#ff716c]/10 hover:bg-[#ff716c]/20 hover:text-[#ff716c] transition-colors"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Coins className="mr-2 h-4 w-4" />
          Claim Refund {amount ? `(${amount} mUSDT)` : ''}
        </>
      )}
    </Button>
  )
}
