import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "@/api/features/projects/projects.api";

import type { Project } from "../types";
import { STATUSES, PRIORITIES } from "../types";

import {
  projectSchema,
  type ProjectFormValues,
} from "@/validators/project.validator";

interface Props {
  project?: Project | null;
  onClose: () => void;
}

export default function ProjectForm({ project, onClose }: Props) {
  const isEdit = !!project;

  const [createProject, { isLoading: creating }] = useCreateProjectMutation();

  const [updateProject, { isLoading: updating }] = useUpdateProjectMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      client: "",
      project: "",
      description: "",
      status: "Planning",
      priority: "Medium",
      startDate: "",
      dueDate: "",
    },
  });

  // Populate form when editing
  useEffect(() => {
    if (project) {
      reset({
        client: project.client,
        project: project.project,
        description: project.description ?? "",
        status: project.status,
        priority: project.priority,
        startDate: project.startDate ?? "",
        dueDate: project.dueDate ?? "",
      });
    } else {
      reset({
        client: "",
        project: "",
        description: "",
        status: "Planning",
        priority: "Medium",
        startDate: "",
        dueDate: "",
      });
    }
  }, [project, reset]);

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      if (isEdit && project) {
        await updateProject({
          id: project.id,
          data,
        }).unwrap();
      } else {
        await createProject(data).unwrap();
      }

      onClose();
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  const loading = creating || updating;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div
        className="w-full max-w-lg flex flex-col"
        style={{
          background: "#0e0e0e",
          border: "1px solid #2a2a2a",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "#1f1f1f" }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "#d4ff00",
              letterSpacing: "0.15em",
            }}
          >
            {isEdit ? "// EDIT PROJECT" : "// NEW PROJECT"}
          </span>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "#555",
              background: "none",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.color = "#efefef";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#555";
            }}
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 px-6 py-5"
        >
          {/* Client Name */}
          <Field label="CLIENT NAME" error={errors.client?.message} required>
            <input
              {...register("client")}
              className={`field-input${errors.client ? " field-error" : ""}`}
              placeholder="e.g. Meridian Capital"
              disabled={loading}
            />
          </Field>

          {/* Project Name */}
          <Field label="PROJECT NAME" error={errors.project?.message} required>
            <input
              {...register("project")}
              className={`field-input${errors.project ? " field-error" : ""}`}
              placeholder="e.g. Brand Identity Refresh"
              disabled={loading}
            />
          </Field>

          {/* Description */}
          <Field label="DESCRIPTION" error={errors.description?.message}>
            <textarea
              {...register("description")}
              className="field-input"
              placeholder="Brief project description..."
              rows={3}
              disabled={loading}
              style={{
                resize: "vertical",
                fontFamily: "var(--font-sans)",
              }}
            />
          </Field>

          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="STATUS" error={errors.status?.message} required>
              <select
                {...register("status")}
                className={`field-input${errors.status ? " field-error" : ""}`}
                disabled={loading}
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="PRIORITY" error={errors.priority?.message} required>
              <select
                {...register("priority")}
                className={`field-input${
                  errors.priority ? " field-error" : ""
                }`}
                disabled={loading}
              >
                {PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="START DATE" error={errors.startDate?.message}>
              <input
                type="date"
                {...register("startDate")}
                className={`field-input${
                  errors.startDate ? " field-error" : ""
                }`}
                disabled={loading}
              />
            </Field>

            <Field label="DUE DATE" error={errors.dueDate?.message}>
              <input
                type="date"
                {...register("dueDate")}
                className={`field-input${errors.dueDate ? " field-error" : ""}`}
                disabled={loading}
              />
            </Field>
          </div>

          {/* Actions */}
          <div
            className="flex justify-end gap-2 pt-2 border-t"
            style={{ borderColor: "#1a1a1a" }}
          >
            <button
              type="button"
              className="btn-ghost"
              onClick={onClose}
              disabled={loading}
            >
              CANCEL
            </button>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading
                ? "SAVING..."
                : isEdit
                  ? "SAVE CHANGES"
                  : "CREATE PROJECT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      className="flex flex-col gap-1"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        color: "#555",
        letterSpacing: "0.1em",
      }}
    >
      <span>
        {label}
        {required && <span style={{ color: "#d4ff00" }}> *</span>}
      </span>

      {children}

      {error && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "#f87171",
            letterSpacing: "0.02em",
          }}
        >
          {error}
        </span>
      )}
    </label>
  );
}
