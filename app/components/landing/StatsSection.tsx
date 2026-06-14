import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useGetProjectStats } from '@/apis/queries/project'

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    if (end <= 0) {
      setCount(0)
      return
    }
    const totalSteps = Math.min(end, 50)
    const stepValue = Math.ceil(end / totalSteps)
    const timer = setInterval(() => {
      start += stepValue
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 25)

    return () => clearInterval(timer)
  }, [value])

  return <>{count}</>
}

const itemThemes = {
  total: {
    textHover: 'group-hover:text-cyan-600 dark:group-hover:text-cyan-400',
    borderHover: 'hover:border-cyan-200 dark:hover:border-cyan-800/40',
    iconBg:
      'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-900/30',
    activeTextColor: 'text-cyan-600 dark:text-cyan-400',
    color: 'var(--color-neon-cyan)'
  },
  fundraising: {
    textHover: 'group-hover:text-amber-600 dark:group-hover:text-amber-400',
    borderHover: 'hover:border-amber-200 dark:hover:border-amber-800/40',
    iconBg:
      'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30',
    activeTextColor: 'text-amber-600 dark:text-amber-400',
    color: 'var(--color-warning)'
  },
  active: {
    textHover: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
    borderHover: 'hover:border-purple-200 dark:hover:border-purple-800/40',
    iconBg:
      'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30',
    activeTextColor: 'text-purple-600 dark:text-purple-400',
    color: 'var(--color-neon-purple)'
  },
  success: {
    textHover: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
    borderHover: 'hover:border-emerald-200 dark:hover:border-emerald-800/40',
    iconBg:
      'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30',
    activeTextColor: 'text-emerald-600 dark:text-emerald-400',
    color: 'var(--color-success)'
  }
}

export function StatsSection() {
  const { t } = useTranslation()
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const { data: stats, isLoading } = useGetProjectStats()

  const segments = [
    {
      key: 'fundraising',
      label: t('landing.stats.fundraising'),
      value: stats?.fundraising || 0,
      color: 'var(--color-warning)',
      desc: t('landing.stats.fundraising_desc'),
      icon: 'monetization_on'
    },
    {
      key: 'active',
      label: t('landing.stats.active'),
      value: stats?.active || 0,
      color: 'var(--color-neon-purple)',
      desc: t('landing.stats.active_desc'),
      icon: 'insights'
    },
    {
      key: 'success',
      label: t('landing.stats.success'),
      value: stats?.success || 0,
      color: 'var(--color-success)',
      desc: t('landing.stats.success_desc'),
      icon: 'verified'
    }
  ]

  // Render cards logic: Total card + 3 state cards
  const cards = [
    {
      key: 'total',
      label: t('landing.stats.total'),
      value: stats?.total || 0,
      color: 'var(--color-neon-cyan)',
      desc: t('landing.stats.total_desc'),
      icon: 'folder_open'
    },
    ...segments
  ]

  const totalSegmentsValue = segments.reduce((sum, s) => sum + s.value, 0)
  const isChartEmpty = totalSegmentsValue === 0

  // Filter out slices with value 0 to prevent rendering tiny slivers/errors, but keep placeholder if all are 0
  const chartData = isChartEmpty
    ? [
        {
          key: 'placeholder',
          value: 1,
          color: 'var(--muted)',
          glowColor: 'transparent'
        }
      ]
    : segments
        .filter((s) => s.value > 0)
        .map((s) => ({
          ...s,
          glowColor: s.color
        }))

  // Find the details of active/hovered state
  const activeItem = segments.find((s) => s.key === hoveredKey)
  const activeItemTheme = activeItem
    ? itemThemes[activeItem.key as keyof typeof itemThemes]
    : null

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-neon-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold mb-4 text-foreground tracking-tight">
          {t('landing.stats.title')}{' '}
          <span className="text-neon-cyan">FundHive</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light leading-relaxed">
          {t('landing.stats.desc')}
        </p>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-stretch">
        {/* Left: Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((item, index) => {
            const theme = itemThemes[item.key as keyof typeof itemThemes]
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => {
                  if (item.key !== 'total') {
                    setHoveredKey(item.key)
                  }
                }}
                onMouseLeave={() => setHoveredKey(null)}
                className={`p-6 rounded-2xl bg-card border border-border/50 transition-all duration-300 ease-out flex flex-col gap-6 justify-between cursor-pointer group shadow-[0_4px_20px_rgba(45,42,38,0.02)] hover:shadow-[0_8px_30px_rgba(45,42,38,0.05)] hover:-translate-y-1 ${theme.borderHover}`}
              >
                {/* Top Row: Icon Container */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${theme.iconBg}`}
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {item.icon}
                  </span>
                </div>

                {/* Bottom Stats Column */}
                <div>
                  <div className="flex items-baseline">
                    <span
                      className={`text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-foreground transition-colors duration-300 ease-out ${theme.textHover}`}
                    >
                      {isLoading ? (
                        <span className="text-xl">...</span>
                      ) : (
                        <AnimatedCounter value={item.value} />
                      )}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground mt-2.5 tracking-wide">
                    {item.label}
                  </h3>
                  <p className="text-muted-foreground/80 text-xs font-light leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Right: Circular Donut Chart */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full h-full p-8 rounded-3xl bg-card border border-border/50 shadow-[0_4px_20px_rgba(45,42,38,0.02)] relative overflow-hidden flex flex-col items-center justify-center min-h-[360px]"
          >
            {/* Center circular text */}
            <div className="absolute flex flex-col items-center justify-center pointer-events-none z-10">
              <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em] mb-1">
                {activeItem ? activeItem.label : t('landing.stats.total')}
              </span>
              <span
                className={`text-5xl font-['Space_Grotesk'] font-bold transition-colors duration-300 ease-out ${
                  activeItemTheme
                    ? activeItemTheme.activeTextColor
                    : 'text-foreground'
                }`}
              >
                {isLoading ? (
                  <span className="text-xl">...</span>
                ) : activeItem ? (
                  <AnimatedCounter value={activeItem.value} />
                ) : (
                  <AnimatedCounter value={stats?.total || 0} />
                )}
              </span>
            </div>

            {/* Recharts Pie Chart */}
            <div className="w-full h-[280px] relative flex items-center justify-center">
              {isLoading ? (
                <div className="text-muted-foreground font-['Space_Grotesk']">
                  Loading Chart...
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    {/* Background Pie Circle */}
                    <Pie
                      data={[{ value: 1 }]}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={100}
                      fill="var(--color-border)"
                      opacity={0.35}
                      isAnimationActive={false}
                      dataKey="value"
                      stroke="none"
                    />
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={isChartEmpty ? 0 : 5}
                      dataKey="value"
                      onMouseEnter={(_, index) => {
                        const key = chartData[index]?.key
                        if (key && key !== 'placeholder') {
                          setHoveredKey(key)
                        }
                      }}
                      onMouseLeave={() => setHoveredKey(null)}
                      className="cursor-pointer outline-none"
                    >
                      {chartData.map((entry, index) => {
                        const isHovered = hoveredKey === entry.key
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            opacity={hoveredKey === null || isHovered ? 1 : 0.4}
                            style={{
                              transition: 'all 0.3s ease',
                              outline: 'none'
                            }}
                          />
                        )
                      })}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
