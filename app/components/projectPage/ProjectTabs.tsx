import { useTranslation } from 'react-i18next'

const DEFAULT_TABS = ['Story', 'Milestone', 'Updates', 'Review', 'Teams']

interface ProjectTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
  tabs?: string[]
}

export function ProjectTabs({
  activeTab,
  onTabChange,
  tabs = DEFAULT_TABS
}: ProjectTabsProps) {
  const { t } = useTranslation()

  return (
    <nav className="sticky top-20 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50 mb-12 flex gap-10 overflow-x-auto no-scrollbar px-2">
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={() => onTabChange(tab)}
          className={`py-5 relative font-['Space_Grotesk'] font-bold text-[13px] uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-500 ease-out ${
            activeTab === tab
              ? 'text-neon-cyan'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {t(`tab.${tab.toLowerCase()}` as any, tab)}
          {activeTab === tab && (
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-neon-cyan shadow-[0_-2px_10px_var(--color-neon-cyan)]" />
          )}
        </button>
      ))}
    </nav>
  )
}
