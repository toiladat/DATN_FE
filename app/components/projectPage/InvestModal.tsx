import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Zap, Loader2 } from 'lucide-react'
import { useState } from 'react'
import {
  useAccount,
  useBalance,
  useWriteContract,
  usePublicClient
} from 'wagmi'
import { parseEther, erc20Abi } from 'viem'
import { contractAbi, contractAddress } from '@/contract/ContractClient'
import { projectRequests } from '@/apis/requests/project'
import { toast } from 'sonner'

interface InvestModalProps {
  projectId: string
  fundingGoal: number
  raisedAmount: number
  disabled?: boolean
  children: React.ReactNode
}

export function InvestModal({
  projectId,
  fundingGoal,
  raisedAmount,
  disabled,
  children
}: InvestModalProps) {
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [content, setContent] = useState('')
  const { address } = useAccount()
  const publicClient = usePublicClient()

  const MUSDT_ADDRESS = import.meta.env.VITE_MUSDT_ADDRESS as `0x${string}`
  const { data: balanceData } = useBalance({
    address,
    token: MUSDT_ADDRESS
  })

  const { writeContractAsync: approveAsync, isPending: isApproving } =
    useWriteContract()
  const { writeContractAsync: contributeAsync, isPending: isContributing } =
    useWriteContract()

  const [isProcessing, setIsProcessing] = useState(false)
  const isPending = isApproving || isContributing || isProcessing

  const handleInvest = async () => {
    if (isPending) return
    if (!amount || Number(amount) <= 0) {
      toast.error('Vui lòng nhập số tiền hợp lệ')
      return
    }

    const remainingAmount = fundingGoal - raisedAmount
    if (Number(amount) > remainingAmount) {
      toast.error(
        `Bạn chỉ có thể invest tối đa ${remainingAmount} USDT (số tiền còn thiếu của dự án)`
      )
      return
    }

    if (balanceData && Number(amount) > Number(balanceData.formatted)) {
      toast.error('Số dư không đủ')
      return
    }

    // Tắt nút bấm khi đã pass toàn bộ validations
    setIsProcessing(true)

    try {
      const parsedAmount = parseEther(amount)
      // 1. Approve ERC20 (dù smart contract contribute không có params amount,
      // ta vẫn gọi approve chuẩn ERC20 theo yêu cầu người dùng)
      const approveTx = await approveAsync({
        address: MUSDT_ADDRESS,
        abi: erc20Abi,
        functionName: 'approve',
        args: [contractAddress, parsedAmount]
      })

      toast.info('Đang chờ approve transaction...')

      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash: approveTx })
      }

      // Chuyển UUID sang uint256 bằng cách cast sang BigInt
      // Bỏ qua lỗi TypeScript nếu ID không chuẩn hex, nhưng UUID mongo luôn là 24 ký tự hex hợp lệ.
      const campaignIdUint256 = BigInt('0x' + projectId)

      // 2. Invest (Gọi hàm trên crowdfunding contract mới)
      // Truyền campaignIdUint256 và parsedAmount
      const contributeTx = await contributeAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'invest',
        args: [campaignIdUint256, parsedAmount]
      })

      toast.info('Đang xác nhận đầu tư trên chuỗi...')

      // 3. Call BE API để lưu lịch sử
      await projectRequests.invest(projectId, {
        amount: Number(amount),
        txHash: contributeTx,
        content: content.trim() || undefined
      })

      toast.success('Đầu tư thành công!')
      setOpen(false)
      setAmount('')
      setContent('')
    } catch (error: any) {
      console.error('Invest error:', error)
      toast.error(error?.shortMessage || error?.message || 'Đã có lỗi xảy ra')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={disabled}>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-[#10131a] border-[#2e323b] text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#8ff5ff] font-['Space_Grotesk'] tracking-wide flex items-center gap-2">
            <Zap className="w-5 h-5" />
            BACK THIS PROJECT
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-[#73757d] font-mono">
              <span>Số dư khả dụng</span>
              <span>
                {balanceData
                  ? `${Number(balanceData.formatted).toLocaleString()} USDT`
                  : 'Đang tải...'}
              </span>
            </div>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Nhập số tiền USDT"
                className="w-full bg-[#161a21] border border-[#2e323b] rounded-xl px-4 py-3 text-white placeholder:text-[#45484f] focus:outline-none focus:border-[#8ff5ff] focus:ring-1 focus:ring-[#8ff5ff]/50 transition-all font-mono"
                disabled={isPending}
              />
              <button
                onClick={() => {
                  if (balanceData) {
                    const userBal = Number(balanceData.formatted)
                    const remainingAmount = fundingGoal - raisedAmount
                    setAmount(Math.min(userBal, remainingAmount).toString())
                  }
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase font-bold text-[#ac89ff] hover:text-[#8ff5ff]"
              >
                Max
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-[#73757d] font-mono">
              <span>Lời nhắn động viên (Tuỳ chọn)</span>
              <span>{content.length}/200</span>
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, 200))}
              placeholder="Bạn có muốn nhắn gửi điều gì đến Founder không?"
              rows={3}
              className="w-full bg-[#161a21] border border-[#2e323b] rounded-xl px-4 py-3 text-white placeholder:text-[#45484f] focus:outline-none focus:border-[#8ff5ff] focus:ring-1 focus:ring-[#8ff5ff]/50 transition-all font-mono resize-none"
              disabled={isPending}
            />
          </div>

          <button
            onClick={handleInvest}
            disabled={isPending || !amount || Number(amount) < 1}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8ff5ff] to-[#ac89ff] text-[#10131a] font-bold uppercase tracking-widest hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-['Space_Grotesk'] shadow-[0_0_20px_rgba(143,245,255,0.3)]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                ĐANG XỬ LÝ...
              </>
            ) : (
              'XÁC NHẬN ĐẦU TƯ'
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
