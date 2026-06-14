import { Box, Code, Hexagon } from 'lucide-react'
import { motion } from 'framer-motion'

export function Partners() {
  const partners = [
    {
      name: 'Ethereum',
      icon: (
        <svg
          className="w-8 h-8 text-muted-foreground group-hover:text-neon-cyan transition-colors duration-500 fill-current"
          viewBox="0 0 784 1277"
        >
          <path
            d="M392 0L383.5 28.5V868.5L392 877L784 645L392 0Z"
            fill="currentColor"
          />
          <path
            d="M392 0L0 645L392 877V469.5V0Z"
            fill="currentColor"
            className="opacity-70"
          />
          <path
            d="M392 956L387 962V1271.5L392 1277L784 724L392 956Z"
            fill="currentColor"
          />
          <path
            d="M392 1277V956L0 724L392 1277Z"
            fill="currentColor"
            className="opacity-70"
          />
          <path
            d="M392 877L784 645L392 516.5V877Z"
            fill="currentColor"
            className="opacity-90"
          />
          <path
            d="M0 645L392 877V516.5L0 645Z"
            fill="currentColor"
            className="opacity-60"
          />
        </svg>
      )
    },
    {
      name: 'Solana',
      icon: (
        <svg
          className="w-8 h-7 text-muted-foreground group-hover:text-neon-purple transition-colors duration-500 fill-current"
          viewBox="0 0 256 200"
        >
          <path d="M15.4 0h220.6l-20 40H15.4l20-40zm225.2 80H20l20 40h220.6l-20-40zM15.4 160h220.6l-20 40H15.4l20-40z" />
        </svg>
      )
    },
    {
      name: 'Polygon',
      icon: (
        <svg
          className="w-8 h-8 text-muted-foreground group-hover:text-neon-cyan transition-colors duration-500 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 8v8l10 6 10-6V8L12 2zm8 13.5l-8 4.8-8-4.8V8.5l8-4.8 8 4.8v7z" />
        </svg>
      )
    },
    {
      name: 'Avalanche',
      icon: (
        <svg
          className="w-8 h-8 text-muted-foreground group-hover:text-neon-rose transition-colors duration-500 fill-current"
          viewBox="0 0 256 256"
        >
          <path d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0zm61.5 174H66.5l30.8-53.3h61.5l30.7 53.3zm-30.8-53.3H97.3l30.7-53.3 30.8 53.3z" />
        </svg>
      )
    }
  ]

  // Duplicate array multiple times to ensure enough width for seamless scrolling
  const duplicatedPartners = [
    ...partners,
    ...partners,
    ...partners,
    ...partners,
    ...partners
  ]

  return (
    <section className="py-10 border-y border-border/20 bg-card/40 backdrop-blur-sm overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-card via-transparent via-15% to-transparent to-85% to-card pointer-events-none z-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(143,245,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 w-full">
        <p className="text-center text-[10px] font-mono font-bold tracking-[0.35em] text-muted-foreground/60 uppercase mb-8">
          Powering Projects On
        </p>

        {/* Marquee Container */}
        <div className="flex overflow-hidden relative w-full">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 25,
              ease: 'linear',
              repeat: Infinity
            }}
            className="flex items-center gap-20 md:gap-32 w-max px-8"
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center gap-4 text-muted-foreground hover:text-foreground transition-colors duration-500 ease-out group cursor-pointer shrink-0"
              >
                <div className="transform group-hover:scale-110 transition-transform duration-500 ease-out">
                  {partner.icon}
                </div>
                <span className="font-headline font-bold text-2xl tracking-tight">
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
