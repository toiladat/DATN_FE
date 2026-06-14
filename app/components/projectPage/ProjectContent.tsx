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
import { useTranslation } from 'react-i18next'

export function ProjectContent({ project }: { project: ProjectDetail }) {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* LEFT COLUMN: Main Story */}
      <div className="lg:col-span-8 space-y-10">
        {/* Project Vision (Stylized Lead Text) */}
        <div className="relative pl-8 py-3">
          <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-neon-cyan/80 to-transparent rounded-none" />
          <div className="absolute -left-1 top-0 w-3 h-3 bg-neon-cyan rounded-none blur-sm" />
          <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-neon-cyan mb-5 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" /> {t('content.core_vision')}
          </h2>
          <div className="prose prose-invert max-w-none">
            <div
              className="text-foreground text-2xl md:text-3xl leading-snug font-['Space_Grotesk'] font-medium [&_p]:mb-0"
              dangerouslySetInnerHTML={{
                __html: project.subtitle || t('content.no_vision')
              }}
            />
          </div>
        </div>

        {/* Detailed Description */}
        {project.description && (
          <section className="relative mt-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-muted-foreground flex items-center gap-3 border-b border-border/40 pb-4">
              <FileText className="w-4 h-4" />
              {t('content.comprehensive_details')}
            </h3>
            <div className="prose prose-invert prose-lg max-w-none">
              <div
                className="text-muted-foreground leading-loose text-[15px] max-w-[70ch] [&_p]:mb-6 [&_ul]:list-none [&_ul]:pl-0 [&_ul_li]:relative [&_ul_li]:pl-6 [&_ul_li::before]:content-[''] [&_ul_li::before]:absolute [&_ul_li::before]:left-0 [&_ul_li::before]:top-[12px] [&_ul_li::before]:w-1.5 [&_ul_li::before]:h-1.5 [&_ul_li::before]:bg-neon-purple [&_ul_li::before]:rounded-none [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:text-foreground [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:text-foreground [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:text-foreground [&_a]:text-neon-cyan [&_a]:underline"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </div>
          </section>
        )}
      </div>

      {/* RIGHT COLUMN: Metadata & Risks */}
      <div className="lg:col-span-4 space-y-6">
        {/* Project Details Panel */}
        <div className="p-7 rounded-none bg-card border border-border/50 shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-neon-purple/10 rounded-none blur-3xl group-hover:bg-neon-purple/15 transition-colors duration-700 ease-out" />

          <h3 className="text-[11px] font-bold uppercase tracking-widest mb-7 text-foreground flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-neon-purple" />
            {t('content.data_log')}
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 p-3.5 rounded-none bg-muted/30 border border-transparent hover:border-neon-cyan/20 hover:bg-muted/60 transition-all duration-500 ease-out">
              <span className="text-muted-foreground/60 uppercase text-[9px] font-bold tracking-widest flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />{' '}
                {t('content.start')}
              </span>
              <span className="text-foreground font-mono text-[13px] font-medium tracking-wide">
                {new Date(project.startDate).toLocaleDateString()}
              </span>
            </div>

            <div className="flex flex-col gap-2 p-3.5 rounded-none bg-muted/30 border border-transparent hover:border-neon-cyan/20 hover:bg-muted/60 transition-all duration-500 ease-out">
              <span className="text-muted-foreground/60 uppercase text-[9px] font-bold tracking-widest flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />{' '}
                {t('content.end')}
              </span>
              <span className="text-foreground font-mono text-[13px] font-medium tracking-wide">
                {new Date(project.endDate).toLocaleDateString()}
              </span>
            </div>

            <div className="flex flex-col gap-2 p-3.5 rounded-none bg-muted/30 border border-transparent hover:border-neon-cyan/20 hover:bg-muted/60 transition-all duration-500 ease-out col-span-2">
              <span className="text-muted-foreground/60 uppercase text-[9px] font-bold tracking-widest flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-muted-foreground" />{' '}
                {t('content.location')}
              </span>
              <span
                className="text-foreground text-[13px] font-medium truncate"
                title={project.location || t('content.global_operations')}
              >
                {project.location || t('content.global_operations')}
              </span>
            </div>

            <div className="flex flex-col gap-2 p-4 rounded-none bg-neon-purple/5 border border-transparent hover:border-neon-purple/20 transition-all duration-500 ease-out col-span-2">
              <span className="text-neon-purple uppercase text-[10px] font-bold tracking-widest flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" /> {t('content.category')}
              </span>
              <span className="text-foreground text-sm font-medium tracking-wide">
                {project.category?.name || t('content.uncategorized')}
              </span>
            </div>
          </div>
        </div>

        {/* Risks & Challenges Panel */}
        {project.risks && (
          <div className="relative mt-8">
            <div className="absolute left-0 top-0 w-1 h-full bg-neon-rose/40 rounded-none" />
            <div className="pl-5 py-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-neon-rose flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                {t('content.risks_challenges')}
              </h3>

              <div className="prose prose-invert max-w-none">
                <div
                  className="text-muted-foreground text-[13px] leading-relaxed [&_p]:mb-3 last:[&_p]:mb-0 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_strong]:text-foreground [&_h1]:text-[15px] [&_h1]:font-bold [&_h1]:mb-2 [&_h2]:text-[14px] [&_h2]:font-bold [&_h2]:mb-2 [&_h3]:text-[13px] [&_h3]:font-bold [&_h3]:mb-1"
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
