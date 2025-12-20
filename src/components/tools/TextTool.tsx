"use client";

import { v4 as uuidv4 } from "uuid";
import { useCanvasStore } from "@/store/canvasStore";

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
      className="w-full rounded bg-blue-600 text-white py-2 text-sm"
    >
      Add Text
    </button>
  );
}
