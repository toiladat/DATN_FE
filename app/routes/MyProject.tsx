import { useEffect, useState } from 'react'
import { MyProjectsHeader } from '@/components/myProjectPage/MyProjectsHeader'
import { KanbanColumn } from '@/components/myProjectPage/KanbanColumn'
import type { ProjectSummary, ProjectStatus } from '@/schemas/projectSchema'
import { projectRequests } from '@/apis/requests/project'

const COLUMNS: { id: ProjectStatus; title: string }[] = [
  { id: 'pending', title: 'Pending Approval' },
  { id: 'progress', title: 'Funding in Progress' },
  { id: 'active', title: 'Active' },
  { id: 'success', title: 'Success' },
  { id: 'rejected', title: 'Rejected' }
]

export default function MyProject() {
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

  return (
    <div className="pt-24 px-6 md:px-12 pb-24 w-full h-screen flex flex-col bg-[#0b0e14]">
      <MyProjectsHeader projects={projects} />

      {/* Kanban Board Area */}
      <div className="flex-1 w-full rounded-md pb-4 overflow-x-auto custom-scrollbar relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-[#0b0e14]/50 backdrop-blur-sm flex justify-center items-center rounded-xl">
            <div className="text-[#8ff5ff] flex items-center gap-3">
              <span className="material-symbols-outlined animate-spin text-3xl">
                sync
              </span>
              <span className="font-['Space_Grotesk'] font-bold tracking-widest uppercase">
                Syncing...
              </span>
            </div>
          </div>
        )}
        <div className="flex gap-6 h-full items-start min-w-max pb-4 px-1">
          {COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              projects={getProjectsByStatus(column.id)}
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
          background: rgba(22, 26, 33, 0.3);
          border-radius: 10px;
          margin-inline: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(143, 245, 255, 0.15);
          border-radius: 10px;
          border: 3px solid #0b0e14;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(143, 245, 255, 0.4);
          border: 2px solid #0b0e14;
        }
      `}</style>
    </div>
  )
}
