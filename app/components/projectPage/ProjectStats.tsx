import type { ProjectDetail } from '@/schemas/projectSchema'
import { useTranslation } from 'react-i18next'

export function ProjectStats({ project }: { project: ProjectDetail }) {
  const { t } = useTranslation()
  const { totalAmount, raisedAmount, stats, endDate } = project
  const progressPercentage =
    Math.min(100, Math.round((raisedAmount / totalAmount) * 100)) || 0

  const daysLeft = Math.max(
    0,
    Math.ceil(
      (new Date(endDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
    )
  )

  return (
    <div className="p-8 rounded-none bg-card border border-border/50 shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex flex-col gap-8 relative overflow-hidden group">
      <div className="absolute -left-10 -top-10 w-40 h-40 bg-neon-cyan/10 rounded-none blur-3xl group-hover:bg-neon-cyan/20 transition-colors duration-700 ease-out" />

      <div className="relative z-10">
        <div className="flex flex-col gap-1.5 mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-neon-cyan">
              {raisedAmount.toLocaleString()}
            </span>
            <span className="text-neon-cyan font-bold text-lg">USDT</span>
          </div>
          <span className="text-muted-foreground/60 text-xs font-semibold uppercase tracking-wider">
            {t('card.raised')} / {t('card.goal')}:{' '}
            {totalAmount.toLocaleString()} USDT
          </span>
        </div>
        <div className="w-full h-1.5 bg-background rounded-none overflow-hidden mb-3 border border-transparent">
          <div
            className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple shadow-[0_0_15px_var(--color-neon-cyan)] transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          {t('stats.goal_reached_pct', { percent: progressPercentage })}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 relative z-10 pt-6 border-t border-border/20">
        <div className="flex flex-col items-center text-center">
          <span className="text-2xl font-bold text-foreground font-['Space_Grotesk']">
            {daysLeft}
          </span>
          <span className="text-[9px] text-muted-foreground/60 uppercase tracking-wider font-bold mt-1">
            {t('stats.days_left')}
          </span>
        </div>
        <div className="flex flex-col items-center text-center border-x border-border/20 px-2">
          <span className="text-2xl font-bold text-foreground font-['Space_Grotesk']">
            {stats.likes}
          </span>
          <span className="text-[9px] text-muted-foreground/60 uppercase tracking-wider font-bold mt-1">
            {t('stats.likes')}
          </span>
        </div>
        <div className="flex flex-col items-center text-center">
          <span className="text-2xl font-bold text-foreground font-['Space_Grotesk']">
            {stats.reviews}
          </span>
          <span className="text-[9px] text-muted-foreground/60 uppercase tracking-wider font-bold mt-1">
            {t('tab.review')}
          </span>
        </div>
      </div>
    </div>
  )
}
