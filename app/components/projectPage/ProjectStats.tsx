import { ThumbsUp, MessageSquare } from 'lucide-react'
import type { ProjectDetail } from '@/schemas/projectSchema'

export function ProjectStats({ project }: { project: ProjectDetail }) {
  const { totalAmount, raisedAmount, stats, endDate } = project
  const progressPercentage =
    Math.min(100, Math.round((raisedAmount / totalAmount) * 100)) || 0

  const daysLeft = Math.max(
    0,
    Math.ceil(
      (new Date(endDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
    )
  )

  return (
    <div className="p-8 rounded-2xl bg-[#10131a] border border-[#2e323b]/50 shadow-2xl flex flex-col gap-8 relative overflow-hidden group">
      <div className="absolute -left-10 -top-10 w-40 h-40 bg-[#8ff5ff]/10 rounded-full blur-3xl group-hover:bg-[#8ff5ff]/20 transition-colors duration-700 ease-out" />

      <div className="relative z-10">
        <div className="flex items-baseline gap-3 mb-4">
          <span className="text-4xl md:text-5xl font-['Space_Grotesk'] font-bold text-[#8ff5ff]">
            {raisedAmount.toLocaleString()}
          </span>
          <span className="text-[#73757d] font-medium text-xs tracking-[0.15em] uppercase">
            / {totalAmount.toLocaleString()} USDT
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#22262f] rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#8ff5ff] to-[#ac89ff] shadow-[0_0_15px_rgba(143,245,255,0.8)] transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className="text-[10px] font-bold text-[#a9abb3] uppercase tracking-widest flex items-center gap-2">
          {progressPercentage}% of minimum goal reached
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6 relative z-10">
        <div className="flex flex-col gap-1.5">
          <span className="text-3xl font-['Space_Grotesk'] font-bold text-[#ecedf6]">
            {daysLeft}
          </span>
          <span className="text-[10px] text-[#73757d] uppercase tracking-widest font-bold">
            Days Left
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="text-3xl font-['Space_Grotesk'] font-bold text-[#ecedf6]">
            {stats.likes}
          </span>
          <span className="text-[10px] text-[#73757d] uppercase tracking-widest font-bold">
            Likes
          </span>
        </div>
      </div>

      <div className="pt-6 border-t border-[#2e323b]/40 flex flex-col gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <ThumbsUp className="text-[#ac89ff] w-4 h-4 shrink-0" />
          <span className="text-[13px] font-medium text-[#ecedf6]">
            {stats.likes} Total Likes
          </span>
        </div>
        <div className="flex items-center gap-3">
          <MessageSquare className="text-[#ac89ff] w-4 h-4 shrink-0" />
          <span className="text-[13px] font-medium text-[#ecedf6]">
            {stats.reviews} Total Reviews
          </span>
        </div>
      </div>
    </div>
  )
}
