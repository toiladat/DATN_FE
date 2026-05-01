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

export const UpdateProfileSchema = z.object({
  website: z
    .string()
    .url('Website phải là URL hợp lệ (ví dụ: https://example.com)')
    .optional()
    .or(z.literal('')),
  socialLinks: z
    .array(
      z.object({
        platform: z.string(),
        url: z.string().url('Social link phải là URL hợp lệ').or(z.literal(''))
      })
    )
    .optional()
})

export type UpdateProfileType = z.infer<typeof UpdateProfileSchema>
