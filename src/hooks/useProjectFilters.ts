import { useEffect, useMemo, useState } from "react";
import type { Status, Priority } from "../types";

type SortKey = "dueDate" | "priority" | "clientName" | "projectName";

export function useProjectFilters() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [filterStatus, setFilterStatus] = useState<Status | "All">("All");
  const [filterPriority, setFilterPriority] = useState<Priority | "All">("All");
  const [sortBy, setSortBy] = useState<SortKey>("dueDate");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 600);

    return () => clearTimeout(timer);
  }, [search]);

  const queryParams = useMemo(() => {
    return {
      search: debouncedSearch.trim() || undefined,

      status: filterStatus !== "All" ? filterStatus : undefined,

      priority: filterPriority !== "All" ? filterPriority : undefined,

      sortBy:
        sortBy === "clientName"
          ? "client"
          : sortBy === "projectName"
            ? "project"
            : sortBy === "dueDate"
              ? "endDate"
              : sortBy,

      order: "ASC" as const,
    };
  }, [debouncedSearch, filterStatus, filterPriority, sortBy]);

  return {
    search,
    setSearch,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    sortBy,
    setSortBy,
    queryParams,
  };
}
