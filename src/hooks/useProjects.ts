import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectsQuery,
  useUpdateProjectMutation,
} from "@/api/features/projects/projects.api";

export function useProjects(queryParams = {}) {
  const { data, isLoading, isFetching, isError } =
    useGetProjectsQuery(queryParams);

  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  return {
    projects: data?.data ?? [],
    stats: data?.stats ?? {
      total: 0,
      inProgress: 0,
      highPriority: 0,
      overdue: 0,
    },

    isLoading,
    isFetching,
    isError,

    createProject,
    updateProject,
    deleteProject,
  };
}
