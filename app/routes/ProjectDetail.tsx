import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { Loader2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useGetProjectById } from '@/apis/queries/project'
import { ProjectDetailView } from '@/components/projectPage/ProjectDetailView'
import { useAuth } from '@/components/providers/AuthProvider'

export default function ProjectDetail() {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const { currentUserId } = useAuth()

  const { data: project, isLoading, isError } = useGetProjectById(id || '')

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-neon-cyan" />
      </div>
    )
  }

  if (isError || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">
          {t('my_project.not_found')}
        </h2>
        <Link to="/my-project" className="text-neon-cyan hover:underline">
          {t('my_project.back_to_my_projects')}
        </Link>
      </div>
    )
  }

  return (
    <ProjectDetailView
      project={project}
      currentUserId={currentUserId}
      isPublicView={false}
      backLink={{ to: '/my-project', label: t('my_project.my_projects') }}
    />
  )
}
