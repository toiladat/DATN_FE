import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { LANDING_PAGE_DATA } from '../../data/mockData'

export function FeaturedProjects() {
  const { featuredProjects } = LANDING_PAGE_DATA

  return (
    <section className="py-32 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-4xl font-headline font-bold mb-4 text-foreground">
            Featured Innovations
          </h2>
          <p className="text-on-surface-variant text-lg max-w-lg">
            Vetted opportunities selected by the RadiantVoid governance
            community for high impact potential.
          </p>
        </div>
        <button className="flex items-center gap-2 text-primary font-bold hover:underline">
          View All Active Pools
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project) => {
          // Determine color class mappings based on categoryColor string
          const borderColorHover =
            project.categoryColor === 'primary'
              ? 'hover:border-primary/30'
              : project.categoryColor === 'secondary'
                ? 'hover:border-secondary/30'
                : 'hover:border-tertiary/30'

          const badgeTextColor =
            project.categoryColor === 'primary'
              ? 'text-primary'
              : project.categoryColor === 'secondary'
                ? 'text-secondary'
                : 'text-tertiary'

          const valueTextColor =
            project.categoryColor === 'primary'
              ? 'text-primary'
              : project.categoryColor === 'secondary'
                ? 'text-secondary'
                : 'text-tertiary'

          const GradientColors =
            project.categoryColor === 'primary'
              ? 'from-primary to-tertiary'
              : project.categoryColor === 'secondary'
                ? 'from-secondary to-secondary-dim'
                : 'from-tertiary to-primary'

          return (
            <div
              key={project.id}
              className={`group bg-surface-container-high rounded-3xl overflow-hidden border border-border ${borderColorHover} transition-all duration-500`}
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  alt={`${project.category} Project`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src={project.image}
                />
                <div
                  className={`absolute top-4 right-4 glass-panel px-3 py-1 rounded-full text-xs font-bold ${badgeTextColor}`}
                >
                  {project.category}
                </div>
              </div>

              <div className="p-8 space-y-6">
                <h3 className="text-2xl font-headline font-bold text-foreground">
                  {project.title}
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-on-surface-variant">
                      {project.raisedPercent}% Raised
                    </span>
                    <span className={valueTextColor}>
                      {project.raisedAmount} / {project.targetAmount}{' '}
                      {project.currency}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-surface-variant rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${GradientColors} rounded-full`}
                      style={{ width: `${project.raisedPercent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center py-4 border-y border-border">
                  <div className="text-center">
                    <p className="text-xs text-on-surface-variant uppercase mb-1">
                      Backers
                    </p>
                    <p className="font-bold text-foreground">
                      {project.backers}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-on-surface-variant uppercase mb-1">
                      Days Left
                    </p>
                    <p className="font-bold text-foreground">
                      {project.daysLeft}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-on-surface-variant uppercase mb-1">
                      Min. Entry
                    </p>
                    <p className="font-bold text-foreground">
                      {project.minEntry}
                    </p>
                  </div>
                </div>

                <Link to={`/campaign/${project.id}`} className="block w-full">
                  <button className="w-full py-3 bg-foreground/5 hover:bg-foreground/10 border border-border text-foreground rounded-xl font-bold transition-all">
                    Support Project
                  </button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
