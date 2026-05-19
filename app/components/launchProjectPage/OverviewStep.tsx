import {
  TaskCard,
  type TaskStatus
} from '@/components/launchProjectPage/TaskCard'
import { Button } from '@/components/ui/button'
import { useLaunchProject } from '@/contexts/LaunchProjectContext'
import { projectRequests } from '@/apis/requests/project'
import { ProjectSubmissionSchema } from '@/schemas/projectSchema'
import { toast } from 'sonner'
import { z } from 'zod'
import { formatDistanceToNow } from 'date-fns'

interface OverviewStepProps {
  onStepChange?: (step: string) => void
}

export function OverviewStep({ onStepChange }: OverviewStepProps = {}) {
  const { project, resetProject } = useLaunchProject()

  const computeStatus = (step: string): TaskStatus => {
    switch (step) {
      case 'Basics':
        return project.basics.title ? 'Complete' : 'Not Started'
      case 'Milestones':
        return project.milestones.length > 0 ? 'Complete' : 'Not Started'
      case 'Team':
        return project.team.length > 0 ? 'Complete' : 'Optional'
      case 'Attachments':
        return project.attachments.length > 0 ? 'Complete' : 'Optional'
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
    },
    {
      title: 'Attachments',
      description: 'Upload certificates, portfolios, CVs or business plans.',
      status: computeStatus('Attachments'),
      icon: 'attach_file'
    }
  ]

  const handlePublish = async () => {
    try {
      // Fix state desync: Recalculate all milestone dates based on the LATEST basics.startDate
      let currentDate = project.basics.startDate
        ? new Date(project.basics.startDate)
        : new Date()

      const recalculatedMilestones = project.milestones.map((m) => {
        const startDate = new Date(currentDate)
        const endDate = new Date(currentDate)
        endDate.setDate(
          endDate.getDate() + (m.durationDays > 0 ? m.durationDays - 1 : 0)
        )

        // Next milestone starts 1 day after this one ends
        currentDate = new Date(endDate)
        currentDate.setDate(currentDate.getDate() + 1)

        return {
          ...m,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      })

      const payloadData = {
        ...project,
        milestones: recalculatedMilestones
      }

      console.log(
        'PAYLOAD DATA BEFORE VALIDATION:',
        JSON.stringify(payloadData, null, 2)
      )

      // Validate with Zod
      const validatedData = ProjectSubmissionSchema.parse(payloadData)
      console.log('VALIDATED DATA:', JSON.stringify(validatedData, null, 2))

      // Advanced validation
      const goal = project.basics.fundingGoal || 0
      const totalMilestoneBudget = project.milestones.reduce(
        (acc, m) => acc + (m.budget || 0),
        0
      )
      if (totalMilestoneBudget !== goal) {
        toast.error('Budget Mismatch', {
          description: `Total milestone budget (€${totalMilestoneBudget.toLocaleString()}) must exactly equal your funding goal (€${goal.toLocaleString()}).`
        })
        return
      }

      // Call Real API
      const response = await projectRequests.createProject(validatedData as any)
      if (response.status === 201) {
        toast.success(
          'Project published successfully! Admin will review and approve your project within the next 48 hours.'
        )
        resetProject()
      } else {
        toast.error('An error occurred during publishing.')
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
  const isPublishable = ProjectSubmissionSchema.safeParse(project).success

  return (
    <div className="max-w-5xl mx-auto w-full">
      <header className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-[#ecedf6] tracking-tight">
            Project overview
          </h1>
          <div className="flex items-center gap-2 text-[#45484f] text-sm hidden md:flex">
            <span className="material-symbols-outlined text-xs">schedule</span>
            <span className="font-mono text-xs">
              {project.updatedAt
                ? formatDistanceToNow(project.updatedAt, { addSuffix: true })
                : 'just now'}
            </span>
          </div>
        </div>
        <p className="text-[#73757d] max-w-xl mt-3 text-base leading-relaxed">
          Complete the required sections before publishing. Attachments are
          optional but greatly improve investor confidence.
        </p>
      </header>

      {/* Task List Section */}
      <section className="space-y-3 mb-12">
        {tasks.map((task, index) => (
          <TaskCard
            key={task.title}
            title={task.title}
            description={task.description}
            status={task.status}
            icon={task.icon}
            stepIndex={index}
            onClick={() => onStepChange?.(task.title)}
          />
        ))}
      </section>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4 border-t border-[#2e323b]/50 pt-8">
        <p className="text-xs text-[#45484f]">
          {tasks.filter((t) => t.status === 'Complete').length} / {tasks.length}{' '}
          sections complete
        </p>
        <Button
          disabled={!isPublishable}
          className="bg-[#8ff5ff] hover:bg-[#a8f8ff] text-[#00383d] active:scale-95 transition-all font-bold px-8 rounded-xl shadow-[0_0_20px_rgba(143,245,255,0.2)] hover:shadow-[0_0_28px_rgba(143,245,255,0.35)] disabled:opacity-40 disabled:grayscale border-none"
          onClick={handlePublish}
        >
          Publish project
        </Button>
      </div>
    </div>
  )
}
