import { Link } from 'react-router'
import { ArrowRight, Terminal, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useGetProjects } from '@/apis/queries/project'
import { ProjectDirectoryCard } from '@/components/projectsPage/ProjectDirectoryCard'

export function FeaturedProjects() {
  const { data, isLoading } = useGetProjects(1, 6, '', '', 'trending')
  const projects = data?.projects || []

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
          <h2 className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold mb-4 text-[#ecedf6] tracking-tight">
            Active Funding Pools
          </h2>
          <p className="text-[#a9abb3] text-lg max-w-lg font-light leading-relaxed">
            Vetted decentralized projects ready for capital injection. Governed
            by smart contracts, transparent to the world.
          </p>
        </div>
        <button className="flex items-center gap-2 text-[#8ff5ff] font-bold hover:text-[#a6fcff] transition-colors uppercase tracking-widest text-sm group">
          View All Active Pools
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* Slider Container */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#8ff5ff]" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-[#73757d]">
          No active projects found.
        </div>
      ) : (
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-8 no-scrollbar items-stretch">
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
