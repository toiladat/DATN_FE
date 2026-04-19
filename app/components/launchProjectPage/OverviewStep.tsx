import {
  TaskCard,
  type TaskStatus
} from '@/components/launchProjectPage/TaskCard'
import { Button } from '@/components/ui/button'
import { useLaunchProject } from '@/contexts/LaunchProjectContext'
import { createProject } from '@/api/project'
import { ProjectSubmissionSchema } from '@/schemas/projectSchema'
import { toast } from 'sonner'
import { z } from 'zod'

interface OverviewStepProps {
  onStepChange?: (step: string) => void
}

export function OverviewStep({ onStepChange }: OverviewStepProps = {}) {
  const { project } = useLaunchProject()

  const computeStatus = (step: string): TaskStatus => {
    switch (step) {
      case 'Basics':
        return project.basics.title ? 'Complete' : 'Not Started'
      case 'Milestones':
        return project.milestones.length > 0 ? 'Complete' : 'Not Started'
      case 'Team':
        return project.team.length > 0 ? 'Complete' : 'Not Started'
      default:
        return 'Not Started'
    }
  }

  const tasks = [
    {
      title: 'Basics',
      description: 'Name your project, upload an image or video...',
      status: computeStatus('Basics'),
      icon: 'check_circle'
    },
    {
      title: 'Milestones',
      description: 'Define your milestones...',
      status: computeStatus('Milestones'),
      icon: 'pending'
    },
    {
      title: 'Team',
      description: 'Edit your profile and add collaborators.',
      status: computeStatus('Team'),
      icon: 'group'
    }
  ]

  const handlePublish = async () => {
    try {
      // Validate with Zod
      const validatedData = ProjectSubmissionSchema.parse(project)

      // Call Mock API
      const result = await createProject(validatedData)
      if (result.success) {
        toast.success('Project published successfully! (Mock)')
      }
    } catch (error: any) {
      console.error('Validation failed:', error)
      if (error instanceof z.ZodError) {
        toast.error('Please complete all required fields before publishing.')
      } else {
        toast.error('An error occurred during publishing.')
      }
    }
  }
  return (
    <div className="max-w-5xl mx-auto w-full">
      <header className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-[#ecedf6] tracking-tight">
            Project overview
          </h1>
          <div className="flex items-center gap-2 text-[#a9abb3] text-sm hidden md:flex">
            <span className="material-symbols-outlined text-xs">info</span>
            <span>Last edited 2 hours ago</span>
          </div>
        </div>
        <p className="text-[#a9abb3] max-w-2xl mt-4 text-lg">
          Complete the foundational building blocks of your campaign. Each
          section ensures your project meets the Radiant Void verification
          standards.
        </p>
      </header>

      {/* Task List Section */}
      <section className="space-y-4 mb-12">
        {tasks.map((task) => (
          <TaskCard
            key={task.title}
            title={task.title}
            description={task.description}
            status={task.status}
            icon={task.icon}
            onClick={() => onStepChange?.(task.title)}
          />
        ))}
      </section>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-4 border-t border-[#45484f]/15 pt-8">
        <Button
          className="bg-gradient-to-r from-[#00eefc] to-[#8ff5ff] text-[#005359] hover:shadow-[0_0_15px_rgba(143,245,255,0.4)] active:scale-95 transition-all font-bold px-8 shadow-none"
          onClick={handlePublish}
        >
          Publish
        </Button>
      </div>
    </div>
  )
}
