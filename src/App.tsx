import { useState } from "react";
import type { Project } from "./types";

import ProjectForm from "@/components/ProjectForm";
import ConfirmDialog from "@/components/ConfirmDialog";
import ProjectFilters from "./components/ProjectFilters";
import ProjectList from "./components/ProjectList";
import ProjectStats from "./components/ProjectStats";

import { useProjectFilters } from "./hooks/useProjectFilters";
import { useProjects } from "@/hooks/useProjects";

export default function App() {
  const [editing, setEditing] = useState<Project | null | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // 🔍 Filters
  const filters = useProjectFilters();

  // ✅ SINGLE SOURCE OF DATA
  const {
    projects,
    stats,
    isLoading,
    refetch,
    createProject,
    updateProject,
    deleteProject,
  } = useProjects(filters.queryParams);

  // ➕ CREATE / UPDATE
  async function handleSave(data: Omit<Project, "id">) {
    if (editing) {
      await updateProject({
        id: editing.id,
        ...data,
      });
    } else {
      await createProject(data);
    }

    setEditing(undefined);
    refetch(); // Refresh the list after saving
  }

  // ❌ DELETE
  async function handleDelete() {
    if (!deletingId) return;

    await deleteProject(deletingId);
    setDeletingId(null);
    refetch(); // Refresh the list after deletion
  }

  const deletingProject = deletingId
    ? projects.find((p) => p.id === deletingId)
    : null;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* 🧭 Header */}
      <header className="flex justify-between items-center border-b border-neutral-800 pb-4">
        <div>
          <span className="text-xs tracking-widest text-lime-400 uppercase">
            Digital Agency
          </span>
          <h1 className="text-xl font-bold text-white">Project Tracker</h1>
        </div>

        <button className="btn-primary" onClick={() => setEditing(null)}>
          + NEW PROJECT
        </button>
      </header>

      {/* 📊 Stats */}
      <ProjectStats {...stats} />

      {/* 🔍 Filters */}
      <ProjectFilters {...filters} />

      {/* 📋 Project List */}
      <ProjectList
        projects={projects}
        isLoading={isLoading}
        onEdit={setEditing}
        onDelete={setDeletingId}
      />

      {/* 📝 Form Modal */}
      {editing !== undefined && (
        <ProjectForm
          project={editing}
          onSave={handleSave}
          onClose={() => setEditing(undefined)}
        />
      )}

      {/* ⚠️ Delete Confirmation */}
      {deletingProject && (
        <ConfirmDialog
          project={deletingProject.project}
          description={`Are you sure you want to delete "${deletingProject.project}"?`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
}
