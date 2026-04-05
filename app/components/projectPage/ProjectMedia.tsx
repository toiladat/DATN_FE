import { Play } from 'lucide-react'
import { PROJECT_DETAIL_DATA } from '../../data/projectData'

export function ProjectMedia() {
  const { media } = PROJECT_DETAIL_DATA

  return (
    <div className="lg:col-span-8 relative rounded-xl overflow-hidden bg-surface-container-highest aspect-video group">
      <img
        alt="Project Interface"
        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
        src={media.imageUrl}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <button className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 flex items-center justify-center text-primary hover:scale-110 transition-all cursor-pointer">
          <Play className="w-8 h-8 fill-current ml-1" />
        </button>
      </div>
      <div className="absolute bottom-4 left-4 flex gap-2">
        {media.tags.map((tag, i) => (
          <span
            key={i}
            className={`glass-panel px-3 py-1 rounded-full text-xs font-bold text-${tag.color} border border-${tag.color}/20 bg-background/10`}
          >
            {tag.label}
          </span>
        ))}
      </div>
    </div>
  )
}
