import { Terminal, Activity, Shield, ArrowRight, Heart } from 'lucide-react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import type { ProjectSummary } from '@/schemas/projectSchema'
import { useToggleLike } from '@/apis/queries/project'
import { useAuth } from '@/components/providers/AuthProvider'
import { toast } from 'sonner'

// ─── Màu accent tự động từ category ─────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  ai: '#8ff5ff',
  defi: '#8ff5ff',
  gaming: '#8ff5ff',
  infrastructure: '#ac89ff',
  metaverse: '#ff716c',
  privacy: '#ac89ff',
  nft: '#ac89ff'
}
const ACCENT_CYCLE = ['#8ff5ff', '#ac89ff', '#ff716c'] as const

function getAccentColor(category: string | undefined, index: number): string {
  const key = (category ?? '').toLowerCase()
  return CATEGORY_COLORS[key] ?? ACCENT_CYCLE[index % 3]
}

// ─── Status: BE dùng 'active' | 'progress' | 'pending' | 'success' | 'rejected'
// 'progress' = đang gây quỹ (FUNDING) → hiển thị thanh tiến độ funding
// 'active'   = đang thực thi (ACTIVE)  → hiển thị thanh milestone stages
function isFundingStatus(status: ProjectSummary['status']): boolean {
  return status === 'progress'
}

// ─── Props ───────────────────────────────────────────────────────────────────
interface Props {
  project: ProjectSummary
  index?: number
}

const itemVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const }
  }
}

