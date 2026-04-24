import { SearchFilter } from '@/components/projectsPage/SearchFilter'
import { ProjectGrid } from '@/components/projectsPage/ProjectGrid'
import { Pagination } from '@/components/projectsPage/Pagination'
import { PROJECTS_DIRECTORY_DATA } from '@/data/projectData'

export default function Projects() {
  return (
    <div className="bg-[#0a0c10] text-[#ecedf6] min-h-screen relative overflow-hidden font-['Space_Grotesk']">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#8ff5ff]/5 rounded-[100%] blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#ac89ff]/5 rounded-[100%] blur-[150px] pointer-events-none mix-blend-screen" />

      <main className="pt-32 pb-24 px-4 md:px-8 lg:px-12 xl:px-24 max-w-[1600px] mx-auto w-full relative z-10">
        <SearchFilter />
        <ProjectGrid projects={PROJECTS_DIRECTORY_DATA} />
        <Pagination />
      </main>
    </div>
  )
}
