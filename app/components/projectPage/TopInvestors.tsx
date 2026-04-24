import type { ProjectDetail } from '@/schemas/projectSchema'

export function TopInvestors({ project }: { project: ProjectDetail }) {
  const { topInvestors } = project

  if (!topInvestors || topInvestors.length === 0) {
    return (
      <div className="p-6 rounded-2xl bg-[#10131a] border border-[#2e323b]/50">
        <h4 className="font-['Space_Grotesk'] font-bold text-[#ecedf6] mb-4 text-sm uppercase tracking-widest flex items-center gap-2">
          Top Investors
        </h4>
        <p className="text-sm text-[#73757d]">
          No investors yet. Be the first!
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 rounded-2xl bg-[#10131a] border border-[#2e323b]/50 relative overflow-hidden group">
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#8ff5ff]/5 rounded-full blur-3xl group-hover:bg-[#8ff5ff]/10 transition-colors duration-700 ease-out" />

      <h4 className="font-['Space_Grotesk'] font-bold text-[#ecedf6] mb-6 text-[11px] uppercase tracking-[0.2em] flex items-center gap-2 relative z-10">
        Top Investors
      </h4>
      <div className="flex flex-col gap-5 relative z-10">
        {topInvestors.map((investor, i) => (
          <div key={i} className="flex items-center gap-4 group/item">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8ff5ff] to-[#ac89ff] p-[1.5px] transition-transform duration-300 ease-out group-hover/item:scale-110">
              <div className="w-full h-full rounded-full bg-[#161a21] overflow-hidden">
                <img
                  alt={investor.name || 'Anonymous'}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-300"
                  src={investor.avatar || 'https://via.placeholder.com/150'}
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[#ecedf6] text-[13px] truncate">
                {investor.name || 'Anonymous Backer'}
              </p>
              <p className="text-[11px] text-[#8ff5ff] font-medium font-mono mt-0.5 tracking-wide">
                {investor.amount.toLocaleString()} USDT
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
