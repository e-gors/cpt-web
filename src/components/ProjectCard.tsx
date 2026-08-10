import { formatDate, isOverdue } from "@/utils";
import type { Project } from "../types";
import { STATUS_COLORS, PRIORITY_COLORS } from "../types";

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const sc = STATUS_COLORS[project.status];
  const pc = PRIORITY_COLORS[project.priority];
  const overdue = isOverdue(project);

  return (
    <div
      className="project-card flex flex-col gap-0 h-full"
      style={{ minHeight: 220 }}
    >
      {/* Top strip */}
      <div
        className="flex flex-col gap-2 px-4 py-2 border-b sm:flex-row sm:items-center sm:justify-between"
        style={{ borderColor: "#1f1f1f" }}
      >
        <span
          className="text-xs tracking-widest uppercase truncate max-w-[60%]"
          style={{ fontFamily: "var(--font-mono)", color: "#555" }}
        >
          {project.client}
        </span>
        <span
          className="text-xs font-semibold px-2 py-0.5 uppercase tracking-wider"
          style={{
            fontFamily: "var(--font-mono)",
            background: pc.bg,
            color: pc.text,
            fontSize: "0.65rem",
          }}
        >
          {project.priority}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 px-4 pt-3 pb-3 flex-1">
        <h3
          className="font-bold leading-tight text-base"
          style={{ color: "#efefef", fontSize: "1rem" }}
        >
          {project.project}
        </h3>
        <p
          className="text-sm leading-relaxed overflow-hidden"
          style={{
            color: "#666",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {project.description || "No description provided."}
        </p>
      </div>

      {/* Status row */}
      <div className="px-4 pb-3 flex items-center gap-2">
        <span
          className="text-xs font-semibold px-2 py-0.5 uppercase tracking-wider"
          style={{
            fontFamily: "var(--font-mono)",
            background: sc.bg,
            color: sc.text,
            fontSize: "0.65rem",
          }}
        >
          {project.status}
        </span>
        {overdue && (
          <span
            className="text-xs font-semibold px-2 py-0.5 uppercase tracking-wider"
            style={{
              fontFamily: "var(--font-mono)",
              background: "#3b0a0a",
              color: "#f87171",
              fontSize: "0.65rem",
            }}
          >
            Overdue
          </span>
        )}
      </div>

      {/* Dates + actions */}
      <div
        className="flex flex-col gap-3 px-4 py-2 border-t sm:flex-row sm:items-center sm:justify-between"
        style={{ borderColor: "#1a1a1a", background: "#0d0d0d" }}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "#444",
            }}
          >
            START{" "}
            <span style={{ color: "#666" }}>
              {formatDate(project.startDate)}
            </span>
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "#444",
            }}
          >
            DUE{" "}
            <span style={{ color: overdue ? "#f87171" : "#666" }}>
              {formatDate(project.dueDate)}
            </span>
          </span>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-1">
          <button
            onClick={() => onEdit(project)}
            className="text-xs px-2 py-1 transition-colors w-full sm:w-auto"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "#555",
              background: "transparent",
              border: "1px solid #222",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#d4ff00";
              e.currentTarget.style.borderColor = "#d4ff00";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#555";
              e.currentTarget.style.borderColor = "#222";
            }}
          >
            EDIT
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="text-xs px-2 py-1 transition-colors w-full sm:w-auto"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "#555",
              background: "transparent",
              border: "1px solid #222",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#f87171";
              e.currentTarget.style.borderColor = "#7f1d1d";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#555";
              e.currentTarget.style.borderColor = "#222";
            }}
          >
            DEL
          </button>
        </div>
      </div>
    </div>
  );
}
