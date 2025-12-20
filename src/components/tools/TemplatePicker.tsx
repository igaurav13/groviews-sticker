"use client";

import { templates } from "@/app/lib/templates";
import { useCanvasStore } from "@/store/canvasStore";

export default function TemplatePicker() {
  const loadTemplate = useCanvasStore((s) => s.loadTemplate);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Templates</h3>

      <div className="grid grid-cols-1 gap-2">
        {templates.map((_, i) => (
          <button
            key={i}
            onClick={() => loadTemplate(templates[i])}
            className="border rounded px-2 py-1 text-sm hover:bg-gray-100"
          >
            Template {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
