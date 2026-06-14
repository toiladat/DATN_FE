import { useMemo } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts'
import type { ProjectSummary } from '@/schemas/projectSchema'
import { useTranslation } from 'react-i18next'

export function InvestedStats({ projects }: { projects: ProjectSummary[] }) {
  const { t } = useTranslation()

  const stats = useMemo(() => {
    let totalInvested = 0
    let progress = 0
    let active = 0
    let success = 0
    let failed = 0

    projects.forEach((p) => {
      totalInvested += p.myInvestmentAmount || 0

      switch (p.status.toLowerCase()) {
        case 'progress':
          progress++
          break
        case 'active':
          active++
          break
        case 'success':
          success++
          break
        case 'rejected':
          failed++
          break
      }
    })

    const chartData = [
      {
        name: 'Funding',
        labelKey: 'stats.funding',
        value: progress,
        color: '#8ff5ff'
      },
      {
        name: 'Active',
        labelKey: 'status.active',
        value: active,
        color: '#ac89ff'
      },
      {
        name: 'Success',
        labelKey: 'status.success',
        value: success,
        color: '#6bcb77'
      },
      {
        name: 'Failed',
        labelKey: 'stats.failed',
        value: failed,
        color: '#ff716c'
      }
    ].filter((d) => d.value > 0) // Only show statuses that have projects

    return { totalInvested, chartData, totalProjects: projects.length }
  }, [projects])

  if (projects.length === 0) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
      {/* Overview Cards */}
      <div className="lg:col-span-1 bg-card border border-border rounded-none p-6 flex flex-col justify-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-neon-cyan/5 rounded-none blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-neon-purple/5 rounded-none blur-3xl pointer-events-none" />

        <div>
          <h3 className="text-muted-foreground text-xs uppercase tracking-widest font-semibold mb-1">
            {t('stats.total_invested')}
          </h3>
          <p className="text-3xl font-bold font-mono text-foreground">
            {stats.totalInvested.toLocaleString()}{' '}
            <span className="text-sm text-neon-cyan">mUSDT</span>
          </p>
        </div>

        <div className="h-px w-full bg-border/50" />

        <div>
          <h3 className="text-muted-foreground text-xs uppercase tracking-widest font-semibold mb-1">
            {t('stats.projects_backed')}
          </h3>
          <p className="text-3xl font-bold font-mono text-foreground">
            {stats.totalProjects}{' '}
            <span className="text-sm text-neon-purple">
              {t('stats.projects_plural')}
            </span>
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="lg:col-span-2 bg-card border border-border rounded-none p-6 flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 w-full h-[250px]">
          {stats.chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {stats.chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(value, name) => {
                    const entry = stats.chartData.find((d) => d.name === name)
                    return [value, entry ? t(entry.labelKey) : name]
                  }}
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--border)',
                    borderRadius: '0px'
                  }}
                  itemStyle={{
                    color: 'var(--foreground)',
                    fontFamily: 'Space Grotesk'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              {t('stats.no_data')}
            </div>
          )}
        </div>

        {/* Custom Legend */}
        <div className="md:w-1/3 mt-6 md:mt-0 flex flex-col gap-4 pl-4 md:border-l border-border">
          {stats.chartData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-none"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-foreground text-sm">
                  {t(item.labelKey)}
                </span>
              </div>
              <span className="font-mono text-muted-foreground">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
