import { Search, ChevronDown } from 'lucide-react'

export function SearchFilter() {
  return (
    <section className="mb-16">
      <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-8 text-foreground">
        Explore{' '}
        <span className="text-primary neon-text-primary">Ecosystem</span>{' '}
        Ventures
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        {/* Search Bar */}
        <div className="lg:col-span-6">
          <label className="block text-on-surface-variant text-sm font-medium mb-2 ml-1">
            Search Projects
          </label>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              className="w-full bg-surface-container-high border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 text-foreground placeholder:-muted-foreground transition-all outline-none"
              placeholder="Project name, keywords, or ENS..."
              type="text"
            />
          </div>
        </div>
        {/* Sorting */}
        <div className="lg:col-span-3">
          <label className="block text-on-surface-variant text-sm font-medium mb-2 ml-1">
            Sort By
          </label>
          <div className="relative">
            <select className="w-full bg-surface-container-high border-none rounded-xl py-4 px-4 appearance-none focus:ring-2 focus:ring-primary/50 text-foreground cursor-pointer outline-none font-medium">
              <option>Trending</option>
              <option>Hot</option>
              <option>Newest</option>
              <option>Most Funded</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground w-5 h-5" />
          </div>
        </div>
        {/* Filters */}
        <div className="lg:col-span-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button className="glass-panel px-4 py-2 rounded-lg text-primary text-sm font-medium border border-primary/30">
            All
          </button>
          <button className="glass-panel px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
            DeFi
          </button>
          <button className="glass-panel px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
            AI
          </button>
          <button className="glass-panel px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
            Gaming
          </button>
        </div>
      </div>
    </section>
  )
}
