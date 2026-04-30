import { useState } from 'react'
import {
  CheckCircle2,
  Lock,
  Clock,
  Zap,
  PenLine,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  ImageIcon,
  AlertTriangle,
  CheckCheck,
  Film
} from 'lucide-react'
import type {
  ProjectDetail,
  MilestoneRest,
  MilestoneUpdateRest
} from '@/schemas/projectSchema'
import {
  getMilestoneUpdateStatus,
  type MilestoneUpdateStatus
} from '@/hooks/useMilestoneEligibility'
import { MilestoneUpdateForm } from './MilestoneUpdateForm'

// ─── helpers ───────────────────────────────────────────────────────────────

function getStepAppearance(
  status: MilestoneUpdateStatus | null,
  milestoneStatus: string
) {
  if (milestoneStatus === 'COMPLETED' || milestoneStatus === 'APPROVED') {
    return {
      ring: 'border-[#8ff5ff] bg-[#8ff5ff]/10',
      nodeText: 'text-[#8ff5ff]',
      glow: 'shadow-[0_0_18px_rgba(143,245,255,0.35)]',
      label: 'DONE',
      labelColor: 'text-[#8ff5ff] bg-[#8ff5ff]/10 border-[#8ff5ff]/30',
      icon: <CheckCircle2 className="w-3 h-3" />
    }
  }
  if (status === 'unlocked') {
    return {
      ring: 'border-[#ac89ff] bg-[#ac89ff]/10',
      nodeText: 'text-[#ac89ff]',
      glow: 'shadow-[0_0_18px_rgba(172,137,255,0.4)]',
      label: 'ACTIVE',
      labelColor: 'text-[#ac89ff] bg-[#ac89ff]/10 border-[#ac89ff]/30',
      icon: <Zap className="w-3 h-3" />
    }
  }
  if (status === 'late') {
    return {
      ring: 'border-[#ff716c] bg-[#ff716c]/10',
      nodeText: 'text-[#ff716c]',
      glow: 'shadow-[0_0_18px_rgba(255,113,108,0.35)]',
      label: 'LATE',
      labelColor: 'text-[#ff716c] bg-[#ff716c]/10 border-[#ff716c]/30',
      icon: <Clock className="w-3 h-3" />
    }
  }
  if (status === 'finalized') {
    return {
      ring: 'border-[#8ff5ff]/40 bg-[#8ff5ff]/5',
      nodeText: 'text-[#8ff5ff]/60',
      glow: '',
      label: 'CLOSED',
      labelColor: 'text-[#8ff5ff]/60 bg-transparent border-[#8ff5ff]/20',
      icon: <CheckCircle2 className="w-3 h-3" />
    }
  }
  // locked_date | locked_prev | null
  return {
    ring: 'border-[#2e323b] bg-[#161a21]',
    nodeText: 'text-[#3a3e4a]',
    glow: '',
    label: 'LOCKED',
    labelColor: 'text-[#3a3e4a] bg-transparent border-[#2e323b]',
    icon: <Lock className="w-3 h-3" />
  }
}

