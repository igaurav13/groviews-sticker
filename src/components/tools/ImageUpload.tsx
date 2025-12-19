"use client";

import { ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCanvasStore } from "@/store/canvasStore";

export default function ImageUpload() {
  const addElement = useCanvasStore((state) => state.addElement);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      addElement({
        id: uuidv4(),
        type: "image",
        x: 200,
        y: 200,
        rotation: 0,
        scale: 1,
        src: reader.result as string,
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Upload Image
      </label>
      <input
        type="file"
        accept="image/png,image/jpeg,image/svg+xml"
        onChange={handleFileChange}
      />
    </div>
  );
}
