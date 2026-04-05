import { Cpu, ShieldCheck } from 'lucide-react'
import { PROJECT_DETAIL_DATA } from '../../data/projectData'

export function ProjectContent() {
  const { content } = PROJECT_DETAIL_DATA

  return (
    <div className="lg:col-span-8 space-y-12">
      <section>
        <h2 className="text-3xl font-headline font-bold mb-6 text-foreground">
          {content.sections[0].title}
        </h2>
        <p className="text-muted-foreground leading-relaxed text-lg mb-8">
          {content.sections[0].body}
        </p>
        <div className="relative rounded-xl overflow-hidden mb-8 border border-border">
          <img
            alt="Project Content"
            className="w-full h-auto"
            src={content.mainImage}
          />
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-headline font-bold mb-4 text-secondary">
          {content.sections[1].title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-6">
          {content.sections[1].body}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.sections[1].features?.map((feature, i) => {
            const Icon = feature.icon === 'memory' ? Cpu : ShieldCheck
            return (
              <div
                key={i}
                className="p-6 rounded-lg bg-surface-container-low border border-border"
              >
                <Icon
                  className={`text-${feature.color} mb-3 w-6 h-6 border-${feature.color}`}
                />
                <h4 className="font-headline font-bold mb-2 text-foreground">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="py-12 border-y border-border">
        <h2 className="text-3xl font-headline font-bold mb-10 text-foreground">
          System Evolution
        </h2>
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-transparent"></div>
          <div className="space-y-12 pl-12">
            {content.roadmap.map((phase, i) => {
              const isActive = phase.status === 'active'
              const color = isActive ? 'secondary' : 'primary'
              return (
                <div key={i} className="relative">
                  {isActive ? (
                    <div className="absolute -left-10 top-1 w-4 h-4 rounded-full bg-primary neon-glow-primary"></div>
                  ) : (
                    <div
                      className={`absolute -left-10 top-1 w-4 h-4 rounded-full bg-surface border-2 border-${color}`}
                    ></div>
                  )}
                  <h4
                    className={`font-headline font-bold text-${color} text-sm uppercase tracking-widest mb-1`}
                  >
                    {phase.phase}
                  </h4>
                  <h3 className="text-xl font-headline font-bold mb-2 text-foreground">
                    {phase.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {phase.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
