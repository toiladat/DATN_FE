import {
  Clock,
  Users,
  Wallet,
  Pickaxe,
  Heart,
  Share2,
  BadgeCheck
} from 'lucide-react'
import { Link } from 'react-router'

export function ProjectDirectoryCard({ project }: { project: any }) {
  const isFunding = project.status === 'Funding'

  const borderColorHover =
    project.themeColor === 'primary'
      ? 'hover:border-primary/50'
      : project.themeColor === 'secondary'
        ? 'hover:border-secondary/50'
        : 'hover:border-tertiary/50'

  const badgeTextColor =
    project.themeColor === 'primary'
      ? 'text-primary border-primary/30 bg-primary/10'
      : project.themeColor === 'secondary'
        ? 'text-secondary border-secondary/30 bg-secondary/10'
        : 'text-tertiary border-tertiary/30 bg-tertiary/10'

  const titleHoverColor =
    project.themeColor === 'primary'
      ? 'group-hover:text-primary'
      : project.themeColor === 'secondary'
        ? 'group-hover:text-secondary'
        : 'group-hover:text-tertiary'

  const gradientColors =
    project.themeColor === 'primary'
      ? 'from-primary to-primary-dim shadow-[0_0_10px_rgba(var(--primary),0.5)]'
      : project.themeColor === 'secondary'
        ? 'from-secondary to-secondary-dim shadow-[0_0_10px_rgba(var(--secondary),0.5)]'
        : 'from-tertiary to-tertiary-dim shadow-[0_0_10px_rgba(var(--tertiary),0.5)]'

  return (
    <div
      className={`group bg-surface-container-highest rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 border border-border/50 shadow-xl ${borderColorHover}`}
    >
      <Link
        to={`/campaign/${project.id}`}
        className="block relative h-56 w-full overflow-hidden"
      >
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={project.image}
          alt={project.title}
        />

        <div className="absolute top-4 left-4 flex gap-2">
          {/* Category Badge */}
          <span
            className={`backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${badgeTextColor}`}
          >
            {project.category}
          </span>

          {/* Status Badge */}
          {isFunding ? (
            <span className="bg-black/60 backdrop-blur-md text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20 flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Funding
            </span>
          ) : (
            <span className="bg-black/60 backdrop-blur-md text-tertiary px-3 py-1 rounded-full text-xs font-bold border border-tertiary/20 flex items-center gap-1 shadow-md">
              <BadgeCheck className="w-3.5 h-3.5" />
              Developing
            </span>
          )}
        </div>
      </Link>

      <div className="p-6">
        <Link to={`/campaign/${project.id}`}>
          <h3
            className={`font-headline text-2xl font-bold mb-2 transition-colors text-foreground ${titleHoverColor}`}
          >
            {project.title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-6 line-clamp-2 min-h-[40px]">
          {project.description}
        </p>

        <div className="space-y-4 mb-8">
          {isFunding ? (
            <>
              {/* Funding Progress Bar */}
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  Progress: {project.progress}%
                </span>
                <span
                  className={`text-sm font-bold ${project.themeColor === 'primary' ? 'text-primary' : 'text-secondary'}`}
                >
                  {project.raisedText}
                </span>
              </div>
              <div className="w-full h-2 bg-surface-variant rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${gradientColors}`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </>
          ) : (
            <>
              {/* Roadmap Process Bar */}
              <div className="flex justify-between items-end mb-1">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  Roadmap: {project.roadmapPhase}
                </span>
                <span className="text-sm font-bold text-tertiary">
                  {project.roadmapText}
                </span>
              </div>
              <div
                className={`grid grid-cols-${project.roadmapStages.length} gap-1.5 h-2`}
              >
                {project.roadmapStages.map((stage: string, idx: number) => {
                  if (stage === 'completed') {
                    return (
                      <div
                        key={idx}
                        className="bg-tertiary rounded-sm shadow-[0_0_8px_rgba(var(--tertiary),0.4)]"
                      ></div>
                    )
                  } else if (stage === 'active') {
                    return (
                      <div
                        key={idx}
                        className="bg-tertiary/60 rounded-sm animate-pulse"
                      ></div>
                    )
                  } else {
                    return (
                      <div
                        key={idx}
                        className="bg-surface-variant rounded-sm"
                      ></div>
                    )
                  }
                })}
              </div>
            </>
          )}

          {/* Stats Bar */}
          <div className="flex justify-between items-center py-3 border-y border-border/50">
            {project.stats.map((stat: any, idx: number) => {
              const Icon =
                stat.icon === 'schedule'
                  ? Clock
                  : stat.icon === 'group'
                    ? Users
                    : stat.icon === 'account_balance_wallet'
                      ? Wallet
                      : Pickaxe

              return (
                <div key={idx} className="flex items-center gap-2">
                  <Icon className="text-muted-foreground w-4 h-4" />
                  <span className="text-xs text-foreground font-medium">
                    {stat.text}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 items-center">
          <Link to={`/campaign/${project.id}`} className="flex-grow">
            <button
              className={`w-full font-bold py-3 rounded-xl active:scale-95 transition-all text-on-primary-container ${
                isFunding
                  ? 'bg-primary-container hover:brightness-110'
                  : 'bg-surface-bright border border-border text-foreground hover:border-tertiary/50 hover:bg-surface-variant'
              }`}
            >
              {isFunding ? 'Support Project' : 'View Roadmap'}
            </button>
          </Link>
          <button className="p-3 rounded-xl border border-border hover:bg-surface-bright transition-colors text-foreground">
            {isFunding ? (
              <Heart className="w-5 h-5" />
            ) : (
              <Share2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
