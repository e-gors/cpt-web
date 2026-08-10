interface CustomFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const CustomField = ({
  label,
  error,
  required,
  children,
}: CustomFieldProps) => {
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
};
