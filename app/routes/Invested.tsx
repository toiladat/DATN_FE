import { useEffect, useState, useMemo } from 'react'
import { projectRequests } from '@/apis/requests/project'
import type { ProjectSummary } from '@/schemas/projectSchema'
import { Loader2, Filter } from 'lucide-react'
import { InvestedStats } from '@/components/investedPage/InvestedStats'
import { CompactProjectCard } from '@/components/investedPage/CompactProjectCard'
import { useTranslation } from 'react-i18next'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export default function Invested() {
  const { t, i18n } = useTranslation()
  const [projects, setProjects] = useState<ProjectSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [timeFilter, setTimeFilter] = useState('all')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectRequests.getInvestedProjects()
        if (response.data && Array.isArray(response.data.projects)) {
          setProjects(response.data.projects)
        }
      } catch (error) {
        console.error('Failed to fetch invested projects:', error)
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (timeFilter === 'all') return true

      const investedDate = new Date(p.investedAt || 0)
      const now = new Date()

      if (timeFilter === '30days') {
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(now.getDate() - 30)
        return investedDate >= thirtyDaysAgo
      }
      if (timeFilter === 'thisYear') {
        return investedDate.getFullYear() === now.getFullYear()
      }
      return true
    })
  }, [projects, timeFilter])

  return (
    <div className="bg-background text-foreground min-h-screen relative overflow-hidden font-['Space_Grotesk']">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-neon-cyan/5 rounded-[100%] blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-neon-purple/5 rounded-[100%] blur-[150px] pointer-events-none mix-blend-screen" />

      <main className="pt-32 pb-24 px-4 md:px-8 lg:px-12 xl:px-24 max-w-[1200px] mx-auto w-full relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {i18n.language === 'vi' ? (
                <>
                  <span className="text-neon-cyan drop-shadow-[0_0_20px_var(--color-neon-cyan)/30]">
                    {t('invested.title_main')}
                  </span>{' '}
                  {t('invested.title_my')}
                </>
              ) : (
                <>
                  {t('invested.title_my')}{' '}
                  <span className="text-neon-cyan drop-shadow-[0_0_20px_var(--color-neon-cyan)/30]">
                    {t('invested.title_main')}
                  </span>
                </>
              )}
            </h1>
            <p className="text-muted-foreground text-base max-w-xl">
              {t('invested.desc')}
            </p>
          </div>

          {/* Time Filter */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-none border border-border bg-card flex items-center justify-center text-muted-foreground">
              <Filter className="w-4 h-4" />
            </div>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[160px] bg-card border-border text-foreground focus:ring-neon-cyan rounded-none">
                <SelectValue placeholder={t('invested.time_range')} />
              </SelectTrigger>
              <SelectContent className="bg-card border-border text-foreground rounded-none">
                <SelectItem value="all">{t('invested.all_time')}</SelectItem>
                <SelectItem value="30days">
                  {t('invested.last_30_days')}
                </SelectItem>
                <SelectItem value="thisYear">
                  {t('invested.this_year')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 animate-spin text-neon-cyan mb-6" />
            <p className="text-muted-foreground animate-pulse">
              {t('invested.syncing')}
            </p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-destructive border border-destructive/20 bg-destructive/5 rounded-none">
            {t('invested.error')}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-32 bg-card border border-border rounded-none">
            <div className="w-24 h-24 bg-background border border-border rounded-none flex items-center justify-center mx-auto mb-6 shadow-[2px_2px_0px_var(--neon-cyan)]">
              <span className="material-symbols-outlined text-neon-cyan/50 text-4xl">
                account_balance_wallet
              </span>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-foreground">
              {t('invested.no_investments_yet')}
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {t('invested.no_investments_desc')}
            </p>
          </div>
        ) : (
          <>
            <InvestedStats projects={filteredProjects} />

            <div className="space-y-4">
              <h2 className="text-lg font-semibold tracking-wider text-foreground mb-6 border-b border-border pb-2 flex items-center justify-between">
                <span>{t('invested.history')}</span>
                <span className="text-sm font-mono text-muted-foreground bg-card px-3 py-1 rounded-none border border-border">
                  {t('invested.projects_counter', {
                    count: filteredProjects.length
                  })}
                </span>
              </h2>

              {filteredProjects.length > 0 ? (
                <div className="flex flex-col rounded-none border border-border bg-card overflow-hidden">
                  {filteredProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className={
                        index !== filteredProjects.length - 1
                          ? 'border-b border-border/50'
                          : ''
                      }
                    >
                      <CompactProjectCard project={project} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  {t('invested.no_projects_found')}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
