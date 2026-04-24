import type { ProjectDetail } from '@/schemas/projectSchema'
import { ImageSlider } from '@/components/ui/ImageSlider'

export function ProjectMedia({ project }: { project: ProjectDetail }) {
  const mediaItems = []

  if (project.video) {
    mediaItems.push({ type: 'video' as const, url: project.video })
  }

  if (project.images && project.images.length > 0) {
    project.images.forEach((img) => {
      mediaItems.push({ type: 'image' as const, url: img })
    })
  }

  if (mediaItems.length === 0) {
    mediaItems.push({
      type: 'image' as const,
      url: 'https://via.placeholder.com/800x450'
    })
  }

  return (
    <div className="lg:col-span-8 relative rounded-2xl overflow-hidden bg-[#0d0f14] border border-[#2e323b]/50 shadow-[0_10px_40px_rgba(0,0,0,0.5)] aspect-video">
      <ImageSlider media={mediaItems} />
    </div>
  )
}