// ─── Read-only update card (visible to all users) ─────────────────────────
function MilestoneUpdateCard({ update }: { update: MilestoneUpdateRest }) {
  const hasImages = !!(update.images && update.images.length > 0)
  const hasVideo = !!update.video
  const hasMedia = hasImages || hasVideo

  const [mediaTab, setMediaTab] = useState<'images' | 'video'>(
    hasImages ? 'images' : 'video'
  )
  const [imgIdx, setImgIdx] = useState(0)
  const images = update.images || []

  const prev = () => setImgIdx((i) => (i - 1 + images.length) % images.length)
  const next = () => setImgIdx((i) => (i + 1) % images.length)

  return (
    <div className="mt-3 rounded-xl border border-[#1e2330] bg-[#0c0f16] overflow-hidden">
      {update.isLate && (
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#181c27] bg-[#ff716c]/5">
          <AlertTriangle className="w-3 h-3 text-[#ff716c]" />
          <span className="text-[10px] font-semibold text-[#ff716c]">
            Submitted late
          </span>
        </div>
      )}
      <div className="divide-y divide-[#181c27]">
        {update.completed && (
          <div className="flex gap-4 px-5 py-4">
            <CheckCheck className="w-4 h-4 text-[#6bcb77] mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#6bcb77] mb-1.5">
                Progress
              </p>
              <p className="text-[13px] text-[#bbbdca] leading-relaxed whitespace-pre-wrap">
                {update.completed}
              </p>
            </div>
          </div>
        )}
        {update.blockers && (
          <div className="flex gap-4 px-5 py-4">
            <AlertTriangle className="w-4 h-4 text-[#e8a838] mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#e8a838] mb-1.5">
                Blockers
              </p>
              <p className="text-[13px] text-[#bbbdca] leading-relaxed whitespace-pre-wrap">
                {update.blockers}
              </p>
            </div>
          </div>
        )}
        {hasMedia && (
          <div>
            <div className="flex border-b border-[#181c27]">
              {hasImages && (
                <button
                  onClick={() => setMediaTab('images')}
                  className={`flex items-center gap-1.5 px-5 py-2.5 text-[11px] font-semibold transition-colors border-b-2 -mb-px ${mediaTab === 'images' ? 'text-[#ecedf6] border-[#8ff5ff]' : 'text-[#545760] border-transparent hover:text-[#a9abb3]'}`}
                >
                  <ImageIcon className="w-3 h-3" />
                  Images
                  <span className="text-[10px] font-mono opacity-60">
                    ({images.length})
                  </span>
                </button>
              )}
              {hasVideo && (
                <button
                  onClick={() => setMediaTab('video')}
                  className={`flex items-center gap-1.5 px-5 py-2.5 text-[11px] font-semibold transition-colors border-b-2 -mb-px ${mediaTab === 'video' ? 'text-[#ecedf6] border-[#8ff5ff]' : 'text-[#545760] border-transparent hover:text-[#a9abb3]'}`}
                >
                  <Film className="w-3 h-3" />
                  Video
                </button>
              )}
            </div>
            {mediaTab === 'images' && hasImages && (
              <div className="relative bg-black">
                <a
                  href={images[imgIdx]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    key={imgIdx}
                    src={images[imgIdx]}
                    alt={`Attachment ${imgIdx + 1}`}
                    className="w-full h-52 object-cover"
                  />
                </a>
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImgIdx(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? 'bg-white scale-125' : 'bg-white/40'}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
            {mediaTab === 'video' && hasVideo && (
              <video
                src={update.video}
                controls
                className="w-full max-h-52 bg-black"
              />
            )}
          </div>
        )}
        {update.link && (
          <div className="px-5 py-3.5">
            <a
              href={update.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs text-[#8ff5ff]/80 hover:text-[#8ff5ff] transition-colors group"
            >
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              <span className="truncate max-w-xs underline underline-offset-2 decoration-dashed">
                {update.link}
              </span>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── single step ───────────────────────────────────────────────────────────

function MilestoneStep({
  milestone,
  updateStatus,
  projectId,
  isLast
}: {
  milestone: MilestoneRest
  updateStatus: MilestoneUpdateStatus | null
  projectId: string
  isLast: boolean
}) {
  const [showForm, setShowForm] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false) // inline update viewer

  const canUpdate = updateStatus === 'unlocked' || updateStatus === 'late'
  const appearance = getStepAppearance(updateStatus, milestone.status)
  const hasExisting = !!milestone.milestoneUpdates

  const startLabel = new Date(milestone.startDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  const endLabel = new Date(milestone.endDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  // Relative time label — shows where "today" sits relative to this milestone
  const relativeLabel = (() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    const start = new Date(milestone.startDate)
    start.setHours(0, 0, 0, 0)
    const end = new Date(milestone.endDate)
    end.setHours(23, 59, 59, 999)

    const msDay = 86_400_000
    const daysToStart = Math.ceil((start.getTime() - now.getTime()) / msDay)
    const daysToEnd = Math.ceil((end.getTime() - now.getTime()) / msDay)
    const daysPastEnd = Math.ceil((now.getTime() - end.getTime()) / msDay)

    const isDone =
      milestone.status === 'COMPLETED' || milestone.status === 'APPROVED'

    if (isDone) return null // đã xong, không cần label
    if (daysToStart > 0)
      return { text: `starts in ${daysToStart}d`, color: 'text-[#4a4e5a]' }
    if (daysToEnd === 0)
      return { text: 'ends today', color: 'text-[#ff716c] font-bold' }
    if (daysToEnd > 0)
      return {
        text: `${daysToEnd}d left`,
        color: updateStatus === 'unlocked' ? 'text-[#ac89ff]' : 'text-[#4a4e5a]'
      }
    if (daysPastEnd > 0)
      return { text: `${daysPastEnd}d overdue`, color: 'text-[#ff716c]' }
    return null
  })()

  return (
    <div className="relative flex gap-0">
      {/* Left rail: node + vertical line */}
      <div className="flex flex-col items-center w-12 shrink-0">
        {/* Node circle */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10 ${appearance.ring} ${appearance.glow}`}
        >
          <span
            className={`font-['Space_Grotesk'] font-bold text-sm ${appearance.nodeText}`}
          >
            {milestone.order}
          </span>
        </div>
        {/* Connector line */}
        {!isLast && (
          <div className="flex-1 w-px bg-gradient-to-b from-[#2e323b]/60 to-transparent mt-1 min-h-[32px]" />
        )}
      </div>

      {/* Right: content card */}
      <div className="flex-1 min-w-0 pb-10 pl-5">
        {/* Header row */}
        <div className="flex flex-wrap items-start gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-[#ecedf6] font-['Space_Grotesk'] font-semibold text-[15px] leading-snug">
                {milestone.title}
              </h3>
              {/* Status badge */}
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-widest ${appearance.labelColor}`}
              >
                {appearance.icon}
                {appearance.label}
              </span>
              {/* View update pill — inline toggle */}
              {hasExisting && !showForm && (
                <button
                  onClick={() => setShowUpdate((v) => !v)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider border-[#8ff5ff]/20 text-[#8ff5ff]/60 hover:text-[#8ff5ff] hover:border-[#8ff5ff]/40 transition-colors"
                >
                  <ChevronRight
                    className={`w-2.5 h-2.5 transition-transform duration-150 ${showUpdate ? 'rotate-90' : ''}`}
                  />
                  {showUpdate ? 'Hide' : 'View update'}
                </button>
              )}
            </div>
            <p className="text-[#73757d] text-[11px] mt-1 font-mono flex items-center gap-2 flex-wrap">
              {startLabel} → {endLabel}
              {relativeLabel && (
                <span
                  className={`text-[10px] font-bold not-italic ${relativeLabel.color}`}
                >
                  · {relativeLabel.text}
                </span>
              )}
            </p>
          </div>

          {/* Update button — only for eligible steps */}
          {canUpdate && (
            <button
              onClick={() => setShowForm((v) => !v)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-200 shrink-0
                ${
                  showForm
                    ? 'bg-[#22262f] border border-[#2e323b] text-[#73757d]'
                    : updateStatus === 'late'
                      ? 'bg-[#ff716c]/10 border border-[#ff716c]/30 text-[#ff716c] hover:bg-[#ff716c]/20 hover:border-[#ff716c]/50'
                      : 'bg-[#ac89ff]/10 border border-[#ac89ff]/30 text-[#ac89ff] hover:bg-[#ac89ff]/20 hover:border-[#ac89ff]/50'
                }`}
            >
              {showForm ? (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  Close
                </>
              ) : (
                <>
                  <PenLine className="w-3.5 h-3.5" />
                  {hasExisting ? 'Edit Update' : 'Update'}
                  {updateStatus === 'late' && (
                    <span className="opacity-70">(Late)</span>
                  )}
                </>
              )}
            </button>
          )}
        </div>

        {/* ── Inline update viewer — visible to ALL users when update exists ── */}
        {hasExisting && showUpdate && !showForm && (
          <MilestoneUpdateCard update={milestone.milestoneUpdates!} />
        )}

        {/* Inline form — chỉ show khi owner click nút Update/Edit */}
        {showForm && (
          <div className="rounded-2xl bg-[#161a21] border border-[#2e323b]/60 p-5 mt-3">
            <MilestoneUpdateForm
              projectId={projectId}
              milestoneId={milestone.id}
              isLate={updateStatus === 'late'}
              existingUpdate={milestone.milestoneUpdates}
              onClose={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Locked hint */}
        {!canUpdate && updateStatus === 'locked_prev' && (
          <p className="text-[#3a3e4a] text-[11px] flex items-center gap-1.5">
            <Lock className="w-3 h-3" />
            Complete previous milestone first
          </p>
        )}
        {!canUpdate && updateStatus === 'locked_date' && (
          <p className="text-[#3a3e4a] text-[11px] flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            Starts {startLabel}
          </p>
        )}
      </div>
    </div>
  )
}

// ─── main component ────────────────────────────────────────────────────────

export function ProjectUpdates({
  project,
  currentUserId
}: {
  project: ProjectDetail
  currentUserId: string | null
}) {
  const { milestones } = project
  const isOwner = !!currentUserId && currentUserId === project.userId
  const sorted = milestones
    ? [...milestones].sort((a, b) => a.order - b.order)
    : []

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <div className="w-14 h-14 rounded-full bg-[#161a21] border border-[#2e323b]/50 flex items-center justify-center">
          <Zap className="w-6 h-6 text-[#3a3e4a]" />
        </div>
        <p className="text-[#a9abb3] text-sm font-['Space_Grotesk'] font-medium">
          No milestones defined
        </p>
        <p className="text-[#73757d] text-xs">
          Milestones are set when the project is created.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#73757d] font-['Space_Grotesk']">
          Progress Updates
        </span>
        <div className="flex-1 h-px bg-[#2e323b]/40" />
        <span className="text-[11px] font-mono text-[#3a3e4a]">
          {sorted.length} {sorted.length === 1 ? 'phase' : 'phases'}
        </span>
      </div>

      {!isOwner && (
        <p className="text-[#3a3e4a] text-[11px] mb-8 flex items-center gap-1.5">
          <Lock className="w-3 h-3" />
          Only the project owner can submit progress updates.
        </p>
      )}

      {/* Stepper */}
      <div>
        {sorted.map((m, i) => {
          const status = isOwner
            ? getMilestoneUpdateStatus(m, sorted, project.status)
            : null

          return (
            <MilestoneStep
              key={m.id}
              milestone={m}
              updateStatus={status}
              projectId={project.id}
              isLast={i === sorted.length - 1}
            />
          )
        })}
      </div>
    </div>
  )
}
