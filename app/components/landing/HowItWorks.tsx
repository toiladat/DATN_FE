import { LANDING_PAGE_DATA } from '../../data/mockData'

export function HowItWorks() {
  const { howItWorks } = LANDING_PAGE_DATA

  return (
    <section className="py-32 bg-surface-container-low/50 border-y border-border relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl font-headline font-bold mb-6 text-foreground">
            How It Works
          </h2>
          <p className="text-on-surface-variant">
            Enter the future of decentralized capital in three simple steps.
            Secure, transparent, and direct.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {howItWorks.map((step, index) => {
            const hasLine = index < howItWorks.length - 1
            const iconBg = `bg-${step.color}/10`
            const iconBorder = `border-${step.color}/20`
            const iconTextColor = `text-${step.color}`

            return (
              <div
                key={index}
                className="relative group text-center md:text-left z-10"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${iconBg} border ${iconBorder} flex items-center justify-center mb-8 mx-auto md:mx-0 group-hover:scale-110 transition-transform`}
                >
                  <span
                    className={`material-symbols-outlined ${iconTextColor} text-3xl`}
                  >
                    {step.icon}
                  </span>
                </div>
                <h4 className="text-xl font-headline font-bold mb-4 text-foreground">
                  {step.title}
                </h4>
                <p className="text-on-surface-variant leading-relaxed">
                  {step.description}
                </p>
                {hasLine && (
                  <div className="hidden md:block absolute top-8 left-16 w-full border-t border-dashed border-border -z-10"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
