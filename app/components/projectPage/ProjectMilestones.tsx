import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ShieldCheck,
  Calendar,
  DollarSign,
  ExternalLink,
  Lightbulb,
  AlertTriangle,
  Target,
  Play,
  ChevronDown,
  Banknote,
  Clock,
  CheckCircle2
} from 'lucide-react'
import type { ProjectDetail } from '@/schemas/projectSchema'
import { ImageSlider } from '@/components/ui/ImageSlider'
import { WithdrawMilestoneModal } from './WithdrawMilestoneModal'

export function ProjectMilestones({
  project,
  isOwner = false
}: {
  project: ProjectDetail
  isOwner?: boolean
}) {
  const { t } = useTranslation()

  const getMilestoneStatusLabel = (status: string) => {
    switch (status) {
      case 'WITHDRAWN':
        return `✓ ${t('detail.withdrawn')}`
      case 'COMPLETED':
        return t('detail.completed')
      case 'PROGRESS':
        return t('status.in_progress')
      case 'APPROVED':
        return t('status.approved')
      case 'PENDING':
        return t('status.pending')
      default:
        return status
    }
  }

  const { milestones } = project
  const [expandedId, setExpandedId] = useState<string | null>(
    milestones?.[0]?.id || null
  )

  if (!milestones || milestones.length === 0) {
    return (
      <div className="lg:col-span-12 p-8 text-center text-muted-foreground/60 border border-border rounded-none bg-background">
        {t('milestones.empty')}
      </div>
    )
  }

  const sortedMilestones = [...milestones].sort((a, b) => a.order - b.order)

  return (
    <div className="lg:col-span-12 space-y-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-6 h-1 bg-neon-cyan rounded-none shadow-[0_0_10px_var(--color-neon-cyan)]" />
        <h3 className="text-2xl md:text-3xl font-['Space_Grotesk'] font-bold text-foreground">
          {t('detail.roadmap_milestones')}
        </h3>
      </div>

      <div className="relative flex flex-col gap-8 before:absolute before:inset-y-0 before:left-[19px] before:w-[2px] before:bg-gradient-to-b before:from-border before:via-border/50 before:to-transparent">
        {sortedMilestones.map((m) => {
          const isActiveOrDone =
            (project.status === 'active' || project.status === 'success') &&
            ['COMPLETED', 'PROGRESS', 'APPROVED', 'WITHDRAWN'].includes(
              m.status
            )
          const isExpanded = expandedId === m.id

          const mediaItems = []
          if (m.video) mediaItems.push({ type: 'video' as const, url: m.video })
          if (m.images && m.images.length > 0) {
            m.images.forEach((img) =>
              mediaItems.push({ type: 'image' as const, url: img })
            )
          }

          return (
            <div key={m.id} className="relative flex gap-4 md:gap-6 group">
              {/* Timeline Node */}
              <div
                className={`w-10 h-10 rounded-none flex items-center justify-center shrink-0 z-10 border-[3px] border-background transition-all duration-500 ease-out
                ${
                  isActiveOrDone
                    ? 'bg-neon-cyan text-background shadow-[0_0_20px_var(--color-neon-cyan)/60]'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <span className="font-['Space_Grotesk'] font-bold text-sm">
                  {m.order}
                </span>
              </div>

              {/* Content Card */}
              <div className="flex-1 min-w-0">
                <div
                  className={`rounded-none border transition-all duration-500 ease-out overflow-hidden
                    ${isExpanded ? 'bg-card border-neon-cyan/40 shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]' : 'bg-surface-container-low border-border/30 hover:border-neon-cyan/20 hover:bg-card/50'}`}
                >
                  {/* Header (Always visible) */}
                  <div
                    className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : m.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4
                          className={`text-xl font-['Space_Grotesk'] font-bold transition-colors duration-300 ${isActiveOrDone ? 'text-neon-cyan' : 'text-foreground'}`}
                        >
                          {m.title}
                        </h4>
                        {(project.status === 'active' ||
                          project.status === 'success') && (
                          <span
                            className={`px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-none border 
                            ${
                              m.status === 'WITHDRAWN'
                                ? 'bg-neon-purple/10 text-neon-purple border-neon-purple/30'
                                : isActiveOrDone
                                  ? 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30'
                                  : 'bg-muted text-muted-foreground border-border/30'
                            }`}
                          >
                            {getMilestoneStatusLabel(m.status)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-5 text-[13px] font-bold text-muted-foreground font-['Space_Grotesk'] tracking-wide">
                        <span className="flex items-center gap-1.5 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-muted-foreground" />{' '}
                          {new Date(m.startDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono">
                          <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />{' '}
                          {m.amount.toLocaleString()} USDT
                        </span>
                      </div>
                    </div>

                    {/* Withdraw Controls (chỉ Owner mới thấy) */}
                    <div className="flex items-center gap-3 shrink-0">
                      {isOwner &&
                        m.status === 'APPROVED' &&
                        !m.withdrawalRecord && (
                          <WithdrawMilestoneModal
                            projectId={project.id}
                            milestone={m}
                          >
                            <button
                              id={`withdraw-trigger-${m.id}`}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/30 text-[10px] font-bold uppercase tracking-widest text-neon-cyan hover:from-neon-cyan/30 hover:to-neon-purple/30 transition-all shadow-[2px_2px_0px_var(--neon-purple)] hover:shadow-none"
                            >
                              <Banknote className="w-3.5 h-3.5" />
                              {t('detail.withdraw')}
                            </button>
                          </WithdrawMilestoneModal>
                        )}

                      {isOwner && m.withdrawalRecord?.status === 'PENDING' && (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-warning/10 border border-warning/30 text-[10px] font-bold uppercase tracking-widest text-warning">
                          <Clock className="w-3 h-3 animate-pulse" />
                          {t('detail.pending')}
                        </span>
                      )}

                      <div
                        className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-none transition-colors duration-500 ease-out ${isExpanded ? 'bg-neon-cyan/10 text-neon-cyan' : 'bg-muted text-muted-foreground'}`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-500 ease-out ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Body (Expanded) */}
                  {isExpanded && (
                    <div className="border-t border-border/50 animate-in slide-in-from-top-2 fade-in duration-500 ease-out">
                      {mediaItems.length > 0 && (
                        <div className="w-full aspect-video bg-background border-b border-border/50">
                          <ImageSlider media={mediaItems} />
                        </div>
                      )}

                      <div className="p-6 md:p-8">
                        {/* HTML Description */}
                        <div
                          className="text-muted-foreground text-[15px] leading-loose max-w-[70ch] mb-10 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:text-foreground"
                          dangerouslySetInnerHTML={{ __html: m.description }}
                        />

                        {/* Pros, Cons, Outcome (Sleek Outline Design) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                          {m.advantages && (
                            <div className="p-5 rounded-none border border-neon-cyan/20 bg-neon-cyan/5 relative overflow-hidden group">
                              <div className="flex items-center gap-2 mb-3">
                                <Lightbulb className="w-4 h-4 text-neon-cyan" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-neon-cyan">
                                  {t('detail.advantages')}
                                </span>
                              </div>
                              <div
                                className="text-[13px] text-muted-foreground leading-relaxed [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-4"
                                dangerouslySetInnerHTML={{
                                  __html: m.advantages
                                }}
                              />
                            </div>
                          )}

                          {m.challenges && (
                            <div className="p-5 rounded-none border border-neon-rose/20 bg-neon-rose/5 relative overflow-hidden">
                              <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="w-4 h-4 text-neon-rose" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-neon-rose">
                                  {t('detail.challenges')}
                                </span>
                              </div>
                              <div
                                className="text-[13px] text-muted-foreground leading-relaxed [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-4"
                                dangerouslySetInnerHTML={{
                                  __html: m.challenges
                                }}
                              />
                            </div>
                          )}

                          {m.outcome && (
                            <div className="md:col-span-2 p-6 rounded-none border border-neon-purple/30 bg-gradient-to-br from-neon-purple/10 to-transparent relative overflow-hidden">
                              <div className="flex items-center gap-2 mb-3">
                                <Target className="w-4 h-4 text-neon-purple" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-neon-purple">
                                  {t('detail.expected_outcome')}
                                </span>
                              </div>
                              <div
                                className="text-[15px] text-foreground leading-loose max-w-[70ch] [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5"
                                dangerouslySetInnerHTML={{ __html: m.outcome }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Milestone Update */}
                        {m.milestoneUpdates && (
                          <div className="mt-6 p-5 rounded-none border border-neon-cyan/20 bg-neon-cyan/5">
                            <h5 className="text-xs font-bold uppercase tracking-widest text-neon-cyan mb-4 flex items-center gap-2 border-b border-neon-cyan/10 pb-2">
                              <ShieldCheck className="w-4 h-4" />{' '}
                              {t('detail.official_update_report')}
                            </h5>

                            <div className="space-y-4">
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 block">
                                  {t('detail.completed')}
                                </span>
                                <div
                                  className="text-xs text-foreground [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-4"
                                  dangerouslySetInnerHTML={{
                                    __html: m.milestoneUpdates.completed
                                  }}
                                />
                              </div>

                              {m.milestoneUpdates.blockers && (
                                <div>
                                  <span className="text-[10px] font-bold uppercase tracking-widest text-neon-rose mb-1 block">
                                    {t('detail.blockers')}
                                  </span>
                                  <div
                                    className="text-xs text-neon-rose/90 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-4"
                                    dangerouslySetInnerHTML={{
                                      __html: m.milestoneUpdates.blockers
                                    }}
                                  />
                                </div>
                              )}
                            </div>

                            {(m.milestoneUpdates.images?.length > 0 ||
                              m.milestoneUpdates.video ||
                              m.milestoneUpdates.link) && (
                              <div className="mt-4 pt-4 border-t border-neon-cyan/10 flex flex-wrap gap-3">
                                {m.milestoneUpdates.video && (
                                  <a
                                    href={m.milestoneUpdates.video}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex px-3 py-1.5 rounded-none bg-neon-cyan/20 text-xs font-bold text-neon-cyan hover:bg-neon-cyan/30 transition-colors items-center gap-1.5"
                                  >
                                    <Play className="w-3 h-3 fill-current" />{' '}
                                    {t('detail.watch_demo')}
                                  </a>
                                )}
                                {m.milestoneUpdates.link && (
                                  <a
                                    href={m.milestoneUpdates.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex px-3 py-1.5 rounded-none border border-border text-xs font-bold text-foreground hover:bg-muted transition-colors items-center gap-1.5"
                                  >
                                    <ExternalLink className="w-3 h-3" />{' '}
                                    {t('detail.external_link')}
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
