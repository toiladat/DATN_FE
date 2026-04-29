import {
  Search,
  SlidersHorizontal,
  TrendingUp,
  Clock,
  Zap,
  Loader2
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { Link } from 'react-router'
import { useGetCategories } from '@/apis/queries/category'
import { useGetProjects } from '@/apis/queries/project'
import { useDebounce } from '@/hooks/useDebounce'

const SORT_OPTIONS = [
  { value: 'trending', label: 'Trending', icon: TrendingUp },
  { value: 'newest', label: 'Newest', icon: Clock },
  { value: 'most_funded', label: 'Most funded', icon: Zap }
]

interface SearchFilterProps {
  selectedCategory?: string
  onCategoryChange?: (slug: string) => void
  selectedSort?: string
  onSortChange?: (sort: string) => void
}

export function SearchFilter({
  selectedCategory = '',
  onCategoryChange,
  selectedSort = 'newest',
  onSortChange
}: SearchFilterProps) {
  const [searchInput, setSearchInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: categories = [] } = useGetCategories()

  const categoryFilters = [
    { value: 'all', label: 'All' },
    ...categories.map((c) => ({ value: c.slug, label: c.name }))
  ]

  // Debounce 400ms trước khi gọi API
  const debouncedSearch = useDebounce(searchInput, 400)
  const showDropdown = isFocused && debouncedSearch.trim().length >= 2

  const { data: searchData, isFetching } = useGetProjects(1, 6, debouncedSearch)
  const searchResults = searchData?.projects ?? []

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
        {/* Search với dropdown */}
        <div className="relative w-full max-w-xs group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#45484f] w-4 h-4 group-focus-within:text-[#8ff5ff] transition-colors duration-300 z-10" />
          {isFetching && debouncedSearch.length >= 2 && (
            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8ff5ff] animate-spin z-10" />
          )}
          <input
            ref={inputRef}
            className="w-full bg-[#10131a] border border-[#2e323b] rounded-xl py-3 pl-11 pr-10 focus:ring-1 focus:ring-[#8ff5ff]/60 focus:border-[#8ff5ff]/60 text-[#ecedf6] text-sm placeholder:text-[#45484f] transition-all duration-300 outline-none"
            placeholder="Search projects…"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          />

          {/* Dropdown */}
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute z-50 top-[calc(100%+8px)] left-0 w-full bg-[#13161e] border border-[#2e323b] rounded-xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
              >
                {isFetching ? (
                  <div className="flex items-center justify-center gap-2 py-5 text-xs text-[#a9abb3]">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#8ff5ff]" />
                    Searching...
                  </div>
                ) : searchResults.length > 0 ? (
                  <div>
                    {searchResults.map((project) => (
                      <Link
                        key={project.id}
                        to={`/campaign/${project.id}`}
                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#8ff5ff]/8 transition-colors border-b border-[#2e323b]/50 last:border-b-0 group/item"
                        onClick={() => {
                          setSearchInput('')
                          setIsFocused(false)
                        }}
                      >
                        {/* Thumbnail */}
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#1a1f28] border border-[#2e323b]">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#45484f] text-xs font-bold">
                              {project.title.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#ecedf6] group-hover/item:text-white truncate transition-colors">
                            {project.title}
                          </p>
                          <p className="text-[10px] text-[#73757d] truncate mt-0.5">
                            {project.primaryCategory ?? 'Uncategorized'}
                          </p>
                        </div>

                        {/* Status badge */}
                        <span
                          className={`shrink-0 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                            project.status === 'progress'
                              ? 'text-[#8ff5ff] border-[#8ff5ff]/30 bg-[#8ff5ff]/8'
                              : 'text-[#ac89ff] border-[#ac89ff]/30 bg-[#ac89ff]/8'
                          }`}
                        >
                          {project.status === 'progress' ? 'FUNDING' : 'ACTIVE'}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-5 text-center text-xs text-[#73757d]">
                    No projects found for{' '}
                    <span className="text-[#8ff5ff]">"{debouncedSearch}"</span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sort — segmented control */}
        <div className="flex items-center gap-1 bg-[#10131a] border border-[#2e323b] rounded-xl p-1 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#45484f] ml-2 mr-1 shrink-0" />
          {SORT_OPTIONS.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => onSortChange?.(value)}
              className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                selectedSort === value
                  ? 'bg-[#1a1f2a] text-[#ecedf6]'
                  : 'text-[#73757d] hover:text-[#a9abb3]'
              }`}
            >
              {selectedSort === value && (
                <motion.span
                  layoutId="sort-active"
                  className="absolute inset-0 rounded-lg border border-[#2e323b]"
                  transition={{ duration: 0.2, ease: 'easeOut' as const }}
                />
              )}
              <Icon
                className={`w-3 h-3 relative z-10 ${selectedSort === value ? 'text-[#8ff5ff]' : ''}`}
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
            onClick={() => onCategoryChange?.(value === 'all' ? '' : value)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
              (
                value === 'all'
                  ? selectedCategory === ''
                  : selectedCategory === value
              )
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
