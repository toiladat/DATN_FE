import { CheckCircle } from 'lucide-react'
import { LANDING_PAGE_DATA } from '../../data/mockData'

export function Features() {
  const { features } = LANDING_PAGE_DATA

  return (
    <section className="py-32 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="order-2 lg:order-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-6 h-full">
            {features.map((feature, index) => {
              const iconColor =
                feature.iconColor === 'cyan'
                  ? 'icon-glow-cyan text-primary'
                  : 'icon-glow-purple text-secondary'
              return (
                <div
                  key={index}
                  className="p-8 glass-panel rounded-3xl space-y-6 hover:bg-white/5 transition-all flex flex-col items-start bg-transparent"
                >
                  <span
                    className={`material-symbols-outlined text-[64px] ${iconColor}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {feature.icon}
                  </span>
                  <div className="space-y-4">
                    <h5 className="text-lg font-bold text-foreground">
                      {feature.title}
                    </h5>
                    <p className="text-sm text-on-surface-variant">
                      {feature.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-8">
          <h2 className="text-4xl font-headline font-bold leading-tight text-foreground">
            Trust Built into the{' '}
            <span className="text-primary">Source Code.</span>
          </h2>
          <p className="text-lg text-on-surface-variant">
            Unlike traditional crowdfunding, RadiantVoid eliminates the "blind
            trust" factor. Every commitment is governed by immutable code,
            audited by leading security firms, and transparent to the entire
            world.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-4 text-on-surface">
              <CheckCircle className="text-primary w-6 h-6" />
              Multi-sig Treasury Protection
            </li>
            <li className="flex items-center gap-4 text-on-surface">
              <CheckCircle className="text-primary w-6 h-6" />
              Proof of Reserves Implementation
            </li>
            <li className="flex items-center gap-4 text-on-surface">
              <CheckCircle className="text-primary w-6 h-6" />
              Identity Verification via ZK-Proofs
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
