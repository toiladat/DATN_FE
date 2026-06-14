import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, ExternalLink, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InvestModal } from './InvestModal'
import { PublishModal } from './PublishModal'
import { ProjectHero } from '@/components/projectPage/ProjectHero'
import { ProjectMedia } from '@/components/projectPage/ProjectMedia'
import { ProjectStats } from '@/components/projectPage/ProjectStats'
import { TopInvestors } from '@/components/projectPage/TopInvestors'
import { ProjectTabs } from '@/components/projectPage/ProjectTabs'
import { ProjectContent } from '@/components/projectPage/ProjectContent'
import { ProjectMilestones } from '@/components/projectPage/ProjectMilestones'
import { ProjectTeam } from '@/components/projectPage/ProjectTeam'
import { ProjectUpdates } from '@/components/projectPage/ProjectUpdates'
import { ProjectReviews } from '@/components/projectPage/ProjectReviews'
import { ProjectAttachments } from '@/components/projectPage/ProjectAttachments'
import type { ProjectDetail } from '@/schemas/projectSchema'
import { useTranslation } from 'react-i18next'

// ─── Tabs theo status ────────────────────────────────────────────────────────
const TABS_PROGRESS = ['Story', 'Milestone', 'Review', 'Attachments', 'Teams']
const TABS_ACTIVE = [
  'Story',
  'Milestone',
  'Updates',
  'Review',
  'Attachments',
  'Teams'
]
const TABS_DEFAULT = [
  'Story',
  'Milestone',
  'Updates',
  'Review',
  'Attachments',
  'Teams'
]

// ─── InvestCTA — placeholder, disabled ───────────────────────────────────────
function PublishCTA({ project }: { project: ProjectDetail }) {
  const { t } = useTranslation()
  return (
    <div className="p-6 rounded-none bg-card border border-neon-cyan/35 shadow-[2px_2px_0px_var(--neon-purple)] flex flex-col gap-5 relative overflow-hidden group">
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-neon-cyan/5 rounded-none blur-3xl group-hover:bg-neon-cyan/10 transition-colors duration-700 ease-out" />
      <div className="flex items-center gap-2 relative z-10">
        <Zap className="w-4 h-4 text-neon-cyan" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-neon-cyan">
          {t('detail.ready_to_launch')}
        </span>
      </div>
      <div className="space-y-2 relative z-10">
        <p className="text-muted-foreground text-sm">
          {t('detail.approved_desc')}
        </p>
      </div>
      <div className="relative z-10">
        <PublishModal project={project}>
          <Button
            className="w-full font-['Space_Grotesk'] font-bold uppercase tracking-widest text-[11px] rounded-none shadow-[2px_2px_0px_rgba(143,245,255,0.3)]"
            size="lg"
          >
            {t('detail.publish_btn')}
          </Button>
        </PublishModal>
      </div>
    </div>
  )
}

function InvestCTA({
  projectId,
  raisedAmount,
  fundingGoal
}: {
  projectId: string
  raisedAmount: number
  fundingGoal: number
}) {
  const { t } = useTranslation()
  const pct =
    fundingGoal > 0
      ? Math.min(100, Math.round((raisedAmount / fundingGoal) * 100))
      : 0
  return (
    <div className="p-6 rounded-none bg-card border border-border/60 shadow-[2px_2px_0px_rgba(143,245,255,0.3)] flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-neon-cyan" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/85">
          {t('detail.funding_progress')}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-[11px] font-mono">
          <span className="text-neon-cyan font-bold">
            {raisedAmount.toLocaleString()} {t('detail.raised')}
          </span>
          <span className="text-muted-foreground/85">{pct}%</span>
        </div>
        <div className="h-1.5 w-full bg-background rounded-none overflow-hidden border border-border/50">
          <div
            className="h-full rounded-none bg-gradient-to-r from-neon-cyan to-neon-purple shadow-[0_0_12px_var(--color-neon-cyan)/60] transition-all duration-1000"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="text-right text-[11px] font-mono text-muted-foreground/85">
          {t('detail.goal')}: {fundingGoal.toLocaleString()} USDT
        </div>
      </div>
      <InvestModal
        projectId={projectId}
        raisedAmount={raisedAmount}
        fundingGoal={fundingGoal}
      >
        <button className="w-full py-3 rounded-none border border-neon-cyan bg-card text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neon-cyan/10 transition-colors opacity-100 font-['Space_Grotesk'] shadow-[2px_2px_0px_var(--neon-purple)]">
          <Zap className="w-3.5 h-3.5 text-neon-cyan" />
          <span className="text-neon-cyan">{t('detail.fund_btn')}</span>
        </button>
      </InvestModal>
    </div>
  )
}

