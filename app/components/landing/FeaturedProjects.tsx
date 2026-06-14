import { Link } from 'react-router'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useGetProjects } from '@/apis/queries/project'
import { ProjectDirectoryCard } from '@/components/projectsPage/ProjectDirectoryCard'
import { useTranslation } from 'react-i18next'
import { useRef } from 'react'

export function FeaturedProjects() {
  const { t } = useTranslation()
  const { data, isLoading } = useGetProjects(1, 6, '', '', 'trending')
  const projects = data?.projects || []
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="py-32 px-4 max-w-7xl mx-auto relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(143,245,255,0.03)_0%,transparent_70%)] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 relative z-10"
      >
        <div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4 text-foreground tracking-tight">
            {t('landing.featured_pools')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg font-light leading-relaxed">
            {t('landing.featured_pools_desc')}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Scroll Buttons */}
          <div className="hidden md:flex gap-2 mr-4">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 border border-border/80 rounded-none flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground active:translate-y-0.5 active:translate-x-0.5 transition-all duration-200 cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.1)]"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 border border-border/80 rounded-none flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground active:translate-y-0.5 active:translate-x-0.5 transition-all duration-200 cursor-pointer shadow-[2px_2px_0px_rgba(0,0,0,0.1)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.1)]"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <Link to="/projects">
            <button className="flex items-center gap-2 text-neon-cyan font-bold hover:text-neon-cyan/80 transition-colors uppercase tracking-widest text-xs group cursor-pointer h-10 px-4 border border-neon-cyan/30 rounded-none bg-neon-cyan/5">
              {t('landing.view_all_pools')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </motion.div>

      {/* Slider Container */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-neon-cyan" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground font-mono text-sm">
          // {t('landing.no_active_projects')}
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 no-scrollbar items-stretch"
        >
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="w-[calc(100vw-32px)] md:w-[calc(50vw-48px)] lg:w-[calc(33.333vw-64px)] shrink-0 snap-start max-w-[400px]"
            >
              <ProjectDirectoryCard project={project} index={idx} />
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
