"use client";

import { useCanvasStore } from "@/app/store/canvasStore";

export default function BackgroundColorPicker() {
  const color = useCanvasStore((s) => s.present.backgroundColor);
  const setColor = useCanvasStore((s) => s.setBackgroundColor);

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-semibold text-[var(--foreground)]">Background</label>
      <div className="relative group">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-12 h-12 border-2 border-[var(--border)] rounded-lg cursor-pointer hover:border-[var(--primary)] transition-all hover:shadow-lg"
          title="Background Color"
        />
        <div className="absolute -bottom-8 left-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white bg-black/80 px-2 py-1 rounded whitespace-nowrap pointer-events-none">
          {color}
        </div>
      </div>
    </div>
  );
}
