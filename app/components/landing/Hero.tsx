import { Button } from '@/components/ui/button'
import { ArrowRight, Rocket } from 'lucide-react'
import { LANDING_PAGE_DATA } from '../../data/mockData'
import { motion } from 'framer-motion'

export function Hero() {
  const { hero } = LANDING_PAGE_DATA

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-40 pb-24 overflow-hidden bg-[#0a0c10]">
      {/* Absolute Drenched Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[600px] bg-[#8ff5ff]/15 rounded-[100%] blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[70vw] h-[700px] bg-[#ac89ff]/10 rounded-[100%] blur-[180px] pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,#0a0c10_80%)] pointer-events-none z-0" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30 z-0" />

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center relative z-10 px-4">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#8ff5ff]/20 bg-[#8ff5ff]/5 text-[#8ff5ff] text-[11px] font-bold tracking-[0.2em] uppercase mb-10 shadow-[0_0_30px_rgba(143,245,255,0.1)] backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8ff5ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8ff5ff]"></span>
          </span>
          {hero.badge}
        </motion.div>

        {/* Huge Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-6xl md:text-8xl lg:text-[110px] font-['Space_Grotesk'] font-bold leading-[0.9] tracking-tighter text-[#ecedf6] mb-8 drop-shadow-2xl max-w-5xl"
        >
          {hero.titleMain}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8ff5ff] via-[#ac89ff] to-[#8ff5ff] drop-shadow-[0_0_40px_rgba(143,245,255,0.3)] bg-[length:200%_auto] animate-gradient">
            {hero.titleHighlight}
          </span>{' '}
          {hero.titleEnd}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-xl md:text-2xl text-[#a9abb3] max-w-3xl leading-relaxed mb-16 font-light"
        >
          {hero.subtitle}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <Button className="h-16 px-10 bg-[#8ff5ff] text-[#0a0c10] font-['Space_Grotesk'] font-bold rounded-full hover:bg-[#a6fcff] shadow-[0_0_40px_rgba(143,245,255,0.4)] hover:shadow-[0_0_60px_rgba(143,245,255,0.6)] transition-all duration-500 ease-out hover:-translate-y-1 flex items-center gap-3 text-[15px] uppercase tracking-[0.1em] group">
            Launch Your Project
            <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
          </Button>
          <Button
            variant="outline"
            className="h-16 px-10 bg-transparent text-[#ecedf6] border border-[#2e323b] font-['Space_Grotesk'] font-bold rounded-full hover:bg-[#ecedf6]/5 hover:border-[#ecedf6]/30 transition-all duration-500 ease-out text-[15px] uppercase tracking-[0.1em]"
          >
            Explore Projects
          </Button>
        </motion.div>

        {/* Stats Strip instead of generic card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="mt-32 pt-16 w-full max-w-4xl flex flex-col md:flex-row justify-center items-center gap-16 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#8ff5ff] to-transparent opacity-50" />

          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-5xl md:text-7xl font-['Space_Grotesk'] font-bold text-[#8ff5ff] drop-shadow-[0_0_20px_rgba(143,245,255,0.3)]">
              {hero.stats.poolValue}
            </span>
            <span className="text-[11px] text-[#73757d] uppercase tracking-[0.2em] font-bold">
              {hero.stats.poolLabel}
            </span>
          </div>
          <div className="h-20 w-[1px] bg-[#2e323b]/50 hidden md:block" />
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="text-3xl md:text-4xl font-['Space_Grotesk'] font-bold text-[#ecedf6]">
              {hero.stats.title}
            </span>
            <span className="text-[11px] text-[#ac89ff] uppercase tracking-[0.2em] font-bold">
              {hero.stats.tag}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
