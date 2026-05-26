import React, { useState, useEffect, useRef } from 'react'
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
            text: 'Xin chào! Tôi là Trợ Lý Ảo FundHive.\n\nTôi sẵn sàng giải đáp mọi thắc mắc của bạn về quy tắc đầu tư mUSDT, cơ chế hoàn tiền (Refund) khi dự án gọi vốn thất bại, và quy trình giải ngân Milestone an toàn trên nền tảng.\n\nHôm nay bạn cần tôi hỗ trợ thông tin gì?',
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
      label: '⚡ Nạp mUSDT',
      q: 'Đồng mUSDT là gì? Cách lấy mUSDT thử nghiệm để đầu tư?'
    },
    {
      label: '🛡️ Luật Hoàn Tiền',
      q: 'Nếu dự án gọi vốn thất bại thì tiền đầu tư của tôi có được hoàn lại không?'
    },
    {
      label: '📦 Giải ngân Milestone',
      q: 'Cơ chế giải ngân Milestone bảo vệ nhà đầu tư như thế nào?'
    },
    { label: '🌐 FundHive là gì?', q: 'Giới thiệu tổng quan về FundHive' }
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
            text: '⚠️ Không thể kết nối với máy chủ AI. Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau.'
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
    if (
      window.confirm('Bạn có chắc chắn muốn làm mới cuộc hội thoại này không?')
    ) {
      sessionStorage.removeItem('fundhive_chat')
      const defaultGreeting: Message = {
        sender: 'ai',
        text: 'Lịch sử cuộc trò chuyện đã được làm mới. Tôi sẵn sàng hỗ trợ những câu hỏi tiếp theo của bạn!',
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
          const [title, slug, img, status, raised, goal] = content
            .split('|')
            .map((x) => x.trim())

          return (
            <div
              key={`proj-${index}`}
              className="my-3 p-3 bg-slate-900 border border-slate-800 hover:border-cyan-500/30 rounded-xl flex items-center gap-3 transition-all duration-300 shadow-lg"
            >
              {img && img !== 'null' && img !== 'undefined' && img !== '' ? (
                <img
                  src={img}
                  alt={title}
                  className="w-14 h-14 object-cover rounded-lg bg-slate-850 shrink-0 border border-slate-700/50"
                />
              ) : (
                <div className="w-14 h-14 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 border border-slate-700/50">
                  <Bot className="w-6 h-6 text-slate-500" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">
                  {title}
                </h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className={`px-1.5 py-0.2 rounded text-[8px] font-semibold tracking-wider ${
                      status === 'PROGRESS' ||
                      status === 'ACTIVE' ||
                      status === 'SUCCESS'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}
                  >
                    {status}
                  </span>
                </div>
                {raised && goal && !isNaN(parseFloat(raised)) && (
                  <div className="mt-1">
                    <div className="w-full bg-slate-800 rounded-full h-1">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1 rounded-full"
                        style={{
                          width: `${Math.min(100, (parseFloat(raised) / parseFloat(goal)) * 100)}%`
                        }}
                      ></div>
                    </div>
                    <p className="text-[9px] text-slate-400 mt-1 font-mono">
                      Đã gọi:{' '}
                      <span className="text-cyan-400 font-semibold">
                        {raised}
                      </span>{' '}
                      / {goal} mUSDT
                    </p>
                  </div>
                )}
              </div>
              <a
                href={`/projects/${slug}`}
                className="px-2.5 py-1.5 text-[10px] bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg transition-colors shrink-0 flex items-center gap-1 shadow-sm"
              >
                Xem
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          )
        } catch (e) {
          return (
            <span key={index} className="text-rose-400">
              [Lỗi hiển thị dự án]
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
              toast.success('Đã sao chép địa chỉ ví thành công!')
            }}
            className="inline-flex items-center gap-1 px-1.5 py-0.5 mx-1 rounded bg-slate-900 border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400 font-mono text-[11px] cursor-pointer hover:bg-slate-850 transition-all duration-200"
            title="Nhấp để sao chép địa chỉ ví"
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
            className="inline-flex items-center gap-1 px-1.5 py-0.5 mx-1 rounded bg-slate-900 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 font-mono text-[11px] hover:bg-slate-850 transition-all duration-200"
            title="Xem biên lai trên Etherscan Sepolia Explorer"
          >
            <ExternalLink className="w-3 h-3" />
            Tx:{' '}
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
              className="my-2 border border-slate-800 rounded-lg overflow-hidden bg-slate-900 shadow-sm"
            >
              <img
                src={url}
                alt={caption}
                className="w-full max-h-40 object-cover"
              />
              <p className="text-[10px] text-slate-400 p-1.5 text-center italic bg-slate-950/20">
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
              className="pl-4 py-0.5 flex items-start gap-1.5 text-slate-200 text-sm"
            >
              <span className="text-cyan-400 mt-2 shrink-0 w-1 h-1 rounded-full bg-cyan-400"></span>
              <span className="leading-relaxed">{listText}</span>
            </div>
          )
        }

        return (
          <p
            key={`line-${index}-${lineIdx}`}
            className="leading-relaxed mb-1 text-slate-200 text-sm"
          >
            {cleanLine}
          </p>
        )
      })
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans select-none">
      {/* NÚT FLOAT TOGGLE CHAT WIDGET - Smooth Friendly Glow */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:bg-slate-850 transition-all duration-300 shadow-xl hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] animate-bounce"
          style={{ animationDuration: '3s' }}
          title="Trợ lý ảo AI"
        >
          {/* Active Status Ring */}
          <span className="absolute top-0.5 right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>

          <Bot className="w-6.5 h-6.5 group-hover:scale-105 transition-transform duration-200" />
        </button>
      )}

      {/* CỬA SỔ HỘI THOẠI WIDGET */}
      {isOpen && (
        <div className="flex flex-col w-96 max-w-[calc(100vw-2rem)] h-[550px] max-h-[85vh] rounded-2xl border border-slate-850 bg-slate-950/98 shadow-2xl overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95">
          {/* HEADER CHAT - Clean & Elegant */}
          <div className="relative flex items-center justify-between px-4 py-3.5 bg-slate-900 border-b border-slate-850">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white tracking-wide">
                    Trợ Lý Ảo FundHive
                  </span>
                  <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <span className="text-[9px] text-slate-400 flex items-center gap-1 mt-0.5">
                  {isLoggedIn ? (
                    <>
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                      <span>Thành viên ({userWallet})</span>
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                      <span>Chế độ khách vãng lai</span>
                    </>
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleClearHistory}
                className="p-2 rounded-lg bg-slate-850 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                title="Làm mới lịch sử chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg bg-slate-850 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* VÙNG CHỨA TIN NHẮN (MESSAGE CONTAINER) */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/10 scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-250`}
              >
                <div
                  className={`flex gap-2 max-w-[85%] ${
                    msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Avatar Icon */}
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-full shrink-0 border ${
                      msg.sender === 'user'
                        ? 'bg-cyan-950/20 border-cyan-800/40 text-cyan-400'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {msg.sender === 'user' ? (
                      <User className="w-3.5 h-3.5" />
                    ) : (
                      <Bot className="w-3.5 h-3.5" />
                    )}
                  </div>

                  {/* Message Balloon */}
                  <div
                    className={`px-3 py-2.5 rounded-2xl shadow-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-cyan-600/90 text-white rounded-tr-sm'
                        : 'bg-slate-900/95 text-slate-200 border border-slate-850/80 rounded-tl-sm'
                    }`}
                  >
                    {/* Bouncing typing dots if streaming empty response */}
                    {msg.text === '' && msg.sender === 'ai' && isStreaming ? (
                      <div className="flex gap-1 items-center py-2 px-1 justify-start">
                        <span
                          className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                          style={{ animationDelay: '0ms' }}
                        ></span>
                        <span
                          className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
                          style={{ animationDelay: '150ms' }}
                        ></span>
                        <span
                          className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"
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
                        <span className="inline-block w-1.5 h-3 bg-cyan-400 animate-pulse ml-1">
                          ▋
                        </span>
                      )}

                    <div
                      className={`text-[8px] mt-1.5 text-right opacity-50 ${
                        msg.sender === 'user' ? 'text-white' : 'text-slate-400'
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
            <div className="px-4 pb-3 border-t border-slate-900 pt-3">
              <span className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-500" />
                Câu hỏi gợi ý:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {quickFaqs.map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(faq.q)}
                    className="px-2.5 py-2 text-left text-[11px] bg-slate-900 border border-slate-800 hover:border-cyan-500/30 hover:bg-slate-850 rounded-lg text-slate-300 hover:text-white transition-all duration-200 line-clamp-1 truncate"
                  >
                    {faq.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* KHU VỰC NHẬP TIN NHẮN (INPUT BAR) */}
          <div className="p-3 bg-slate-900 border-t border-slate-850">
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
                    isStreaming
                      ? 'Trợ lý đang suy nghĩ...'
                      : 'Hỏi Trợ Lý FundHive...'
                  }
                  className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 text-white placeholder-slate-500 text-xs rounded-xl pl-3 pr-8 py-2.5 outline-none transition-colors"
                />
                <Sparkles className="absolute right-2.5 top-2.5 w-3.5 h-3.5 text-slate-600" />
              </div>
              <button
                type="submit"
                disabled={isStreaming || !inputMessage.trim()}
                className="flex items-center justify-center p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white disabled:bg-slate-900 disabled:text-slate-600 border border-cyan-500/10 disabled:border-slate-850 transition-colors shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Friendly help footnote */}
            <div className="text-[10px] text-slate-500 text-center mt-2 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-500" />
              <span>Hỗ trợ giải đáp thông tin FundHive trực tuyến</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
