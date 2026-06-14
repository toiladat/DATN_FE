import { Terminal, Activity, Shield, ArrowRight, Heart } from 'lucide-react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import type { ProjectSummary } from '@/schemas/projectSchema'
import { useToggleLike } from '@/apis/queries/project'
import { useAuth } from '@/components/providers/AuthProvider'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { getErrorMessage } from '@/lib/utils'

// All card accents now use the system-level neon-cyan variable for aesthetic consistency.

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
  const { t } = useTranslation()
  const isFunding = isFundingStatus(project.status)
  const accentColor = 'var(--neon-cyan)'

  const [isLiked, setIsLiked] = useState(project.isLiked ?? false)
  const { isAuthenticated } = useAuth()
  const { mutate: toggleLike } = useToggleLike()

  useEffect(() => {
    setIsLiked(project.isLiked ?? false)
  }, [project.isLiked])

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault() // prevent navigating to project detail
    if (!isAuthenticated) {
      toast.warning(t('toast.like_wallet_required'), {
        duration: 3000
      })
      return
    }

    const previousLiked = isLiked
    const nextLiked = !isLiked

    // Optimistic UI update
    setIsLiked(nextLiked)

    toggleLike(
      { id: project.id, isLiked: previousLiked },
      {
        onSuccess: () => {
          if (nextLiked) {
            toast.success(t('toast.like_success'))
          } else {
            toast.success(t('toast.unlike_success'))
          }
        },
        onError: (err) => {
          setIsLiked(previousLiked)
          const fallbackMsg = nextLiked
            ? t('toast.like_error')
            : t('toast.unlike_error')
          toast.error(getErrorMessage(err, fallbackMsg))
        }
      }
    )
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
        className="group bg-card/65 backdrop-blur-md rounded-none overflow-hidden border border-border/40 hover:border-neon-cyan/50 hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col relative h-full shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(143,245,255,0.04)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_12px_32px_rgba(143,245,255,0.04)] will-change-transform transform-gpu"
      >
        {/* Hover Glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 ease-out pointer-events-none"
          style={{
            background: `radial-gradient(circle at top, ${accentColor}, transparent 70%)`
          }}
        />

        {/* ── Image Header ─────────────────────────────────────────────── */}
        <div className="h-36 overflow-hidden relative shrink-0 isolate rounded-none">
          <img
            className="w-full h-full object-cover transform-gpu group-hover:scale-105 transition-transform duration-1000 ease-out opacity-90 group-hover:opacity-100 will-change-transform"
            src={
              project.image ??
              'https://placehold.co/600x300/0a0c10/2e323b?text=NO+IMAGE'
            }
            alt={project.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />

          {/* Category Badge (Top Left) */}
          <div className="absolute top-3 left-3 z-10">
            {project.primaryCategory && (
              <span
                className="bg-background/95 backdrop-blur-md px-2.5 py-1 rounded-none border border-border/60 text-[9px] font-mono font-bold uppercase tracking-[0.15em] shadow-md"
                style={{ color: accentColor }}
              >
                {project.primaryCategory}
              </span>
            )}
          </div>

          {/* Status Badge (Top Right) */}
          <div className="absolute top-3 right-3 z-10">
            {isFunding ? (
              <span className="bg-background/95 backdrop-blur-md text-neon-cyan px-2.5 py-1 rounded-none text-[9px] font-mono font-bold border border-neon-cyan/30 uppercase tracking-[0.15em] flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_8px_var(--color-neon-cyan)]"></span>
                {t('card.funding')}
              </span>
            ) : project.status === 'active' ? (
              <span className="bg-background/95 backdrop-blur-md text-neon-cyan px-2.5 py-1 rounded-none text-[9px] font-mono font-bold border border-neon-cyan/30 uppercase tracking-[0.15em] flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse shadow-[0_0_8px_var(--color-neon-cyan)]"></span>
                {t('card.active')}
              </span>
            ) : project.status === 'success' ? (
              <span className="bg-background/95 backdrop-blur-md text-neon-cyan px-2.5 py-1 rounded-none text-[9px] font-mono font-bold border border-neon-cyan/30 uppercase tracking-[0.15em] flex items-center gap-1.5 shadow-md">
                <Shield className="w-3 h-3 text-neon-cyan" />
                {t('card.completed')}
              </span>
            ) : (
              <span className="bg-background/95 backdrop-blur-md text-muted-foreground px-2.5 py-1 rounded-none text-[9px] font-mono font-bold border border-border uppercase tracking-[0.15em] flex items-center gap-1.5 shadow-md">
                <Activity className="w-3 h-3" />
                {t(`card.${project.status?.toLowerCase() ?? 'pending'}`)}
              </span>
            )}
          </div>
        </div>

        {/* ── Content Body ─────────────────────────────────────────────── */}
        <div className="p-4 pt-3 flex-1 flex flex-col justify-between relative z-10">
          <div>
            <div className="flex justify-between gap-3 mb-4 min-h-[58px]">
              <div className="flex-1">
                <h3 className="text-base font-headline font-bold text-foreground mb-1.5 group-hover:text-neon-cyan dark:group-hover:text-white transition-colors leading-snug line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-[12px] line-clamp-2 leading-4 font-light">
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
                        className="w-[22px] h-[22px] rounded-full border border-card object-cover"
                        alt="Investor"
                      />
                    ))}
                  </div>
                  <span className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1.5 font-bold">
                    {t('card.backers', { count: project.investorsCount })}
                  </span>
                </div>
              )}
            </div>

            {/* ── Status Section (chiều cao cố định = 52px) ─────────────── */}
            <div className="space-y-1.5 mb-4 h-[52px]">
              {isFunding ? (
                <>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <span>{t('card.sys_progress')}</span>
                    <span
                      style={{ color: accentColor }}
                      className="font-mono tabular-nums"
                    >
                      {progress}%
                    </span>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-none overflow-hidden relative border border-border/30">
                    <div
                      className="absolute top-0 left-0 h-full bg-neon-cyan shadow-[0_0_8px_var(--color-neon-cyan)]"
                      style={{
                        width: `${progress}%`
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono tabular-nums text-muted-foreground h-[16px] items-center">
                    <span>
                      {project.raisedAmount.toLocaleString()} {t('card.raised')}
                    </span>
                    <span>
                      {t('card.goal')}: {project.fundingGoal.toLocaleString()}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <span>{t('card.sys_roadmap')}</span>
                    <span
                      style={{ color: accentColor }}
                      className="font-mono tabular-nums"
                    >
                      {completedCount} / {totalCount} {t('card.done')}
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
                              ? 'rounded-none animate-pulse'
                              : 'rounded-none'
                          }
                          style={{
                            backgroundColor:
                              stage === 'completed'
                                ? accentColor
                                : stage === 'active'
                                  ? 'color-mix(in srgb, var(--neon-cyan) 50%, transparent)'
                                  : 'var(--muted)',
                            border:
                              stage === 'pending'
                                ? '1px solid var(--border)'
                                : 'none',
                            boxShadow:
                              stage === 'completed'
                                ? '0 0 6px color-mix(in srgb, var(--neon-cyan) 50%, transparent)'
                                : 'none'
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="h-1 w-full bg-muted rounded-none border border-border/30" />
                  )}
                  <div className="flex gap-2 text-[11px] font-mono text-muted-foreground h-[16px] items-center">
                    <span>{t('card.updated')}</span>
                    <span>
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── Stats Bar ─────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 py-3 border-y border-border/35 bg-card/25 px-2">
            {isFunding ? (
              <>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold flex items-center gap-1">
                    <Terminal className="w-2.5 h-2.5" /> {t('card.days_left')}
                  </p>
                  <p className="font-mono tabular-nums text-[12px] text-foreground">
                    {daysLeft}
                  </p>
                </div>
                <div className="flex flex-col gap-0.5 text-right items-end">
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">
                    {t('card.goal').toUpperCase()}
                  </p>
                  <p className="font-mono tabular-nums text-[12px] text-foreground">
                    {project.fundingGoal.toLocaleString()}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold flex items-center gap-1">
                    <Shield className="w-2.5 h-2.5" /> {t('card.milestones')}
                  </p>
                  <p className="font-mono tabular-nums text-[12px] text-foreground">
                    {completedCount}/{totalCount}
                  </p>
                </div>
                <div className="flex flex-col gap-0.5 text-right items-end">
                  <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-bold">
                    {t('card.raised').toUpperCase()}
                  </p>
                  <p className="font-mono tabular-nums text-[12px] text-foreground">
                    {project.raisedAmount.toLocaleString()}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* ── CTA ─────────────────────────────────────────────────────── */}
          <div className="pt-3 flex gap-3">
            <button className="flex-1 py-2.5 bg-neon-cyan hover:bg-neon-cyan/95 border border-neon-cyan rounded-none font-headline font-bold transition-all duration-300 ease-out text-[10px] uppercase tracking-[0.12em] flex justify-center items-center gap-2 text-background cursor-pointer active:translate-y-0.5 active:translate-x-0.5 shadow-[2px_2px_0px_0px_var(--neon-purple)]">
              <span>
                {isFunding ? t('card.init_support') : t('card.view_protocol')}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleLike}
              className={`w-10 flex items-center justify-center rounded-none border transition-all duration-500 hover:scale-[1.03] active:translate-y-0.5 active:translate-x-0.5 cursor-pointer ${
                isLiked
                  ? 'bg-rose-500/10 border-rose-500 shadow-[2px_2px_0px_rgba(239,68,68,0.3)]'
                  : 'bg-muted border-border hover:border-border/80 shadow-[2px_2px_0px_rgba(0,0,0,0.08)] dark:shadow-[2px_2px_0px_rgba(255,255,255,0.05)]'
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-all duration-500 ${
                  isLiked
                    ? 'text-rose-500 fill-rose-500'
                    : 'text-muted-foreground'
                }`}
              />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
