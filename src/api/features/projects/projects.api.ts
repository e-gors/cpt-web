import { baseApi } from "@/api/baseApi";
import type { Priority, Project, Status } from "@/types";

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
  }),
});

/* ----------------------------------------
   AUTO-GENERATED HOOKS
-----------------------------------------*/
export const { useGetProjectsQuery } = projectsApi;
