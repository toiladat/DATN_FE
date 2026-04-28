import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData
} from '@tanstack/react-query'
import { projectRequests } from '../requests/project'
import type {
  ProjectDetail,
  ProjectSummary,
  PaginatedProjectSummary
} from '@/schemas/projectSchema'
import type { MilestoneUpdatePayload } from '../requests/project'

export const projectKeys = {
  all: ['projects'] as const,
  lists: (page: number, limit: number) =>
    [...projectKeys.all, 'list', page, limit] as const,
  myProjects: () => [...projectKeys.all, 'my-projects'] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const
}

export function useGetProjects(page: number = 1, limit: number = 6) {
  return useQuery({
    queryKey: projectKeys.lists(page, limit),
    queryFn: async (): Promise<PaginatedProjectSummary> => {
      const { data } = await projectRequests.getAllProjects(page, limit)
      return data
    },
    placeholderData: keepPreviousData
  })
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

export function useUpdateMilestone(projectId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: MilestoneUpdatePayload) =>
      projectRequests.updateMilestone(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) })
    }
  })
}
