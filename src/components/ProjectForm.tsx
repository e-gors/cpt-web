import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Project } from "../types";
import { STATUSES, PRIORITIES } from "../types";

import {
  projectSchema,
  type ProjectFormValues,
} from "@/validators/project.validator";
import { CustomField } from "./CustomField";

interface Props {
  project?: Project | null;
  onSave: (data: ProjectFormValues) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export default function ProjectForm({
  project,
  onSave,
  onClose,
  isLoading,
}: Props) {
  const isEdit = !!project;

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
      await onSave(data); // only call parent
      onClose();
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
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
            disabled={isLoading}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "#555",
              background: "none",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
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
          <CustomField
            label="CLIENT NAME"
            error={errors.client?.message}
            required
          >
            <input
              {...register("client")}
              className={`field-input${errors.client ? " field-error" : ""}`}
              placeholder="e.g. Meridian Capital"
              disabled={isLoading}
            />
          </CustomField>
          {/* Project Name */}
          <CustomField
            label="PROJECT NAME"
            error={errors.project?.message}
            required
          >
            <input
              {...register("project")}
              className={`field-input${errors.project ? " field-error" : ""}`}
              placeholder="e.g. Brand Identity Refresh"
              disabled={isLoading}
            />
          </CustomField>
          {/* Description */}
          required
          <CustomField
            label="DESCRIPTION"
            error={errors.description?.message}
            required
          >
            <textarea
              {...register("description")}
              className="field-input"
              placeholder="Brief project description..."
              rows={3}
              disabled={isLoading}
              style={{
                resize: "vertical",
                fontFamily: "var(--font-sans)",
              }}
            />
          </CustomField>
          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <CustomField label="STATUS" error={errors.status?.message} required>
              <select
                {...register("status")}
                className={`field-input${errors.status ? " field-error" : ""}`}
                disabled={isLoading}
              >
                {STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </CustomField>

            <CustomField
              label="PRIORITY"
              error={errors.priority?.message}
              required
            >
              <select
                {...register("priority")}
                className={`field-input${
                  errors.priority ? " field-error" : ""
                }`}
                disabled={isLoading}
              >
                {PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </CustomField>
          </div>
          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <CustomField
              label="START DATE"
              error={errors.startDate?.message}
              required
            >
              <input
                type="date"
                {...register("startDate")}
                className={`field-input${
                  errors.startDate ? " field-error" : ""
                }`}
                disabled={isLoading}
              />
            </CustomField>

            <CustomField
              label="DUE DATE"
              error={errors.dueDate?.message}
              required
            >
              <input
                type="date"
                {...register("dueDate")}
                className={`field-input${errors.dueDate ? " field-error" : ""}`}
                disabled={isLoading}
              />
            </CustomField>
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
              disabled={isLoading}
            >
              CANCEL
            </button>

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading
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
