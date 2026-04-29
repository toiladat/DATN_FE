import { useParams, Link } from 'react-router'
import { Loader2 } from 'lucide-react'
import { useGetProjectById } from '@/apis/queries/project'
import { ProjectDetailView } from '@/components/projectPage/ProjectDetailView'
import { useAuth } from '@/components/providers/AuthProvider'

export default function PublicProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: project, isLoading, isError } = useGetProjectById(id || '')
  const { currentUserId } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0c10]">
        <Loader2 className="w-10 h-10 animate-spin text-[#8ff5ff]" />
      </div>
    )
  }

  if (isError || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0c10] text-[#ecedf6]">
        <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
          Project Not Found
        </h2>
        <Link to="/projects" className="text-[#8ff5ff] hover:underline">
          Return to Discover
        </Link>
      </div>
    )
  }

  return (
    <ProjectDetailView
      project={project}
      currentUserId={currentUserId}
      isPublicView
      backLink={{ to: '/projects', label: 'Discover Projects' }}
    />
  )
}
