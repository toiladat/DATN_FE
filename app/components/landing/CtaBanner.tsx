import { Button } from '@/components/ui/button'
import { Wallet } from 'lucide-react'

export function CtaBanner() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="relative rounded-[3rem] p-12 md:p-20 overflow-hidden text-center glass-panel border border-border bg-transparent">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 -z-10"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-[100px]"></div>

        <h2 className="text-4xl md:text-5xl font-headline font-bold mb-8 max-w-2xl mx-auto text-foreground">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl text-on-surface-variant mb-12 max-w-xl mx-auto">
          Connect Your Wallet and join the revolution of decentralized
          innovation today.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Button className="h-14 bg-primary text-primary-foreground font-bold px-10 rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2 text-base">
            <Wallet className="w-5 h-5" />
            Connect Wallet Now
          </Button>
          <Button
            variant="outline"
            className="h-14 glass-panel text-on-surface border-border font-bold px-10 rounded-2xl hover:bg-foreground/10 transition-all text-base bg-transparent"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  )
}
