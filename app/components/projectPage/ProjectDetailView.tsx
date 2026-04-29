import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowLeft, ExternalLink, Zap } from 'lucide-react'
import { ProjectHero } from '@/components/projectPage/ProjectHero'
import { ProjectMedia } from '@/components/projectPage/ProjectMedia'
import { ProjectStats } from '@/components/projectPage/ProjectStats'
import { TopInvestors } from '@/components/projectPage/TopInvestors'
import { ProjectTabs } from '@/components/projectPage/ProjectTabs'
import { ProjectContent } from '@/components/projectPage/ProjectContent'
import { ProjectMilestones } from '@/components/projectPage/ProjectMilestones'
import { ProjectTeam } from '@/components/projectPage/ProjectTeam'
import { ProjectUpdates } from '@/components/projectPage/ProjectUpdates'
import type { ProjectDetail } from '@/schemas/projectSchema'

// ─── Tabs theo status ────────────────────────────────────────────────────────
const TABS_PROGRESS = ['Story', 'Review', 'Teams']
const TABS_ACTIVE = ['Story', 'Milestone', 'Updates', 'Review', 'Teams']
const TABS_DEFAULT = ['Story', 'Milestone', 'Updates', 'Review', 'Teams']

// ─── InvestCTA — placeholder, disabled ───────────────────────────────────────
function InvestCTA({
  raisedAmount,
  fundingGoal
}: {
  raisedAmount: number
  fundingGoal: number
}) {
  const pct =
    fundingGoal > 0
      ? Math.min(100, Math.round((raisedAmount / fundingGoal) * 100))
      : 0
  return (
    <div className="p-6 rounded-2xl bg-[#10131a] border border-[#2e323b]/50 flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-[#8ff5ff]" />
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#73757d]">
          Back this project
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-[11px] font-mono">
          <span className="text-[#8ff5ff] font-bold">
            {raisedAmount.toLocaleString()} raised
          </span>
          <span className="text-[#73757d]">{pct}%</span>
        </div>
        <div className="h-1.5 w-full bg-[#161a21] rounded-full overflow-hidden border border-[#2e323b]/50">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#8ff5ff] to-[#ac89ff] shadow-[0_0_12px_rgba(143,245,255,0.6)] transition-all duration-1000"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="text-right text-[11px] font-mono text-[#73757d]">
          Goal: {fundingGoal.toLocaleString()} USDT
        </div>
      </div>
      <button
        disabled
        title="Investment feature coming soon"
        className="w-full py-3 rounded-xl border border-[#2e323b] bg-[#161a21] text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-not-allowed opacity-60 font-['Space_Grotesk']"
      >
        <Zap className="w-3.5 h-3.5 text-[#8ff5ff]" />
        <span className="text-[#8ff5ff]">Fund This Project</span>
        <span className="text-[#45484f] normal-case tracking-normal font-normal">
          · Coming Soon
        </span>
      </button>
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
  const isOwner = project.userId === currentUserId
  const isProgress = project.status === 'progress'
  const isActive = project.status === 'active'

  const tabs = isProgress
    ? TABS_PROGRESS
    : isActive
      ? TABS_ACTIVE
      : TABS_DEFAULT
  const [activeTab, setActiveTab] = useState(tabs[0])
  const safeTab = tabs.includes(activeTab) ? activeTab : tabs[0]

  return (
    <div className="bg-[#0a0c10] text-[#ecedf6] min-h-screen font-['Space_Grotesk']">
      <main className="pt-10 pb-20 px-4 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* ── Back + Owner shortcut ────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-10">
          <Link
            to={backLink.to}
            className="inline-flex items-center gap-2 text-[#73757d] hover:text-[#ecedf6] transition-colors font-bold group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            {backLink.label}
          </Link>

          {/* Nếu owner đang xem trang public → link sang trang quản lý */}
          {isPublicView && isOwner && (
            <Link
              to={`/my-project/${project.id}`}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#ac89ff] hover:text-[#c4adff] transition-colors border border-[#ac89ff]/30 hover:border-[#ac89ff]/60 px-4 py-2 rounded-lg"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Manage Project
            </Link>
          )}
        </div>

        {/* ── Hero ────────────────────────────────────────────────────── */}
        <ProjectHero project={project} />

        {/* ── Media + Sidebar ─────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <ProjectMedia project={project} />

          <div className="lg:col-span-4 flex flex-col gap-6">
            <ProjectStats project={project} />
            <TopInvestors project={project} />

            {/* InvestCTA: chỉ trên public view, khi PROGRESS, và không phải owner */}
            {isPublicView && isProgress && !isOwner && (
              <InvestCTA
                raisedAmount={project.raisedAmount}
                fundingGoal={project.totalAmount}
              />
            )}

            {/* Active status note (public view) */}
            {isPublicView && isActive && (
              <div className="p-5 rounded-2xl bg-[#10131a] border border-[#2e323b]/50 text-center">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#ac89ff] mb-2">
                  Project Status
                </p>
                <p className="text-[#a9abb3] text-xs">
                  This project has reached its funding goal and is currently
                  executing milestones.
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
          {safeTab === 'Milestone' && <ProjectMilestones project={project} />}
          {safeTab === 'Updates' && (
            <ProjectUpdates project={project} currentUserId={currentUserId} />
          )}
          {safeTab === 'Review' && (
            <div className="p-8 text-center text-[#73757d] border border-[#2e323b]/50 rounded-xl">
              Reviews Coming Soon
            </div>
          )}
          {safeTab === 'Teams' && <ProjectTeam project={project} />}
        </div>
      </main>
    </div>
  )
}
