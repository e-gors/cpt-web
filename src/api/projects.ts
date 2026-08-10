import type { Project } from "../types";

const KEY = "cpt_projects";

const SEED: Project[] = [
  {
    id: "seed-1",
    clientName: "Meridian Capital",
    projectName: "Brand Identity Refresh",
    description:
      "Complete overhaul of visual identity including logo, typography system, and brand guidelines document.",
    status: "In Progress",
    priority: "High",
    startDate: "2026-06-01",
    dueDate: "2026-08-30",
  },
  {
    id: "seed-2",
    clientName: "Volta Electric",
    projectName: "E-commerce Platform",
    description:
      "Custom storefront with product configurator for EV charging equipment and fleet management dashboard.",
    status: "Planning",
    priority: "Medium",
    startDate: "2026-07-15",
    dueDate: "2026-10-31",
  },
  {
    id: "seed-3",
    clientName: "Halcyon Hotels",
    projectName: "Booking UX Redesign",
    description:
      "Streamline the multi-step reservation flow and reduce drop-off at the payment step.",
    status: "Completed",
    priority: "High",
    startDate: "2026-03-01",
    dueDate: "2026-06-15",
  },
  {
    id: "seed-4",
    clientName: "Pines & Porter",
    projectName: "Social Campaign Q3",
    description:
      "Instagram and LinkedIn content strategy plus motion assets for Q3 product launch.",
    status: "On Hold",
    priority: "Low",
    startDate: "2026-07-01",
    dueDate: "2026-09-30",
  },
  {
    id: "seed-5",
    clientName: "Orbital Labs",
    projectName: "SaaS Analytics Dashboard",
    description:
      "Real-time analytics dashboard for IoT sensor network, integrating live data streams and alerting.",
    status: "In Progress",
    priority: "High",
    startDate: "2026-05-15",
    dueDate: "2026-09-01",
  },
  {
    id: "seed-6",
    clientName: "Vantage Partners",
    projectName: "Annual Report 2025",
    description:
      "Print and digital edition of the 2025 annual report with a full data visualization suite.",
    status: "Planning",
    priority: "Medium",
    startDate: "2026-08-01",
    dueDate: "2026-11-15",
  },
];

function load(): Project[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === null) {
      localStorage.setItem(KEY, JSON.stringify(SEED));
      return SEED;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function save(projects: Project[]) {
  localStorage.setItem(KEY, JSON.stringify(projects));
}

// GET /projects
export async function getProjects(): Promise<Project[]> {
  return load();
}

// GET /projects/:id
export async function getProject(id: string): Promise<Project | null> {
  return load().find((p) => p.id === id) ?? null;
}

// POST /projects
export async function createProject(
  data: Omit<Project, "id">,
): Promise<Project> {
  const projects = load();
  const project: Project = { ...data, id: crypto.randomUUID() };
  save([...projects, project]);
  return project;
}

// PUT /projects/:id
export async function updateProject(
  id: string,
  data: Omit<Project, "id">,
): Promise<Project> {
  const projects = load();
  const idx = projects.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error(`Project ${id} not found`);
  const updated: Project = { ...data, id };
  projects[idx] = updated;
  save(projects);
  return updated;
}

// DELETE /projects/:id
export async function deleteProject(id: string): Promise<void> {
  save(load().filter((p) => p.id !== id));
}
