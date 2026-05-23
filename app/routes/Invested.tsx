import { useEffect, useState, useMemo } from 'react'
import { projectRequests } from '@/apis/requests/project'
import type { ProjectSummary } from '@/schemas/projectSchema'
import { Loader2, Filter } from 'lucide-react'
import { InvestedStats } from '@/components/investedPage/InvestedStats'
import { CompactProjectCard } from '@/components/investedPage/CompactProjectCard'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export default function Invested() {
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
    <div className="bg-[#0a0c10] text-[#ecedf6] min-h-screen relative overflow-hidden font-['Space_Grotesk']">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#8ff5ff]/5 rounded-[100%] blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#ac89ff]/5 rounded-[100%] blur-[150px] pointer-events-none mix-blend-screen" />

      <main className="pt-32 pb-24 px-4 md:px-8 lg:px-12 xl:px-24 max-w-[1200px] mx-auto w-full relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              My{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8ff5ff] to-[#ac89ff]">
                Investments
              </span>
            </h1>
            <p className="text-[#a9abb3] text-base max-w-xl">
              Track and manage the projects you've backed. Monitor their
              progress, funding goals, and active milestones.
            </p>
          </div>

          {/* Time Filter */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full border border-[#2e323b] bg-[#161a21] flex items-center justify-center text-[#73757d]">
              <Filter className="w-4 h-4" />
            </div>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[160px] bg-[#161a21] border-[#2e323b] text-[#ecedf6] focus:ring-[#8ff5ff]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent className="bg-[#161a21] border-[#2e323b] text-[#ecedf6]">
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="thisYear">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 animate-spin text-[#8ff5ff] mb-6" />
            <p className="text-[#a9abb3] animate-pulse">
              Syncing investment data...
            </p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-red-400 border border-red-500/20 bg-red-500/5 rounded-2xl">
            Failed to load your investment portfolio. Please try again later.
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-32 bg-[#161a21] border border-[#2e323b] rounded-2xl">
            <div className="w-24 h-24 bg-[#10131a] border border-[#2e323b] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(143,245,255,0.05)]">
              <span className="material-symbols-outlined text-[#8ff5ff]/50 text-4xl">
                account_balance_wallet
              </span>
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-[#ecedf6]">
              No Investments Yet
            </h3>
            <p className="text-[#a9abb3] max-w-md mx-auto">
              You haven't backed any projects. Discover innovative ideas and
              start building your portfolio today.
            </p>
          </div>
        ) : (
          <>
            <InvestedStats projects={filteredProjects} />

            <div className="space-y-4">
              <h2 className="text-lg font-semibold tracking-wider text-[#ecedf6] mb-6 border-b border-[#2e323b] pb-2 flex items-center justify-between">
                <span>Investment History</span>
                <span className="text-sm font-mono text-[#a9abb3] bg-[#161a21] px-3 py-1 rounded-full border border-[#2e323b]">
                  {filteredProjects.length} Projects
                </span>
              </h2>

              {filteredProjects.length > 0 ? (
                <div className="flex flex-col rounded-2xl border border-[#2e323b] bg-[#161a21] overflow-hidden">
                  {filteredProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className={
                        index !== filteredProjects.length - 1
                          ? 'border-b border-[#2e323b]/50'
                          : ''
                      }
                    >
                      <CompactProjectCard project={project} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-[#73757d]">
                  No investments found in this time range.
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
