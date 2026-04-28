import { useState, useMemo } from 'react'
import { SearchFilter } from '@/components/projectsPage/SearchFilter'
import { ProjectGrid } from '@/components/projectsPage/ProjectGrid'
import { Pagination } from '@/components/projectsPage/Pagination'
import { useGetProjects } from '@/apis/queries/project'
import { Loader2 } from 'lucide-react'

const ITEMS_PER_PAGE = 6

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, isError } = useGetProjects(
    currentPage,
    ITEMS_PER_PAGE
  )

  const projects = data?.projects || []
  const totalPages = data?.totalPages || 0

  // Reset page when search is added later

  return (
    <div className="bg-[#0a0c10] text-[#ecedf6] min-h-screen relative overflow-hidden font-['Space_Grotesk']">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#8ff5ff]/5 rounded-[100%] blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#ac89ff]/5 rounded-[100%] blur-[150px] pointer-events-none mix-blend-screen" />

      <main className="pt-32 pb-24 px-4 md:px-8 lg:px-12 xl:px-24 max-w-[1600px] mx-auto w-full relative z-10">
        <SearchFilter />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#ac89ff] mb-4" />
            <p className="text-[#a9abb3]">Loading projects...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-20 text-red-400">
            Failed to load projects. Please try again later.
          </div>
        ) : (
          <>
            <ProjectGrid projects={projects} />
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              />
            )}
          </>
        )}
      </main>
    </div>
  )
}
