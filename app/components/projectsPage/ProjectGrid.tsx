import { ProjectDirectoryCard } from './ProjectDirectoryCard'
import { motion } from 'framer-motion'
import type { ProjectSummary } from '@/schemas/projectSchema'

export function ProjectGrid({ projects }: { projects: ProjectSummary[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  return (
    <motion.section
      key={projects.map((p) => p.id).join('-')}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 relative z-10"
    >
      {projects.map((project, index) => (
        <ProjectDirectoryCard
          key={project.id}
          project={project}
          index={index}
        />
      ))}
    </motion.section>
  )
}
