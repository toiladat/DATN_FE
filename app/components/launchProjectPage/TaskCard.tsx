import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

export type TaskStatus = 'Complete' | 'In Progress' | 'Not Started' | 'Optional'

const STEP_NUMBERS = ['01', '02', '03', '04']

const statusKeyMap: Record<TaskStatus, string> = {
  Complete: 'status.complete',
  'In Progress': 'status.in_progress',
  'Not Started': 'status.not_started',
  Optional: 'status.optional'
}

interface TaskCardProps {
  title: string
  description: string
  status: TaskStatus
  icon: string
  stepIndex?: number
  onClick?: () => void
}

export function TaskCard({
  title,
  description,
  status,
  stepIndex = 0,
  onClick
}: TaskCardProps) {
  const { t } = useTranslation()
  const isComplete = status === 'Complete'
  const isInProgress = status === 'In Progress'
  const isOptional = status === 'Optional'
  const stepNum = STEP_NUMBERS[stepIndex] ?? '0' + (stepIndex + 1)

  const containerClass = `p-5 flex flex-col md:flex-row md:items-center justify-between group transition-all duration-300 gap-4 bg-card rounded-none ${
    isComplete
      ? 'border border-neon-purple/20'
      : isInProgress
        ? 'border border-neon-cyan/25 shadow-[0_0_20px_var(--color-neon-cyan)/7]'
        : 'border border-border/60 hover:border-border'
  } ${onClick ? 'cursor-pointer' : ''}`

  return (
    <Card className={containerClass} onClick={onClick}>
      <CardContent className="p-0 border-none flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
        <div className="flex items-center gap-5">
          {/* Step number instead of generic icon */}
          <span
            className={`font-mono text-lg font-bold w-8 shrink-0 ${
              isComplete
                ? 'text-neon-purple'
                : isInProgress
                  ? 'text-neon-cyan'
                  : 'text-muted-foreground/45'
            }`}
          >
            {stepNum}
          </span>

          <div>
            <h3
              className={`text-base font-['Space_Grotesk'] font-semibold ${
                isComplete ? 'text-muted-foreground' : 'text-foreground'
              }`}
            >
              {title}
            </h3>
            <p className="text-sm text-muted-foreground/60 mt-0.5">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-6 mt-3 md:mt-0 self-start md:self-auto w-full md:w-auto shrink-0">
          {/* Status indicator */}
          <span
            className={`text-[10px] font-bold uppercase tracking-widest ${
              isComplete
                ? 'text-neon-purple'
                : isInProgress
                  ? 'text-neon-cyan'
                  : 'text-muted-foreground/45'
            }`}
          >
            {t(statusKeyMap[status])}
          </span>

          {/* CTA */}
          {isInProgress ? (
            <Button className="bg-neon-cyan text-background hover:bg-neon-cyan/85 px-5 h-9 text-sm font-bold rounded-none shadow-none">
              {t('btn.continue')}
            </Button>
          ) : isComplete ? (
            <span className="material-symbols-outlined text-neon-purple text-xl">
              check_circle
            </span>
          ) : isOptional ? (
            <span className="material-symbols-outlined text-muted-foreground/45 group-hover:text-neon-cyan transition-colors text-xl">
              add_circle
            </span>
          ) : (
            <span className="material-symbols-outlined text-muted-foreground/45 group-hover:text-neon-cyan transition-colors text-xl">
              chevron_right
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
