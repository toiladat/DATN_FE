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
  PaginatedProjectSummary,
  Review
} from '@/schemas/projectSchema'
import type { MilestoneUpdatePayload } from '../requests/project'

export const projectKeys = {
  all: ['projects'] as const,
  lists: (
    page: number,
    limit: number,
    search?: string,
    categorySlug?: string,
    sort?: string
  ) =>
    [
      ...projectKeys.all,
      'list',
      page,
      limit,
      search,
      categorySlug,
      sort
    ] as const,
  myProjects: () => [...projectKeys.all, 'my-projects'] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const
}

export function useGetProjects(
  page: number = 1,
  limit: number = 6,
  search: string = '',
  categorySlug: string = '',
  sort: string = 'newest'
) {
  return useQuery({
    queryKey: projectKeys.lists(page, limit, search, categorySlug, sort),
    queryFn: async (): Promise<PaginatedProjectSummary> => {
      const { data } = await projectRequests.getAllProjects(
        page,
        limit,
        search,
        categorySlug,
        sort
      )
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

export function useToggleLike() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, isLiked }: { id: string; isLiked: boolean }) =>
      isLiked
        ? projectRequests.unlikeProject(id)
        : projectRequests.likeProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all })
    }
  })
}

export function useGetProjectReviews(projectId: string) {
  return useQuery({
    queryKey: [...projectKeys.detail(projectId), 'reviews'],
    queryFn: async (): Promise<Review[]> => {
      const { data } = await projectRequests.getReviews(projectId)
      return data
    },
    enabled: !!projectId
  })
}

export function useAddReview(projectId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: { content: string; parentId?: string }) =>
      projectRequests.createReview(projectId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...projectKeys.detail(projectId), 'reviews']
      })
    }
  })
}

export function useUpdateReview(projectId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      reviewId,
      content
    }: {
      reviewId: string
      content: string
    }) => projectRequests.updateReview(projectId, reviewId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...projectKeys.detail(projectId), 'reviews']
      })
    }
  })
}

export function useDeleteReview(projectId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (reviewId: string) =>
      projectRequests.deleteReview(projectId, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...projectKeys.detail(projectId), 'reviews']
      })
    }
  })
}
