import { useState } from 'react'
import { ChevronLeft, ChevronRight, ImageIcon, Film } from 'lucide-react'
import type { ProjectDetail } from '@/schemas/projectSchema'

export function ProjectMedia({ project }: { project: ProjectDetail }) {
  const images: string[] =
    project.images && project.images.length > 0 ? project.images : []
  const hasVideo = !!project.video
  const hasImages = images.length > 0

  // Only show tabs when BOTH types exist
  const showTabs = hasImages && hasVideo

  const defaultTab: 'images' | 'video' = hasImages ? 'images' : 'video'
  const [tab, setTab] = useState<'images' | 'video'>(defaultTab)
  const [idx, setIdx] = useState(0)

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length)
  const next = () => setIdx((i) => (i + 1) % images.length)

  // ── Nothing at all ──────────────────────────────────────────────
  if (!hasImages && !hasVideo) {
    return (
      <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-[#2e323b]/50 bg-[#0d0f14] aspect-video flex items-center justify-center">
        <p className="text-[#3a3e4a] text-sm font-mono">No media available</p>
      </div>
    )
  }

  return (
    <div className="lg:col-span-8 flex flex-col rounded-2xl overflow-hidden border border-[#2e323b]/50 bg-[#0d0f14] shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
      {/* ── Tab bar — only when both exist ── */}
      {showTabs && (
        <div className="flex border-b border-[#1a1f2b] shrink-0">
          <button
            onClick={() => setTab('images')}
            className={`flex items-center gap-2 px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors border-b-2 -mb-px ${
              tab === 'images'
                ? 'text-[#ecedf6] border-[#8ff5ff]'
                : 'text-[#3a3e4a] border-transparent hover:text-[#73757d]'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Images
            <span className="font-mono font-normal opacity-50 normal-case tracking-normal">
              ({images.length})
            </span>
          </button>
          <button
            onClick={() => setTab('video')}
            className={`flex items-center gap-2 px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors border-b-2 -mb-px ${
              tab === 'video'
                ? 'text-[#ecedf6] border-[#8ff5ff]'
                : 'text-[#3a3e4a] border-transparent hover:text-[#73757d]'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            Video
          </button>
        </div>
      )}

      {/* ── Image view ── */}
      {(tab === 'images' || !hasVideo) && hasImages && (
        <div className="flex flex-col">
          {/* Main viewer */}
          <div className="relative bg-black aspect-video overflow-hidden group">
            <a
              href={images[idx]}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <img
                key={idx}
                src={images[idx]}
                alt={`Image ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </a>

            {/* Prev / Next */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Counter — only for multi-image */}
            {images.length > 1 && (
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-1 rounded-md">
                {idx + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Thumbnail strip — only for multi-image */}
          {images.length > 1 && (
            <div className="flex gap-2 p-3 bg-[#080a0e] overflow-x-auto">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`shrink-0 w-16 h-11 rounded-lg overflow-hidden border-2 transition-all duration-150 ${
                    i === idx
                      ? 'border-[#8ff5ff] opacity-100 scale-[1.06]'
                      : 'border-transparent opacity-40 hover:opacity-75'
                  }`}
                >
                  <img
                    src={src}
                    alt={`Thumb ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Video view ── */}
      {(tab === 'video' || !hasImages) && hasVideo && (
        <div className="aspect-video bg-black">
          <video
            src={project.video}
            controls
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  )
}
