import { Box, Code, Hexagon } from 'lucide-react'

export function Partners() {
  return (
    <section className="py-12 border-y border-white/5 bg-surface-container-low/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-xs font-bold tracking-[0.3em] text-on-surface-variant uppercase mb-10">
          Powering Projects On
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-3">
            <Code className="text-3xl" />
            <span className="font-headline font-bold text-xl">Ethereum</span>
          </div>
          <div className="flex items-center gap-3">
            <Box className="text-3xl" />
            <span className="font-headline font-bold text-xl">Solana</span>
          </div>
          <div className="flex items-center gap-3">
            <Hexagon className="text-3xl" />
            <span className="font-headline font-bold text-xl">Polygon</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center">
              <div className="w-4 h-4 bg-red-500 rounded-sm rotate-45 transform"></div>
            </div>
            <span className="font-headline font-bold text-xl">Avalanche</span>
          </div>
        </div>
      </div>
    </section>
  )
}
