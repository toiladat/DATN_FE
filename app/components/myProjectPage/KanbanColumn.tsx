import { Badge } from '@/components/ui/badge'
import { KanbanCard } from './KanbanCard'
import type { ProjectSummary } from '@/schemas/projectSchema'

interface KanbanColumnProps {
  title: string
  color: string
  projects: ProjectSummary[]
}

export function KanbanColumn({ title, color, projects }: KanbanColumnProps) {
  return (
    <div className="w-[350px] shrink-0 flex flex-col bg-[#10131a] rounded-2xl border border-[#45484f]/15 max-h-full overflow-hidden">
      {/* Column Header */}
      <div className="p-4 border-b border-[#45484f]/15 bg-[#161a21]/50 flex items-center justify-between shrink-0">
        <h3
          className={`font-['Space_Grotesk'] font-bold text-lg ${color} tracking-wide`}
        >
          {title}
        </h3>
        <Badge className="bg-[#22262f] text-[#ecedf6] hover:bg-[#22262f]">
          {projects.length}
        </Badge>
      </div>

      {/* Column Cards Container */}
      <div className="p-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar flex-1">
        {projects.length === 0 ? (
          <div className="flex items-center justify-center p-8 border border-dashed border-[#45484f]/30 rounded-xl">
            <p className="text-[#a9abb3] text-sm">No projects</p>
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
