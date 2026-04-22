import type { ProjectSummary } from '@/schemas/projectSchema'

export function MyProjectsHeader({ projects }: { projects: ProjectSummary[] }) {
  const totalRaised = projects.reduce((sum, p) => sum + p.raisedAmount, 0)
  const activeProjects = projects.filter((p) => p.status === 'active').length

  const completedProjects = projects.filter(
    (p) => p.status === 'success' || p.status === 'rejected'
  )
  const successProjects = projects.filter((p) => p.status === 'success')
  const successRate =
    completedProjects.length > 0
      ? Math.round((successProjects.length / completedProjects.length) * 100)
      : 0

  return (
    <header className="mb-6 shrink-0 flex items-center justify-start border-b border-[#45484f]/15 pb-4">
      {/* Dashboard Stats */}
      <div className="flex gap-6 lg:gap-8 bg-[#161a21]/40 border border-[#2e323b] rounded-xl px-4 py-2.5 backdrop-blur-sm">
        <div className="flex flex-col">
          <p className="text-[#73757d] text-[10px] font-bold uppercase tracking-widest mb-0.5">
            Total Raised
          </p>
          <p className="text-xl font-['Space_Grotesk'] font-bold text-[#8ff5ff] leading-none">
            ${totalRaised.toLocaleString()}
          </p>
        </div>

        <div className="w-[1px] bg-[#45484f]/30 self-stretch" />

        <div className="flex flex-col">
          <p className="text-[#73757d] text-[10px] font-bold uppercase tracking-widest mb-0.5">
            Active
          </p>
          <p className="text-xl font-['Space_Grotesk'] font-bold text-[#ecedf6] leading-none">
            {activeProjects}
          </p>
        </div>

        <div className="w-[1px] bg-[#45484f]/30 self-stretch" />

        <div className="flex flex-col">
          <p className="text-[#73757d] text-[10px] font-bold uppercase tracking-widest mb-0.5">
            Success Rate
          </p>
          <p className="text-xl font-['Space_Grotesk'] font-bold text-[#ac89ff] leading-none">
            {successRate}%
          </p>
        </div>
      </div>
    </header>
  )
}
