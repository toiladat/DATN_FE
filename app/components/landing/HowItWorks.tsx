import { LANDING_PAGE_DATA } from '../../data/mockData'
import { motion } from 'framer-motion'

export function HowItWorks() {
  const { howItWorks } = LANDING_PAGE_DATA

  return (
    <section className="py-32 bg-[#0a0c10] border-y border-[#2e323b]/30 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#ac89ff]/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <h2 className="text-5xl md:text-6xl font-['Space_Grotesk'] font-bold mb-6 text-[#ecedf6] tracking-tight">
            How It Works
          </h2>
          <p className="text-[#a9abb3] text-xl font-light leading-relaxed">
            Enter the future of decentralized capital in three simple steps.
            Secure, transparent, and direct.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16 relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-[4rem] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8ff5ff]/30 to-transparent z-0" />

          {howItWorks.map((step, index) => {
            const stepNumber = `0${index + 1}`
            const accentColor = index === 1 ? '#ac89ff' : '#8ff5ff'

            return (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: 'easeOut'
                }}
                key={index}
                className="relative group text-center md:text-left z-10"
              >
                <div className="relative mb-12 flex items-center justify-center md:justify-start h-32">
                  <div className="relative flex items-center justify-center w-32 h-32">
                    <div className="absolute inset-0 bg-[#10131a] rounded-full blur-md -z-20" />

                    {/* Icon Container */}
                    <div
                      className="relative w-20 h-20 rounded-full bg-[#161a21] border flex items-center justify-center group-hover:scale-110 transition-transform duration-700 ease-out z-10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                      style={{
                        borderColor: `${accentColor}50`,
                        boxShadow: `0 0 20px ${accentColor}20`
                      }}
                    >
                      <span
                        className="material-symbols-outlined text-4xl transition-colors duration-500"
                        style={{ color: accentColor }}
                      >
                        {step.icon}
                      </span>
                    </div>
                  </div>
                </div>
                <h4 className="text-2xl font-['Space_Grotesk'] font-bold mb-4 text-[#ecedf6] group-hover:text-white transition-colors duration-500">
                  {step.title}
                </h4>
                <p className="text-[#a9abb3] leading-relaxed font-light text-lg">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
