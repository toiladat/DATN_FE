import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MoreHorizontal,
  Edit2,
  Trash2,
  Loader2,
  Send,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import type { Review } from '@/schemas/projectSchema'
import {
  useAddReview,
  useUpdateReview,
  useDeleteReview
} from '@/apis/queries/project'
import { formatDistanceToNow } from 'date-fns'

// ─── Avatar with colored initials fallback ────────────────────────────────────
const AVATAR_COLORS = [
  '#8ff5ff',
  '#ac89ff',
  '#ff6b9d',
  '#ffd93d',
  '#6bcb77',
  '#ff922b',
  '#74c0fc'
]
function getAvatarColor(userId: string) {
  let hash = 0
  for (let i = 0; i < userId.length; i++)
    hash = userId.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}
function getInitial(name?: string | null, walletAddress?: string) {
  if (name) return name[0].toUpperCase()
  if (walletAddress) return walletAddress[2].toUpperCase()
  return '?'
}

interface AvatarProps {
  user?: Review['user']
  size?: 'sm' | 'md'
}
function Avatar({ user, size = 'md' }: AvatarProps) {
  const sz = size === 'sm' ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm'
  const color = getAvatarColor(user?.id || 'anon')
  if (user?.avatar) {
    return (
      <img
        src={user.avatar}
        alt=""
        className={`${sz} rounded-full object-cover shrink-0`}
      />
    )
  }
  return (
    <div
      className={`${sz} rounded-full flex items-center justify-center font-bold shrink-0`}
      style={{
        background: `${color}22`,
        border: `1.5px solid ${color}55`,
        color
      }}
    >
      {getInitial(user?.name, user?.walletAddress)}
    </div>
  )
}

// ─── Truncated content with show more/less ────────────────────────────────────
const MAX_LINES = 4
function CollapsibleContent({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [clamped, setClamped] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    setClamped(ref.current.scrollHeight > ref.current.clientHeight + 2)
  }, [text])

  return (
    <div>
      <p
        ref={ref}
        className={`text-[#d4d5dc] text-sm leading-relaxed whitespace-pre-wrap ${!expanded ? 'line-clamp-4' : ''}`}
      >
        {text}
      </p>
      {(clamped || expanded) && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 text-xs font-semibold text-[#8ff5ff] hover:underline flex items-center gap-0.5"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-3 h-3" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3" />
              See more
            </>
          )}
        </button>
      )}
    </div>
  )
}

// ─── Main ReviewCard ─────────────────────────────────────────────────────────
interface ReviewCardProps {
  review: Review
  projectId: string
  currentUserId?: string | null
  ownerId?: string
  memberUserIds?: string[]
  isReply?: boolean
}

const REPLIES_PREVIEW = 2

