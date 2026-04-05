import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Pagination() {
  return (
    <div className="mt-20 flex justify-center items-center gap-4 text-sm font-medium">
      <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container font-bold flex items-center justify-center">
        1
      </button>
      <button className="w-10 h-10 rounded-lg glass-panel text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors">
        2
      </button>
      <button className="w-10 h-10 rounded-lg glass-panel text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors">
        3
      </button>
      <span className="text-muted-foreground">...</span>
      <button className="w-10 h-10 rounded-lg glass-panel text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors">
        12
      </button>
      <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
