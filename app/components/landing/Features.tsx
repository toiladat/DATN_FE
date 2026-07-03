import { CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function Features() {
  const { t } = useTranslation()

  const features = [
    {
      id: 'lock',
      title: t('landing.feature1_title'),
      description: t('landing.feature1_desc'),
      iconColor: 'cyan'
    },
    {
      id: 'groups',
      title: t('landing.feature2_title'),
      description: t('landing.feature2_desc'),
      iconColor: 'purple'
    },
    {
      id: 'query_stats',
      title: t('landing.feature3_title'),
      description: t('landing.feature3_desc'),
      iconColor: 'cyan'
    },
    {
      id: 'security',
      title: t('landing.feature4_title'),
      description: t('landing.feature4_desc'),
      iconColor: 'purple'
    }
  ]

  return (
    <section className="pt-12 pb-18 px-4 max-w-7xl mx-auto relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-neon-cyan/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col lg:flex-row gap-16 mb-24 relative z-10 items-end"
      >
        <div className="flex-1 space-y-6">
          <h2 className="text-5xl md:text-6xl font-headline font-bold leading-[1.1] text-foreground tracking-tight">
            {t('landing.features_title')} <br />
            <span className="text-neon-cyan">
              {t('landing.features_title_highlight')}
            </span>
          </h2>
        </div>
        <div className="flex-1 space-y-8">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t('landing.features_desc')}
          </p>
          <div className="flex gap-6">
            <div className="flex items-center gap-2 text-neon-cyan text-sm font-bold uppercase tracking-widest">
              <CheckCircle className="w-4 h-4" /> Multi-sig
            </div>
            <div className="flex items-center gap-2 text-neon-purple text-sm font-bold uppercase tracking-widest">
              <CheckCircle className="w-4 h-4" /> ZK-Proofs
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        {features.map((feature, index) => {
          const bgClass =
            index % 2 === 0 ? 'bg-card/40' : 'bg-surface-container-low/30'
          const hoverBorderClass =
            feature.iconColor === 'cyan'
              ? 'hover:border-neon-cyan/40'
              : 'hover:border-neon-purple/40'
          const accentColorVal =
            feature.iconColor === 'cyan'
              ? 'var(--neon-cyan)'
              : 'var(--neon-purple)'

          return (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: 'easeOut'
              }}
              key={index}
              className={`p-8 rounded-none ${bgClass} border border-border/40 ${hoverBorderClass} backdrop-blur-sm transition-all duration-700 ease-out group relative overflow-hidden flex flex-col gap-4 min-h-[220px] col-span-1`}
            >
              {/* Subtle hover gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-out pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top right, ${accentColorVal}, transparent 70%)`
                }}
              />

              <div className="relative z-10">
                {/* SVG renderers */}
                {feature.id === 'lock' && (
                  <svg
                    className="w-12 h-12 mb-8 transition-transform duration-500 ease-out group-hover:-translate-y-1"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="4"
                      y="10"
                      width="16"
                      height="11"
                      rx="0.5"
                      stroke={accentColorVal}
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 10V7c0-2.21 1.79-4 4-4s4 1.79 4 4v3"
                      stroke={accentColorVal}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 13v3"
                      stroke={accentColorVal}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="12" cy="14.5" r="1" fill={accentColorVal} />
                  </svg>
                )}

                {feature.id === 'groups' && (
                  <svg
                    className="w-12 h-12 mb-8 transition-transform duration-500 ease-out group-hover:-translate-y-1"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M17 21v-2a3 3 0 00-3-3H10a3 3 0 00-3 3v2"
                      stroke={accentColorVal}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="12"
                      cy="11"
                      r="3"
                      stroke={accentColorVal}
                      strokeWidth="1.5"
                    />
                    <path
                      d="M21 21v-2a3 3 0 00-2-2.82M18 8a3 3 0 00-2.24-2.92"
                      stroke={accentColorVal}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="opacity-60"
                    />
                    <path
                      d="M3 21v-2a3 3 0 012-2.82M6 8a3 3 0 012.24-2.92"
                      stroke={accentColorVal}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="opacity-60"
                    />
                  </svg>
                )}

                {feature.id === 'query_stats' && (
                  <svg
                    className="w-12 h-12 mb-8 transition-transform duration-500 ease-out group-hover:-translate-y-1"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M4 20h16M4 20V4M8 20v-6M12 20v-10M16 20v-14"
                      stroke={accentColorVal}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 14l4-4 4 4 4-6"
                      stroke={accentColorVal}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-70"
                    />
                  </svg>
                )}

                {feature.id === 'security' && (
                  <svg
                    className="w-12 h-12 mb-8 transition-transform duration-500 ease-out group-hover:-translate-y-1"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                      stroke={accentColorVal}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 11l2 2 4-4"
                      stroke={accentColorVal}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}

                <h5 className="text-2xl font-headline font-bold text-foreground mb-4">
                  {feature.title}
                </h5>
              </div>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed relative z-10">
                {feature.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
