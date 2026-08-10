export type Status = "Planning" | "In Progress" | "On Hold" | "Completed";
export type Priority = "Low" | "Medium" | "High";

type Stats = {
  total: number;
  inProgress: number;
  highPriority: number;
  overdue: number;
};

export interface Project {
  id: number;
  client: string;
  project: string;
  description: string;
  status: Status;
  priority: Priority;
  startDate: string;
  dueDate: string;
}

export interface ProjectResponse {
  data: Project[];
  stats: Stats;
}

export const STATUSES: Status[] = [
  "Planning",
  "In Progress",
  "On Hold",
  "Completed",
];
export const PRIORITIES: Priority[] = ["Low", "Medium", "High"];

export const STATUS_COLORS: Record<Status, { bg: string; text: string }> = {
  Planning: { bg: "#1e3a5f", text: "#60a5fa" },
  "In Progress": { bg: "#1f2a00", text: "#d4ff00" },
  "On Hold": { bg: "#3d1f00", text: "#fb923c" },
  Completed: { bg: "#052e16", text: "#4ade80" },
};

export const PRIORITY_COLORS: Record<Priority, { bg: string; text: string }> = {
  Low: { bg: "#1a1a1a", text: "#666" },
  Medium: { bg: "#3d1f00", text: "#fb923c" },
  High: { bg: "#3b0a0a", text: "#f87171" },
};
