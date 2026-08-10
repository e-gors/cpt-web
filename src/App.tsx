import { useState, useEffect, useMemo } from "react";
import type { Project, Status, Priority } from "./types";
import { STATUSES, PRIORITIES, STATUS_COLORS, PRIORITY_COLORS } from "./types";
import * as api from "@/api/projects";
import ProjectCard from "@/components/ProjectCard";
import ProjectForm from "@/components/ProjectForm";
import ConfirmDialog from "@/components/ConfirmDialog";

type SortKey = "dueDate" | "priority" | "clientName" | "projectName";
const PRIORITY_RANK: Record<Priority, number> = { High: 0, Medium: 1, Low: 2 };

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null | undefined>(undefined); // undefined = closed, null = new
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<Status | "All">("All");
  const [filterPriority, setFilterPriority] = useState<Priority | "All">("All");
  const [sortBy, setSortBy] = useState<SortKey>("dueDate");

  useEffect(() => {
    api.getProjects().then(setProjects);
  }, []);

  async function handleSave(data: Omit<Project, "id">) {
    if (editing) {
      const updated = await api.updateProject(editing.id, data);
      setProjects((ps) => ps.map((p) => (p.id === updated.id ? updated : p)));
    } else {
      const created = await api.createProject(data);
      setProjects((ps) => [...ps, created]);
    }
    setEditing(undefined);
  }

  async function handleDelete() {
    if (!deletingId) return;
    await api.deleteProject(deletingId);
    setProjects((ps) => ps.filter((p) => p.id !== deletingId));
    setDeletingId(null);
  }

  const filtered = useMemo(() => {
    let list = [...projects];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.clientName.toLowerCase().includes(q) ||
          p.projectName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    if (filterStatus !== "All")
      list = list.filter((p) => p.status === filterStatus);
    if (filterPriority !== "All")
      list = list.filter((p) => p.priority === filterPriority);
    list.sort((a, b) => {
      if (sortBy === "dueDate") return a.dueDate.localeCompare(b.dueDate);
      if (sortBy === "priority")
        return PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority];
      if (sortBy === "clientName")
        return a.clientName.localeCompare(b.clientName);
      if (sortBy === "projectName")
        return a.projectName.localeCompare(b.projectName);
      return 0;
    });
    return list;
  }, [projects, search, filterStatus, filterPriority, sortBy]);

  // Stats
  const stats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return {
      total: projects.length,
      inProgress: projects.filter((p) => p.status === "In Progress").length,
      highPriority: projects.filter((p) => p.priority === "High").length,
      overdue: projects.filter(
        (p) => p.status !== "Completed" && p.dueDate && p.dueDate < today,
      ).length,
    };
  }, [projects]);

  const deletingProject = deletingId
    ? projects.find((p) => p.id === deletingId)
    : null;

  return (
    <div
      style={{ minHeight: "100vh", background: "#080808" }}
      className="overflow-x-hidden"
    >
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #1a1a1a",
          background: "#080808",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-0.5">
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "#d4ff00",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Digital Agency
            </span>
            <h1
              className="font-extrabold tracking-tight"
              style={{
                fontSize: "1.1rem",
                color: "#efefef",
                letterSpacing: "-0.02em",
              }}
            >
              Project Tracker
            </h1>
          </div>
          <button
            className="btn-primary w-full sm:w-auto"
            onClick={() => setEditing(null)}
          >
            + NEW PROJECT
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "TOTAL", value: stats.total, color: "#efefef" },
            { label: "IN PROGRESS", value: stats.inProgress, color: "#d4ff00" },
            {
              label: "HIGH PRIORITY",
              value: stats.highPriority,
              color: "#f87171",
            },
            { label: "OVERDUE", value: stats.overdue, color: "#fb923c" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "#0e0e0e",
                border: "1px solid #1a1a1a",
                padding: "1rem 1.25rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "#444",
                  letterSpacing: "0.15em",
                  marginBottom: "0.4rem",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  color: s.color,
                  lineHeight: 1,
                }}
              >
                {s.value.toString().padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <div className="flex flex-col gap-3 md:flex-row xl:items-center">
          {/* Search */}
          <div className="w-full xl:flex-[2]" style={{ minWidth: 0 }}>
            <input
              className="field-input w-full"
              placeholder="Search projects, clients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Status filter */}
          <select
            className="field-input w-full xl:flex-1"
            style={{ minWidth: 0 }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as Status | "All")}
          >
            <option value="All">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Priority filter */}
          <select
            className="field-input w-full xl:flex-1"
            style={{ minWidth: 0 }}
            value={filterPriority}
            onChange={(e) =>
              setFilterPriority(e.target.value as Priority | "All")
            }
          >
            <option value="All">All Priorities</option>
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            className="field-input w-full xl:flex-1"
            style={{ minWidth: 0 }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
          >
            <option value="dueDate">Sort: Due Date</option>
            <option value="priority">Sort: Priority</option>
            <option value="clientName">Sort: Client Name</option>
            <option value="projectName">Sort: Project Name</option>
          </select>

          {/* Active filter chips */}
          {(filterStatus !== "All" || filterPriority !== "All" || search) && (
            <button
              className="btn-ghost w-full xl:flex-none"
              onClick={() => {
                setSearch("");
                setFilterStatus("All");
                setFilterPriority("All");
              }}
              style={{ whiteSpace: "nowrap" }}
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Status legend */}
        <div className="flex flex-wrap gap-3 items-center">
          {STATUSES.map((s) => {
            const sc = STATUS_COLORS[s];
            const count = projects.filter((p) => p.status === s).length;
            return (
              <button
                key={s}
                onClick={() => setFilterStatus(filterStatus === s ? "All" : s)}
                className="flex items-center gap-1.5 px-2 py-1 transition-opacity"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  background: filterStatus === s ? sc.bg : "transparent",
                  border: `1px solid ${filterStatus === s ? sc.text : "#222"}`,
                  color: sc.text,
                  cursor: "pointer",
                  opacity:
                    filterStatus !== "All" && filterStatus !== s ? 0.4 : 1,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: sc.text,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                {s} ({count})
              </button>
            );
          })}
        </div>

        {/* Project grid */}
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 gap-3"
            style={{ border: "1px dashed #1f1f1f" }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "2rem",
                color: "#222",
              }}
            >
              ∅
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "#444",
                letterSpacing: "0.1em",
              }}
            >
              {projects.length === 0 ? "NO PROJECTS YET" : "NO RESULTS FOUND"}
            </span>
            {projects.length === 0 && (
              <button
                className="btn-primary mt-2"
                onClick={() => setEditing(null)}
              >
                + CREATE FIRST PROJECT
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
                onEdit={setEditing}
                onDelete={setDeletingId}
              />
            ))}
          </div>
        )}

        {/* Priority legend footer */}
        <div
          className="flex flex-wrap items-center gap-4 pt-4 border-t"
          style={{ borderColor: "#111" }}
        >
          {PRIORITIES.map((pr) => {
            const pc = PRIORITY_COLORS[pr];
            return (
              <span
                key={pr}
                className="flex items-center gap-1.5"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "#444",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    background: pc.text,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                {pr} priority
              </span>
            );
          })}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "#2a2a2a",
              marginLeft: "auto",
            }}
          >
            {filtered.length}/{projects.length} projects
          </span>
        </div>
      </main>

      {/* Modals */}
      {editing !== undefined && (
        <ProjectForm
          project={editing}
          onSave={handleSave}
          onClose={() => setEditing(undefined)}
        />
      )}
      {deletingId && deletingProject && (
        <ConfirmDialog
          projectName={deletingProject.projectName}
          onConfirm={handleDelete}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
}
