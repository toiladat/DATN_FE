import { useNavigate } from 'react-router'
import { formatDistanceToNow, format, isValid } from 'date-fns'
import type { ProjectSummary } from '@/schemas/projectSchema'
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

export function KanbanCard({ project }: { project: ProjectSummary }) {
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
    if (!timestamp) return 'Just now'
    const d = new Date(timestamp)
    return isValid(d) ? formatDistanceToNow(d, { addSuffix: true }) : 'Just now'
  }

  return (
    <div
      onClick={() => navigate(`/projects/${project.id}`)}
      className="shrink-0 bg-[#10131a] border border-[#2e323b]/60 hover:border-[#2e323b] transition-all duration-200 hover:-translate-y-px hover:shadow-lg hover:shadow-black/30 group cursor-pointer p-3 rounded-xl flex flex-col gap-3"
    >
      {/* Header: Thumbnail + Title */}
      <div className="flex gap-3 items-start">
        {project.image ? (
          <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-[#1c2028] border border-[#2e323b]/50">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="shrink-0 w-12 h-12 rounded-lg bg-[#1c2028] border border-[#2e323b]/50 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#45484f] text-2xl">
              image
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          {project.primaryCategory && (
            <span className="inline-block mb-1 px-1.5 py-px rounded text-[9px] font-bold text-[#a9abb3] bg-[#1c2028] uppercase tracking-widest">
              {project.primaryCategory}
            </span>
          )}
          <h4 className="text-[#ecedf6] font-['Space_Grotesk'] font-semibold text-[13px] leading-snug line-clamp-2 group-hover:text-white transition-colors">
            {project.title}
          </h4>
        </div>
      </div>

      {/* Progress/Status Area — logic unchanged */}
      {['pending', 'success', 'rejected'].includes(project.status) ||
      (project.status === 'active' && !(project.totalMilestones ?? 0)) ? (
        <div className="flex items-center justify-between text-[11px] bg-[#0d1017] border border-[#2e323b]/40 rounded-lg py-2 px-3">
          <span className="text-[#45484f]">Duration</span>
          <span className="text-[#a9abb3] font-mono font-bold">
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
                        className={`flex-1 h-full rounded-full transition-colors duration-500 ${
                          idx < (project.completedMilestones ?? 0)
                            ? 'bg-[#4ade80]'
                            : 'bg-[#1c2028]'
                        }`}
                      />
                    )
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="bg-[#1c2028] text-[#ecedf6] border-[#2e323b] shadow-xl font-bold font-['Space_Grotesk'] text-[10px] px-2 py-1"
              >
                <p>
                  {project.completedMilestones ?? 0} / {project.totalMilestones}{' '}
                  milestones
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex justify-between text-[10px] font-bold font-mono text-[#45484f]">
            <span>Milestones</span>
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
                <div className="h-1 w-full bg-[#0d1017] rounded-full overflow-hidden border border-[#2e323b]/40 cursor-help">
                  <div
                    className="h-full bg-[#8ff5ff] transition-all duration-500 rounded-full"
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
                className="bg-[#1c2028] text-[#ecedf6] border-[#2e323b] shadow-xl font-bold font-['Space_Grotesk'] text-[10px] px-2 py-1"
              >
                <p>
                  {Math.round(
                    (project.raisedAmount / project.fundingGoal) * 100
                  )}
                  % funded
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex justify-between text-[10px] font-mono font-bold">
            <span className="text-[#8ff5ff]">
              ${project.raisedAmount.toLocaleString()}
            </span>
            <span className="text-[#45484f]">
              ${project.fundingGoal.toLocaleString()}
            </span>
          </div>
        </div>
      ) : null}

      {/* Footer */}
      <div className="flex items-center justify-between text-[10px] text-[#45484f] mt-0.5">
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
              className="text-[#45484f] hover:text-[#a9abb3] opacity-0 group-hover:opacity-100 transition-all p-0.5 rounded focus:outline-none flex outline-none"
            >
              <span className="material-symbols-outlined text-[16px]">
                more_horiz
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="bg-[#10131a] border-[#2e323b] text-[#ecedf6] min-w-[140px] font-['Space_Grotesk'] text-[12px] shadow-2xl p-1 z-50"
          >
            <DropdownMenuItem
              className="focus:bg-[#1c2028] focus:text-[#ecedf6] cursor-pointer outline-none rounded py-1.5 px-2.5 font-medium"
              onSelect={(e) => {
                e.preventDefault()
                navigate(`/projects/${project.id}`)
              }}
            >
              View details
            </DropdownMenuItem>

            {isPending && (
              <>
                <DropdownMenuSeparator className="bg-[#2e323b] my-1" />
                <DropdownMenuItem
                  className="focus:bg-[#ff716c]/10 focus:text-[#ff716c] text-[#ff716c] cursor-pointer outline-none rounded py-1.5 px-2.5 font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  Delete project
                </DropdownMenuItem>
              </>
            )}

            {project.status === 'active' && (
              <>
                <DropdownMenuSeparator className="bg-[#2e323b] my-1" />
                <DropdownMenuItem
                  className="focus:bg-[#4ade80]/10 focus:text-[#4ade80] text-[#4ade80] cursor-pointer outline-none rounded py-1.5 px-2.5 font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  Update progress
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
