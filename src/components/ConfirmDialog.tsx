interface ConfirmDialogProps {
  project: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  project,
  description,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        className="w-full max-w-sm flex flex-col gap-4 p-6"
        style={{ background: "#0e0e0e", border: "1px solid #3b0a0a" }}
      >
        <div className="flex flex-col gap-2">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "#f87171",
              letterSpacing: "0.15em",
            }}
          >
            // CONFIRM DELETE
          </span>
          <p style={{ color: "#efefef", fontSize: "0.9rem" }}>
            Delete <strong style={{ color: "#f87171" }}>{project}</strong>? This
            cannot be undone.
          </p>
          <p className="text-sm text-muted-foreground pt-2">
            {description || "Are you sure you want to proceed?"}
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <button className="btn-ghost" onClick={onCancel}>
            CANCEL
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}
