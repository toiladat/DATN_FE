import type { ProjectSummary } from '@/schemas/projectSchema'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

export function MyProjectsHeader({ projects }: { projects: ProjectSummary[] }) {
  const { t } = useTranslation()

  return (
    <header className="mb-6 shrink-0 flex items-center justify-between border-b border-border/50 pb-5">
      <div>
        <p className="text-[10px] font-bold tracking-[0.25em] text-muted-foreground/60 uppercase font-mono mb-1">
          FundHive / {t('my_project.my_projects')}
        </p>
        <h1 className="text-2xl font-['Space_Grotesk'] font-bold text-foreground tracking-tight">
          {t('my_project.board_title')}
        </h1>
      </div>

      <Link
        to="/launch-project"
        className="hidden md:flex items-center gap-2 px-4 py-2 bg-neon-cyan hover:bg-neon-cyan/80 text-background rounded-none text-xs font-bold transition-all duration-200 active:scale-95 border border-neon-cyan/40 shadow-[2px_2px_0px_var(--neon-purple)] cursor-pointer"
      >
        <span className="material-symbols-outlined text-base">add</span>
        {t('my_project.new_project')}
      </Link>
    </header>
  )
}
