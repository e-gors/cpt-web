import type { Project } from "@/types";

export const formatDate = (d: string) => {
  if (!d) return "—";
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
};

export const isOverdue = (p: Project) => {
  if (p.status === "Completed") return false;
  return p.dueDate && new Date(p.dueDate) < new Date();
};
