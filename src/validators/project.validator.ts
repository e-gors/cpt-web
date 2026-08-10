import { z } from "zod";

export const projectSchema = z
  .object({
    client: z.string().min(1, "Client name is required"),
    project: z.string().min(1, "Project name is required"),
    description: z.string().min(1, "Description is required"),
    status: z.enum(["Planning", "In Progress", "Completed", "On Hold"]),
    priority: z.enum(["Low", "Medium", "High"]),
    startDate: z.string().min(1, "Start date is required"),
    dueDate: z.string().min(1, "Due date is required"),
  })
  .refine(
    (data) => {
      if (data.startDate && data.dueDate) {
        const start = new Date(data.startDate);
        const due = new Date(data.dueDate);

        return due >= start;
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
