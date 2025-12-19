"use client";

import { v4 as uuidv4 } from "uuid";
import { useCanvasStore } from "@/store/canvasStore";

export default function TextTool() {
  const addElement = useCanvasStore((s) => s.addElement);

  const addText = () => {
    addElement({
      id: uuidv4(),
      type: "text",
      x: 200,
      y: 200,
      rotation: 0,
      scale: 1,
      text: "Edit me",
      color: "#000000",
      fontSize: 24,
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
