import { Button } from '@/components/ui/button'
import { ArrowRight, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { useGetProjectStats } from '@/apis/queries/project'

export function Hero() {
  const { t } = useTranslation()
  const { data: stats } = useGetProjectStats()

  const successRate =
    stats && stats.total > 0
      ? Math.round((stats.success / stats.total) * 100)
      : 100

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-40 pb-24 overflow-hidden bg-background">
      {/* Absolute Drenched Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[600px] bg-neon-cyan/10 rounded-[100%] blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[70vw] h-[700px] bg-neon-purple/5 rounded-[100%] blur-[180px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_80%)] pointer-events-none z-0" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAyIiBoZWlnaHQ9IjYwMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-30 z-0" />

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center relative z-10 px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-none border border-neon-cyan/35 bg-neon-cyan/5 text-neon-cyan text-[11px] font-bold tracking-[0.2em] uppercase mb-10 shadow-[0_0_15px_rgba(143,245,255,0.1)] backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
          </span>
          {t('hero.badge')}
        </motion.div>

        {/* Huge Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[105px] font-headline font-bold leading-[0.95] tracking-tighter text-foreground mb-8 drop-shadow-2xl max-w-5xl [text-wrap:balance]"
        >
          {t('hero.titleMain')} <br />
          <span className="text-neon-cyan drop-shadow-[0_0_20px_rgba(143,245,255,0.3)] font-extrabold">
            {t('hero.titleHighlight')}
          </span>{' '}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-16 font-light"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Cyberpunk Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <Link to="/launch-project">
            <Button className="relative h-16 px-10 bg-neon-cyan hover:bg-neon-cyan/95 text-background font-headline font-bold rounded-none hover:shadow-[0_0_30px_rgba(143,245,255,0.4)] transition-all duration-300 ease-out hover:-translate-y-0.5 flex items-center gap-3 text-[14px] uppercase tracking-[0.15em] group cursor-pointer border border-neon-cyan shadow-[4px_4px_0px_0px_var(--neon-purple)] hover:shadow-[6px_6px_0px_0px_var(--neon-purple)] active:translate-y-0.5 active:translate-x-0.5">
              {t('hero.btn.launch')}
              <svg
                className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </Button>
          </Link>
          <Link to="/projects">
            <Button
              variant="outline"
              className="relative h-16 px-10 bg-transparent text-foreground border border-foreground/50 font-headline font-bold rounded-none hover:bg-foreground/5 hover:border-foreground transition-all duration-300 ease-out text-[14px] uppercase tracking-[0.15em] cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] active:translate-y-0.5 active:translate-x-0.5"
            >
              {t('hero.btn.explore')}
            </Button>
          </Link>
        </motion.div>

        {/* HUD Telemetry stats board */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="mt-32 w-full max-w-4xl relative border border-border/30 bg-card/10 backdrop-blur-md px-8 py-8 md:px-12 md:py-10 shadow-[0_12px_40px_rgba(0,0,0,0.1)] rounded-none"
        >
          {/* Cyberpunk corner notches */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-cyan" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-cyan" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-cyan" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-cyan" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 relative items-center">
            {/* Pool Value Metric */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left md:pl-6">
              <span className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.3em] font-mono mb-2">
                {t('hero.stats.poolLabel')}
              </span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-neon-cyan drop-shadow-[0_0_15px_rgba(143,245,255,0.25)] font-mono tracking-tight">
                {stats ? `${successRate}%` : t('hero.stats.poolValue')}
              </span>
            </div>

            {/* Middle Divider */}
            <div className="h-16 w-[1px] bg-border/25 hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2" />

            {/* Protocol Status Metric */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right md:pr-6">
              <span className="text-[10px] text-neon-purple/70 uppercase tracking-[0.3em] font-mono mb-2">
                {t('hero.stats.tag')}
              </span>
              <span className="text-2xl md:text-3xl lg:text-4xl font-headline font-bold text-foreground tracking-tight">
                {t('hero.stats.title')}
              </span>
            </div>

            {/* Dynamic Project Counts Sub-Panel */}
            {stats && (
              <>
                <div className="border-t border-dashed border-border/25 col-span-1 md:col-span-2 my-6" />
                <div className="col-span-1 md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-y-4 gap-x-2 text-center text-[10px] font-mono tracking-wider text-muted-foreground/80">
                  <div className="flex flex-col items-center gap-1 border-r border-border/10 sm:border-r">
                    <span className="text-[9px] text-muted-foreground/50 uppercase tracking-[0.15em]">
                      {t('landing.stats.total')}
                    </span>
                    <span className="text-foreground text-sm font-bold">
                      {stats.total}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-none sm:border-r border-border/10">
                    <span className="text-[9px] text-amber-500/80 uppercase tracking-[0.15em]">
                      {t('landing.stats.fundraising')}
                    </span>
                    <span className="text-foreground text-sm font-bold">
                      {stats.fundraising}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-r border-border/10 sm:border-r">
                    <span className="text-[9px] text-neon-purple/80 uppercase tracking-[0.15em]">
                      {t('landing.stats.active')}
                    </span>
                    <span className="text-foreground text-sm font-bold">
                      {stats.active}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[9px] text-emerald-500/80 uppercase tracking-[0.15em]">
                      {t('landing.stats.success')}
                    </span>
                    <span className="text-foreground text-sm font-bold">
                      {stats.success}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
