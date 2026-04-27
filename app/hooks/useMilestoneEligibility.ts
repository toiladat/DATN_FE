import type { MilestoneRest } from '@/schemas/projectSchema'

export type MilestoneUpdateStatus =
  | 'unlocked' // đủ điều kiện update
  | 'late' // đủ điều kiện nhưng đã qua endDate
  | 'locked_date' // chưa đến startDate
  | 'locked_prev' // milestone trước chưa xong
  | 'finalized' // terminal status: không thể update

const TERMINAL_STATUSES = ['COMPLETED', 'APPROVED', 'CANCELLED', 'WITHDRAWN']
const DONE_STATUSES = ['COMPLETED', 'APPROVED']

/**
 * Pure client-side eligibility check.
 * Mirrors the BE `assertMilestoneUpdateEligible` guard — no API call needed.
 * Returns the update status for display logic.
 */
export function getMilestoneUpdateStatus(
  milestone: MilestoneRest,
  allMilestones: MilestoneRest[],
  projectStatus: string
): MilestoneUpdateStatus {
  // Project must be ACTIVE
  if (projectStatus !== 'active') return 'locked_prev'

  // Terminal status — read-only
  if (TERMINAL_STATUSES.includes(milestone.status)) return 'finalized'

  // Date window: today >= startDate (date-only)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const startDay = new Date(milestone.startDate)
  startDay.setHours(0, 0, 0, 0)

  if (today < startDay) return 'locked_date'

  // Sequential prerequisite: milestone 1 has no dependency
  if (milestone.order > 1) {
    const sorted = [...allMilestones].sort((a, b) => a.order - b.order)
    const prev = sorted.find((m) => m.order === milestone.order - 1)
    if (!prev || !DONE_STATUSES.includes(prev.status)) return 'locked_prev'
  }

  // Check if late (past endDate)
  const endDay = new Date(milestone.endDate)
  endDay.setHours(23, 59, 59, 999)
  if (today > endDay) return 'late'

  return 'unlocked'
}
