import { KanbanCard } from './KanbanCard'
import type { ProjectSummary, ProjectStatus } from '@/schemas/projectSchema'
import { useTranslation } from 'react-i18next'

// Column accent colors — defined once, used consistently
const STATUS_ACCENT: Record<ProjectStatus, string> = {
  pending: '#a9abb3',
  approved: '#fbbf24',
  progress: '#8ff5ff',
  active: '#4ade80',
  success: '#ac89ff',
  rejected: '#ff716c'
}

interface KanbanColumnProps {
  id: ProjectStatus
  title: string
  projects: ProjectSummary[]
  onDeleteProject?: (id: string) => void
}

export function KanbanColumn({
  id,
  title,
  projects,
  onDeleteProject
}: KanbanColumnProps) {
  const { t } = useTranslation()
  const accent = STATUS_ACCENT[id]
  const isEmpty = projects.length === 0

  return (
    <div className="w-[320px] shrink-0 flex flex-col bg-background/50 backdrop-blur-md rounded-none border border-border/60 max-h-full overflow-hidden">
      {/* Column Header */}
      <div className="px-4 pt-4 pb-3 border-b border-border/40 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <span
            className="w-2 h-2 rounded-none shrink-0"
            style={{
              backgroundColor: accent,
              boxShadow: `0 0 6px ${accent}80`
            }}
          />
          <h3 className="font-['Space_Grotesk'] font-semibold text-sm text-foreground tracking-wide">
            {title}
          </h3>
        </div>
        <span className="text-[11px] font-bold font-mono text-muted-foreground/60 bg-muted border border-border rounded-none px-2 py-0.5">
          {projects.length}
        </span>
      </div>

      {/* Cards Container */}
      <div className="p-3 flex flex-col gap-3 overflow-y-auto custom-scrollbar flex-1">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-10 gap-2 border border-dashed border-border/40 rounded-none">
            <span
              className="text-[11px] font-medium"
              style={{ color: `${accent}60` }}
            >
              {t('my_project.empty')}
            </span>
          </div>
        ) : (
          projects.map((project) => (
            <KanbanCard
              key={project.id}
              project={project}
              onDeleteProject={onDeleteProject}
            />
          ))
        )}
      </div>
    </div>
  )
}
