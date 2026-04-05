import { Button } from '@/components/ui/button'
import { ArrowRight, Rocket } from 'lucide-react'
import { LANDING_PAGE_DATA } from '../../data/mockData'

export function Hero() {
  const { hero } = LANDING_PAGE_DATA

  return (
    <section className="relative min-h-[921px] flex items-center justify-center py-24 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10 px-4">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium tracking-wider uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {hero.badge}
          </div>

          <h1 className="text-5xl md:text-7xl font-headline font-bold leading-[1.1] tracking-tighter text-on-surface">
            {hero.titleMain}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {hero.titleHighlight}
            </span>{' '}
            {hero.titleEnd}
          </h1>

          <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
            {hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button className="h-14 px-8 bg-primary text-primary-foreground font-bold rounded-xl hover:shadow-[0_0_25px_rgba(143,245,255,0.4)] transition-all flex items-center gap-2 group text-base">
              Launch Your Project
              <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              className="h-14 px-8 glass-panel text-on-surface border-border font-bold rounded-xl hover:bg-foreground/10 transition-all text-base bg-transparent"
            >
              Explore Projects
            </Button>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[2rem] blur-2xl"></div>
          <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-border glass-panel p-4">
            <img
              alt="Decentralized Tech"
              className="w-full h-full object-cover rounded-2xl opacity-80"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcaoCOl4FCihJy4AVGzmLF5ldIat4n02cW1ffAEscf32T-QesjFa24vNp4BHhEzJ7TqihArKl1JbZgOPf2-3q9Js1Od8n8oXcghSkBaBeNGm_fbPcejMcew4g0OF6UDCBYRotWGxfY_Xd_QoHzlVclhhv05kIzcWTjsYoH3OP8CKXZVgRjhMbsw2Zb7NBbMLfJ-wcWiRK-I96SdXqy3bMtqKSKCwVswKqYKwispE07kDsJHhMAfEPJIiaJpFkh__D5D5Pj8DJq1-Y"
            />
            <div className="absolute bottom-12 left-12 right-12 glass-panel p-6 rounded-2xl border border-border">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-primary font-mono mb-1">
                    {hero.stats.tag}
                  </p>
                  <h3 className="text-xl font-headline font-bold text-foreground">
                    {hero.stats.title}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="text-xs text-on-surface-variant uppercase">
                    {hero.stats.poolLabel}
                  </p>
                  <p className="text-lg font-bold text-secondary">
                    {hero.stats.poolValue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
