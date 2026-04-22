import { z } from 'zod'

export const BasicsSchema = z.object({
  title: z.string().min(1, 'Project Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  primaryCategory: z.string().min(1, 'Primary Category is required'),
  secondaryCategory: z.string().optional(),
  location: z.string().min(1, 'Location is required'),
  image: z.array(z.string()).min(1, 'At least 1 Reference Image is required'),
  video: z.string().optional(),
  fundingGoal: z.number().positive('Funding goal must be a positive number'),
  startDate: z.string().min(1, 'Start Date is required'),
  endDate: z.string().min(1, 'End Date is required'),
  description: z.string().min(1, 'Project Description is required'),
  risks: z.string().min(1, 'Risks & Challenges are required')
})

export const MilestoneSchema = z.object({
  name: z.string().min(1, 'Milestone Name is required'),
  description: z.string().min(1, 'Description is required'),
  durationDays: z.number().int().positive('Duration must be greater than 0'),
  startDate: z.string().min(1, 'Start Date is required'),
  endDate: z.string().min(1, 'End Date is required'),
  budget: z.number().positive('Budget Allocation must be greater than 0'),
  advantages: z.string().optional(),
  challenges: z.string().optional(),
  images: z.array(z.string()).min(1, 'Reference Image is required'),
  expectedOutcome: z.string().min(1, 'Expected Outcome is required')
})

export const TeamMemberSchema = z.object({
  id: z.string().min(1, 'ID required'),
  name: z.string().min(1, 'Name required'),
  email: z.string().email('Invalid email').min(1, 'Email required'),
  role: z.string().optional(),
  roleDescription: z.string().optional(),
  wallet: z.string().min(1, 'Wallet required'),
  avatar: z.string().optional()
})

export const ProjectSubmissionSchema = z.object({
  basics: BasicsSchema,
  milestones: z.array(MilestoneSchema),
  team: z.array(TeamMemberSchema)
})

export type ProjectSubmission = z.infer<typeof ProjectSubmissionSchema>

export const ProjectStatusSchema = z.enum([
  'pending',
  'progress',
  'active',
  'success',
  'rejected'
])
export type ProjectStatus = z.infer<typeof ProjectStatusSchema>

export const ProjectSummarySchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: ProjectStatusSchema,
  fundingGoal: z.number(),
  raisedAmount: z.number(),
  image: z.string().nullable().optional(),
  primaryCategory: z.string().optional(),
  startDate: z.number(),
  endDate: z.number(),
  updatedAt: z.number(),
  totalMilestones: z.number().optional(),
  completedMilestones: z.number().optional()
})
export type ProjectSummary = z.infer<typeof ProjectSummarySchema>
