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
import { useTranslation } from 'react-i18next'

// ─── helpers ───────────────────────────────────────────────────────────────

function getStepAppearance(
  status: MilestoneUpdateStatus | null,
  milestoneStatus: string,
  t: any
) {
  if (
    milestoneStatus === 'COMPLETED' ||
    milestoneStatus === 'APPROVED' ||
    milestoneStatus === 'WITHDRAWN'
  ) {
    return {
      ring: 'border-neon-cyan bg-neon-cyan/10',
      nodeText: 'text-neon-cyan',
      glow: 'shadow-[0_0_18px_var(--color-neon-cyan)/35]',
      label:
        milestoneStatus === 'WITHDRAWN'
          ? t('detail.withdrawn')
          : t('updates.status.done'),
      labelColor: 'text-neon-cyan bg-neon-cyan/10 border-neon-cyan/30',
      icon: <CheckCircle2 className="w-3 h-3" />
    }
  }
  if (status === 'unlocked') {
    return {
      ring: 'border-neon-purple bg-neon-purple/10',
      nodeText: 'text-neon-purple',
      glow: 'shadow-[0_0_18px_var(--color-neon-purple)/40]',
      label: t('updates.status.progress'),
      labelColor: 'text-neon-purple bg-neon-purple/10 border-neon-purple/30',
      icon: <Zap className="w-3 h-3" />
    }
  }
  if (status === 'late') {
    return {
      ring: 'border-neon-rose bg-neon-rose/10',
      nodeText: 'text-neon-rose',
      glow: 'shadow-[0_0_18px_var(--color-neon-rose)/35]',
      label: t('updates.status.late'),
      labelColor: 'text-neon-rose bg-neon-rose/10 border-neon-rose/30',
      icon: <Clock className="w-3 h-3" />
    }
  }
  if (status === 'finalized') {
    return {
      ring: 'border-neon-cyan/40 bg-neon-cyan/5',
      nodeText: 'text-neon-cyan/60',
      glow: '',
      label: t('updates.status.closed'),
      labelColor: 'text-neon-cyan/60 bg-transparent border-neon-cyan/20',
      icon: <CheckCircle2 className="w-3 h-3" />
    }
  }
  // locked_date | locked_prev | null
  return {
    ring: 'border-border bg-card',
    nodeText: 'text-muted-foreground/45',
    glow: '',
    label: t('updates.status.locked'),
    labelColor: 'text-muted-foreground/45 bg-transparent border-border',
    icon: <Lock className="w-3 h-3" />
  }
}

