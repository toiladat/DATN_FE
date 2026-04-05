export function ProjectTabs() {
  const tabs = [
    { label: 'Campaign', active: true },
    { label: 'Roadmap', active: false },
    { label: 'FAQ', active: false },
    { label: 'Updates (12)', active: false },
    { label: 'Community', active: false }
  ]
  return (
    <nav className="sticky top-20 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50 mb-12 flex gap-8 overflow-x-auto no-scrollbar">
      {tabs.map((tab, i) => (
        <button
          key={i}
          className={`py-4 border-b-2 font-headline font-bold text-sm uppercase tracking-widest whitespace-nowrap transition-colors ${
            tab.active
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
