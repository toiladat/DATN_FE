import { z } from 'zod'

export const BasicsSchema = z.object({
  title: z.string().min(1, 'title_required'),
  subtitle: z.string().min(1, 'subtitle_required'),
  primaryCategory: z.string().min(1, 'primary_category_required'),
  secondaryCategory: z.string().optional(),
  location: z.string().min(1, 'location_required'),
  image: z.array(z.string()).min(1, 'image_required'),
  video: z.string().optional(),
  fundingGoal: z.number().positive('funding_goal_positive'),
  startDate: z.string().min(1, 'start_date_required'),
  endDate: z.string().min(1, 'end_date_required'),
  description: z.string().min(1, 'description_required'),
  risks: z.string().min(1, 'risks_required')
})

export const MilestoneSchema = z.object({
  name: z.string().min(1, 'milestone_name_required'),
  description: z.string().min(1, 'milestone_description_required'),
  durationDays: z.number().int().positive('milestone_duration_positive'),
  startDate: z.string().min(1, 'start_date_required'),
  endDate: z.string().min(1, 'end_date_required'),
  budget: z.number().positive('milestone_budget_positive'),
  advantages: z.string().optional(),
  challenges: z.string().optional(),
  images: z.array(z.string()).min(1, 'milestone_images_required'),
  expectedOutcome: z.string().min(1, 'milestone_outcome_required')
})

export const TeamMemberSchema = z.object({
  id: z.string().min(1, 'member_id_required'),
  name: z.string().min(1, 'member_name_required'),
  email: z
    .string()
    .email('member_email_invalid')
    .min(1, 'member_email_required'),
  role: z.string().optional(),
  roleDescription: z.string().optional(),
  wallet: z.string().min(1, 'member_wallet_required'),
  avatar: z.string().optional()
})

export const AttachmentSchema = z.object({
  url: z.string().url(),
  category: z.string(),
  customCategoryName: z.string().optional(),
  description: z.string().optional()
})

export const ProjectSubmissionSchema = z.object({
  basics: BasicsSchema,
  milestones: z.array(MilestoneSchema),
  team: z.array(TeamMemberSchema),
  attachments: z.array(AttachmentSchema).optional()
})

export type ProjectSubmission = z.infer<typeof ProjectSubmissionSchema>

export const ProjectStatusSchema = z.enum([
  'pending',
  'approved',
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
  completedMilestones: z.number().optional(),
  myInvestmentAmount: z.number().optional(),
  investedAt: z.number().optional(),
  hasRefunded: z.boolean().optional(),
  refundAmount: z.number().optional(),
  rejectReason: z.string().optional()
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
  milestoneUpdates: MilestoneUpdateRestSchema.nullable(),
  withdrawalRecord: z
    .object({
      id: z.string(),
      status: z.enum(['PENDING', 'SUCCESS', 'FAILED']),
      txHash: z.string().nullable().optional(),
      amount: z.number().optional()
    })
    .nullable()
    .optional()
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
  user: z
    .object({
      id: z.string(),
      name: z.string().nullable().optional(),
      avatar: z.string().nullable().optional(),
      email: z.string().nullable().optional(),
      walletAddress: z.string()
    })
    .optional(),
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
      avatar: z.string().optional(),
      content: z.string().nullable().optional(),
      createdAt: z.string().optional()
    })
  ),
  recentInvestors: z.array(
    z.object({
      amount: z.number(),
      name: z.string().optional(),
      avatar: z.string().optional(),
      content: z.string().nullable().optional(),
      createdAt: z.string().optional()
    })
  ),
  milestones: z.array(MilestoneRestSchema),
  projectMembers: z.array(
    z.object({
      id: z.string(),
      userId: z.string(),
      role: z.string(),
      description: z.string().optional(),
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
  projectAttachments: z
    .array(
      z.object({
        id: z.string(),
        url: z.string(),
        category: z.string(),
        customCategoryName: z.string().nullable().optional(),
        description: z.string().nullable().optional()
      })
    )
    .optional(),
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
