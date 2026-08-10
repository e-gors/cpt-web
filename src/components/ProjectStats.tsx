type Props = {
  total: number;
  inProgress: number;
  highPriority: number;
  overdue: number;
};

export default function ProjectStats({
  total,
  inProgress,
  highPriority,
  overdue,
}: Props) {
  const stats = [
    { label: "TOTAL", value: total, color: "#efefef" },
    { label: "IN PROGRESS", value: inProgress, color: "#d4ff00" },
    { label: "HIGH PRIORITY", value: highPriority, color: "#f87171" },
    { label: "OVERDUE", value: overdue, color: "#fb923c" },
  ];

  return (
    <div
      className="grid grid-cols-2 gap-3"
      style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
    >
      {stats.map((s) => (
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
            {s?.value?.toString().padStart(2, "0")}
          </div>
        </div>
      ))}
    </div>
  );
}
