import { z } from "zod";

export const projectSchema = z
  .object({
    clientName: z.string().min(1, "Client name is required"),
    projectName: z.string().min(1, "Project name is required"),
    description: z.string().optional(),
    status: z.enum(["Planning", "In Progress", "Completed", "On Hold"]),
    priority: z.enum(["Low", "Medium", "High"]),
    startDate: z.string().optional(),
    dueDate: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.dueDate) {
        return data.dueDate >= data.startDate;
      }
      return true;
    },
    {
      message: "Due date cannot be earlier than start date",
      path: ["dueDate"],
    },
  );

// Type from schema (🔥 auto types)
export type ProjectFormValues = z.infer<typeof projectSchema>;
