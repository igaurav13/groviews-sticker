"use client";

import { useCanvasStore } from "@/store/canvasStore";

export default function BackgroundColorPicker() {
  const color = useCanvasStore((s) => s.present.backgroundColor);
  const setColor = useCanvasStore((s) => s.setBackgroundColor);

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">Sticker Background</label>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-full h-10 border rounded"
      />
    </div>
  );
}
