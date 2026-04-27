import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useGetProjectById } from '@/apis/queries/project'
import { ProjectHero } from '@/components/projectPage/ProjectHero'
import { ProjectMedia } from '@/components/projectPage/ProjectMedia'
import { ProjectStats } from '@/components/projectPage/ProjectStats'
import { TopInvestors } from '@/components/projectPage/TopInvestors'
import { ProjectTabs } from '@/components/projectPage/ProjectTabs'
import { ProjectContent } from '@/components/projectPage/ProjectContent'
import { ProjectMilestones } from '@/components/projectPage/ProjectMilestones'
import { ProjectTeam } from '@/components/projectPage/ProjectTeam'
import { ProjectUpdates } from '@/components/projectPage/ProjectUpdates'
import { getCurrentUserId } from '@/lib/auth'

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const [activeTab, setActiveTab] = useState('Story')
  const [currentUserId, setCurrentUserId] = useState<string | null>(() =>
    getCurrentUserId()
  )

  useEffect(() => {
    setCurrentUserId(getCurrentUserId())
  }, [])

  const { data: project, isLoading, isError } = useGetProjectById(id || '')

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  if (isError || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <Link to="/projects" className="text-primary hover:underline">
          Return to Projects
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-background text-foreground transition-colors duration-300 min-h-screen">
      <main className="pt-10 pb-20 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Navigation Back */}
        <Link
          to="/my-project"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-10 transition-colors font-bold group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* 1. Hero Header */}
        <ProjectHero project={project} />

        {/* 2. Media & Quick Stats */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <ProjectMedia project={project} />
          <div className="lg:col-span-4 flex flex-col gap-6">
            <ProjectStats project={project} />
            <TopInvestors project={project} />
          </div>
        </section>

        {/* 3. Navigation Tabs */}
        <ProjectTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* 4. Main Content area based on Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-12">
            {activeTab === 'Story' && <ProjectContent project={project} />}
            {activeTab === 'Milestone' && (
              <ProjectMilestones project={project} />
            )}
            {activeTab === 'Updates' && (
              <ProjectUpdates project={project} currentUserId={currentUserId} />
            )}
            {activeTab === 'Review' && (
              <div className="p-8 text-center text-muted-foreground border border-border rounded-xl">
                Reviews Coming Soon
              </div>
            )}
            {activeTab === 'Teams' && <ProjectTeam project={project} />}
          </div>
        </div>
      </main>
    </div>
  )
}
