import { useState } from 'react'
import {
  ShieldCheck,
  Calendar,
  DollarSign,
  ExternalLink,
  Lightbulb,
  AlertTriangle,
  Target,
  Play,
  ChevronDown
} from 'lucide-react'
import type { ProjectDetail } from '@/schemas/projectSchema'
import { ImageSlider } from '@/components/ui/ImageSlider'

export function ProjectMilestones({ project }: { project: ProjectDetail }) {
  const { milestones } = project
  const [expandedId, setExpandedId] = useState<string | null>(
    milestones?.[0]?.id || null
  )

  if (!milestones || milestones.length === 0) {
    return (
      <div className="lg:col-span-12 p-8 text-center text-[#73757d] border border-[#2e323b] rounded-xl bg-[#161a21]">
        No milestones defined yet.
      </div>
    )
  }

  const sortedMilestones = [...milestones].sort((a, b) => a.order - b.order)

  return (
    <div className="lg:col-span-12 space-y-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-6 h-1 bg-[#8ff5ff] rounded-full shadow-[0_0_10px_#8ff5ff]" />
        <h3 className="text-2xl md:text-3xl font-['Space_Grotesk'] font-bold text-[#ecedf6]">
          Roadmap & Milestones
        </h3>
      </div>

      <div className="relative flex flex-col gap-8 before:absolute before:inset-y-0 before:left-[19px] before:w-[2px] before:bg-gradient-to-b before:from-[#2e323b] before:via-[#2e323b]/50 before:to-transparent">
        {sortedMilestones.map((m) => {
          const isActiveOrDone =
            m.status === 'COMPLETED' || m.status === 'PROGRESS'
          const isExpanded = expandedId === m.id

          const mediaItems = []
          if (m.video) mediaItems.push({ type: 'video' as const, url: m.video })
          if (m.images && m.images.length > 0) {
            m.images.forEach((img) =>
              mediaItems.push({ type: 'image' as const, url: img })
            )
          }

          return (
            <div key={m.id} className="relative flex gap-4 md:gap-6 group">
              {/* Timeline Node */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-[3px] border-[#10131a] transition-all duration-500 ease-out
                ${
                  isActiveOrDone
                    ? 'bg-[#8ff5ff] text-[#10131a] shadow-[0_0_20px_rgba(143,245,255,0.6)]'
                    : 'bg-[#22262f] text-[#73757d]'
                }`}
              >
                <span className="font-['Space_Grotesk'] font-bold text-sm">
                  {m.order}
                </span>
              </div>

              {/* Content Card */}
              <div className="flex-1 min-w-0">
                <div
                  className={`rounded-2xl border transition-all duration-500 ease-out overflow-hidden
                    ${isExpanded ? 'bg-[#161a21] border-[#8ff5ff]/40 shadow-[0_8px_30px_rgb(0,0,0,0.5)]' : 'bg-[#10131a] border-[#2e323b]/50 hover:border-[#8ff5ff]/20 hover:bg-[#161a21]/50'}`}
                >
                  {/* Header (Always visible) */}
                  <div
                    className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : m.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4
                          className={`text-xl font-['Space_Grotesk'] font-bold transition-colors duration-300 ${isActiveOrDone ? 'text-[#8ff5ff]' : 'text-[#ecedf6]'}`}
                        >
                          {m.title}
                        </h4>
                        <span
                          className={`px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-sm border 
                          ${isActiveOrDone ? 'bg-[#8ff5ff]/10 text-[#8ff5ff] border-[#8ff5ff]/30' : 'bg-[#22262f] text-[#a9abb3] border-[#45484f]/30'}`}
                        >
                          {m.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-5 text-[13px] font-bold text-[#73757d] font-['Space_Grotesk'] tracking-wide">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#a9abb3]" />{' '}
                          {new Date(m.startDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-[#a9abb3]" />{' '}
                          {m.amount.toLocaleString()} USDT
                        </span>
                      </div>
                    </div>
                    <div
                      className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-500 ease-out ${isExpanded ? 'bg-[#8ff5ff]/10 text-[#8ff5ff]' : 'bg-[#22262f] text-[#a9abb3]'}`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-500 ease-out ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </div>

                  {/* Body (Expanded) */}
                  {isExpanded && (
                    <div className="border-t border-[#2e323b]/50 animate-in slide-in-from-top-2 fade-in duration-500 ease-out">
                      {mediaItems.length > 0 && (
                        <div className="w-full aspect-video bg-[#0d0f14] border-b border-[#2e323b]/50">
                          <ImageSlider media={mediaItems} />
                        </div>
                      )}

                      <div className="p-6 md:p-8">
                        {/* HTML Description */}
                        <div
                          className="text-[#a9abb3] text-[15px] leading-loose max-w-[70ch] mb-10 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:text-[#ecedf6]"
                          dangerouslySetInnerHTML={{ __html: m.description }}
                        />

                        {/* Pros, Cons, Outcome (Sleek Outline Design) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                          {m.advantages && (
                            <div className="p-5 rounded-xl border border-[#2e323b]/40 bg-[#10131a]/80 relative overflow-hidden group">
                              <div className="absolute top-0 left-0 w-1 h-full bg-[#8ff5ff]/50" />
                              <div className="flex items-center gap-2 mb-3">
                                <Lightbulb className="w-4 h-4 text-[#8ff5ff]" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8ff5ff]">
                                  Advantages
                                </span>
                              </div>
                              <div
                                className="text-[13px] text-[#a9abb3] leading-relaxed [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-4"
                                dangerouslySetInnerHTML={{
                                  __html: m.advantages
                                }}
                              />
                            </div>
                          )}

                          {m.challenges && (
                            <div className="p-5 rounded-xl border border-[#2e323b]/40 bg-[#10131a]/80 relative overflow-hidden">
                              <div className="absolute top-0 left-0 w-1 h-full bg-[#ff716c]/50" />
                              <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="w-4 h-4 text-[#ff716c]" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff716c]">
                                  Challenges
                                </span>
                              </div>
                              <div
                                className="text-[13px] text-[#a9abb3] leading-relaxed [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-4"
                                dangerouslySetInnerHTML={{
                                  __html: m.challenges
                                }}
                              />
                            </div>
                          )}

                          {m.outcome && (
                            <div className="md:col-span-2 p-6 rounded-xl border border-[#ac89ff]/30 bg-gradient-to-br from-[#ac89ff]/10 to-transparent relative overflow-hidden">
                              <div className="flex items-center gap-2 mb-3">
                                <Target className="w-4 h-4 text-[#ac89ff]" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#ac89ff]">
                                  Expected Outcome
                                </span>
                              </div>
                              <div
                                className="text-[15px] text-[#ecedf6] leading-loose max-w-[70ch] [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5"
                                dangerouslySetInnerHTML={{ __html: m.outcome }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Milestone Update */}
                        {m.milestoneUpdates && (
                          <div className="mt-6 p-5 rounded-xl border border-[#8ff5ff]/20 bg-[#8ff5ff]/5">
                            <h5 className="text-xs font-bold uppercase tracking-widest text-[#8ff5ff] mb-4 flex items-center gap-2 border-b border-[#8ff5ff]/10 pb-2">
                              <ShieldCheck className="w-4 h-4" /> Official
                              Update Report
                            </h5>

                            <div className="space-y-4">
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#a9abb3] mb-1 block">
                                  Completed
                                </span>
                                <div
                                  className="text-xs text-[#ecedf6] [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-4"
                                  dangerouslySetInnerHTML={{
                                    __html: m.milestoneUpdates.completed
                                  }}
                                />
                              </div>

                              {m.milestoneUpdates.blockers && (
                                <div>
                                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff716c] mb-1 block">
                                    Blockers / Delays
                                  </span>
                                  <div
                                    className="text-xs text-[#ff716c]/90 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-4"
                                    dangerouslySetInnerHTML={{
                                      __html: m.milestoneUpdates.blockers
                                    }}
                                  />
                                </div>
                              )}
                            </div>

                            {(m.milestoneUpdates.images?.length > 0 ||
                              m.milestoneUpdates.demoUrl ||
                              m.milestoneUpdates.link) && (
                              <div className="mt-4 pt-4 border-t border-[#8ff5ff]/10 flex flex-wrap gap-3">
                                {m.milestoneUpdates.demoUrl && (
                                  <a
                                    href={m.milestoneUpdates.demoUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex px-3 py-1.5 rounded bg-[#8ff5ff]/20 text-xs font-bold text-[#8ff5ff] hover:bg-[#8ff5ff]/30 transition-colors items-center gap-1.5"
                                  >
                                    <Play className="w-3 h-3 fill-current" />{' '}
                                    Watch Demo
                                  </a>
                                )}
                                {m.milestoneUpdates.link && (
                                  <a
                                    href={m.milestoneUpdates.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex px-3 py-1.5 rounded border border-[#45484f] text-xs font-bold text-[#ecedf6] hover:bg-[#22262f] transition-colors items-center gap-1.5"
                                  >
                                    <ExternalLink className="w-3 h-3" />{' '}
                                    External Link
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
