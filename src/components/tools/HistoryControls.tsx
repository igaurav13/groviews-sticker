"use client";

import { useCanvasStore } from "@/app/store/canvasStore";

export default function HistoryControls() {
  const undo = useCanvasStore((s) => s.undo);
  const redo = useCanvasStore((s) => s.redo);

  return (
    <div className="flex gap-2">
      <button
        onClick={undo}
        className="flex-1 icon-btn tooltip transition-all duration-300"
        data-tooltip="Undo (Ctrl+Z)"
        title="Undo"
      >
        ↶
      </button>
      <button
        onClick={redo}
        className="flex-1 icon-btn tooltip transition-all duration-300"
        data-tooltip="Redo (Ctrl+Y)"
        title="Redo"
      >
        ↷
      </button>
    </div>
  );
}
