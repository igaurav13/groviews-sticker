"use client";

import { useCanvasStore } from "@/app/store/canvasStore";

export default function TextProperties() {
  const elements = useCanvasStore((s) => s.present.elements);
  const selectedId = useCanvasStore((s) => s.present.selectedId);
  const updateElement = useCanvasStore((s) => s.updateElement);

  const selected = elements.find((el) => el.id === selectedId);

  if (!selected || selected.type !== "text") {
    return <p className="text-xs text-[var(--foreground)] opacity-50">Select text to edit</p>;
  }

  return (
    <div className="space-y-4">
      {/* TEXT */}
      <div>
        <label className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider block mb-2">Text Content</label>
        <input
          type="text"
          value={selected.text}
          onChange={(e) =>
            updateElement(selected.id, { text: e.target.value })
          }
          className="w-full border border-[var(--border)] rounded px-3 py-2 text-sm bg-[var(--hover)] focus:outline-none focus:border-[var(--primary)] transition-colors"
        />
      </div>

      {/* FONT SIZE */}
      <div>
        <label className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider block mb-2">Size</label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={8}
            max={200}
            value={selected.fontSize}
            onChange={(e) =>
              updateElement(selected.id, {
                fontSize: Number(e.target.value),
              })
            }
            className="flex-1"
          />
          <span className="text-xs font-medium w-10 text-center">{selected.fontSize}px</span>
        </div>
      </div>

      {/* COLOR */}
      <div>
        <label className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider block mb-2">Color</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={selected.color}
            onChange={(e) =>
              updateElement(selected.id, { color: e.target.value })
            }
            className="w-full h-10 border border-[var(--border)] rounded cursor-pointer"
          />
          <span className="text-xs font-mono text-[var(--foreground)] opacity-70">{selected.color}</span>
        </div>
      </div>
    </div>
  );
}
