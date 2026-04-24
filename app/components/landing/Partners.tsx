import { Box, Code, Hexagon } from 'lucide-react'
import { motion } from 'framer-motion'

export function Partners() {
  const partners = [
    {
      name: 'Ethereum',
      icon: (
        <Code className="text-4xl group-hover:text-[#8ff5ff] transition-colors duration-500" />
      )
    },
    {
      name: 'Solana',
      icon: (
        <Box className="text-4xl group-hover:text-[#ac89ff] transition-colors duration-500" />
      )
    },
    {
      name: 'Polygon',
      icon: (
        <Hexagon className="text-4xl group-hover:text-[#8ff5ff] transition-colors duration-500" />
      )
    },
    {
      name: 'Avalanche',
      icon: (
        <div className="w-10 h-10 rounded-full border border-[#2e323b] flex items-center justify-center group-hover:border-[#ff716c]/50 group-hover:bg-[#ff716c]/10 transition-colors duration-500">
          <div className="w-4 h-4 bg-[#a9abb3] group-hover:bg-[#ff716c] rounded-[2px] rotate-45 transform transition-colors duration-500"></div>
        </div>
      )
    }
  ]

  // Duplicate array multiple times to ensure enough width for seamless scrolling
  // Using 4 sets means the container will be very wide, and animating to -50%
  // will perfectly loop it seamlessly.
  const duplicatedPartners = [
    ...partners,
    ...partners,
    ...partners,
    ...partners
  ]

  return (
    <section className="py-8 border-y border-[#2e323b]/30 bg-[#0d0f14] overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-[#0d0f14] via-transparent to-[#0d0f14] pointer-events-none z-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-[#8ff5ff]/5 to-transparent pointer-events-none" />

      <div className="relative z-10 w-full">
        <p className="text-center text-[10px] font-bold tracking-[0.4em] text-[#73757d] uppercase mb-6">
          Powering Projects On
        </p>

        {/* Marquee Container */}
        <div className="flex overflow-hidden relative">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 20, // Adjust speed here
              ease: 'linear',
              repeat: Infinity
            }}
            className="flex items-center gap-16 md:gap-32 w-max px-8"
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center gap-4 text-[#a9abb3] hover:text-[#ecedf6] transition-colors duration-500 ease-out group cursor-pointer shrink-0"
              >
                {partner.icon}
                <span className="font-['Space_Grotesk'] font-bold text-2xl">
                  {partner.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