// ─── Props ───────────────────────────────────────────────────────────────────
interface ProjectDetailViewProps {
  project: ProjectDetail
  currentUserId: string | null
  /**
   * true  → public view (/projects/:id): hiển thị InvestCTA, "Manage" link cho owner
   * false → owner view (/my-project/:id): toàn quyền quản lý, không hiện InvestCTA
   */
  isPublicView?: boolean
  backLink: { to: string; label: string }
}

// ─── Shared UI ────────────────────────────────────────────────────────────────
export function ProjectDetailView({
  project,
  currentUserId,
  isPublicView = false,
  backLink
}: ProjectDetailViewProps) {
  const { t } = useTranslation()
  const isOwner = project.userId === currentUserId
  const isProgress = project.status === 'progress'
  const isActive = project.status === 'active'
  const isApproved = project.status === 'approved'

  const tabs = isProgress
    ? TABS_PROGRESS
    : isActive
      ? TABS_ACTIVE
      : TABS_DEFAULT
  const [activeTab, setActiveTab] = useState(tabs[0])
  const safeTab = tabs.includes(activeTab) ? activeTab : tabs[0]

  return (
    <div className="bg-background text-foreground min-h-screen font-['Space_Grotesk']">
      <main className="pt-28 pb-20 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* ── Back + Owner shortcut ────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-10">
          <Link
            to={backLink.to}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {backLink.label}
          </Link>
        </div>

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <ProjectHero project={project} />

        {/* ── Media + Sidebar ─────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          <ProjectMedia project={project} />

          <div className="lg:col-span-4 flex flex-col gap-6">
            <ProjectStats project={project} />
            <TopInvestors project={project} />

            {/* InvestCTA: chỉ trên public view, khi PROGRESS, và không phải owner */}
            {isPublicView && isProgress && !isOwner && (
              <InvestCTA
                projectId={project.id}
                raisedAmount={project.raisedAmount}
                fundingGoal={project.totalAmount}
              />
            )}

            {/* PublishCTA: cho owner khi đang APPROVED */}
            {!isPublicView && isApproved && isOwner && (
              <PublishCTA project={project} />
            )}

            {/* Active status note (public view) */}
            {isPublicView && isActive && (
              <div className="p-5 rounded-none bg-card border border-border/50 text-center shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                <p className="text-[11px] font-bold uppercase tracking-widest text-neon-purple mb-2">
                  {t('detail.project_status')}
                </p>
                <p className="text-muted-foreground text-xs">
                  {t('detail.active_status_desc')}
                </p>
              </div>
            )}

            {/* Success status note (both public and owner view) */}
            {project.status === 'success' && (
              <div className="p-5 rounded-none bg-card border border-neon-cyan/30 text-center shadow-sm dark:shadow-[0_0_24px_var(--color-neon-cyan)/15] relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-neon-cyan/5 rounded-none blur-3xl group-hover:bg-neon-cyan/10 transition-colors duration-700 ease-out" />
                <p className="text-[11px] font-bold uppercase tracking-widest text-neon-cyan mb-2 relative z-10 flex items-center justify-center gap-1.5 font-['Space_Grotesk']">
                  <Zap className="w-3.5 h-3.5 text-neon-cyan" />
                  {t('detail.project_completed')}
                </p>
                <p className="text-muted-foreground text-xs relative z-10">
                  {t('detail.success_status_desc')}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── Tabs ────────────────────────────────────────────────────── */}
        <ProjectTabs
          tabs={tabs}
          activeTab={safeTab}
          onTabChange={setActiveTab}
        />

        {/* ── Tab content ─────────────────────────────────────────────── */}
        <div>
          {safeTab === 'Story' && <ProjectContent project={project} />}
          {safeTab === 'Milestone' && (
            <ProjectMilestones project={project} isOwner={isOwner} />
          )}
          {safeTab === 'Updates' && (
            <ProjectUpdates project={project} currentUserId={currentUserId} />
          )}
          {safeTab === 'Review' && (
            <ProjectReviews
              projectId={project.id}
              currentUserId={currentUserId}
              ownerId={project.userId}
              memberUserIds={(project.projectMembers || []).map(
                (m) => m.userId
              )}
            />
          )}
          {safeTab === 'Attachments' && (
            <ProjectAttachments project={project} />
          )}
          {safeTab === 'Teams' && <ProjectTeam project={project} />}
        </div>
      </main>
    </div>
  )
}
