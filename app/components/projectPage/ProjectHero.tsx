import type { ProjectDetail } from '@/schemas/projectSchema'

export function ProjectHero({ project }: { project: ProjectDetail }) {
  return (
    <header className="mb-16 relative">
      {/* Decorative Glow */}
      <div className="absolute -left-20 -top-20 w-64 h-64 bg-[#8ff5ff]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col gap-4 relative z-10">
        {project.category && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-[#8ff5ff]/50" />
            <span className="text-[#8ff5ff] font-['Space_Grotesk'] tracking-[0.2em] uppercase text-[11px] font-bold">
              {project.category.name}
            </span>
          </div>
        )}

        <h1 className="text-5xl md:text-7xl font-['Space_Grotesk'] font-bold text-[#ecedf6] tracking-tight leading-[1.1]">
          {project.title}
        </h1>

        <p className="text-[#a9abb3] text-lg md:text-xl max-w-3xl leading-relaxed mt-2">
          {project.subtitle}
        </p>

        <div className="mt-8 flex gap-5 items-center">
          <button className="bg-[#8ff5ff] text-[#10131a] px-8 py-4 rounded-full font-['Space_Grotesk'] font-bold text-lg hover:bg-[#a6fcff] transition-all duration-500 ease-out shadow-[0_0_20px_rgba(143,245,255,0.4)] hover:shadow-[0_0_30px_rgba(143,245,255,0.6)] hover:-translate-y-1 active:translate-y-0 active:scale-95">
            Back this project
          </button>
        </div>
      </div>
    </header>
  )
}
