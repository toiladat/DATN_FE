import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { projectRequests } from '../requests/project'
import type { ProjectDetail } from '@/schemas/projectSchema'

export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  myProjects: () => [...projectKeys.all, 'my-projects'] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const
}

export function useGetProjectById(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: async (): Promise<ProjectDetail> => {
      const { data } = await projectRequests.getProjectById(id)
      return data
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000 // 5 minutes
  })
}
