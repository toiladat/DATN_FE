import { Terminal, ShieldCheck } from 'lucide-react'
import { PROJECT_DETAIL_DATA } from '../../data/projectData'

export function ProjectStats() {
  const { stats, trustIndicators } = PROJECT_DETAIL_DATA

  return (
    <div className="p-8 rounded-xl bg-surface-container-low border border-border flex flex-col gap-8">
      <div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-headline font-bold text-primary">
            {stats.raisedETH}
          </span>
          <span className="text-muted-foreground font-medium">
            / {stats.goalETH} ETH raised
          </span>
        </div>
        <div className="w-full h-3 bg-surface-variant rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-primary to-tertiary neon-glow-primary transition-all duration-1000"
            style={{ width: `${stats.progressPercentage}%` }}
          ></div>
        </div>
        <span className="text-xs font-label text-muted-foreground uppercase tracking-widest">
          {stats.progressPercentage}% of minimum goal reached
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-2xl font-headline font-bold text-foreground">
            {stats.backers}
          </span>
          <span className="text-xs text-muted-foreground uppercase tracking-widest">
            Backers
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-headline font-bold text-foreground">
            {stats.daysLeft}
          </span>
          <span className="text-xs text-muted-foreground uppercase tracking-widest">
            Days Left
          </span>
        </div>
      </div>

      <div className="pt-6 border-t border-border flex flex-col gap-4">
        {trustIndicators.map((indicator, i) => {
          const Icon = indicator.icon === 'terminal' ? Terminal : ShieldCheck
          return (
            <div key={i} className="flex items-center gap-3">
              <Icon className="text-tertiary w-5 h-5 shrink-0" />
              <span className="text-sm text-foreground">{indicator.text}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
