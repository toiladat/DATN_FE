import { apiClient } from '@/apis/axios'
import type { ProjectSubmission } from '@/schemas/projectSchema'

export type MilestoneUpdatePayload = {
  projectId: string
  milestoneId: string
  completed: string
  blockers: string
  images: string[]
  video: string
  link?: string
}

export const projectRequests = {
  createProject: (data: ProjectSubmission) => apiClient.post('/projects', data),
  getMyProjects: () => apiClient.get('/projects/me'),
  getAllProjects: (
    page: number = 1,
    limit: number = 6,
    search: string = '',
    categorySlug: string = '',
    sort: string = 'newest'
  ) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit)
    })
    if (search.trim()) params.set('search', search.trim())
    if (categorySlug) params.set('categorySlug', categorySlug)
    if (sort && sort !== 'trending') params.set('sort', sort)
    return apiClient.get(`/projects?${params.toString()}`)
  },
  deleteProject: (id: string) => apiClient.delete(`/projects/${id}`),
  getProjectById: (id: string) => apiClient.get(`/projects/${id}`),
  updateMilestone: (payload: MilestoneUpdatePayload) =>
    apiClient.post('/projects/milestone', payload),
  likeProject: (id: string) => apiClient.post(`/projects/${id}/like`),
  unlikeProject: (id: string) => apiClient.delete(`/projects/${id}/like`)
}
