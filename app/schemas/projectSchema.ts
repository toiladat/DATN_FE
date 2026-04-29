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
  investorsCount: z.number().optional(),
  topInvestorsAvatars: z.array(z.string()).optional(),
  likesCount: z.number().optional(),
  isLiked: z.boolean().optional(),
  startDate: z.number(),
  endDate: z.number(),
  updatedAt: z.number(),
  totalMilestones: z.number().optional(),
  completedMilestones: z.number().optional()
})
export type ProjectSummary = z.infer<typeof ProjectSummarySchema>

export const PaginatedProjectSummarySchema = z.object({
  projects: z.array(ProjectSummarySchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number()
})
export type PaginatedProjectSummary = z.infer<
  typeof PaginatedProjectSummarySchema
>

export const MilestoneUpdateRestSchema = z.object({
  completed: z.string(),
  blockers: z.string(),
  images: z.array(z.string()),
  video: z.string(),
  link: z.string().optional(),
  isLate: z.boolean().optional()
})
export type MilestoneUpdateRest = z.infer<typeof MilestoneUpdateRestSchema>

export const MilestoneRestSchema = z.object({
  id: z.string(),
  order: z.number(),
  title: z.string(),
  description: z.string(),
  amount: z.number(),
  startDate: z.string().or(z.number()),
  endDate: z.string().or(z.number()),
  status: z.string(),
  advantages: z.string().optional(),
  challenges: z.string().optional(),
  outcome: z.string().optional(),
  images: z.array(z.string()),
  video: z.string().optional(),
  milestoneUpdates: MilestoneUpdateRestSchema.nullable()
})
export type MilestoneRest = z.infer<typeof MilestoneRestSchema>

export const ProjectDetailSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  subtitle: z.string(),
  images: z.array(z.string()),
  video: z.string().optional(),
  location: z.string(),
  description: z.string(),
  risks: z.string(),
  totalAmount: z.number(),
  status: ProjectStatusSchema,
  startDate: z.string().or(z.number()),
  endDate: z.string().or(z.number()),
  userId: z.string(),
  raisedAmount: z.number(),
  category: z
    .object({
      name: z.string(),
      slug: z.string()
    })
    .nullable(),
  stats: z.object({
    likes: z.number(),
    reviews: z.number()
  }),
  topInvestors: z.array(
    z.object({
      amount: z.number(),
      name: z.string().optional(),
      avatar: z.string().optional()
    })
  ),
  milestones: z.array(MilestoneRestSchema),
  projectMembers: z.array(
    z.object({
      id: z.string(),
      userId: z.string(),
      role: z.string(),
      user: z
        .object({
          id: z.string(),
          name: z.string().nullable().optional(),
          avatar: z.string().nullable().optional(),
          email: z.string().nullable().optional(),
          walletAddress: z.string()
        })
        .optional()
    })
  ),
  createdAt: z.string().or(z.number()),
  updatedAt: z.string().or(z.number())
})
export type ProjectDetail = z.infer<typeof ProjectDetailSchema>

export const UserBasicInfoSchema = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
  walletAddress: z.string()
})
export type UserBasicInfo = z.infer<typeof UserBasicInfoSchema>

export type Review = {
  id: string
  content: string
  projectId: string
  userId: string
  createdAt: number
  user?: UserBasicInfo
  replies?: Review[]
}
