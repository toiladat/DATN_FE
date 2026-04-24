import { apiClient } from '@/apis/axios'
import type { ProjectSubmission } from '@/schemas/projectSchema'

export const projectRequests = {
  createProject: (data: ProjectSubmission) => apiClient.post('/projects', data),
  getMyProjects: () => apiClient.get('/projects/me'),
  deleteProject: (id: string) => apiClient.delete(`/projects/${id}`),
  getProjectById: (id: string) => apiClient.get(`/projects/${id}`),
  updateMilestone: (payload: {
    projectId: string
    milestoneId: string
    completed?: string
    notCompleted?: string
    images?: string[]
    video?: string
    link?: string
  }) => apiClient.post(`/projects/milestone-progress`, payload)
}
