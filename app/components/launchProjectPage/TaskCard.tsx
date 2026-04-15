import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export type TaskStatus = 'Complete' | 'In Progress' | 'Not Started'

interface TaskCardProps {
  title: string
  description: string
  status: TaskStatus
  icon: string
  onClick?: () => void
}

export function TaskCard({
  title,
  description,
  status,
  icon,
  onClick
}: TaskCardProps) {
  const isComplete = status === 'Complete'
  const isInProgress = status === 'In Progress'

  // Dynamic styles based on status matching the Radiant Void design language
  const containerClass = `p-6 flex flex-col md:flex-row md:items-center justify-between group transition-all duration-300 gap-4 bg-[#22262f]/40 backdrop-blur-xl hover:bg-[#22262f] ${
    isInProgress
      ? 'border border-[#8ff5ff]/20 shadow-[0_0_20px_rgba(143,245,255,0.15)]'
      : 'border border-[#8ff5ff]/10'
  } ${onClick ? 'cursor-pointer' : ''}`

  const iconBoxClass = `w-12 h-12 rounded-full flex items-center justify-center shrink-0 border ${
    isComplete
      ? 'bg-[#7d98ff]/10 border-[#7d98ff]/30 text-[#7d98ff]'
      : isInProgress
        ? 'bg-[#8ff5ff]/10 border-[#8ff5ff]/30 text-[#8ff5ff]'
        : 'bg-[#1c2028] border-[#45484f]/20 text-[#73757d]'
  }`

  return (
    <Card className={containerClass} onClick={onClick}>
      <CardContent className="p-0 border-none flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
        <div className="flex items-center gap-6">
          <div className={iconBoxClass}>
            <span
              className="material-symbols-outlined"
              style={isComplete ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {icon}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-['Space_Grotesk'] font-semibold text-[#ecedf6]">
              {title}
            </h3>
            <p className="text-sm text-[#a9abb3]">{description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-8 mt-4 md:mt-0 self-start md:self-auto w-full md:w-auto">
          <div>
            {isComplete && (
              <Badge
                variant="outline"
                className="font-bold uppercase tracking-tighter text-[#7d98ff] bg-[#7d98ff]/10 border-transparent rounded-full px-3 py-1"
              >
                Complete
              </Badge>
            )}
            {isInProgress && (
              <Badge
                variant="outline"
                className="font-bold uppercase tracking-tighter text-[#8ff5ff] bg-transparent border-transparent px-3 py-1 animate-pulse"
              >
                In Progress
              </Badge>
            )}
            {!isComplete && !isInProgress && (
              <span className="text-xs font-bold uppercase tracking-tighter text-[#a9abb3]">
                Not Started
              </span>
            )}
          </div>

          <div>
            {isInProgress ? (
              <Button className="bg-[#8ff5ff] text-[#005359] hover:bg-[#8ff5ff]/90 hover:brightness-110 px-6 font-medium">
                Continue
              </Button>
            ) : (
              <button className="material-symbols-outlined text-[#a9abb3] group-hover:text-[#8ff5ff] transition-colors">
                chevron_right
              </button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
