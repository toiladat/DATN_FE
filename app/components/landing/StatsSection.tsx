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

export function StatsSection() {
  const { t } = useTranslation()
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const { data: stats, isLoading } = useGetProjectStats()

  const segments = [
    {
      key: 'fundraising',
      label: t('landing.stats.fundraising'),
      value: stats?.fundraising || 0,
      color: '#fbbf24',
      glowColor: 'rgba(251, 191, 36, 0.3)',
      desc: t('landing.stats.fundraising_desc'),
      icon: 'monetization_on'
    },
    {
      key: 'active',
      label: t('landing.stats.active'),
      value: stats?.active || 0,
      color: '#ac89ff',
      glowColor: 'rgba(172, 137, 255, 0.3)',
      desc: t('landing.stats.active_desc'),
      icon: 'insights'
    },
    {
      key: 'success',
      label: t('landing.stats.success'),
      value: stats?.success || 0,
      color: '#34d399',
      glowColor: 'rgba(52, 211, 153, 0.3)',
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
      color: '#8ff5ff',
      glowColor: 'rgba(143, 245, 255, 0.3)',
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
          color: 'rgba(255, 255, 255, 0.05)',
          glowColor: 'transparent'
        }
      ]
    : segments.filter((s) => s.value > 0)

  // Find the details of active/hovered state
  const activeItem = segments.find((s) => s.key === hoveredKey)

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-[#8ff5ff]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#ac89ff]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold mb-4 text-[#ecedf6] tracking-tight">
          {t('landing.stats.title')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8ff5ff] to-[#ac89ff]">
            FundHive
          </span>
        </h2>
        <p className="text-[#a9abb3] text-lg max-w-2xl mx-auto font-light leading-relaxed">
          {t('landing.stats.desc')}
        </p>
      </motion.div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-stretch">
        {/* Left: Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((item, index) => {
            const isHovered = hoveredKey === item.key
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
                className="p-6 rounded-2xl bg-[#10131a] border transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[170px] cursor-pointer group"
                style={{
                  borderColor: isHovered ? item.color : 'rgba(46, 50, 59, 0.4)',
                  boxShadow: isHovered ? `0 0 25px ${item.glowColor}` : 'none'
                }}
              >
                {/* Subtle Hover Gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top right, ${item.color}, transparent 65%)`
                  }}
                />

                <div>
                  <span className="text-[12px] font-bold text-[#73757d] uppercase tracking-wider block mb-2">
                    {item.label}
                  </span>
                  <p className="text-[#a9abb3] text-sm font-light leading-snug">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-baseline justify-between mt-4">
                  <span
                    className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-[#ecedf6] transition-colors duration-300"
                    style={{ color: isHovered ? item.color : '#ecedf6' }}
                  >
                    {isLoading ? (
                      <span className="text-xl">...</span>
                    ) : (
                      <AnimatedCounter value={item.value} />
                    )}
                  </span>
                  <span
                    className="material-symbols-outlined text-[32px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: item.color }}
                  >
                    {item.icon}
                  </span>
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
            className="w-full h-full p-8 rounded-3xl bg-[#161a21] border border-[#2e323b]/50 relative overflow-hidden flex flex-col items-center justify-center min-h-[360px]"
          >
            {/* Center circular text */}
            <div className="absolute flex flex-col items-center justify-center pointer-events-none z-10">
              <span className="text-[10px] font-bold text-[#73757d] uppercase tracking-[0.2em] mb-1">
                {activeItem ? activeItem.label : t('landing.stats.total')}
              </span>
              <span
                className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-[#ecedf6] transition-colors duration-300"
                style={{
                  color: activeItem ? activeItem.color : '#8ff5ff'
                }}
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
                <div className="text-[#a9abb3]">Loading Chart...</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
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
                            opacity={
                              hoveredKey === null || isHovered ? 1 : 0.25
                            }
                            style={{
                              filter: isHovered
                                ? `drop-shadow(0px 0px 10px ${entry.color})`
                                : 'none',
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
