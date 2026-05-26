import type { ProjectSummary } from '@/schemas/projectSchema'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

export function MyProjectsHeader({ projects }: { projects: ProjectSummary[] }) {
  const { t } = useTranslation()

  return (
    <header className="mb-6 shrink-0 flex items-center justify-between border-b border-[#2e323b]/50 pb-5">
      <div>
        <p className="text-[10px] font-bold tracking-[0.25em] text-[#45484f] uppercase font-mono mb-1">
          RadiantVoid / {t('my_project.my_projects')}
        </p>
        <h1 className="text-2xl font-['Space_Grotesk'] font-bold text-[#ecedf6] tracking-tight">
          {t('my_project.board_title')}
        </h1>
      </div>

      <Link
        to="/launch"
        className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#8ff5ff] hover:bg-[#a8f8ff] text-[#00383d] rounded-xl text-xs font-bold transition-all duration-200 active:scale-95 shadow-[0_0_16px_rgba(143,245,255,0.2)]"
      >
        <span className="material-symbols-outlined text-base">add</span>
        {t('my_project.new_project')}
      </Link>
    </header>
  )
}
