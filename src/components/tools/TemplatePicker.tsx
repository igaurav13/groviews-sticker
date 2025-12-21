"use client";

import { templates, templateNames, templateEmojis } from "@/app/lib/templates";
import { useCanvasStore } from "@/store/canvasStore";
import GridToggle from "./GridToggle";

export default function TemplatePicker() {
  const loadTemplate = useCanvasStore((s) => s.loadTemplate);

  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-1 scroll-smooth">
        {templates.map((template, i) => (
          <button
            key={i}
            onClick={() => loadTemplate(template)}
            className="relative group overflow-hidden rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-all duration-300 transform hover:scale-105 h-28 w-24 flex-shrink-0"
          >
            {/* Template Preview */}
            <div
              className="w-full h-full flex flex-col items-center justify-center p-2 relative"
              style={{ backgroundColor: template.backgroundColor }}
            >
              {/* Preview Content */}
              <div className="text-center z-10 flex flex-col items-center gap-1">
                <div className="text-2xl">{templateEmojis[i]}</div>
                <p className="text-xs font-bold text-white opacity-80 leading-tight">{templateNames[i].split(" ")[0]}</p>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[var(--primary)] opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white font-bold text-xs mb-1">{templateNames[i]}</p>
                  <p className="text-white text-xs opacity-80">Click to apply</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
