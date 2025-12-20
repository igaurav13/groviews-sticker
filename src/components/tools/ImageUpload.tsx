"use client";

import { useState, DragEvent } from "react";
import { nanoid } from "nanoid";
import { useCanvasStore } from "@/store/canvasStore";

type PreviewImage = {
  src: string;
  name: string;
};

const ACCEPTED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
];

export default function ImageUpload() {
  const addElement = useCanvasStore((s) => s.addElement);

  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);
  const [open, setOpen] = useState(false);

  /* ---------- FILE HANDLING ---------- */

  const processFiles = (files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter((file) =>
      ACCEPTED_TYPES.includes(file.type)
    );

    const previews = validFiles.map((file) => ({
      name: file.name,
      src: URL.createObjectURL(file),
    }));

    if (previews.length > 0) {
      setPreviewImages(previews);
      setOpen(true);
    }
  };

  /* ---------- INPUT ---------- */

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    e.target.value = "";
  };

  /* ---------- DRAG & DROP ---------- */

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    processFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  /* ---------- CONFIRM ---------- */

  const addToCanvas = () => {
    previewImages.forEach((img) => {
      addElement({
        id: nanoid(),
        type: "image",
        x: 200,
        y: 200,
        rotation: 0,
        scale: 0.5,
        src: img.src,
      });
    });

    setPreviewImages([]);
    setOpen(false);
  };

  return (
    <>
      {/* UPLOAD AREA */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="border border-dashed rounded p-3 text-sm text-center cursor-pointer hover:bg-gray-50"
      >
        <label className="cursor-pointer block">
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.svg"
            multiple
            hidden
            onChange={onFileChange}
          />
          Click or drag images here
        </label>
      </div>

      {/* PREVIEW MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded p-4 w-96">
            <h3 className="font-semibold mb-2">Preview Images</h3>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {previewImages.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.name}
                  className="border rounded object-contain h-32"
                />
              ))}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setPreviewImages([]);
                  setOpen(false);
                }}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={addToCanvas}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Add to Canvas
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
