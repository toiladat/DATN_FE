import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination() {
  return (
    <div className="mt-20 flex justify-center items-center gap-2 text-[13px] font-mono font-bold">
      <button className="p-3 rounded-xl border border-[#2e323b] text-[#73757d] hover:text-[#ecedf6] hover:border-[#73757d] transition-all bg-[#161a21] disabled:opacity-50">
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Active Page */}
      <button className="w-11 h-11 rounded-xl bg-[#8ff5ff]/10 text-[#8ff5ff] border border-[#8ff5ff]/50 shadow-[0_0_15px_rgba(143,245,255,0.2)] flex items-center justify-center transition-all">
        01
      </button>

      {/* Inactive Pages */}
      <button className="w-11 h-11 rounded-xl bg-[#161a21] border border-[#2e323b] text-[#73757d] hover:text-[#ecedf6] hover:border-[#73757d] flex items-center justify-center transition-all">
        02
      </button>
      <button className="w-11 h-11 rounded-xl bg-[#161a21] border border-[#2e323b] text-[#73757d] hover:text-[#ecedf6] hover:border-[#73757d] flex items-center justify-center transition-all">
        03
      </button>

      <span className="text-[#2e323b] mx-2 tracking-widest">...</span>

      <button className="w-11 h-11 rounded-xl bg-[#161a21] border border-[#2e323b] text-[#73757d] hover:text-[#ecedf6] hover:border-[#73757d] flex items-center justify-center transition-all">
        12
      </button>

      <button className="p-3 rounded-xl border border-[#2e323b] text-[#73757d] hover:text-[#ecedf6] hover:border-[#73757d] transition-all bg-[#161a21]">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
