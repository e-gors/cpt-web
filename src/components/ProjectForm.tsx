import { useState, useEffect } from "react";
import type { Project } from "../types";
import { STATUSES, PRIORITIES } from "../types";

interface Props {
  project?: Project | null;
  onSave: (data: Omit<Project, "id">) => void;
  onClose: () => void;
}

type FormData = Omit<Project, "id">;
type Errors = Partial<Record<keyof FormData, string>>;

const BLANK: FormData = {
  clientName: "",
  projectName: "",
  description: "",
  status: "Planning",
  priority: "Medium",
  startDate: "",
  dueDate: "",
};

export default function ProjectForm({ project, onSave, onClose }: Props) {
  const [form, setForm] = useState<FormData>(BLANK);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    setForm(project ? { ...project } : BLANK);
    setErrors({});
  }, [project]);

  function validate(): Errors {
    const e: Errors = {};
    if (!form.clientName.trim()) e.clientName = "Client name is required.";
    if (!form.projectName.trim()) e.projectName = "Project name is required.";
    if (!STATUSES.includes(form.status)) e.status = "Invalid status.";
    if (!PRIORITIES.includes(form.priority)) e.priority = "Invalid priority.";
    if (form.startDate && form.dueDate && form.dueDate < form.startDate) {
      e.dueDate = "Due date cannot be earlier than start date.";
    }
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSave(form);
  }

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  const isEdit = !!project;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
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
          className="flex items-center justify-between px-4 py-4 border-b sm:px-6"
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
            onClick={onClose}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "#555",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#efefef")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5"
        >
          {/* Client Name */}
          <Field label="CLIENT NAME" error={errors.clientName} required>
            <input
              className={`field-input${errors.clientName ? " field-error" : ""}`}
              placeholder="e.g. Meridian Capital"
              value={form.clientName}
              onChange={(e) => set("clientName", e.target.value)}
            />
          </Field>

          {/* Project Name */}
          <Field label="PROJECT NAME" error={errors.projectName} required>
            <input
              className={`field-input${errors.projectName ? " field-error" : ""}`}
              placeholder="e.g. Brand Identity Refresh"
              value={form.projectName}
              onChange={(e) => set("projectName", e.target.value)}
            />
          </Field>

          {/* Description */}
          <Field label="DESCRIPTION">
            <textarea
              className="field-input"
              placeholder="Brief project description..."
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              style={{ resize: "vertical", fontFamily: "var(--font-sans)" }}
            />
          </Field>

          {/* Status + Priority row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="STATUS" error={errors.status} required>
              <select
                className={`field-input${errors.status ? " field-error" : ""}`}
                value={form.status}
                onChange={(e) =>
                  set("status", e.target.value as Project["status"])
                }
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="PRIORITY" error={errors.priority} required>
              <select
                className={`field-input${errors.priority ? " field-error" : ""}`}
                value={form.priority}
                onChange={(e) =>
                  set("priority", e.target.value as Project["priority"])
                }
              >
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          {/* Dates row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="START DATE">
              <input
                type="date"
                className="field-input"
                value={form.startDate}
                onChange={(e) => set("startDate", e.target.value)}
              />
            </Field>
            <Field label="DUE DATE" error={errors.dueDate}>
              <input
                type="date"
                className={`field-input${errors.dueDate ? " field-error" : ""}`}
                value={form.dueDate}
                onChange={(e) => set("dueDate", e.target.value)}
              />
            </Field>
          </div>

          {/* Actions */}
          <div
            className="flex flex-col-reverse gap-2 pt-2 border-t sm:flex-row sm:justify-end"
            style={{ borderColor: "#1a1a1a" }}
          >
            <button
              type="button"
              className="btn-ghost w-full sm:w-auto"
              onClick={onClose}
            >
              CANCEL
            </button>
            <button type="submit" className="btn-primary w-full sm:w-auto">
              {isEdit ? "SAVE CHANGES" : "CREATE PROJECT"}
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
    <div className="flex flex-col gap-1.5">
      <label
        className="flex items-center gap-1"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          color: "#555",
          letterSpacing: "0.1em",
        }}
      >
        {label}
        {required && <span style={{ color: "#d4ff00" }}>*</span>}
      </label>
      {children}
      {error && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "#f87171",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}
