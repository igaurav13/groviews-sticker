"use client";

import { useCanvasStore } from "@/store/canvasStore";

export default function GridToggle() {
  const showGrid = useCanvasStore((s) => s.showGrid);
  const toggleGrid = useCanvasStore((s) => s.toggleGrid);

  return (
    <button
      onClick={toggleGrid}
      className={`w-full px-3 py-2 rounded-lg tooltip transition-all duration-300 transform hover:scale-105 font-semibold text-sm border ${
        showGrid 
          ? "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] text-white border-[var(--primary)] shadow-lg" 
          : "bg-[var(--background)] text-[var(--foreground)] border-[var(--border)] hover:border-[var(--primary)]"
      }`}
      data-tooltip={showGrid ? "Hide Grid" : "Show Grid"}
      title={showGrid ? "Hide Grid" : "Show Grid"}
    >
      ⊞ {showGrid ? "Hide Grid" : "Show Grid"}
    </button>
  );
}
