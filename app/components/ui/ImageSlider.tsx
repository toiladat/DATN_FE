import { useState } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

interface MediaItem {
  type: 'image' | 'video'
  url: string
}

interface ImageSliderProps {
  media: MediaItem[]
}

export function ImageSlider({ media }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!media || media.length === 0) {
    return (
      <div className="w-full h-full bg-surface-container-highest flex items-center justify-center">
        <span className="text-muted-foreground">No media available</span>
      </div>
    )
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1))
  }

  const currentMedia = media[currentIndex]

  return (
    <div className="relative w-full h-full group">
      {/* Media Display */}
      {currentMedia.type === 'video' ? (
        <video
          src={currentMedia.url}
          className="w-full h-full object-cover"
          controls
          autoPlay
          muted
          loop
        />
      ) : (
        <img
          src={currentMedia.url}
          alt={`Media ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      )}

      {/* Navigation Controls */}
      {media.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/50 backdrop-blur border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/50 backdrop-blur border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {media.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex
                    ? 'bg-primary w-4'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Video Indicator Overlay (Optional for Video if not auto-playing) */}
      {currentMedia.type === 'video' &&
        !currentMedia.url.includes('youtube.com') && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-xs font-bold text-white">
            <Play className="w-3 h-3 fill-current" />
            VIDEO
          </div>
        )}
    </div>
  )
}
