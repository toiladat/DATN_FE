import {
  Info,
  Calendar,
  Tag,
  ShieldCheck,
  MapPin,
  AlertTriangle,
  FileText,
  Zap
} from 'lucide-react'
import type { ProjectDetail } from '@/schemas/projectSchema'

export function ProjectContent({ project }: { project: ProjectDetail }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* LEFT COLUMN: Main Story */}
      <div className="lg:col-span-8 space-y-10">
        {/* Project Vision (Stylized Lead Text) */}
        <div className="relative pl-8 py-3">
          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#8ff5ff]/80 to-transparent rounded-full" />
          <div className="absolute -left-1 top-0 w-3 h-3 bg-[#8ff5ff] rounded-full blur-sm" />
          <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8ff5ff] mb-5 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" /> Core Vision
          </h2>
          <div className="prose prose-invert max-w-none">
            <div
              className="text-[#ecedf6] text-2xl md:text-3xl leading-snug font-['Space_Grotesk'] font-medium [&_p]:mb-0"
              dangerouslySetInnerHTML={{
                __html: project.subtitle || 'No project vision provided.'
              }}
            />
          </div>
        </div>

        {/* Detailed Description */}
        {project.description && (
          <section className="relative mt-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-[#a9abb3] flex items-center gap-3 border-b border-[#2e323b]/40 pb-4">
              <FileText className="w-4 h-4" />
              Comprehensive Details
            </h3>
            <div className="prose prose-invert prose-lg max-w-none">
              <div
                className="text-[#a9abb3] leading-loose text-[15px] max-w-[70ch] [&_p]:mb-6 [&_ul]:list-none [&_ul]:pl-0 [&_ul_li]:relative [&_ul_li]:pl-6 [&_ul_li::before]:content-[''] [&_ul_li::before]:absolute [&_ul_li::before]:left-0 [&_ul_li::before]:top-[12px] [&_ul_li::before]:w-1.5 [&_ul_li::before]:h-1.5 [&_ul_li::before]:bg-[#ac89ff] [&_ul_li::before]:rounded-full [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:text-[#ecedf6] [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:text-[#ecedf6] [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:text-[#ecedf6] [&_a]:text-[#8ff5ff] [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </div>
          </section>
        )}
      </div>

      {/* RIGHT COLUMN: Metadata & Risks */}
      <div className="lg:col-span-4 space-y-6">
        {/* Project Details Panel */}
        <div className="p-7 rounded-2xl bg-[#10131a] border border-[#2e323b]/50 shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#ac89ff]/10 rounded-full blur-3xl group-hover:bg-[#ac89ff]/15 transition-colors duration-700 ease-out" />

          <h3 className="text-[11px] font-bold uppercase tracking-widest mb-7 text-[#ecedf6] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#ac89ff]" />
            Data Log
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#161a21]/80 border border-[#2e323b]/30 hover:border-[#8ff5ff]/40 hover:bg-[#161a21] transition-all duration-500 ease-out">
              <span className="text-[#73757d] uppercase text-[9px] font-bold tracking-widest flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#a9abb3]" /> Start
              </span>
              <span className="text-[#ecedf6] font-mono text-[13px] font-medium tracking-wide">
                {new Date(project.startDate).toLocaleDateString()}
              </span>
            </div>

            <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#161a21]/80 border border-[#2e323b]/30 hover:border-[#8ff5ff]/40 hover:bg-[#161a21] transition-all duration-500 ease-out">
              <span className="text-[#73757d] uppercase text-[9px] font-bold tracking-widest flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#a9abb3]" /> End
              </span>
              <span className="text-[#ecedf6] font-mono text-[13px] font-medium tracking-wide">
                {new Date(project.endDate).toLocaleDateString()}
              </span>
            </div>

            <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-[#161a21]/80 border border-[#2e323b]/30 hover:border-[#8ff5ff]/40 hover:bg-[#161a21] transition-all duration-500 ease-out col-span-2">
              <span className="text-[#73757d] uppercase text-[9px] font-bold tracking-widest flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#a9abb3]" /> Location
              </span>
              <span
                className="text-[#ecedf6] text-[13px] font-medium truncate"
                title={project.location || 'Global'}
              >
                {project.location || 'Global Operations'}
              </span>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-xl bg-gradient-to-br from-[#ac89ff]/10 to-transparent border border-[#ac89ff]/20 hover:border-[#ac89ff]/40 transition-all duration-500 ease-out col-span-2">
              <span className="text-[#ac89ff] uppercase text-[10px] font-bold tracking-widest flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> Category
              </span>
              <span className="text-[#ecedf6] text-sm font-medium tracking-wide">
                {project.category?.name || 'Uncategorized'}
              </span>
            </div>
          </div>
        </div>

        {/* Risks & Challenges Panel */}
        {project.risks && (
          <div className="relative mt-8">
            <div className="absolute left-0 top-0 w-1 h-full bg-[#ff716c]/40 rounded-full" />
            <div className="pl-5 py-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-[#ff716c] flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                Risks & Challenges
              </h3>

              <div className="prose prose-invert max-w-none">
                <div
                  className="text-[#a9abb3] text-[13px] leading-relaxed [&_p]:mb-3 last:[&_p]:mb-0 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_strong]:text-[#ecedf6] [&_h1]:text-[15px] [&_h1]:font-bold [&_h1]:mb-2 [&_h2]:text-[14px] [&_h2]:font-bold [&_h2]:mb-2 [&_h3]:text-[13px] [&_h3]:font-bold [&_h3]:mb-1"
                  dangerouslySetInnerHTML={{ __html: project.risks }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
