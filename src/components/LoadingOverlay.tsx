import { Loader2 } from "lucide-react";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-auto">
      <Loader2 className="w-12 h-12 text-white animate-spin" />
    </div>
  );
}
