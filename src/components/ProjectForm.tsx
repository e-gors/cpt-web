import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "@/api/features/projects/projects.api";
import { CustomField } from "./CustomField";
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
      clientName: "",
      projectName: "",
      description: "",
      status: "Planning",
      priority: "Medium",
      startDate: "",
      dueDate: "",
    },
  });

  // populate form when editing
  useEffect(() => {
    if (project) {
      reset(project);
    }
  }, [project, reset]);

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      if (isEdit && project) {
        await updateProject({ id: project.id, data }).unwrap();
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
    <div className="modal">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <CustomField label="CLIENT NAME" error={errors.clientName?.message}>
          <input {...register("clientName")} className="field-input" />
        </CustomField>

        <CustomField label="PROJECT NAME" error={errors.projectName?.message}>
          <input {...register("projectName")} className="field-input" />
        </CustomField>

        <CustomField label="DESCRIPTION">
          <textarea {...register("description")} className="field-input" />
        </CustomField>

        <div className="grid grid-cols-2 gap-4">
          <CustomField label="STATUS" error={errors.status?.message}>
            <select {...register("status")} className="field-input">
              {STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </CustomField>

          <CustomField label="PRIORITY" error={errors.priority?.message}>
            <select {...register("priority")} className="field-input">
              {PRIORITIES.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </CustomField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <CustomField label="START DATE">
            <input type="date" {...register("startDate")} />
          </CustomField>

          <CustomField label="DUE DATE" error={errors.dueDate?.message}>
            <input type="date" {...register("dueDate")} />
          </CustomField>
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose}>
            Cancel
          </button>

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
