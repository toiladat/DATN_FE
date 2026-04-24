import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'
import { motion } from 'framer-motion'

export function CtaBanner() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative">
      <div className="absolute inset-0 bg-[#8ff5ff]/5 blur-3xl rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative rounded-[3rem] p-12 md:p-24 overflow-hidden text-center bg-[#10131a] border border-[#2e323b]/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#8ff5ff]/10 via-transparent to-[#ac89ff]/10 group-hover:from-[#8ff5ff]/20 transition-colors duration-1000 ease-out z-0"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#8ff5ff]/20 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#ac89ff]/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <div className="relative z-10">
          <h2 className="text-5xl md:text-7xl font-['Space_Grotesk'] font-bold mb-8 max-w-4xl mx-auto text-[#ecedf6] tracking-tight leading-[1.1]">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl md:text-2xl text-[#a9abb3] mb-16 max-w-2xl mx-auto font-light leading-relaxed">
            Connect Your Wallet and join the revolution of decentralized
            innovation today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
            <Button className="h-16 bg-[#8ff5ff] text-[#0a0c10] font-['Space_Grotesk'] font-bold px-12 rounded-full hover:bg-[#a6fcff] hover:-translate-y-1 transition-all duration-500 ease-out shadow-[0_0_30px_rgba(143,245,255,0.3)] hover:shadow-[0_0_50px_rgba(143,245,255,0.5)] flex items-center justify-center gap-3 text-[15px] uppercase tracking-[0.1em]">
              <Wallet className="w-5 h-5" />
              Connect Wallet Now
            </Button>
            <Button
              variant="outline"
              className="h-16 bg-transparent text-[#ecedf6] border border-[#2e323b]/80 font-['Space_Grotesk'] font-bold px-12 rounded-full hover:bg-[#ecedf6]/5 hover:border-[#ecedf6]/30 transition-all duration-500 ease-out text-[15px] uppercase tracking-[0.1em]"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
