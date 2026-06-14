import { useEffect, useState } from 'react'
import { MyProjectsHeader } from '@/components/myProjectPage/MyProjectsHeader'
import { KanbanColumn } from '@/components/myProjectPage/KanbanColumn'
import type { ProjectSummary, ProjectStatus } from '@/schemas/projectSchema'
import { projectRequests } from '@/apis/requests/project'
import { useTranslation } from 'react-i18next'

const COLUMNS: { id: ProjectStatus; titleKey: string }[] = [
  { id: 'pending', titleKey: 'status.pending' },
  { id: 'progress', titleKey: 'status.progress' },
  { id: 'active', titleKey: 'status.active' },
  { id: 'success', titleKey: 'status.success' },
  { id: 'rejected', titleKey: 'status.rejected' }
]

export default function MyProject() {
  const { t } = useTranslation()
  const [projects, setProjects] = useState<ProjectSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectRequests.getMyProjects()
        // API returns { projects: [...] }
        if (response.data && Array.isArray(response.data.projects)) {
          setProjects(response.data.projects)
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const getProjectsByStatus = (status: ProjectStatus) =>
    projects.filter((p) => p.status === status)

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm(t('my_project.confirm_delete'))) return
    try {
      await projectRequests.deleteProject(id)
      setProjects((prev) => prev.filter((p) => p.id !== id))
      import('sonner').then(({ toast }) =>
        toast.success(t('my_project.delete_success'))
      )
    } catch (error) {
      import('sonner').then(({ toast }) =>
        toast.error(t('my_project.delete_error'))
      )
    }
  }

  return (
    <div className="pt-24 px-6 md:px-12 pb-24 w-full h-screen flex flex-col bg-background">
      <MyProjectsHeader projects={projects} />

      {/* Kanban Board Area */}
      <div className="flex-1 w-full rounded-none pb-4 overflow-x-auto custom-scrollbar relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-background/50 backdrop-blur-sm flex justify-center items-center rounded-none">
            <div className="text-neon-cyan flex items-center gap-3">
              <span className="material-symbols-outlined animate-spin text-3xl">
                sync
              </span>
              <span className="font-['Space_Grotesk'] font-bold tracking-widest uppercase">
                {t('my_project.syncing')}
              </span>
            </div>
          </div>
        )}
        <div className="flex gap-6 h-full items-start min-w-max pb-4 px-1">
          {COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={t(column.titleKey)}
              projects={getProjectsByStatus(column.id)}
              onDeleteProject={handleDeleteProject}
            />
          ))}
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--border);
          border-radius: 0px;
          margin-inline: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: var(--color-neon-cyan);
          opacity: 0.15;
          border-radius: 0px;
          border: 3px solid var(--background);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: var(--color-neon-cyan);
          opacity: 0.4;
          border: 2px solid var(--background);
        }
      `}</style>
    </div>
  )
}
