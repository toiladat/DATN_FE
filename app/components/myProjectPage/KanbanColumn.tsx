import { KanbanCard } from './KanbanCard'
import type { ProjectSummary, ProjectStatus } from '@/schemas/projectSchema'

// Column accent colors — defined once, used consistently
const STATUS_ACCENT: Record<ProjectStatus, string> = {
  pending: '#a9abb3',
  progress: '#8ff5ff',
  active: '#4ade80',
  success: '#ac89ff',
  rejected: '#ff716c'
}

interface KanbanColumnProps {
  id: ProjectStatus
  title: string
  projects: ProjectSummary[]
}

export function KanbanColumn({ id, title, projects }: KanbanColumnProps) {
  const accent = STATUS_ACCENT[id]
  const isEmpty = projects.length === 0

  return (
    <div className="w-[320px] shrink-0 flex flex-col bg-[#0d1017] rounded-2xl border border-[#2e323b]/60 max-h-full overflow-hidden">
      {/* Column Header */}
      <div className="px-4 pt-4 pb-3 border-b border-[#2e323b]/40 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{
              backgroundColor: accent,
              boxShadow: `0 0 6px ${accent}80`
            }}
          />
          <h3 className="font-['Space_Grotesk'] font-semibold text-sm text-[#ecedf6] tracking-wide">
            {title}
          </h3>
        </div>
        <span className="text-[11px] font-bold font-mono text-[#45484f] bg-[#161a21] border border-[#2e323b] rounded-md px-2 py-0.5">
          {projects.length}
        </span>
      </div>

      {/* Cards Container */}
      <div className="p-3 flex flex-col gap-3 overflow-y-auto custom-scrollbar flex-1">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-10 gap-2 border border-dashed border-[#2e323b]/40 rounded-xl">
            <span
              className="text-[11px] font-medium"
              style={{ color: `${accent}60` }}
            >
              Empty
            </span>
          </div>
        ) : (
          projects.map((project) => (
            <KanbanCard key={project.id} project={project} />
          ))
        )}
      </div>
    </div>
  )
}
