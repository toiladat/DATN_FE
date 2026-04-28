import { Search, SlidersHorizontal, TrendingUp, Clock, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useGetCategories } from '@/apis/queries/category'

const SORT_OPTIONS = [
  { value: 'trending', label: 'Trending', icon: TrendingUp },
  { value: 'newest', label: 'Newest', icon: Clock },
  { value: 'most_funded', label: 'Most funded', icon: Zap }
]

export function SearchFilter() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeSort, setActiveSort] = useState('trending')
  const { data: categories = [] } = useGetCategories()

  const categoryFilters = [
    { value: 'all', label: 'All' },
    ...categories.map((c) => ({ value: c.slug, label: c.name }))
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' as const }}
      className="mb-12"
    >
      {/* Page heading */}
      <div className="mb-8">
        <p className="text-[11px] font-bold tracking-[0.3em] text-[#8ff5ff] uppercase mb-2">
          RadiantVoid / Projects
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#ecedf6]">
          Ecosystem Ventures
        </h1>
      </div>

      {/* Controls row */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative w-full max-w-xs group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#45484f] w-4 h-4 group-focus-within:text-[#8ff5ff] transition-colors duration-300" />
          <input
            className="w-full bg-[#10131a] border border-[#2e323b] rounded-xl py-3 pl-11 pr-4 focus:ring-1 focus:ring-[#8ff5ff]/60 focus:border-[#8ff5ff]/60 text-[#ecedf6] text-sm placeholder:text-[#45484f] transition-all duration-300 outline-none"
            placeholder="Search projects, categories, or keywords…"
            type="text"
          />
        </div>

        {/* Sort — segmented control */}
        <div className="flex items-center gap-1 bg-[#10131a] border border-[#2e323b] rounded-xl p-1 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#45484f] ml-2 mr-1 shrink-0" />
          {SORT_OPTIONS.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setActiveSort(value)}
              className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeSort === value
                  ? 'bg-[#1a1f2a] text-[#ecedf6]'
                  : 'text-[#73757d] hover:text-[#a9abb3]'
              }`}
            >
              {activeSort === value && (
                <motion.span
                  layoutId="sort-active"
                  className="absolute inset-0 rounded-lg border border-[#2e323b]"
                  transition={{ duration: 0.2, ease: 'easeOut' as const }}
                />
              )}
              <Icon
                className={`w-3 h-3 relative z-10 ${activeSort === value ? 'text-[#8ff5ff]' : ''}`}
              />
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category filter — pill row */}
      <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-0.5 scrollbar-hide">
        {categoryFilters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActiveFilter(value)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
              activeFilter === value
                ? 'border-[#8ff5ff]/40 text-[#8ff5ff] bg-[#8ff5ff]/8'
                : 'border-[#2e323b] text-[#73757d] hover:text-[#a9abb3] hover:border-[#45484f] bg-transparent'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </motion.section>
  )
}
