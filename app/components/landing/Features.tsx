import { CheckCircle } from 'lucide-react'
import { LANDING_PAGE_DATA } from '../../data/mockData'
import { motion } from 'framer-motion'

export function Features() {
  const { features } = LANDING_PAGE_DATA

  return (
    <section className="py-32 px-4 max-w-7xl mx-auto relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-[#8ff5ff]/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col lg:flex-row gap-16 mb-24 relative z-10 items-end"
      >
        <div className="flex-1 space-y-6">
          <h2 className="text-5xl md:text-6xl font-['Space_Grotesk'] font-bold leading-[1.1] text-[#ecedf6] tracking-tight">
            Trust Built into the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8ff5ff] to-[#ac89ff]">
              Source Code.
            </span>
          </h2>
        </div>
        <div className="flex-1 space-y-8">
          <p className="text-xl text-[#a9abb3] leading-relaxed font-light">
            Unlike traditional crowdfunding, RadiantVoid eliminates the "blind
            trust" factor. Every commitment is governed by immutable code,
            audited by leading security firms, and transparent to the entire
            world.
          </p>
          <div className="flex gap-6">
            <div className="flex items-center gap-2 text-[#8ff5ff] text-sm font-bold uppercase tracking-widest">
              <CheckCircle className="w-4 h-4" /> Multi-sig
            </div>
            <div className="flex items-center gap-2 text-[#ac89ff] text-sm font-bold uppercase tracking-widest">
              <CheckCircle className="w-4 h-4" /> ZK-Proofs
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {features.map((feature, index) => {
          // Asymmetrical layout mapping
          const spanClass =
            index === 0 || index === 3 ? 'md:col-span-2' : 'md:col-span-1'
          const bgClass = index % 2 === 0 ? 'bg-[#161a21]' : 'bg-[#10131a]'
          const accentColor =
            feature.iconColor === 'cyan' ? '#8ff5ff' : '#ac89ff'

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
              className={`p-10 rounded-3xl ${bgClass} border border-[#2e323b]/50 hover:border-[${accentColor}]/50 transition-all duration-700 ease-out group relative overflow-hidden flex flex-col justify-between min-h-[320px] ${spanClass}`}
            >
              {/* Subtle hover gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-out pointer-events-none"
                style={{
                  background: `radial-gradient(circle at top right, ${accentColor}, transparent 70%)`
                }}
              />

              <div className="relative z-10">
                <span
                  className="material-symbols-outlined text-[48px] mb-8 transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-110"
                  style={{
                    fontVariationSettings: "'FILL' 1",
                    color: accentColor
                  }}
                >
                  {feature.icon}
                </span>
                <h5 className="text-2xl font-['Space_Grotesk'] font-bold text-[#ecedf6] mb-4">
                  {feature.title}
                </h5>
              </div>
              <p className="text-[#a9abb3] text-lg leading-relaxed relative z-10 font-light">
                {feature.description}
              </p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
