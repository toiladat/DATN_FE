import { Link } from 'react-router'
import { ArrowRight, Terminal } from 'lucide-react'
import { LANDING_PAGE_DATA } from '../../data/mockData'
import { motion } from 'framer-motion'

export function FeaturedProjects() {
  const { featuredProjects } = LANDING_PAGE_DATA

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

      {/* 3-Column Grid for DB Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project, idx) => {
          // Dynamic accent color based on category or index
          const accentColor =
            idx % 3 === 0 ? '#8ff5ff' : idx % 3 === 1 ? '#ac89ff' : '#ff716c'

          return (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: 'easeOut' }}
              key={project.id}
              className="h-full"
            >
              <Link
                to={`/campaign/${project.id}`}
                className="group bg-[#10131a] rounded-[2rem] overflow-hidden border border-[#2e323b]/50 hover:border-[#2e323b] transition-all duration-500 ease-out flex flex-col relative h-full shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Hover Glow Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-out pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top, ${accentColor}, transparent 70%)`
                  }}
                />

                {/* Image Header */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    alt={`${project.category} Project`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-60 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                    src={project.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10131a] via-[#10131a]/50 to-transparent" />

                  {/* Category Badge */}
                  <div
                    className="absolute top-4 left-4 bg-[#0a0c10]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#2e323b] text-[10px] font-bold uppercase tracking-[0.2em] z-10 shadow-lg"
                    style={{ color: accentColor }}
                  >
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-0 space-y-6 flex-1 flex flex-col justify-between relative z-10">
                  <div>
                    <h3 className="text-xl font-['Space_Grotesk'] font-bold text-[#ecedf6] mb-4 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>

                    {/* Progress Section */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#73757d]">
                        <span>Progress</span>
                        <span style={{ color: accentColor }}>
                          {project.raisedPercent}%
                        </span>
                      </div>
                      <div className="h-1 w-full bg-[#161a21] rounded-full overflow-hidden relative border border-[#2e323b]/50">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${project.raisedPercent}%`,
                            backgroundColor: accentColor,
                            boxShadow: `0 0 10px ${accentColor}`
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[11px] font-mono text-[#a9abb3]">
                        <span>
                          {project.raisedAmount} {project.currency}
                        </span>
                        <span>
                          {project.targetAmount} {project.currency}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tech HUD Stats */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#2e323b]/50 bg-[#10131a]/50">
                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] text-[#73757d] uppercase tracking-widest font-bold flex items-center gap-1.5">
                        <Terminal className="w-3 h-3" /> Backers
                      </p>
                      <p className="font-mono text-base text-[#ecedf6]">
                        {project.backers}
                      </p>
                    </div>
                    <div className="flex flex-col gap-1 text-right items-end">
                      <p className="text-[10px] text-[#73757d] uppercase tracking-widest font-bold">
                        Days Left
                      </p>
                      <p className="font-mono text-base text-[#ecedf6]">
                        {project.daysLeft}
                      </p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="pt-1">
                    <button
                      className="w-full py-3.5 bg-[#161a21] hover:bg-[#1a1f28] text-[#ecedf6] border border-[#2e323b] rounded-xl font-['Space_Grotesk'] font-bold transition-all duration-500 ease-out text-[11px] uppercase tracking-widest flex justify-center items-center gap-2 group-hover:border-transparent"
                      style={{
                        boxShadow: `0 4px 20px rgba(0,0,0,0.3)`
                      }}
                    >
                      <span
                        className="transition-all duration-500"
                        style={{ color: accentColor }}
                      >
                        Support Project
                      </span>
                      <ArrowRight
                        className="w-4 h-4 transition-colors"
                        style={{ color: accentColor }}
                      />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
