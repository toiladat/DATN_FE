import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export function HowItWorks() {
  const { t } = useTranslation()

  const howItWorks = [
    {
      title: t('landing.step1_title'),
      description: t('landing.step1_desc')
    },
    {
      title: t('landing.step2_title'),
      description: t('landing.step2_desc')
    },
    {
      title: t('landing.step3_title'),
      description: t('landing.step3_desc')
    }
  ]

  return (
    <section className="py-32 bg-background border-y border-border/20 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-neon-purple/5 rounded-[100%] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-neon-cyan/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          {/* Left Column: Sticky Title */}
          <div className="lg:col-span-4 lg:sticky lg:top-36 space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground tracking-tight leading-[1.05]">
              {t('landing.how_it_works')}
            </h2>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              {t('landing.how_it_works_desc')}
            </p>
          </div>

          {/* Right Column: Vertical Timeline */}
          <div className="lg:col-span-8 relative pl-0 md:pl-8 space-y-12">
            {/* Vertical connecting line */}
            <div className="absolute left-0 md:left-12 top-2 bottom-2 w-[1px] bg-gradient-to-b from-neon-cyan/40 via-neon-purple/40 to-transparent z-0 hidden md:block" />

            {howItWorks.map((step, index) => {
              const accentColor =
                index === 1 ? 'var(--neon-purple)' : 'var(--neon-cyan)'
              const accentShadow =
                index === 1
                  ? 'shadow-[4px_4px_0px_0px_var(--neon-purple)]'
                  : 'shadow-[4px_4px_0px_0px_var(--neon-cyan)]'
              const hoverShadow =
                index === 1
                  ? 'hover:shadow-[6px_6px_0px_0px_var(--neon-purple)]'
                  : 'hover:shadow-[6px_6px_0px_0px_var(--neon-cyan)]'
              const accentBorder =
                index === 1
                  ? 'hover:border-neon-purple/55'
                  : 'hover:border-neon-cyan/55'

              return (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.15,
                    ease: 'easeOut'
                  }}
                  key={index}
                  className="relative flex flex-col md:flex-row gap-6 md:gap-10 items-start z-10 group"
                >
                  {/* Timeline Node Point (hidden on mobile) */}
                  <div className="hidden md:flex items-center justify-center w-24 h-24 shrink-0 bg-background relative z-10">
                    <div
                      className="w-12 h-12 rounded-none border-2 flex items-center justify-center bg-card transition-all duration-500 group-hover:rotate-45"
                      style={{ borderColor: accentColor }}
                    >
                      <span
                        className="font-mono text-xs font-bold transition-all duration-500 group-hover:-rotate-45"
                        style={{ color: accentColor }}
                      >
                        0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Step Card */}
                  <div
                    className={`flex-1 bg-card/25 backdrop-blur-sm border border-border/40 p-8 rounded-none transition-all duration-300 ease-out flex flex-col sm:flex-row gap-6 items-start ${accentShadow} ${hoverShadow} ${accentBorder}`}
                  >
                    {/* Inline custom SVG representing step action */}
                    <div
                      className="w-12 h-12 shrink-0 border flex items-center justify-center bg-card/60"
                      style={{
                        borderColor: `${accentColor}40`,
                        color: accentColor
                      }}
                    >
                      {index === 0 && (
                        /* Launch Icon: stylized triangle/rocket */
                        <svg
                          className="w-5 h-5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2L2 22h20L12 2zm0 4l6 12H6l6-12z" />
                        </svg>
                      )}
                      {index === 1 && (
                        /* Verify / Escrow Icon: shield check */
                        <svg
                          className="w-5 h-5 fill-none stroke-current"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      )}
                      {index === 2 && (
                        /* Release / Claim Icon: coins */
                        <svg
                          className="w-5 h-5 fill-none stroke-current"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xl font-headline font-bold text-foreground">
                        {step.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed font-light text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