// ─── Read-only update card (visible to all users) ─────────────────────────
function MilestoneUpdateCard({ update }: { update: MilestoneUpdateRest }) {
  const { t } = useTranslation()
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
    <div className="mt-3 rounded-none border border-border/50 bg-card overflow-hidden">
      {update.isLate && (
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-border/50 bg-neon-rose/5">
          <AlertTriangle className="w-3 h-3 text-neon-rose" />
          <span className="text-[10px] font-semibold text-neon-rose">
            {t('updates.submitted_late')}
          </span>
        </div>
      )}
      <div className="divide-y divide-border/50">
        {update.completed && (
          <div className="flex gap-4 px-5 py-4">
            <CheckCheck className="w-4 h-4 text-success mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-success mb-1.5">
                {t('updates.progress_title')}
              </p>
              <p className="text-[13px] text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {update.completed}
              </p>
            </div>
          </div>
        )}
        {update.blockers && (
          <div className="flex gap-4 px-5 py-4">
            <AlertTriangle className="w-4 h-4 text-warning mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-warning mb-1.5">
                {t('updates.blockers_title')}
              </p>
              <p className="text-[13px] text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {update.blockers}
              </p>
            </div>
          </div>
        )}
        {hasMedia && (
          <div>
            <div className="flex border-b border-border/50">
              {hasImages && (
                <button
                  onClick={() => setMediaTab('images')}
                  className={`flex items-center gap-1.5 px-5 py-2.5 text-[11px] font-semibold transition-colors border-b-2 -mb-px ${mediaTab === 'images' ? 'text-foreground border-neon-cyan' : 'text-muted-foreground/45 border-transparent hover:text-muted-foreground'}`}
                >
                  <ImageIcon className="w-3 h-3" />
                  {t('media.images')}
                  <span className="text-[10px] font-mono opacity-60">
                    ({images.length})
                  </span>
                </button>
              )}
              {hasVideo && (
                <button
                  onClick={() => setMediaTab('video')}
                  className={`flex items-center gap-1.5 px-5 py-2.5 text-[11px] font-semibold transition-colors border-b-2 -mb-px ${mediaTab === 'video' ? 'text-foreground border-neon-cyan' : 'text-muted-foreground/45 border-transparent hover:text-muted-foreground'}`}
                >
                  <Film className="w-3 h-3" />
                  {t('media.video')}
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
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-none bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors border border-white/10"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-none bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors border border-white/10"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImgIdx(i)}
                          className={`w-1.5 h-1.5 rounded-none transition-all ${i === imgIdx ? 'bg-white scale-125' : 'bg-white/40'}`}
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
              className="inline-flex items-center gap-2 text-xs text-neon-cyan/80 hover:text-neon-cyan transition-colors group"
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
  isLast,
  isOwner
}: {
  milestone: MilestoneRest
  updateStatus: MilestoneUpdateStatus | null
  projectId: string
  isLast: boolean
  isOwner: boolean
}) {
  const { t } = useTranslation()
  const [showForm, setShowForm] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false) // inline update viewer

  const canUpdate =
    isOwner && (updateStatus === 'unlocked' || updateStatus === 'late')
  const appearance = getStepAppearance(updateStatus, milestone.status, t)
  const hasExisting = !!milestone.milestoneUpdates

  const startLabel = new Date(milestone.startDate).toLocaleDateString(
    t('common.locale', 'en-US'),
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }
  )
  const endLabel = new Date(milestone.endDate).toLocaleDateString(
    t('common.locale', 'en-US'),
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }
  )

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
      milestone.status === 'COMPLETED' ||
      milestone.status === 'APPROVED' ||
      milestone.status === 'WITHDRAWN'

    if (isDone) return null // đã xong, không cần label
    if (daysToStart > 0)
      return {
        text: t('updates.starts_in', { days: daysToStart }),
        color: 'text-muted-foreground/50'
      }
    if (daysToEnd === 0)
      return {
        text: t('updates.ends_today'),
        color: 'text-neon-rose font-bold'
      }
    if (daysToEnd > 0)
      return {
        text: t('updates.days_left', { days: daysToEnd }),
        color:
          updateStatus === 'unlocked'
            ? 'text-neon-purple'
            : 'text-muted-foreground/50'
      }
    if (daysPastEnd > 0)
      return {
        text: t('updates.days_overdue', { days: daysPastEnd }),
        color: 'text-neon-rose'
      }
    return null
  })()

  return (
    <div className="relative flex gap-0">
      {/* Left rail: node + vertical line */}
      <div className="flex flex-col items-center w-12 shrink-0">
        {/* Node circle */}
        <div
          className={`w-10 h-10 rounded-none flex items-center justify-center border-2 transition-all duration-500 z-10 ${appearance.ring} ${appearance.glow}`}
        >
          <span
            className={`font-['Space_Grotesk'] font-bold text-sm ${appearance.nodeText}`}
          >
            {milestone.order}
          </span>
        </div>
        {/* Connector line */}
        {!isLast && (
          <div className="flex-1 w-px bg-gradient-to-b from-border/60 to-transparent mt-1 min-h-[32px]" />
        )}
      </div>

      {/* Right: content card */}
      <div className="flex-1 min-w-0 pb-10 pl-5">
        {/* Header row */}
        <div className="flex flex-wrap items-start gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-foreground font-['Space_Grotesk'] font-semibold text-[15px] leading-snug">
                {milestone.title}
              </h3>
              {/* Status badge */}
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-none border text-[9px] font-bold uppercase tracking-widest ${appearance.labelColor}`}
              >
                {appearance.icon}
                {appearance.label}
              </span>
              {/* View update pill — inline toggle */}
              {hasExisting && !showForm && (
                <button
                  onClick={() => setShowUpdate((v) => !v)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-none border text-[9px] font-bold uppercase tracking-wider border-neon-cyan/20 text-neon-cyan/60 hover:text-neon-cyan hover:border-neon-cyan/40 transition-colors"
                >
                  <ChevronRight
                    className={`w-2.5 h-2.5 transition-transform duration-150 ${showUpdate ? 'rotate-90' : ''}`}
                  />
                  {showUpdate ? t('updates.hide') : t('updates.view_update')}
                </button>
              )}
            </div>
            <p className="text-muted-foreground/60 text-[11px] mt-1 font-mono flex items-center gap-2 flex-wrap">
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
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-none text-[11px] font-bold uppercase tracking-widest transition-all duration-200 shrink-0 shadow-[2px_2px_0px_var(--neon-purple)] hover:shadow-none
                ${
                  showForm
                    ? 'bg-background border border-border text-muted-foreground/60'
                    : updateStatus === 'late'
                      ? 'bg-neon-rose/10 border border-neon-rose/30 text-neon-rose hover:bg-neon-rose/20 hover:border-neon-rose/50'
                      : 'bg-neon-purple/10 border border-neon-purple/30 text-neon-purple hover:bg-neon-purple/20 hover:border-neon-purple/50'
                }`}
            >
              {showForm ? (
                <>
                  <ChevronRight className="w-3.5 h-3.5" />
                  {t('updates.close')}
                </>
              ) : (
                <>
                  <PenLine className="w-3.5 h-3.5" />
                  {hasExisting ? t('updates.edit_update') : t('updates.update')}
                  {updateStatus === 'late' && (
                    <span className="opacity-70">{t('updates.late_tag')}</span>
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
          <div className="rounded-none bg-background border border-border/60 p-5 mt-3">
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
          <p className="text-muted-foreground/45 text-[11px] flex items-center gap-1.5 font-mono">
            <Lock className="w-3 h-3" />
            {t('updates.complete_prev_first')}
          </p>
        )}
        {!canUpdate && updateStatus === 'locked_date' && (
          <p className="text-muted-foreground/45 text-[11px] flex items-center gap-1.5 font-mono">
            <Clock className="w-3 h-3" />
            {t('updates.starts_on', { date: startLabel })}
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
  const { t } = useTranslation()
  const { milestones } = project
  const isOwner = !!currentUserId && currentUserId === project.userId
  const sorted = milestones
    ? [...milestones].sort((a, b) => a.order - b.order)
    : []

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <div className="w-14 h-14 rounded-none bg-background border border-border/50 flex items-center justify-center">
          <Zap className="w-6 h-6 text-muted-foreground/45" />
        </div>
        <p className="text-muted-foreground text-sm font-['Space_Grotesk'] font-medium">
          {t('updates.no_milestones')}
        </p>
        <p className="text-muted-foreground/60 text-xs">
          {t('updates.no_milestones_desc')}
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60 font-['Space_Grotesk']">
          {t('updates.title')}
        </span>
        <div className="flex-1 h-px bg-border/40" />
        <span className="text-[11px] font-mono text-muted-foreground/45">
          {sorted.length === 1
            ? t('updates.phases_count', { count: sorted.length })
            : t('updates.phases_count_plural', { count: sorted.length })}
        </span>
      </div>

      {!isOwner && (
        <p className="text-muted-foreground/45 text-[11px] mb-8 flex items-center gap-1.5 font-mono">
          <Lock className="w-3 h-3" />
          {t('updates.only_owner_can_submit')}
        </p>
      )}

      {/* Stepper */}
      <div>
        {sorted.map((m, i) => {
          const status = getMilestoneUpdateStatus(m, sorted, project.status)

          return (
            <MilestoneStep
              key={m.id}
              milestone={m}
              updateStatus={status}
              projectId={project.id}
              isLast={i === sorted.length - 1}
              isOwner={isOwner}
            />
          )
        })}
      </div>
    </div>
  )
}
