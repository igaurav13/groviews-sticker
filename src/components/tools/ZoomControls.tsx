"use client";

import { useCanvasStore } from "@/store/canvasStore";

export default function ZoomControls() {
  const zoomIn = useCanvasStore((s) => s.zoomIn);
  const zoomOut = useCanvasStore((s) => s.zoomOut);
  const scale = useCanvasStore((s) => s.present.scale);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Zoom</p>

      <div className="flex items-center gap-2">
        <button
          onClick={zoomOut}
          className="px-2 py-1 border rounded"
        >
          −
        </button>

        <span className="text-sm w-12 text-center">
          {Math.round(scale * 100)}%
        </span>

        <button
          onClick={zoomIn}
          className="px-2 py-1 border rounded"
        >
          +
        </button>
      </div>
    </div>
  );
}
