import { Link } from 'react-router'
import type { ProjectSummary } from '@/schemas/projectSchema'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RefundButton } from './RefundButton'
import { useTranslation } from 'react-i18next'

const getStatusConfig = (status: string) => {
  switch (status.toLowerCase()) {
    case 'progress':
      return {
        labelKey: 'stats.funding',
        color: 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10'
      }
    case 'active':
      return {
        labelKey: 'status.active',
        color: 'text-neon-purple border-neon-purple/30 bg-neon-purple/10'
      }
    case 'success':
      return {
        labelKey: 'status.success',
        color: 'text-success border-success/30 bg-success/10'
      }
    case 'rejected':
      return {
        labelKey: 'stats.failed',
        color: 'text-neon-rose border-neon-rose/30 bg-neon-rose/10'
      }
    default:
      return {
        labelKey: 'status.pending',
        color: 'text-muted-foreground border-border bg-card'
      }
  }
}

export function CompactProjectCard({ project }: { project: ProjectSummary }) {
  const { t, i18n } = useTranslation()
  const statusConfig = getStatusConfig(project.status)

  return (
    <Link to={`/projects/${project.id}`}>
      <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-all group">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-none overflow-hidden shrink-0 border border-border group-hover:border-neon-cyan/30 transition-colors">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-background flex items-center justify-center">
                <span className="material-symbols-outlined text-muted-foreground/60">
                  rocket_launch
                </span>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-base group-hover:text-neon-cyan transition-colors truncate max-w-[200px] md:max-w-xs">
              {project.title}
            </h3>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
              {project.primaryCategory}
            </p>
            {project.status === 'rejected' && project.rejectReason && (
              <p
                className="text-xs text-neon-rose/90 mt-2 bg-neon-rose/10 px-2.5 py-1.5 rounded-none max-w-sm border border-neon-rose/20"
                title={project.rejectReason}
              >
                <span className="font-semibold">{t('compact.reason')}</span>{' '}
                {project.rejectReason}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-6 md:gap-12 text-right">
          <div className="hidden sm:block">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              {project.investedAt
                ? new Intl.DateTimeFormat(
                    i18n.language === 'vi' ? 'vi-VN' : 'en-US',
                    {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    }
                  ).format(new Date(project.investedAt))
                : 'N/A'}
            </p>
            <p className="font-mono text-sm font-semibold text-foreground">
              {project.myInvestmentAmount?.toLocaleString() || 0} mUSDT
            </p>
          </div>
          {project.status.toLowerCase() === 'rejected' &&
          project.myInvestmentAmount &&
          project.myInvestmentAmount > 0 ? (
            <div className="mr-2 z-10" onClick={(e) => e.preventDefault()}>
              {project.hasRefunded ? (
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="h-8 text-xs font-semibold uppercase tracking-wider text-green-500 border-green-500/30 bg-green-500/10 rounded-none"
                >
                  {t('compact.refunded')}
                </Button>
              ) : (
                <RefundButton
                  projectId={project.id}
                  amount={project.refundAmount}
                />
              )}
            </div>
          ) : null}
          <div className="w-24 text-right flex justify-end">
            <Badge
              variant="outline"
              className={`${statusConfig.color} px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest`}
            >
              {t(statusConfig.labelKey)}
            </Badge>
          </div>
          <div className="hidden md:flex shrink-0 w-8 h-8 rounded-none border border-border group-hover:border-neon-cyan/50 bg-background items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-muted-foreground/60 group-hover:text-neon-cyan text-sm">
              arrow_forward_ios
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
