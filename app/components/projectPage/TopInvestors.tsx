import type { ProjectDetail } from '@/schemas/projectSchema'
import { useState } from 'react'

export function TopInvestors({ project }: { project: ProjectDetail }) {
  const { topInvestors, recentInvestors } = project
  const [activeTab, setActiveTab] = useState<'top' | 'recent'>('top')

  const hasInvestors =
    (topInvestors && topInvestors.length > 0) ||
    (recentInvestors && recentInvestors.length > 0)
  const currentList = activeTab === 'top' ? topInvestors : recentInvestors

  if (!hasInvestors) {
    return (
      <div className="p-6 rounded-2xl bg-[#10131a] border border-[#2e323b]/50">
        <h4 className="font-['Space_Grotesk'] font-bold text-[#ecedf6] mb-4 text-sm uppercase tracking-widest flex items-center gap-2">
          Investors
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

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('top')}
            className={`font-['Space_Grotesk'] font-bold text-[11px] uppercase tracking-[0.2em] transition-colors ${activeTab === 'top' ? 'text-[#8ff5ff]' : 'text-[#73757d] hover:text-[#ecedf6]'}`}
          >
            Top
          </button>
          <button
            onClick={() => setActiveTab('recent')}
            className={`font-['Space_Grotesk'] font-bold text-[11px] uppercase tracking-[0.2em] transition-colors ${activeTab === 'recent' ? 'text-[#8ff5ff]' : 'text-[#73757d] hover:text-[#ecedf6]'}`}
          >
            Recent
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 relative z-10">
        {currentList?.map((investor, i) => (
          <div key={i} className="flex flex-col gap-2 group/item">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8ff5ff] to-[#ac89ff] p-[1.5px] transition-transform duration-300 ease-out group-hover/item:scale-110 shrink-0">
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
            {investor.content && (
              <div className="ml-14">
                <p
                  className="text-[12px] text-[#a0a5b5] italic truncate"
                  title={investor.content}
                >
                  {investor.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
