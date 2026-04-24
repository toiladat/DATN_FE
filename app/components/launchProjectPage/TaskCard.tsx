import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export type TaskStatus = 'Complete' | 'In Progress' | 'Not Started'

const STEP_NUMBERS = ['01', '02', '03']

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
  const isComplete = status === 'Complete'
  const isInProgress = status === 'In Progress'
  const stepNum = STEP_NUMBERS[stepIndex] ?? '0' + (stepIndex + 1)

  const containerClass = `p-5 flex flex-col md:flex-row md:items-center justify-between group transition-all duration-300 gap-4 bg-[#10131a] ${
    isComplete
      ? 'border border-[#ac89ff]/20'
      : isInProgress
        ? 'border border-[#8ff5ff]/25 shadow-[0_0_20px_rgba(143,245,255,0.07)]'
        : 'border border-[#2e323b]/60 hover:border-[#2e323b]'
  } ${onClick ? 'cursor-pointer' : ''}`

  return (
    <Card className={containerClass} onClick={onClick}>
      <CardContent className="p-0 border-none flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
        <div className="flex items-center gap-5">
          {/* Step number instead of generic icon */}
          <span
            className={`font-mono text-lg font-bold w-8 shrink-0 ${
              isComplete
                ? 'text-[#ac89ff]'
                : isInProgress
                  ? 'text-[#8ff5ff]'
                  : 'text-[#45484f]'
            }`}
          >
            {stepNum}
          </span>

          <div>
            <h3
              className={`text-base font-['Space_Grotesk'] font-semibold ${
                isComplete ? 'text-[#a9abb3]' : 'text-[#ecedf6]'
              }`}
            >
              {title}
            </h3>
            <p className="text-sm text-[#73757d] mt-0.5">{description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-6 mt-3 md:mt-0 self-start md:self-auto w-full md:w-auto shrink-0">
          {/* Status indicator */}
          <span
            className={`text-[10px] font-bold uppercase tracking-widest ${
              isComplete
                ? 'text-[#ac89ff]'
                : isInProgress
                  ? 'text-[#8ff5ff]'
                  : 'text-[#45484f]'
            }`}
          >
            {status}
          </span>

          {/* CTA */}
          {isInProgress ? (
            <Button className="bg-[#8ff5ff] text-[#00383d] hover:bg-[#a8f8ff] px-5 h-9 text-sm font-medium rounded-lg shadow-none">
              Continue
            </Button>
          ) : isComplete ? (
            <span className="material-symbols-outlined text-[#ac89ff] text-xl">
              check_circle
            </span>
          ) : (
            <span className="material-symbols-outlined text-[#45484f] group-hover:text-[#8ff5ff] transition-colors text-xl">
              chevron_right
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
