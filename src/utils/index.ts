import type { Project } from "@/types";

export const formatDate = (date: string) => {
  if (!date) return "—";

  const value = date.split("T")[0];
  const [year, month, day] = value.split("-");

  return `${day}/${month}/${year}`;
};

export const isOverdue = (p: Project) => {
  if (p.status === "Completed") return false;
  return p.dueDate && new Date(p.dueDate) < new Date();
};
