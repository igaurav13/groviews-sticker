"use client";

import { useCanvasStore } from "@/store/canvasStore";

export default function TextProperties() {
  const elements = useCanvasStore((s) => s.elements);
  const selectedId = useCanvasStore((s) => s.selectedId);
  const updateElement = useCanvasStore((s) => s.updateElement);

  const selected = elements.find((el) => el.id === selectedId);

  if (!selected || selected.type !== "text") {
    return <p className="text-sm text-gray-500">Select text to edit</p>;
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Text</label>
        <input
          type="text"
          value={selected.text}
          onChange={(e) =>
            updateElement(selected.id, { text: e.target.value })
          }
          className="mt-1 w-full border rounded px-2 py-1 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Font Size</label>
        <input
          type="number"
          min={8}
          max={200}
          value={selected.fontSize}
          onChange={(e) =>
            updateElement(selected.id, { fontSize: Number(e.target.value) })
          }
          className="mt-1 w-full border rounded px-2 py-1 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Color</label>
        <input
          type="color"
          value={selected.color}
          onChange={(e) =>
            updateElement(selected.id, { color: e.target.value })
          }
          className="mt-1 h-10 w-full"
        />
      </div>
    </div>
  );
}
