import { baseApi } from "@/api/baseApi";
import type { Priority, Project, ProjectResponse, Status } from "@/types";

export type ProjectQueryParams = {
  search?: string;
  status?: Status;
  priority?: Priority;
  sortBy?: "endDate" | "priority" | "client" | "project";
  order?: "ASC" | "DESC";
};

export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<ProjectResponse, ProjectQueryParams>({
      query: (params) => ({
        url: "/projects",
        params,
      }),
      // tells RTK this data is cacheable
      providesTags: [{ type: "Projects", id: "LIST" }],
    }),

    createProject: builder.mutation<Project, Omit<Project, "id">>({
      query: (project) => ({
        url: "/projects",
        method: "POST",
        body: project,
      }),
      // THIS triggers refetch
      invalidatesTags: [{ type: "Projects", id: "LIST" }],
    }),

    updateProject: builder.mutation<
      Project,
      { id: number } & Omit<Project, "id">
    >({
      query: ({ id, ...project }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: project,
      }),
      // THIS triggers refetch
      invalidatesTags: [{ type: "Projects", id: "LIST" }],
    }),

    deleteProject: builder.mutation<void, number>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      // THIS triggers refetch
      invalidatesTags: [{ type: "Projects", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
