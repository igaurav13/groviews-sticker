"use client";

import { useCanvasStore } from "@/store/canvasStore";

export default function HistoryControls() {
  const undo = useCanvasStore((s) => s.undo);
  const redo = useCanvasStore((s) => s.redo);

  return (
    <div className="flex gap-2">
      <button
        onClick={undo}
        className="flex-1 rounded border px-2 py-1 text-sm"
      >
        Undo
      </button>
      <button
        onClick={redo}
        className="flex-1 rounded border px-2 py-1 text-sm"
      >
        Redo
      </button>
    </div>
  );
}
