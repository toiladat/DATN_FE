import { apiClient } from '@/apis/axios'
import type { ProjectSubmission } from '@/schemas/projectSchema'

export const projectRequests = {
  createProject: (data: ProjectSubmission) => apiClient.post('/projects', data),
  getMyProjects: () => apiClient.get('/projects/me')
}
