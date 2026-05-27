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
import { vi, enUS } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'
import { useMe } from '@/apis/queries/user'
import { useNavigate } from 'react-router'

interface OverviewStepProps {
  onStepChange?: (step: string) => void
}

export function OverviewStep({ onStepChange }: OverviewStepProps = {}) {
  const { t, i18n } = useTranslation()
  const { project, resetProject } = useLaunchProject()
  const { data: userProfile, isLoading: isUserLoading } = useMe()
  const navigate = useNavigate()

  const isKycVerified = userProfile?.status === 'ACTIVE'
  const currentLocale = i18n.language === 'vi' ? vi : enUS

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
      titleKey: 'step.basics',
      description: t('overview.stepBasicsDesc'),
      status: computeStatus('Basics'),
      icon: 'check_circle'
    },
    {
      title: 'Milestones',
      titleKey: 'step.milestones',
      description: t('overview.stepMilestonesDesc'),
      status: computeStatus('Milestones'),
      icon: 'pending'
    },
    {
      title: 'Team',
      titleKey: 'step.team',
      description: t('overview.stepTeamDesc'),
      status: computeStatus('Team'),
      icon: 'group'
    },
    {
      title: 'Attachments',
      titleKey: 'step.attachments',
      description: t('overview.stepAttachmentsDesc'),
      status: computeStatus('Attachments'),
      icon: 'attach_file'
    }
  ]

  const handlePublish = async () => {
    try {
      if (!isKycVerified) {
        toast.error(t('overview.kyc_warning_desc'))
        return
      }

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
        toast.error(t('validation.budget_mismatch'), {
          description: t('toast.budget_mismatch_desc', {
            total: totalMilestoneBudget.toLocaleString(),
            goal: goal.toLocaleString()
          })
        })
        return
      }

      // Call Real API
      const response = await projectRequests.createProject(validatedData as any)
      if (response.status === 201) {
        toast.success(t('toast.publish_success'))
        resetProject()
      } else {
        toast.error(t('toast.publish_error'))
      }
    } catch (error: any) {
      console.error('Validation failed:', error)
      if (error instanceof z.ZodError) {
        toast.error(t('toast.complete_required_fields'))
      } else {
        toast.error(t('toast.publish_error'))
      }
    }
  }
  const isPublishable = ProjectSubmissionSchema.safeParse(project).success

  return (
    <div className="max-w-5xl mx-auto w-full">
      <header className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-[#ecedf6] tracking-tight">
            {t('overview.projectOverview')}
          </h1>
          <div className="flex items-center gap-2 text-[#45484f] text-sm hidden md:flex">
            <span className="material-symbols-outlined text-xs">schedule</span>
            <span className="font-mono text-xs">
              {project.updatedAt
                ? `${t('overview.lastUpdated')} ${formatDistanceToNow(project.updatedAt, { addSuffix: true, locale: currentLocale })}`
                : t('overview.justNow')}
            </span>
          </div>
        </div>
        <p className="text-[#73757d] max-w-xl mt-3 text-base leading-relaxed">
          {t('overview.completeRequiredSections')}
        </p>
      </header>

      {/* KYC Warning Banner */}
      {!isUserLoading && !isKycVerified && (
        <div className="mb-8 p-5 bg-[#ffb020]/10 border border-[#ffb020]/30 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-[0_0_24px_rgba(255,176,32,0.06)] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex gap-4 items-start">
            <span className="material-symbols-outlined text-[#ffb020] text-3xl shrink-0 mt-0.5 animate-pulse">
              warning
            </span>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-[#ffb020]">
                {t('overview.kyc_warning_title')}
              </h3>
              <p className="text-sm text-[#ecedf6]/80 max-w-2xl leading-relaxed">
                {t('overview.kyc_warning_desc')}
              </p>
            </div>
          </div>
          <Button
            type="button"
            onClick={() => navigate('/profile')}
            className="bg-[#ffb020] text-[#10131a] hover:bg-[#ffb020]/90 font-bold px-5 py-2 rounded-xl shrink-0 transition-all duration-200 active:scale-95 shadow-[0_0_12px_rgba(255,176,32,0.2)]"
          >
            {t('overview.kyc_warning_btn')}
          </Button>
        </div>
      )}

      {/* Task List Section */}
      <section className="space-y-3 mb-12">
        {tasks.map((task, index) => (
          <TaskCard
            key={task.title}
            title={t(task.titleKey)}
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
          {t('overview.sectionsComplete')}
        </p>
        <Button
          disabled={!isPublishable || isUserLoading || !isKycVerified}
          className="bg-[#8ff5ff] hover:bg-[#a8f8ff] text-[#00383d] active:scale-95 transition-all font-bold px-8 rounded-xl shadow-[0_0_20px_rgba(143,245,255,0.2)] hover:shadow-[0_0_28px_rgba(143,245,255,0.35)] disabled:opacity-40 disabled:grayscale border-none"
          onClick={handlePublish}
        >
          {t('overview.publishProject')}
        </Button>
      </div>
    </div>
  )
}
