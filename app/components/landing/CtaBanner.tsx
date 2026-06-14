import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

export function CtaBanner() {
  const { t } = useTranslation()
  const { openConnectModal } = useConnectModal()
  const { isConnected } = useAccount()

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto relative">
      <div className="absolute inset-0 bg-neon-cyan/5 blur-3xl rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative rounded-none p-12 md:p-24 overflow-hidden text-center bg-card/25 backdrop-blur-md border border-border/40 shadow-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] group"
      >
        {/* Glow & Mesh background overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5 group-hover:from-neon-cyan/10 transition-colors duration-1000 ease-out z-0"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAyIiBoZWlnaHQ9IjYwMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gPGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMjUpIi8+PC9zdmc+')] opacity-25 pointer-events-none z-0" />

        {/* Technical Corner Brackets */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-cyan" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-cyan" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-cyan" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-cyan" />

        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold mb-8 max-w-4xl mx-auto text-foreground tracking-tight leading-[1.1] [text-wrap:balance]">
            {t('landing.cta_title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-16 max-w-2xl mx-auto font-light leading-relaxed">
            {t('landing.cta_desc')}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
            {!isConnected && openConnectModal && (
              <Button
                onClick={openConnectModal}
                className="h-16 bg-neon-cyan text-background font-headline font-bold px-12 rounded-none hover:bg-neon-cyan/95 hover:-translate-y-0.5 transition-all duration-300 ease-out shadow-[4px_4px_0px_0px_var(--neon-purple)] hover:shadow-[6px_6px_0px_0px_var(--neon-purple)] flex items-center justify-center gap-3 text-[14px] uppercase tracking-[0.15em] cursor-pointer border border-neon-cyan active:translate-y-0.5 active:translate-x-0.5"
              >
                <Wallet className="w-5 h-5" />
                {t('landing.cta_btn_connect')}
              </Button>
            )}
            <Button
              variant="outline"
              className="h-16 bg-transparent text-foreground border border-foreground/50 font-headline font-bold px-12 rounded-none hover:bg-foreground/5 hover:border-foreground transition-all duration-300 ease-out text-[14px] uppercase tracking-[0.15em] cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] active:translate-y-0.5 active:translate-x-0.5"
            >
              {t('landing.cta_btn_contact')}
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
