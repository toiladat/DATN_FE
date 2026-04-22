import { formatDistanceToNow, format, isValid } from 'date-fns'
import { Card } from '@/components/ui/card'
import type { ProjectSummary } from '@/schemas/projectSchema'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

export function KanbanCard({ project }: { project: ProjectSummary }) {
  const isPending = project.status === 'pending'

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
    <Card className="shrink-0 bg-[#161a21] border border-[#2e323b] hover:border-[#8ff5ff]/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#8ff5ff]/5 group cursor-pointer p-3 rounded-lg flex flex-col gap-3">
      {/* Header Area: Thumbnail (if any) + Title/Category */}
      <div className="flex gap-3 items-start">
        {project.image && (
          <div className="shrink-0 w-14 h-14 rounded overflow-hidden bg-[#22262f] border border-[#45484f]/30">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {project.primaryCategory && (
            <span className="inline-block mb-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold text-[#8ff5ff] bg-[#8ff5ff]/10 uppercase tracking-widest border border-[#8ff5ff]/20">
              {project.primaryCategory}
            </span>
          )}
          <h4 className="text-[#ecedf6] font-['Space_Grotesk'] font-bold text-[15px] leading-snug line-clamp-2 group-hover:text-[#8ff5ff] transition-colors">
            {project.title}
          </h4>
        </div>
      </div>

      {/* Progress or Status Area */}
      {['pending', 'success', 'rejected'].includes(project.status) ||
      (project.status === 'active' && !(project.totalMilestones ?? 0)) ? (
        <div className="mt-1 flex items-center justify-between text-[11px] bg-[#1a1e26] border border-[#45484f]/20 rounded-md py-1.5 px-2">
          <span className="text-[#a9abb3] font-medium tracking-wide">
            Expected Duration:
          </span>
          <span className="text-[#ecedf6] font-bold">
            {safeFormat(project.startDate, 'MMM dd')} -{' '}
            {safeFormat(project.endDate, 'MMM dd, yyyy')}
          </span>
        </div>
      ) : project.status === 'active' && (project.totalMilestones ?? 0) > 0 ? (
        <div className="space-y-1.5 mt-1">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full h-1.5 flex gap-[2px] cursor-help">
                  {Array.from({ length: project.totalMilestones! }).map(
                    (_, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 h-full rounded-[1px] transition-colors duration-500 ${idx < (project.completedMilestones ?? 0) ? 'bg-[#8ff5ff] shadow-[0_0_8px_inset_rgba(143,245,255,0.3)]' : 'bg-[#10131a] border border-[#45484f]/20'}`}
                      />
                    )
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="bg-[#22262f] text-white border-[#45484f]/50 shadow-xl font-bold font-['Space_Grotesk'] text-[10px] px-2 py-1"
              >
                <p>
                  {project.completedMilestones ?? 0} / {project.totalMilestones}{' '}
                  Milestones Completed
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex justify-between text-[11px] font-bold font-['Space_Grotesk'] text-[#8ff5ff]">
            <span>Execution Progress</span>
            <span>
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
        <div className="space-y-1.5 mt-1">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-1.5 w-full bg-[#10131a] rounded-full overflow-hidden border border-[#45484f]/20 cursor-help">
                  <div
                    className="h-full bg-gradient-to-r from-[#8ff5ff] to-[#ac89ff] transition-all duration-500 rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (project.raisedAmount / project.fundingGoal) * 100
                      )}%`
                    }}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                sideOffset={8}
                className="bg-[#22262f] text-white border-[#45484f]/50 shadow-xl font-bold font-['Space_Grotesk'] text-[10px] px-2 py-1"
              >
                <p>
                  {Math.round(
                    (project.raisedAmount / project.fundingGoal) * 100
                  )}
                  % Funded
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex justify-between text-[11px] font-bold font-['Space_Grotesk']">
            <span className="text-[#8ff5ff]">
              ${project.raisedAmount.toLocaleString()}
            </span>
            <span className="text-[#73757d]">
              ${project.fundingGoal.toLocaleString()}
            </span>
          </div>
        </div>
      ) : null}

      {/* Footer Area */}
      <div className="flex items-center justify-between text-[11px] text-[#73757d] mt-1">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="material-symbols-outlined text-[13px]">
            schedule
          </span>
          <span>{safeDistance(project.updatedAt)}</span>
        </div>
        <button className="text-[#ac89ff] opacity-0 group-hover:opacity-100 transition-opacity font-bold uppercase tracking-widest text-[10px]">
          View
        </button>
      </div>
    </Card>
  )
}
