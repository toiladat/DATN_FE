import type { ProjectDetail } from '@/schemas/projectSchema'

export function ProjectHero({ project }: { project: ProjectDetail }) {
  const isProgress = project.status === 'progress'
  // You only show InvestModal if it's in progress. If not, maybe disable it.
  return (
    <header className="mb-16 relative">
      {/* Decorative Glow */}
      <div className="absolute -left-20 -top-20 w-64 h-64 bg-neon-cyan/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col gap-4 relative z-10">
        {project.category && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-neon-cyan/50" />
            <span className="text-neon-cyan font-['Space_Grotesk'] tracking-[0.2em] uppercase text-[11px] font-bold">
              {project.category.name}
            </span>
          </div>
        )}

        <h1 className="text-5xl md:text-7xl font-['Space_Grotesk'] font-bold text-foreground tracking-tight leading-[1.1]">
          {project.title}
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl leading-relaxed mt-2">
          {project.subtitle}
        </p>
      </div>
    </header>
  )
}
