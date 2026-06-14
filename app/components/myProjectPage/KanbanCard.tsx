import { useNavigate } from 'react-router'
import { formatDistanceToNow, format, isValid } from 'date-fns'
import { vi, enUS } from 'date-fns/locale'
import type { ProjectSummary } from '@/schemas/projectSchema'
import { useTranslation } from 'react-i18next'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export function KanbanCard({
  project,
  onDeleteProject
}: {
  project: ProjectSummary
  onDeleteProject?: (id: string) => void
}) {
  const { t, i18n } = useTranslation()
  const isPending = project.status === 'pending'
  const navigate = useNavigate()

  const safeFormat = (
    timestamp: number | string | null | undefined,
    formatStr: string
  ) => {
    if (!timestamp) return 'TBA'
    const d = new Date(timestamp)
    return isValid(d) ? format(d, formatStr) : 'TBA'
  }

  const safeDistance = (timestamp: number | string | null | undefined) => {
    if (!timestamp) return t('overview.justNow')
    const d = new Date(timestamp)
    const currentLocale = i18n.language === 'vi' ? vi : enUS
    return isValid(d)
      ? formatDistanceToNow(d, { addSuffix: true, locale: currentLocale })
      : t('overview.justNow')
  }

  return (
    <div
      onClick={() => navigate(`/my-project/${project.id}`)}
      className="shrink-0 bg-card border border-border/60 hover:border-neon-cyan/50 transition-all duration-200 hover:-translate-y-px hover:shadow-[2px_2px_0px_var(--neon-purple)] group cursor-pointer p-3 rounded-none flex flex-col gap-3"
    >
      {/* Header: Thumbnail + Title */}
      <div className="flex gap-3 items-start">
        {project.image ? (
          <div className="shrink-0 w-12 h-12 rounded-none overflow-hidden bg-muted border border-border/50">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="shrink-0 w-12 h-12 rounded-none bg-muted border border-border/50 flex items-center justify-center">
            <span className="material-symbols-outlined text-muted-foreground/60 text-2xl">
              image
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          {project.primaryCategory && (
            <span className="inline-block mb-1 px-1.5 py-px rounded-none text-[9px] font-bold text-muted-foreground bg-muted uppercase tracking-widest">
              {project.primaryCategory}
            </span>
          )}
          <h4 className="text-foreground font-['Space_Grotesk'] font-semibold text-[13px] leading-snug line-clamp-2 group-hover:text-neon-cyan dark:group-hover:text-white transition-colors">
            {project.title}
          </h4>
        </div>
      </div>

      {/* Progress/Status Area — logic unchanged */}
      {['pending', 'success', 'rejected'].includes(project.status) ||
      (project.status === 'active' && !(project.totalMilestones ?? 0)) ? (
        <div className="flex items-center justify-between text-[11px] bg-background border border-border/40 rounded-none py-2 px-3">
          <span className="text-muted-foreground/60">
            {t('kanban.duration')}
          </span>
          <span className="text-muted-foreground font-mono font-bold">
            {safeFormat(project.startDate, 'MMM d')} –{' '}
            {safeFormat(project.endDate, 'MMM d, yy')}
          </span>
        </div>
      ) : project.status === 'active' && (project.totalMilestones ?? 0) > 0 ? (
        <div className="space-y-1.5">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full h-1 flex gap-[2px] cursor-help">
                  {Array.from({ length: project.totalMilestones! }).map(
                    (_, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 h-full rounded-none transition-colors duration-500 ${
                          idx < (project.completedMilestones ?? 0)
                            ? 'bg-[#4ade80]'
                            : 'bg-muted'
                        }`}
                      />
                    )
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="bg-card text-foreground border border-border shadow-xl font-bold font-['Space_Grotesk'] text-[10px] px-2 py-1 rounded-none"
              >
                <p>
                  {project.completedMilestones ?? 0} / {project.totalMilestones}{' '}
                  {t('kanban.milestones')}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex justify-between text-[10px] font-bold font-mono text-muted-foreground/60">
            <span>{t('kanban.Milestones')}</span>
            <span className="text-[#4ade80]">
              {Math.round(
                ((project.completedMilestones ?? 0) /
                  project.totalMilestones!) *
                  100
              )}
              %
            </span>
          </div>
        </div>
      ) : project.status === 'progress' && project.fundingGoal > 0 ? (
        <div className="space-y-1.5">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-1 w-full bg-background rounded-none overflow-hidden border border-border/40 cursor-help">
                  <div
                    className="h-full bg-neon-cyan transition-all duration-500 rounded-none"
                    style={{
                      width: `${Math.min(
                        100,
                        (project.raisedAmount / project.fundingGoal) * 100
                      )}%`,
                      boxShadow: '0 0 8px rgba(143,245,255,0.4)'
                    }}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="bg-card text-foreground border border-border shadow-xl font-bold font-['Space_Grotesk'] text-[10px] px-2 py-1 rounded-none"
              >
                <p>
                  {Math.round(
                    (project.raisedAmount / project.fundingGoal) * 100
                  )}
                  % {t('kanban.funded')}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex justify-between text-[10px] font-mono font-bold">
            <span className="text-neon-cyan">
              ${project.raisedAmount.toLocaleString()}
            </span>
            <span className="text-muted-foreground/60">
              ${project.fundingGoal.toLocaleString()}
            </span>
          </div>
        </div>
      ) : null}

      {/* Footer */}
      <div className="flex items-center justify-between text-[10px] text-muted-foreground/60 mt-0.5">
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-[12px]">
            schedule
          </span>
          <span>{safeDistance(project.updatedAt)}</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground/60 hover:text-foreground opacity-0 group-hover:opacity-100 transition-all p-0.5 rounded focus:outline-none flex outline-none"
            >
              <span className="material-symbols-outlined text-[16px]">
                more_horiz
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="bg-card border border-border text-foreground min-w-[140px] font-['Space_Grotesk'] text-[12px] shadow-2xl p-1 z-50"
          >
            <DropdownMenuItem
              className="focus:bg-muted focus:text-foreground cursor-pointer outline-none rounded py-1.5 px-2.5 font-medium"
              onSelect={(e) => {
                e.preventDefault()
                navigate(`/my-project/${project.id}`)
              }}
            >
              {t('kanban.view_details')}
            </DropdownMenuItem>

            {isPending && (
              <>
                <DropdownMenuSeparator className="bg-border my-1" />
                <DropdownMenuItem
                  className="focus:bg-[#ff716c]/10 focus:text-[#ff716c] text-[#ff716c] cursor-pointer outline-none rounded py-1.5 px-2.5 font-medium"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (onDeleteProject) onDeleteProject(project.id)
                  }}
                >
                  {t('kanban.delete_project')}
                </DropdownMenuItem>
              </>
            )}

            {project.status === 'active' && (
              <>
                <DropdownMenuSeparator className="bg-border my-1" />
                <DropdownMenuItem
                  className="focus:bg-[#4ade80]/10 focus:text-[#4ade80] text-[#4ade80] cursor-pointer outline-none rounded py-1.5 px-2.5 font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  {t('kanban.update_progress')}
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
