import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, MessageSquare } from 'lucide-react'
import { useGetProjectReviews, useAddReview } from '@/apis/queries/project'
import { useAuth } from '../providers/AuthProvider'
import { ReviewCard } from './ReviewCard'
import { toast } from 'sonner'

// Avatar color + initial helper (shared logic for the current user avatar)
const AVATAR_COLORS = [
  '#8ff5ff',
  '#ac89ff',
  '#ff6b9d',
  '#ffd93d',
  '#6bcb77',
  '#ff922b',
  '#74c0fc'
]
function getAvatarColor(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i++)
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

interface ProjectReviewsProps {
  projectId: string
  currentUserId?: string | null
  ownerId?: string
  memberUserIds?: string[]
}

export function ProjectReviews({
  projectId,
  currentUserId,
  ownerId,
  memberUserIds = []
}: ProjectReviewsProps) {
  const { data: reviews = [], isLoading } = useGetProjectReviews(projectId)
  const { mutate: addReview, isPending } = useAddReview(projectId)
  const { isAuthenticated } = useAuth()
  const [content, setContent] = useState('')
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || isPending) return
    addReview(
      { content: content.trim() },
      {
        onSuccess: () => {
          setContent('')
          setFocused(false)
        }
      }
    )
  }

  const userColor = currentUserId ? getAvatarColor(currentUserId) : '#8ff5ff'

  return (
    <div className="space-y-6 max-w-3xl">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-2">
        <MessageSquare className="w-5 h-5 text-[#8ff5ff]" />
        <span className="text-base font-bold text-[#ecedf6]">
          {reviews.length > 0
            ? `${reviews.length} Comment${reviews.length > 1 ? 's' : ''}`
            : 'Reviews & Discussions'}
        </span>
      </div>

      {/* ── Composer ────────────────────────────────────────────────── */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="flex gap-3 items-start">
          {/* Current user avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 mt-0.5"
            style={{
              background: `${userColor}22`,
              border: `1.5px solid ${userColor}55`,
              color: userColor
            }}
          >
            {currentUserId
              ? currentUserId[currentUserId.length - 1].toUpperCase()
              : '?'}
          </div>

          <div
            className={`flex-1 flex items-end gap-2 bg-[#161b25] border rounded-2xl px-4 py-3 transition-all duration-200 ${focused ? 'border-[#8ff5ff]/40 shadow-[0_0_0_3px_rgba(143,245,255,0.07)]' : 'border-[#2e323b]'}`}
          >
            <textarea
              rows={focused ? 3 : 1}
              className="flex-1 bg-transparent text-sm text-[#ecedf6] placeholder-[#545760] focus:outline-none resize-none leading-relaxed transition-all duration-200"
              placeholder="Write a comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => !content && setFocused(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e as any)
                }
              }}
            />
            <AnimatePresence>
              {(focused || content) && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  type="submit"
                  disabled={!content.trim() || isPending}
                  className="shrink-0 self-end text-[#8ff5ff] disabled:opacity-30 hover:text-[#a6fcff] transition-colors mb-0.5"
                >
                  {isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </form>
      ) : (
        // ── Unauthenticated: fake input that triggers toast on click ──
        <div
          className="flex items-center gap-3 bg-[#161b25] border border-[#2e323b] rounded-2xl px-4 py-3 cursor-text"
          onClick={() =>
            toast.warning(
              'Please connect your wallet to comment on this project',
              {
                duration: 3000
              }
            )
          }
        >
          <div className="w-9 h-9 rounded-full bg-[#1f2530] border border-[#2e323b] shrink-0" />
          <p className="text-sm text-[#545760] select-none">
            Write a comment...
          </p>
        </div>
      )}

      {/* ── Feed ──────────────────────────────────────────────────────── */}
      <div className="space-y-5">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin text-[#8ff5ff]" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-10 text-[#545760] text-sm">
            No comments yet — be the first to share your thoughts!
          </div>
        ) : (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              projectId={projectId}
              currentUserId={currentUserId}
              ownerId={ownerId}
              memberUserIds={memberUserIds}
            />
          ))
        )}
      </div>
    </div>
  )
}
