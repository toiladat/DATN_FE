import { Globe, Share2, MessageCircle } from 'lucide-react'
import { PROJECT_DETAIL_DATA } from '../../data/projectData'

export function CreatorProfile() {
  const { creator } = PROJECT_DETAIL_DATA
  return (
    <div className="p-6 rounded-xl bg-surface-container-highest border border-border">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary p-[1px]">
          <div className="w-full h-full rounded-full bg-surface-container overflow-hidden">
            <img
              alt={creator.name}
              className="w-full h-full object-cover"
              src={creator.avatar}
            />
          </div>
        </div>
        <div>
          <h4 className="font-headline font-bold text-foreground">
            {creator.name}
          </h4>
          <p className="text-xs text-muted-foreground">
            {creator.projectsCount} Projects • {creator.location}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <a
          className="text-muted-foreground hover:text-primary transition-colors"
          href="#"
        >
          <Globe className="w-5 h-5" />
        </a>
        <a
          className="text-muted-foreground hover:text-primary transition-colors"
          href="#"
        >
          <Share2 className="w-5 h-5" />
        </a>
        <a
          className="text-muted-foreground hover:text-primary transition-colors"
          href="#"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>
    </div>
  )
}
