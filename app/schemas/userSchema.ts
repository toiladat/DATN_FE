import { z } from 'zod'

export const UserSearchProfileSchema = z.object({
  id: z.string(),
  email: z.string().email().nullable().optional(),
  name: z.string().nullable(),
  avatar: z.string().nullable(),
  walletAddress: z.string()
})

export const UserSearchResponseSchema = z.object({
  users: z.array(UserSearchProfileSchema)
})

export type UserSearchProfile = z.infer<typeof UserSearchProfileSchema>
export type UserSearchResponse = z.infer<typeof UserSearchResponseSchema>
