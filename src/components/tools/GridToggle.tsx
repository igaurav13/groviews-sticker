"use client";

import { useCanvasStore } from "@/store/canvasStore";

export default function GridToggle() {
  const showGrid = useCanvasStore((s) => s.showGrid);
  const toggleGrid = useCanvasStore((s) => s.toggleGrid);

  return (
    <button
      onClick={toggleGrid}
      className={`w-full px-3 py-2 text-sm rounded border ${
        showGrid
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-700"
      }`}
    >
      {showGrid ? "Hide Grid" : "Show Grid"}
    </button>
  );
}
