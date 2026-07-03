import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Bot,
  Send,
  X,
  Sparkles,
  User,
  RotateCcw,
  ExternalLink,
  Wallet,
  Copy,
  CheckCircle2,
  HelpCircle
} from 'lucide-react'
import { toast } from 'sonner'

interface Message {
  sender: 'user' | 'ai'
  text: string
  timestamp: Date
}

export default function AiAssistant() {
  const { t, i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userWallet, setUserWallet] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const streamTextRef = useRef<string>('')

  // 1. Kiểm tra trạng thái đăng nhập ví Web3 của người dùng
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken')
      if (token) {
        setIsLoggedIn(true)
        try {
          const parsed = JSON.parse(atob(token.split('.')[1]))
          if (parsed && parsed.walletAddress) {
            setUserWallet(
              parsed.walletAddress.slice(0, 6) +
                '...' +
                parsed.walletAddress.slice(-4)
            )
          } else if (parsed && parsed.userId) {
            setUserWallet(parsed.userId.slice(-6))
          }
        } catch {
          // Bỏ qua nếu lỗi parse
        }
      }

      // Khôi phục hội thoại cũ từ sessionStorage
      const savedChat = sessionStorage.getItem('fundhive_chat')
      if (savedChat) {
        try {
          const parsedChat = JSON.parse(savedChat)
          setMessages(
            parsedChat.map((m: any) => ({
              ...m,
              timestamp: new Date(m.timestamp)
            }))
          )
        } catch {
          // Bỏ qua
        }
      } else {
        // Lời chào mặc định thân thiện, dễ thương
        setMessages([
          {
            sender: 'ai',
            text: t('ai.greeting'),
            timestamp: new Date()
          }
        ])
      }
    }
  }, [])

  // Tự động cuộn xuống dưới cùng khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isStreaming])

  // Lưu hội thoại vào sessionStorage
  const saveChatHistory = (updatedMessages: Message[]) => {
    sessionStorage.setItem('fundhive_chat', JSON.stringify(updatedMessages))
  }

  // 2. Các câu hỏi mẫu thông minh (Quick FAQ)
  const quickFaqs = [
    {
      label: t('ai.faq_usdt_label'),
      q: t('ai.faq_usdt_q')
    },
    {
      label: t('ai.faq_refund_label'),
      q: t('ai.faq_refund_q')
    },
    {
      label: t('ai.faq_milestone_label'),
      q: t('ai.faq_milestone_q')
    },
    {
      label: t('ai.faq_about_label'),
      q: t('ai.faq_about_q')
    }
  ]

  // 3. Xử lý gửi tin nhắn & Stream phản hồi (SSE)
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend || !textToSend.trim() || isStreaming) return

    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    }

    const updated = [...messages, userMsg]
    setMessages(updated)
    saveChatHistory(updated)
    setInputMessage('')

    // OVERRIDE FOR STATIC FAUCET INFO - RESPOND INSTANTLY (Extremely robust keyword checking)
    const normalizedText = textToSend.toLowerCase().trim()
    const isUsdtFaq =
      normalizedText.includes('musdt') &&
      (normalizedText.includes('nhận') ||
        normalizedText.includes('lấy') ||
        normalizedText.includes('nạp') ||
        normalizedText.includes('faucet') ||
        normalizedText.includes('thử nghiệm') ||
        normalizedText.includes('invest') ||
        normalizedText.includes('get') ||
        normalizedText.includes('add') ||
        normalizedText.includes('tích'))

    if (isUsdtFaq) {
      const detailedAnswer =
        i18n.language === 'vi'
          ? `mUSDT (Mock USDT) là đồng stablecoin định danh chuẩn ERC20 được sử dụng chính thức trên nền tảng FundHive để thực hiện các giao dịch đầu tư và giải ngân. \n\nĐể nhận mUSDT thử nghiệm và tích hợp vào ví, bạn thực hiện các bước sau:\n\n1. THÔNG TIN TOKEN mUSDT:\n- Mạng lưới: Sepolia Testnet\n- Địa chỉ hợp đồng (Contract Address): 0x26A0d19F8c7D56F676b835fc990d6038dC075c84\n- Ký hiệu: mUSDT\n- Số thập phân (Decimals): 18\n\n2. CÁCH NHẬN mUSDT THỬ NGHIỆM (FAUCET):\n- Bạn có thể liên hệ Ban Quản trị hệ thống để được chuyển mUSDT trực tiếp vào ví cá nhân của bạn.\n- Hoặc bạn có thể tự nhận mUSDT bằng cách truy cập trực tiếp vào hợp đồng mUSDT trên Sepolia Etherscan: https://sepolia.etherscan.io/address/0x26A0d19F8c7D56F676b835fc990d6038dC075c84#writeContract, kết nối ví và nhấn nút Write tại mục Faucet hoặc mint để nhận token miễn phí.\n\n3. CÁCH ADD TOKEN VÀO VÍ (MetaMask, Rabby...):\n- Chuyển ví sang mạng Sepolia Testnet.\n- Chọn "Import Tokens" hoặc "Nhập token".\n- Dán địa chỉ hợp đồng: 0x26A0d19F8c7D56F676b835fc990d6038dC075c84\n- Nhấn "Add Custom Token" để hoàn tất hiển thị số dư.`
          : `mUSDT (Mock USDT) is the official ERC20 stablecoin used on FundHive for investment and release operations. \n\nTo top up test mUSDT and add it to your wallet, follow these steps:\n\n1. mUSDT TOKEN INFORMATION:\n- Network: Sepolia Testnet\n- Contract Address: 0x26A0d19F8c7D56F676b835fc990d6038dC075c84\n- Symbol: mUSDT\n- Decimals: 18\n\n2. HOW TO GET TEST mUSDT (FAUCET):\n- You can contact the Administration to transfer mUSDT directly to your address.\n- Alternatively, you can mint it directly on Sepolia Etherscan: https://sepolia.etherscan.io/address/0x26A0d19F8c7D56F676b835fc990d6038dC075c84#writeContract, connect your wallet, and execute the Faucet/mint function to claim test tokens.\n\n3. HOW TO ADD TOKEN TO WALLET (MetaMask, Rabby...):\n- Switch your wallet to Sepolia Testnet.\n- Select "Import Tokens" or "Add Token".\n- Paste the contract address: 0x26A0d19F8c7D56F676b835fc990d6038dC075c84\n- Click "Add Custom Token" to finish.`

      const aiMsg: Message = {
        sender: 'ai',
        text: detailedAnswer,
        timestamp: new Date()
      }
      const finalChat = [...updated, aiMsg]
      setMessages(finalChat)
      saveChatHistory(finalChat)
      return
    }

    setIsStreaming(true)

    // Tạo tin nhắn trống của AI để chuẩn bị stream
    const aiMsgIndex = updated.length
    const tempAiMsg: Message = {
      sender: 'ai',
      text: '',
      timestamp: new Date()
    }
    const finalChatWithAi = [...updated, tempAiMsg]
    setMessages(finalChatWithAi)

    streamTextRef.current = ''

    try {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('accessToken')
          : null

      const response = await fetch('/api/ai/chat-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ message: textToSend })
      })

      if (!response.ok) {
        throw new Error('Kết nối API thất bại')
      }

      if (!response.body) {
        throw new Error('Không nhận được luồng dữ liệu stream')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          const cleanLine = line.trim()
          if (!cleanLine) continue

          if (cleanLine === 'data: [DONE]') {
            break
          }

          if (cleanLine.startsWith('data: ')) {
            try {
              const jsonStr = cleanLine.substring(6)
              const data = JSON.parse(jsonStr)
              if (data.text) {
                streamTextRef.current += data.text

                setMessages((prev) => {
                  const copy = [...prev]
                  if (copy[aiMsgIndex]) {
                    copy[aiMsgIndex] = {
                      ...copy[aiMsgIndex],
                      text: streamTextRef.current
                    }
                  }
                  return copy
                })
              }
            } catch (err) {
              console.error('Lỗi phân tích cú pháp stream chunk:', err)
            }
          }
        }
      }
    } catch (error) {
      console.error('Lỗi truyền tải SSE stream:', error)
      setMessages((prev) => {
        const copy = [...prev]
        if (copy[aiMsgIndex]) {
          copy[aiMsgIndex] = {
            ...copy[aiMsgIndex],
            text: t('ai.error_connect')
          }
        }
        return copy
      })
    } finally {
      setIsStreaming(false)
      setMessages((prev) => {
        saveChatHistory(prev)
        return prev
      })
    }
  }

  // 4. Xóa lịch sử cuộc trò chuyện
  const handleClearHistory = () => {
    if (window.confirm(t('ai.clear_confirm'))) {
      sessionStorage.removeItem('fundhive_chat')
      const defaultGreeting: Message = {
        sender: 'ai',
        text: t('ai.clear_success'),
        timestamp: new Date()
      }
      setMessages([defaultGreeting])
    }
  }

  // Phân tích và hiển thị nội dung tin nhắn, trích xuất cấu trúc giao diện tương tác đẹp mắt
  const renderMessageContent = (text: string) => {
    if (!text) return null

    // Regex phân chia các khối token đặc biệt: [PROJECT:...], [WALLET:...], [TX:...], [IMAGE:...]
    const tokenRegex =
      /(\[PROJECT:.*?\]|\[WALLET:.*?\]|\[TX:.*?\]|\[IMAGE:.*?\])/g
    const parts = text.split(tokenRegex)

    return parts.map((part, index) => {
      // 1. PROJECT CARD RENDERING
      if (part.startsWith('[PROJECT:') && part.endsWith(']')) {
        try {
          const content = part.slice(9, -1)
          const fields = content.split('|').map((x) => x.trim())

          let title = fields[0] || 'Dự án'
          let slug = fields[1] || ''
          let img = fields[2] || ''
          let status = fields[3] || ''
          let raised = fields[4] || ''
          let goal = fields[5] || ''

          if (slug) {
            const match = slug.match(/slug:\s*([a-z0-9-]+)/i)
            if (match && match[1]) {
              slug = match[1]
            } else {
              slug = slug.replace(/^slug:\s*/i, '').trim()
            }
          }

          if (img) {
            img = img.replace(/unshade\.com/i, 'unsplash.com').trim()
          }

          if (!slug && title) {
            slug = title
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/[đĐ]/g, 'd')
              .replace(/[^a-z0-9\s-]/g, '')
              .trim()
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-')
          }

          const hasValidSlug = slug && slug !== 'undefined' && slug !== 'null'

          return (
            <div
              key={`proj-${index}`}
              className="my-3 p-3 bg-background border border-border hover:border-neon-cyan/30 rounded-none flex items-center gap-3 transition-all duration-300 shadow-lg"
            >
              {img && img !== 'null' && img !== 'undefined' && img !== '' ? (
                <img
                  src={img}
                  alt={title}
                  className="w-14 h-14 object-cover rounded-none bg-muted shrink-0 border border-border"
                />
              ) : (
                <div className="w-14 h-14 bg-muted rounded-none flex items-center justify-center shrink-0 border border-border">
                  <Bot className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-foreground truncate">
                  {title}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  {status && (
                    <span
                      className={`px-1.5 py-0.2 rounded-none text-[8px] font-semibold tracking-wider ${
                        status === 'PROGRESS' ||
                        status === 'ACTIVE' ||
                        status === 'SUCCESS'
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          : 'bg-neon-rose/10 text-neon-rose border border-neon-rose/20'
                      }`}
                    >
                      {status}
                    </span>
                  )}
                </div>
                {raised && goal && !isNaN(parseFloat(raised)) && (
                  <div className="mt-1">
                    <div className="w-full bg-muted rounded-none h-1">
                      <div
                        className="bg-gradient-to-r from-neon-cyan to-neon-purple h-1 rounded-none"
                        style={{
                          width: `${Math.min(100, (parseFloat(raised) / parseFloat(goal)) * 100)}%`
                        }}
                      ></div>
                    </div>
                    <p className="text-[9px] text-muted-foreground mt-1 font-mono">
                      {t('ai.raised')}{' '}
                      <span className="text-neon-cyan font-semibold">
                        {raised}
                      </span>{' '}
                      / {goal} mUSDT
                    </p>
                  </div>
                )}
              </div>
              {hasValidSlug && (
                <a
                  href={`/projects/${slug}`}
                  className="px-2.5 py-1.5 text-[10px] bg-neon-cyan hover:bg-neon-cyan/80 text-background font-semibold rounded-none transition-colors shrink-0 flex items-center gap-1 shadow-sm"
                >
                  {t('ai.view')}
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>
          )
        } catch (e) {
          return (
            <span key={index} className="text-destructive">
              {t('ai.project_error')}
            </span>
          )
        }
      }

      // 2. WALLET CHIP RENDERING
      if (part.startsWith('[WALLET:') && part.endsWith(']')) {
        const address = part.slice(8, -1).trim()
        return (
          <span
            key={`wallet-${index}`}
            onClick={() => {
              navigator.clipboard.writeText(address)
              toast.success(t('ai.toast_wallet_copied'))
            }}
            className="inline-flex items-center gap-1 px-1.5 py-0.5 mx-1 rounded-none bg-background border border-neon-cyan/20 hover:border-neon-cyan/40 text-neon-cyan font-mono text-[11px] cursor-pointer hover:bg-muted transition-all duration-200"
            title={t('ai.wallet_tooltip')}
          >
            <Wallet className="w-3 h-3" />
            {address.length > 12
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : address}
            <Copy className="w-2.5 h-2.5 opacity-60" />
          </span>
        )
      }

      // 3. TRANSACTION HASH CHIP RENDERING
      if (part.startsWith('[TX:') && part.endsWith(']')) {
        const hash = part.slice(4, -1).trim()
        return (
          <a
            key={`tx-${index}`}
            href={`https://sepolia.etherscan.io/tx/${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-1.5 py-0.5 mx-1 rounded-none bg-background border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-500 font-mono text-[11px] hover:bg-muted transition-all duration-200"
            title={t('ai.tx_tooltip')}
          >
            <ExternalLink className="w-3 h-3" />
            Tx:
            {hash.length > 12
              ? `${hash.slice(0, 6)}...${hash.slice(-4)}`
              : hash}
          </a>
        )
      }

      // 4. IMAGE RENDERING
      if (part.startsWith('[IMAGE:') && part.endsWith(']')) {
        try {
          const content = part.slice(7, -1)
          const [caption, url] = content.split('|').map((x) => x.trim())
          return (
            <div
              key={`img-${index}`}
              className="my-2 border border-border rounded-none overflow-hidden bg-card shadow-sm"
            >
              <img
                src={url}
                alt={caption}
                className="w-full max-h-40 object-cover"
              />
              <p className="text-[10px] text-muted-foreground p-1.5 text-center italic bg-muted/20">
                {caption}
              </p>
            </div>
          )
        } catch (e) {
          return null
        }
      }

      // 5. REGULAR TEXT RENDERING (Markdown Sanitizer)
      return part.split('\n').map((line, lineIdx) => {
        // Loại bỏ hoàn toàn các dấu hoa thị thô (markdown bold **text** -> text)
        let cleanLine = line.replace(/\*\*/g, '').replace(/`/g, '')

        if (!cleanLine.trim()) {
          return <div key={`empty-${index}-${lineIdx}`} className="h-2"></div>
        }

        // Render danh sách đẹp mắt
        if (
          cleanLine.trim().startsWith('- ') ||
          cleanLine.trim().startsWith('* ')
        ) {
          const listText = cleanLine.trim().slice(2)
          return (
            <div
              key={`line-${index}-${lineIdx}`}
              className="pl-4 py-0.5 flex items-start gap-1.5 text-foreground text-sm min-w-0 w-full"
            >
              <span className="text-neon-cyan mt-2 shrink-0 w-1.5 h-1.5 rounded-none bg-neon-cyan"></span>
              <span className="leading-relaxed break-words min-w-0 flex-1">
                {listText}
              </span>
            </div>
          )
        }

        return (
          <p
            key={`line-${index}-${lineIdx}`}
            className="leading-relaxed mb-1 text-foreground text-sm break-words w-full"
          >
            {cleanLine}
          </p>
        )
      })
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* NÚT FLOAT TOGGLE CHAT WIDGET - Smooth Friendly Scale on Hover */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-none bg-card border border-neon-cyan/50 text-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300 shadow-[2px_2px_0px_var(--neon-purple)] hover:shadow-none hover:translate-x-px hover:translate-y-px select-none"
          title={t('ai.tooltip')}
        >
          {/* Active Status Ring */}
          <span className="absolute top-0 right-0 flex h-3 w-3 z-20">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-none h-3 w-3 bg-emerald-500"></span>
          </span>

          <img
            src="/logo.png"
            alt="AI Assistant Logo"
            className="w-14 h-14 object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </button>
      )}

      {/* CỬA SỔ HỘI THOẠI WIDGET */}
      {isOpen && (
        <div className="flex flex-col w-96 max-w-[calc(100vw-2rem)] h-[550px] max-h-[85vh] rounded-none border-2 border-border bg-card shadow-[4px_4px_0px_var(--neon-purple)] overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95">
          {/* HEADER CHAT - Clean & Elegant */}
          <div className="relative flex items-center justify-between px-4 py-3.5 bg-muted/30 border-b border-border select-none">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="AI Logo"
                className="w-14 h-14 object-contain my-[-10px] ml-[-12px] mr-[-10px]"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-foreground tracking-wide font-['Space_Grotesk']">
                    {t('ai.assistant_title')}
                  </span>
                  <span className="flex h-1.5 w-1.5 rounded-none bg-emerald-500 animate-pulse"></span>
                </div>
                <span className="text-[9px] text-muted-foreground flex items-center gap-1 mt-0.5">
                  {isLoggedIn ? (
                    <>
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                      <span>
                        {t('ai.member')} ({userWallet})
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-none"></span>
                      <span>{t('ai.guest')}</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleClearHistory}
                className="p-2 rounded-none bg-background border border-border text-muted-foreground hover:text-foreground transition-colors"
                title={t('ai.clear_tooltip')}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-none bg-background border border-border text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* VÙNG CHỨA TIN NHẮN (MESSAGE CONTAINER) */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-neon-cyan/10 scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-250`}
              >
                <div
                  className={`flex gap-2 max-w-[85%] min-w-0 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Avatar Icon */}
                  {msg.sender === 'user' ? (
                    <div className="flex items-center justify-center w-7 h-7 rounded-none shrink-0 border bg-neon-cyan/10 border-neon-cyan/20 text-neon-cyan">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-7 h-7 rounded-none shrink-0 border bg-muted/20 border-border">
                      <img
                        src="/logo.png"
                        alt="AI"
                        className="w-5 h-5 object-contain"
                      />
                    </div>
                  )}

                  {/* Message Balloon */}
                  <div
                    className={`px-3 py-2.5 rounded-none shadow-sm leading-relaxed border break-words whitespace-pre-wrap min-w-0 w-full ${
                      msg.sender === 'user'
                        ? 'bg-neon-cyan text-background font-medium border-neon-cyan'
                        : 'bg-background text-foreground border-border'
                    }`}
                  >
                    {/* Bouncing typing dots if streaming empty response */}
                    {msg.text === '' && msg.sender === 'ai' && isStreaming ? (
                      <div className="flex gap-1 items-center py-2 px-1 justify-start">
                        <span
                          className="w-1.5 h-1.5 bg-neon-cyan rounded-none animate-bounce"
                          style={{ animationDelay: '0ms' }}
                        ></span>
                        <span
                          className="w-1.5 h-1.5 bg-neon-cyan rounded-none animate-bounce"
                          style={{ animationDelay: '150ms' }}
                        ></span>
                        <span
                          className="w-1.5 h-1.5 bg-neon-cyan rounded-none animate-bounce"
                          style={{ animationDelay: '300ms' }}
                        ></span>
                      </div>
                    ) : (
                      renderMessageContent(msg.text)
                    )}

                    {/* Cursor while streaming */}
                    {msg.sender === 'ai' &&
                      isStreaming &&
                      index === messages.length - 1 &&
                      msg.text !== '' && (
                        <span className="inline-block w-1.5 h-3 bg-neon-cyan animate-pulse ml-1">
                          ▋
                        </span>
                      )}

                    <div
                      className={`text-[8px] mt-1.5 text-right opacity-50 ${
                        msg.sender === 'user'
                          ? 'text-background/70'
                          : 'text-muted-foreground/70'
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* QUICK FAQs BADGES */}
          {messages.length === 1 && !isStreaming && (
            <div className="px-4 pb-3 border-t border-border pt-3 select-none">
              <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-neon-cyan" />
                {t('ai.suggested_questions')}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {quickFaqs.map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(faq.q)}
                    className="px-2.5 py-2 text-left text-[11px] bg-muted/40 border border-border hover:border-neon-cyan/30 hover:bg-muted/80 rounded-none text-muted-foreground hover:text-foreground transition-all duration-200 line-clamp-1 truncate"
                  >
                    {faq.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* KHU VỰC NHẬP TIN NHẮN (INPUT BAR) */}
          <div className="p-3 bg-muted/40 border-t border-border select-none">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage(inputMessage)
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={isStreaming}
                  placeholder={
                    isStreaming ? t('ai.thinking') : t('ai.placeholder')
                  }
                  className="w-full bg-background border border-border focus:border-neon-cyan/50 text-foreground placeholder-muted-foreground/50 text-xs rounded-none pl-3 pr-8 py-2.5 outline-none transition-colors"
                />
                <Sparkles className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-muted-foreground/60" />
              </div>
              <button
                type="submit"
                disabled={isStreaming || !inputMessage.trim()}
                className="flex items-center justify-center p-2.5 rounded-none bg-neon-cyan hover:bg-neon-cyan/80 text-background disabled:bg-muted disabled:text-muted-foreground/50 border border-neon-cyan/40 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] transition-colors shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Friendly help footnote */}
            <div className="text-[10px] text-muted-foreground/60 text-center mt-2 flex items-center justify-center gap-1 font-mono">
              <Sparkles className="w-3 h-3 text-neon-cyan" />
              <span>{t('ai.footnote')}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
