import { baseApi } from "@/api/baseApi";
import type { Priority, Project, Status } from "@/types";
import type { ProjectFormValues } from "@/validators/project.validator";

/* ----------------------------------------
   TYPES
-----------------------------------------*/
export interface CreateProject {
  clientName: string;
  projectName: string;
  description: string;
  status: Status;
  priority: Priority;
  startDate: string;
  dueDate: string;
}

/* ----------------------------------------
   PROJECTS API
-----------------------------------------*/
export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], Record<string, unknown> | void>({
      query: (params) => ({
        url: "/projects",
        method: "GET",
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Project" as const, id })),
              { type: "Project", id: "LIST" },
            ]
          : [{ type: "Project", id: "LIST" }],
    }),
    createProject: builder.mutation<void, ProjectFormValues>({
      query: (data) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
    }),
    updateProject: builder.mutation<
      void,
      { id: number; data: ProjectFormValues }
    >({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteProject: builder.mutation<void, number>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

/* ----------------------------------------
   AUTO-GENERATED HOOKS
-----------------------------------------*/
export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
