import type { ProjectSubmission } from '@/schemas/projectSchema'

export async function createProject(payload: ProjectSubmission) {
  // Mock delay to simulate network request
  await new Promise((resolve) => setTimeout(resolve, 500))
  console.log('🚀 createProject payload:', payload)
  // Return mock success response
  return { success: true, projectId: 'mock-id-123' }
}
