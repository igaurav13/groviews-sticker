"use client";

import { v4 as uuidv4 } from "uuid";
import { useCanvasStore } from "@/app/store/canvasStore";

export default function TextTool() {
  const addElement = useCanvasStore((s) => s.addElement);

  const addText = () => {
    addElement({
      id: `text-${Date.now()}`,
      type: "text",
      text: "New Text",
      x: -50,
      y: 0,
      rotation: 0,
      scale: 1,
      fontSize: 24,
      color: "#000000",
    });
  };

  return (
    <button
      onClick={addText}
      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] hover:shadow-lg text-white text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 border border-[var(--primary)]"
    >
      + Add Text
    </button>
  );
}
