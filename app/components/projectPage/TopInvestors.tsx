import type { ProjectDetail } from '@/schemas/projectSchema'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export function TopInvestors({ project }: { project: ProjectDetail }) {
  const { t } = useTranslation()
  const { topInvestors, recentInvestors } = project
  const [activeTab, setActiveTab] = useState<'top' | 'recent'>('top')

  const hasInvestors =
    (topInvestors && topInvestors.length > 0) ||
    (recentInvestors && recentInvestors.length > 0)
  const currentList = activeTab === 'top' ? topInvestors : recentInvestors

  if (!hasInvestors) {
    return (
      <div className="p-6 rounded-none bg-card border border-border/50 shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
        <h4 className="font-['Space_Grotesk'] font-bold text-foreground mb-4 text-sm uppercase tracking-widest flex items-center gap-2">
          {t('investors.title')}
        </h4>
        <p className="text-sm text-muted-foreground/60">
          {t('investors.empty')}
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 rounded-none bg-card border border-border/50 shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-neon-cyan/5 rounded-none blur-3xl group-hover:bg-neon-cyan/10 transition-colors duration-700 ease-out" />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('top')}
            className={`font-['Space_Grotesk'] font-bold text-[11px] uppercase tracking-[0.2em] transition-colors ${activeTab === 'top' ? 'text-neon-cyan' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {t('investors.top')}
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={`font-['Space_Grotesk'] font-bold text-[11px] uppercase tracking-[0.2em] transition-colors ${activeTab === 'recent' ? 'text-neon-cyan' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {t('investors.recent')}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 relative z-10">
        {currentList?.map((investor, i) => (
          <div key={i} className="flex flex-col gap-2 group/item">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-none bg-gradient-to-br from-neon-cyan to-neon-purple p-[1.5px] transition-transform duration-300 ease-out group-hover/item:scale-110 shrink-0">
                <div className="w-full h-full rounded-none bg-background overflow-hidden border border-border/30">
                  <img
                    alt={investor.name || t('investors.anonymous')}
                    className="w-full h-full object-cover transition-all duration-300"
                    src={investor.avatar || 'https://via.placeholder.com/150'}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-[13px] truncate">
                  {investor.name || t('investors.anonymous')}
                </p>
                <p className="text-[11px] text-neon-cyan font-medium font-mono mt-0.5 tracking-wide">
                  {investor.amount.toLocaleString()} USDT
                </p>
              </div>
            </div>
            {investor.content && (
              <div className="ml-14">
                <p
                  className="text-[12px] text-muted-foreground italic truncate"
                  title={investor.content}
                >
                  {investor.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
