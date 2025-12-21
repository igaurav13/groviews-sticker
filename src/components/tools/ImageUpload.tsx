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
    previewImages.forEach((preview) => {
      addElement({
        id: `image-${Date.now()}`,
        type: "image",
        src: preview.src,
        x: -100,
        y: -100,
        rotation: 0,
        scale: 1,
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
        className="border-2 border-dashed border-[var(--border)] rounded-lg p-4 text-center cursor-pointer hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:bg-opacity-5 transition-all group"
      >
        <label className="cursor-pointer block">
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.svg"
            multiple
            hidden
            onChange={onFileChange}
          />
          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🖼️</div>
          <p className="text-sm font-semibold text-[var(--foreground)]">Add Images</p>
          <p className="text-xs text-[var(--foreground)] opacity-50 mt-1">Drag & drop or click</p>
        </label>
      </div>

      {/* PREVIEW MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-[var(--background)] rounded-2xl p-6 w-96 shadow-2xl border border-[var(--border)]">
            <h3 className="text-lg font-semibold mb-4 text-[var(--foreground)]">Preview Images</h3>

            <div className="grid grid-cols-2 gap-3 mb-6 max-h-48 overflow-y-auto rounded-lg p-2 bg-[var(--hover)]">
              {previewImages.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.name}
                  className="border border-[var(--border)] rounded object-contain h-28 bg-[var(--background)]"
                />
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setPreviewImages([]);
                  setOpen(false);
                }}
                className="px-4 py-2 border border-[var(--border)] rounded-lg text-sm font-medium hover:bg-[var(--hover)] transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={addToCanvas}
                className="px-4 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] hover:shadow-lg text-white rounded-lg text-sm font-semibold transition-all"
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