export function ProjectDirectoryCard({ project, index = 0 }: Props) {
  const isFunding = isFundingStatus(project.status)
  const accentColor = getAccentColor(project.primaryCategory, index)

  const [isLiked, setIsLiked] = useState(project.isLiked ?? false)
  const { isAuthenticated } = useAuth()
  const { mutate: toggleLike } = useToggleLike()

  useEffect(() => {
    setIsLiked(project.isLiked ?? false)
  }, [project.isLiked])

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault() // prevent navigating to project detail
    if (!isAuthenticated) {
      toast.warning('Please connect your wallet to like this project', {
        duration: 3000
      })
      return
    }
    // Optimistic UI update
    setIsLiked(!isLiked)
    toggleLike({ id: project.id, isLiked })
  }

  // ── Funding: tính % progress từ raisedAmount / fundingGoal ───────────────
  const progress =
    project.fundingGoal > 0
      ? Math.min(
          100,
          Math.round((project.raisedAmount / project.fundingGoal) * 100)
        )
      : 0

  // ── Developing: derive từ totalMilestones / completedMilestones ──────────
  const totalCount = project.totalMilestones ?? 0
  const completedCount = project.completedMilestones ?? 0
  const stages: Array<'completed' | 'active' | 'pending'> = Array.from(
    { length: totalCount },
    (_, i) => {
      if (i < completedCount) return 'completed'
      if (i === completedCount) return 'active'
      return 'pending'
    }
  )

  // ── Format thời gian còn lại ─────────────────────────────────────────────
  const daysLeft = Math.max(
    0,
    Math.ceil((project.endDate - Date.now()) / (1000 * 60 * 60 * 24))
  )

  return (
    <motion.div variants={itemVariant} className="h-full">
      <Link
        to={`/projects/${project.id}`}
        className="group bg-[#10131a] rounded-2xl overflow-hidden border border-[#2e323b]/50 hover:border-[#2e323b] transition-all duration-500 ease-out flex flex-col relative h-full shadow-[0_8px_20px_rgba(0,0,0,0.4)]"
      >
        {/* Hover Glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-out pointer-events-none"
          style={{
            background: `radial-gradient(circle at top, ${accentColor}, transparent 70%)`
          }}
        />

        {/* ── Image Header ─────────────────────────────────────────────── */}
        <div className="h-36 overflow-hidden relative shrink-0">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-60 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
            src={
              project.image ??
              'https://placehold.co/600x300/0a0c10/2e323b?text=NO+IMAGE'
            }
            alt={project.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10131a] via-[#10131a]/50 to-transparent" />

          {/* Category Badge (Top Left) */}
          <div className="absolute top-3 left-3 z-10">
            {project.primaryCategory && (
              <span
                className="bg-[#0a0c10]/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#2e323b] text-[9px] font-bold uppercase tracking-[0.15em] shadow-lg"
                style={{ color: accentColor }}
              >
                {project.primaryCategory}
              </span>
            )}
          </div>

          {/* Status Badge (Top Right) */}
          <div className="absolute top-3 right-3 z-10">
            {isFunding ? (
              <span className="bg-[#0a0c10]/90 backdrop-blur-md text-[#8ff5ff] px-2.5 py-1 rounded-full text-[9px] font-bold border border-[#8ff5ff]/30 uppercase tracking-[0.15em] flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8ff5ff] animate-pulse shadow-[0_0_8px_#8ff5ff]"></span>
                FUNDING
              </span>
            ) : project.status === 'active' ? (
              <span className="bg-[#0a0c10]/90 backdrop-blur-md text-[#ac89ff] px-2.5 py-1 rounded-full text-[9px] font-bold border border-[#ac89ff]/30 uppercase tracking-[0.15em] flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ac89ff] animate-pulse shadow-[0_0_8px_#ac89ff]"></span>
                ACTIVE
              </span>
            ) : (
              <span className="bg-[#0a0c10]/90 backdrop-blur-md text-[#a9abb3] px-2.5 py-1 rounded-full text-[9px] font-bold border border-[#2e323b] uppercase tracking-[0.15em] flex items-center gap-1.5 shadow-lg">
                <Activity className="w-3 h-3" />
                {project.status?.toUpperCase() ?? 'PENDING'}
              </span>
            )}
          </div>
        </div>

        {/* ── Content Body ─────────────────────────────────────────────── */}
        <div className="p-4 pt-3 flex-1 flex flex-col justify-between relative z-10">
          <div>
            <div className="flex justify-between gap-3 mb-4 min-h-[58px]">
              <div className="flex-1">
                <h3 className="text-base font-['Space_Grotesk'] font-bold text-[#ecedf6] mb-1.5 group-hover:text-white transition-colors leading-snug line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-[#73757d] text-[12px] line-clamp-2 leading-4 font-light">
                  {project.description}
                </p>
              </div>
              {/* Investors Avatars Section */}
              {(project.investorsCount ?? 0) > 0 && (
                <div className="flex flex-col items-end shrink-0 pt-0.5">
                  <div className="flex -space-x-1.5">
                    {(project.topInvestorsAvatars ?? []).map((avatar, idx) => (
                      <img
                        key={idx}
                        src={avatar}
                        className="w-[22px] h-[22px] rounded-full border border-[#10131a] object-cover"
                        alt="Investor"
                      />
                    ))}
                  </div>
                  <span className="text-[9px] text-[#73757d] uppercase tracking-widest mt-1.5 font-bold">
                    {project.investorsCount} backers
                  </span>
                </div>
              )}
            </div>

            {/* ── Status Section (chiều cao cố định = 52px) ─────────────── */}
            <div className="space-y-1.5 mb-4 h-[52px]">
              {isFunding ? (
                <>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#73757d]">
                    <span>SYS.PROGRESS</span>
                    <span style={{ color: accentColor }}>{progress}%</span>
                  </div>
                  <div className="h-1 w-full bg-[#161a21] rounded-full overflow-hidden relative border border-[#2e323b]/50">
                    <div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: accentColor,
                        boxShadow: `0 0 10px ${accentColor}`
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-[#a9abb3] h-[16px] items-center">
                    <span>{project.raisedAmount.toLocaleString()} raised</span>
                    <span>Goal: {project.fundingGoal.toLocaleString()}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[#73757d]">
                    <span>SYS.ROADMAP</span>
                    <span style={{ color: accentColor }}>
                      {completedCount} / {totalCount} DONE
                    </span>
                  </div>
                  {totalCount > 0 ? (
                    <div
                      className="grid gap-1.5 h-1"
                      style={{
                        gridTemplateColumns: `repeat(${stages.length}, 1fr)`
                      }}
                    >
                      {stages.map((stage, idx) => (
                        <div
                          key={idx}
                          className={
                            stage === 'active'
                              ? 'rounded-full animate-pulse'
                              : 'rounded-full'
                          }
                          style={{
                            backgroundColor:
                              stage === 'completed'
                                ? accentColor
                                : stage === 'active'
                                  ? `${accentColor}80`
                                  : '#161a21',
                            border:
                              stage === 'pending'
                                ? '1px solid #2e323b50'
                                : 'none',
                            boxShadow:
                              stage === 'completed'
                                ? `0 0 6px ${accentColor}80`
                                : 'none'
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="h-1 w-full bg-[#161a21] rounded-full border border-[#2e323b]/50" />
                  )}
                  <div className="flex gap-2 text-[11px] font-mono text-[#a9abb3] h-[16px] items-center">
                    <span>UPDATED</span>
                    <span>
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── Stats Bar ─────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#2e323b]/50">
            {isFunding ? (
              <>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[9px] text-[#73757d] uppercase tracking-widest font-bold flex items-center gap-1">
                    <Terminal className="w-2.5 h-2.5" /> DAYS LEFT
                  </p>
                  <p className="font-mono text-[12px] text-[#ecedf6]">
                    {daysLeft}
                  </p>
                </div>
                <div className="flex flex-col gap-0.5 text-right items-end">
                  <p className="text-[9px] text-[#73757d] uppercase tracking-widest font-bold">
                    GOAL
                  </p>
                  <p className="font-mono text-[12px] text-[#ecedf6]">
                    {project.fundingGoal.toLocaleString()}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[9px] text-[#73757d] uppercase tracking-widest font-bold flex items-center gap-1">
                    <Shield className="w-2.5 h-2.5" /> MILESTONES
                  </p>
                  <p className="font-mono text-[12px] text-[#ecedf6]">
                    {completedCount}/{totalCount}
                  </p>
                </div>
                <div className="flex flex-col gap-0.5 text-right items-end">
                  <p className="text-[9px] text-[#73757d] uppercase tracking-widest font-bold">
                    RAISED
                  </p>
                  <p className="font-mono text-[12px] text-[#ecedf6]">
                    {project.raisedAmount.toLocaleString()}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* ── CTA ─────────────────────────────────────────────────────── */}
          <div className="pt-3 flex gap-3">
            <button
              className="flex-1 py-2.5 bg-[#161a21] hover:bg-[#1a1f28] border border-[#2e323b] rounded-xl font-['Space_Grotesk'] font-bold transition-all duration-500 ease-out text-[10px] uppercase tracking-widest flex justify-center items-center gap-2"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
            >
              <span style={{ color: accentColor }}>
                {isFunding ? 'Initialize Support' : 'View Protocol'}
              </span>
              <ArrowRight
                className="w-3.5 h-3.5"
                style={{ color: accentColor }}
              />
            </button>

            <button
              onClick={handleLike}
              className={`w-10 flex items-center justify-center rounded-xl border transition-all duration-500 hover:scale-105 active:scale-95 ${
                isLiked
                  ? 'bg-[#ff2a5f]/10 border-[#ff2a5f] shadow-[0_0_15px_rgba(255,42,95,0.3)]'
                  : 'bg-[#161a21] border-[#2e323b] hover:border-[#4d5363] hover:bg-[#1a1f28]'
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-all duration-500 ${
                  isLiked ? 'text-[#ff2a5f] fill-[#ff2a5f]' : 'text-[#73757d]'
                }`}
              />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
