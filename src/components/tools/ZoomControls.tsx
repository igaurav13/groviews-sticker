"use client";

import { useCanvasStore } from "@/store/canvasStore";

export default function ZoomControls() {
  const zoomIn = useCanvasStore((s) => s.zoomIn);
  const zoomOut = useCanvasStore((s) => s.zoomOut);
  const scale = useCanvasStore((s) => s.present.scale);

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={zoomOut}
        className="icon-btn tooltip transition-all duration-300"
        data-tooltip="Zoom Out"
        title="Zoom Out"
      >
        −
      </button>
      <span className="text-xs font-bold text-[var(--foreground)] px-4 py-2 rounded-lg bg-[var(--primary)] bg-opacity-20 border border-[var(--primary)] min-w-16 text-center">
        {Math.round(scale * 100)}%
      </span>
      <button
        onClick={zoomIn}
        className="icon-btn tooltip transition-all duration-300"
        data-tooltip="Zoom In"
        title="Zoom In"
      >
        +
      </button>
    </div>
  );
}
