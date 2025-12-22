"use client";

import { useCanvasStore } from "@/app/store/canvasStore";

export default function LayerControls() {
  const selectedId = useCanvasStore((s) => s.present.selectedId);
  const bringForward = useCanvasStore((s) => s.bringForward);
  const sendBackward = useCanvasStore((s) => s.sendBackward);

  if (!selectedId) {
    return (
      <p className="text-xs text-[var(--foreground)] opacity-50 text-center py-3">
        Select to layer
      </p>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => bringForward(selectedId)}
        className="flex-1 px-3 py-2 rounded-lg bg-[var(--background)] hover:bg-[var(--primary)] hover:text-white text-xs font-bold transition-all duration-300 transform hover:scale-105 border border-[var(--border)] hover:border-[var(--primary)]"
        title="Bring Forward"
      >
        ↑
      </button>

      <button
        onClick={() => sendBackward(selectedId)}
        className="flex-1 px-3 py-2 rounded-lg bg-[var(--background)] hover:bg-[var(--primary)] hover:text-white text-xs font-bold transition-all duration-300 transform hover:scale-105 border border-[var(--border)] hover:border-[var(--primary)]"
        title="Send Backward"
      >
        ↓
      </button>
    </div>
  );
}
