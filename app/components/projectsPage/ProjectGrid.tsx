import { ProjectDirectoryCard } from './ProjectDirectoryCard'

export function ProjectGrid({ projects }: { projects: any[] }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectDirectoryCard key={project.id} project={project} />
      ))}
    </section>
  )
}