export function ReviewCard({
  review,
  projectId,
  currentUserId,
  ownerId,
  memberUserIds = [],
  isReply = false
}: ReviewCardProps) {
  // ─── Role detection ──────────────────────────────────────────────────────
  const isProjectOwner = !!ownerId && review.userId === ownerId
  const isProjectMember =
    !isProjectOwner && memberUserIds.includes(review.userId)

  const isOwner = currentUserId === review.userId
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [editContent, setEditContent] = useState(review.content)
  const [showAllReplies, setShowAllReplies] = useState(false)

  const { mutate: addReply, isPending: isAddingReply } = useAddReview(projectId)
  const { mutate: updateReview, isPending: isUpdating } =
    useUpdateReview(projectId)
  const { mutate: deleteReview, isPending: isDeleting } =
    useDeleteReview(projectId)

  const displayName =
    review.user?.name ||
    (review.user?.walletAddress
      ? `${review.user.walletAddress.slice(0, 6)}...${review.user.walletAddress.slice(-4)}`
      : 'Anonymous')

  const replies = review.replies || []
  const visibleReplies = showAllReplies
    ? replies
    : replies.slice(0, REPLIES_PREVIEW)
  const hiddenCount = replies.length - REPLIES_PREVIEW

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyContent.trim() || isAddingReply) return
    addReply(
      { content: replyContent.trim(), parentId: review.id },
      {
        onSuccess: () => {
          setReplyContent('')
          setIsReplying(false)
        }
      }
    )
  }

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editContent.trim() || isUpdating) return
    updateReview(
      { reviewId: review.id, content: editContent.trim() },
      { onSuccess: () => setIsEditing(false) }
    )
  }

  const handleDelete = () => {
    if (window.confirm('Delete this comment? Replies will also be removed.'))
      deleteReview(review.id)
  }

  return (
    <div className={`flex gap-3 ${isReply ? 'mt-3' : ''}`}>
      <Avatar user={review.user} size={isReply ? 'sm' : 'md'} />

      <div className="flex-1 min-w-0">
        {/* Bubble */}
        <div className="relative">
          <div
            className={`inline-block w-full bg-[#161b25] rounded-2xl px-4 py-3 ${isReply ? 'rounded-tl-sm' : 'rounded-tl-sm'}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[#ecedf6] text-sm font-semibold leading-none">
                  {displayName}
                </span>

                {/* Role badges */}
                {isProjectOwner && (
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                    style={{
                      background: 'rgba(255,210,63,0.12)',
                      color: '#ffd23f',
                      border: '1px solid rgba(255,210,63,0.3)'
                    }}
                  >
                    ⚡ Owner
                  </span>
                )}
                {isProjectMember && (
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                    style={{
                      background: 'rgba(172,137,255,0.12)',
                      color: '#ac89ff',
                      border: '1px solid rgba(172,137,255,0.3)'
                    }}
                  >
                    🔧 Team
                  </span>
                )}

                <span className="text-[#545760] text-xs">
                  {formatDistanceToNow(review.createdAt, { addSuffix: true })}
                </span>
              </div>

              {/* Owner menu */}
              {isOwner && !isEditing && (
                <div className="relative shrink-0">
                  <button
                    onClick={() => setShowMenu((v) => !v)}
                    className="p-1 rounded-full text-[#545760] hover:text-[#a9abb3] hover:bg-[#1f2530] transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {showMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: -4 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: -4 }}
                        transition={{ duration: 0.12 }}
                        className="absolute right-0 top-full mt-1 w-28 bg-[#1a1f2e] border border-[#2e323b] rounded-xl shadow-2xl z-20 py-1 overflow-hidden"
                      >
                        <button
                          onClick={() => {
                            setIsEditing(true)
                            setShowMenu(false)
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#ecedf6] hover:bg-[#252b3a] transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-[#8ff5ff]" /> Edit
                        </button>
                        <button
                          onClick={() => {
                            handleDelete()
                            setShowMenu(false)
                          }}
                          disabled={isDeleting}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#ff5577] hover:bg-[#252b3a] transition-colors disabled:opacity-50"
                        >
                          {isDeleting ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                          Delete
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Content */}
            {isEditing ? (
              <form onSubmit={handleEditSubmit}>
                <textarea
                  className="w-full bg-transparent text-sm text-[#ecedf6] placeholder-[#545760] focus:outline-none resize-none border-b border-[#2e323b] pb-2 mb-2"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  autoFocus
                  rows={3}
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false)
                      setEditContent(review.content)
                    }}
                    className="text-xs text-[#a9abb3] hover:text-[#ecedf6] transition-colors px-2 py-1 rounded-lg hover:bg-[#252b3a]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      !editContent.trim() ||
                      editContent === review.content ||
                      isUpdating
                    }
                    className="text-xs bg-[#8ff5ff] text-[#0a0c10] px-3 py-1 rounded-lg font-bold disabled:opacity-40 hover:bg-[#a6fcff] transition-colors"
                  >
                    {isUpdating ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      'Save'
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <CollapsibleContent text={review.content} />
            )}
          </div>
        </div>

        {/* Action row */}
        {!isEditing && (
          <div className="flex items-center gap-4 mt-1.5 px-1">
            {!isReply && (
              <button
                onClick={() => setIsReplying((v) => !v)}
                className="text-xs font-semibold text-[#8ff5ff] hover:underline transition-colors"
              >
                Reply
              </button>
            )}
          </div>
        )}

        {/* Inline reply input */}
        <AnimatePresence>
          {isReplying && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleReplySubmit}
              className="flex gap-2 mt-3 overflow-hidden"
            >
              <Avatar user={undefined} size="sm" />
              <div className="flex-1 flex items-center bg-[#1a1f2e] border border-[#2e323b] rounded-2xl px-3 py-2 gap-2 focus-within:border-[#8ff5ff]/50 transition-colors">
                <input
                  autoFocus
                  type="text"
                  className="flex-1 bg-transparent text-sm text-[#ecedf6] placeholder-[#545760] focus:outline-none"
                  placeholder={`Reply to ${displayName}...`}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!replyContent.trim() || isAddingReply}
                  className="shrink-0 text-[#8ff5ff] disabled:opacity-30 hover:text-[#a6fcff] transition-colors"
                >
                  {isAddingReply ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Replies */}
        {replies.length > 0 && (
          <div className="mt-3 ml-2 border-l-2 border-[#2e323b]/40 pl-3 space-y-1">
            {visibleReplies.map((reply) => (
              <ReviewCard
                key={reply.id}
                review={reply}
                projectId={projectId}
                currentUserId={currentUserId}
                ownerId={ownerId}
                memberUserIds={memberUserIds}
                isReply={true}
              />
            ))}
            {!showAllReplies && hiddenCount > 0 && (
              <button
                onClick={() => setShowAllReplies(true)}
                className="flex items-center gap-1 text-xs font-semibold text-[#8ff5ff] hover:underline mt-2 ml-1"
              >
                <ChevronDown className="w-3.5 h-3.5" />
                View {hiddenCount} more{' '}
                {hiddenCount === 1 ? 'reply' : 'replies'}
              </button>
            )}
            {showAllReplies && replies.length > REPLIES_PREVIEW && (
              <button
                onClick={() => setShowAllReplies(false)}
                className="flex items-center gap-1 text-xs font-semibold text-[#545760] hover:text-[#a9abb3] hover:underline mt-2 ml-1"
              >
                <ChevronUp className="w-3.5 h-3.5" />
                Show less
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
