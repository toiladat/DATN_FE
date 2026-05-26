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
        color: 'text-[#8ff5ff] border-[#8ff5ff]/30 bg-[#8ff5ff]/10'
      }
    case 'active':
      return {
        labelKey: 'status.active',
        color: 'text-[#ac89ff] border-[#ac89ff]/30 bg-[#ac89ff]/10'
      }
    case 'success':
      return {
        labelKey: 'status.success',
        color: 'text-[#6bcb77] border-[#6bcb77]/30 bg-[#6bcb77]/10'
      }
    case 'rejected':
      return {
        labelKey: 'stats.failed',
        color: 'text-[#ff716c] border-[#ff716c]/30 bg-[#ff716c]/10'
      }
    default:
      return {
        labelKey: 'status.pending',
        color: 'text-[#a9abb3] border-[#2e323b] bg-[#161a21]'
      }
  }
}

export function CompactProjectCard({ project }: { project: ProjectSummary }) {
  const { t, i18n } = useTranslation()
  const statusConfig = getStatusConfig(project.status)

  return (
    <Link to={`/projects/${project.id}`}>
      <div className="flex items-center justify-between p-4 hover:bg-[#1f242e] transition-all group">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-[#2e323b] group-hover:border-[#8ff5ff]/30 transition-colors">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#10131a] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#73757d]">
                  rocket_launch
                </span>
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-[#ecedf6] text-base group-hover:text-[#8ff5ff] transition-colors truncate max-w-[200px] md:max-w-xs">
              {project.title}
            </h3>
            <p className="text-xs text-[#73757d] uppercase tracking-wider mt-1">
              {project.primaryCategory}
            </p>
            {project.status === 'rejected' && project.rejectReason && (
              <p
                className="text-xs text-[#ff716c]/90 mt-2 bg-[#ff716c]/10 px-2.5 py-1.5 rounded-md max-w-sm border border-[#ff716c]/20"
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
            <p className="text-xs text-[#73757d] uppercase tracking-wider mb-1">
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
            <p className="font-mono text-sm font-semibold text-[#ecedf6]">
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
                  className="h-8 text-xs font-semibold uppercase tracking-wider text-green-500 border-green-500/30 bg-green-500/10"
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
          <div className="hidden md:flex shrink-0 w-8 h-8 rounded-full border border-[#2e323b] group-hover:border-[#8ff5ff]/50 bg-[#10131a] items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-[#73757d] group-hover:text-[#8ff5ff] text-sm">
              arrow_forward_ios
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
