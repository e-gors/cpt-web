import type { Project } from "../types";
import ProjectCard from "./ProjectCard";
import Loading from "./Loading";

type Props = {
  projects: Project[];
  isLoading: boolean;
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
};

export default function ProjectList({
  projects,
  isLoading,
  onEdit,
  onDelete,
}: Props) {
  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-[300px]"
        style={{
          border: "1px dashed #1f1f1f",
        }}
      >
        <Loading />
      </div>
    );
  }

  if (!projects.length) {
    return (
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
          NO PROJECTS FOUND
        </span>
      </div>
    );
  }

  return (
    <div
      className="grid gap-3"
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      }}
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
