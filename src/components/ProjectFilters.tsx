import type { Status, Priority } from "../types";

type SortKey = "dueDate" | "priority" | "clientName" | "projectName";

type Props = {
  search: string;
  setSearch: (v: string) => void;

  filterStatus: Status | "All";
  setFilterStatus: (v: Status | "All") => void;

  filterPriority: Priority | "All";
  setFilterPriority: (v: Priority | "All") => void;

  sortBy: SortKey;
  setSortBy: (v: SortKey) => void;
};

export default function ProjectFilters({
  search,
  setSearch,
  filterStatus,
  setFilterStatus,
  filterPriority,
  setFilterPriority,
  sortBy,
  setSortBy,
}: Props) {
  const handleClear = () => {
    setSearch("");
    setFilterStatus("All");
    setFilterPriority("All");
    setSortBy("dueDate");
  };

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Search */}
      <div className="flex-1" style={{ minWidth: 200 }}>
        <input
          type="text"
          placeholder="Search projects, clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="field-input w-full"
        />
      </div>

      {/* Status */}
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value as Status | "All")}
        className="field-input"
        style={{ width: "auto", minWidth: 140 }}
      >
        <option value="All">All Statuses</option>
        <option value="Planning">Planning</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      {/* Priority */}
      <select
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value as Priority | "All")}
        className="field-input"
        style={{ width: "auto", minWidth: 140 }}
      >
        <option value="All">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as SortKey)}
        className="field-input"
        style={{ width: "auto", minWidth: 160 }}
      >
        <option value="dueDate">Sort: Due Date</option>
        <option value="priority">Sort: Priority</option>
        <option value="clientName">Sort: Client Name</option>
        <option value="projectName">Sort: Project Name</option>
      </select>

      {/* Clear */}
      {(search || filterStatus !== "All" || filterPriority !== "All") && (
        <button
          onClick={handleClear}
          className="btn-ghost"
          style={{ whiteSpace: "nowrap" }}
        >
          CLEAR
        </button>
      )}
    </div>
  );
}
