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
    return null
  }

  return (
    <div className="w-full py-8 border-y border-border/20 my-12 relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h4 className="font-['Space_Grotesk'] font-bold text-foreground text-sm uppercase tracking-[0.2em] flex items-center gap-2">
            {t('investors.title')}
          </h4>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('top')}
            className={`font-['Space_Grotesk'] font-bold text-[11px] uppercase tracking-[0.2em] pb-1 border-b-2 transition-all ${
              activeTab === 'top'
                ? 'text-neon-cyan border-neon-cyan'
                : 'text-muted-foreground border-transparent hover:text-foreground'
            }`}
          >
            {t('investors.top')}
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={`font-['Space_Grotesk'] font-bold text-[11px] uppercase tracking-[0.2em] pb-1 border-b-2 transition-all ${
              activeTab === 'recent'
                ? 'text-neon-cyan border-neon-cyan'
                : 'text-muted-foreground border-transparent hover:text-foreground'
            }`}
          >
            {t('investors.recent')}
          </button>
        </div>
      </div>

      {/* Dải cuộn ngang */}
      <div className="flex gap-6 overflow-x-auto pb-2     scrollbar-thin scrollbar-thumb-neon-cyan/20 scrollbar-track-transparent">
        {currentList?.map((investor, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[290px] p-5 rounded-none bg-card border border-border/40 hover:border-neon-cyan/30 transition-all duration-500 relative group/item"
          >
            <div className="absolute -right-10 -top-10 w-24 h-24 bg-neon-cyan/5 rounded-none blur-2xl group-hover/item:bg-neon-cyan/10 transition-colors duration-700 ease-out" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-none bg-gradient-to-br from-neon-cyan to-neon-purple p-[1.5px] transition-transform duration-300 ease-out group-hover/item:scale-105 shrink-0">
                <div className="w-full h-full rounded-none bg-background overflow-hidden border border-border/30">
                  <img
                    alt={investor.name || t('investors.anonymous')}
                    className="w-full h-full object-cover"
                    src={
                      investor.avatar ||
                      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
                    }
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-foreground text-[13px] truncate">
                  {investor.name || t('investors.anonymous')}
                </p>
                <p className="text-[11px] text-neon-cyan font-bold font-mono mt-0.5 tracking-wide">
                  {investor.amount.toLocaleString()} mUSDT
                </p>
              </div>
            </div>
            {investor.content && (
              <div className="mt-2 border-t border-dashed border-border/20 pt-3 relative z-10">
                <p
                  className="text-[11px] text-muted-foreground italic line-clamp-2 h-8 leading-relaxed"
                  title={investor.content}
                >
                  "{investor.content}"
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
