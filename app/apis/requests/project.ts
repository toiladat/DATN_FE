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
  deleteProject: (id: string) => apiClient.delete(`/projects/${id}`),
  getProjectById: (id: string) => apiClient.get(`/projects/${id}`),
  updateMilestone: (payload: MilestoneUpdatePayload) =>
    apiClient.post('/projects/milestone', payload)
}
