import { SearchFilter } from '@/components/projectsPage/SearchFilter'
import { ProjectGrid } from '@/components/projectsPage/ProjectGrid'
import { Pagination } from '@/components/projectsPage/Pagination'
import { PROJECTS_DIRECTORY_DATA } from '@/data/projectData'

export default function Projects() {
  return (
    <div className="bg-background text-foreground transition-colors duration-300 min-h-screen">
      <main className="pt-32 pb-24 px-4 md:px-8 lg:px-12 xl:px-24 max-w-screen-2xl mx-auto w-full flex-grow">
        <SearchFilter />
        <ProjectGrid projects={PROJECTS_DIRECTORY_DATA} />
        <Pagination />
      </main>
    </div>
  )
}
