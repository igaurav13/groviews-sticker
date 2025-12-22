"use client";

import { useCanvasStore } from "@/app/store/canvasStore";

export default function ExportButton({
  stageRef,
}: {
  stageRef: React.RefObject<any>;
}) {
  const setPreview = useCanvasStore((s: any) => s.setPreview);

  const handleExport = () => {
    if (!stageRef.current) return;

    /* ---------- PREVIEW (for Summary Page) ---------- */
    const previewUri = stageRef.current.toDataURL({
      pixelRatio: 2, // lightweight preview
    });

    setPreview(previewUri);

    /* ---------- FINAL DOWNLOAD ---------- */
    const downloadUri = stageRef.current.toDataURL({
      pixelRatio: 3, // high quality
    });

    const link = document.createElement("a");
    link.download = "sticker.png";
    link.href = downloadUri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExport}
      className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] hover:shadow-xl text-white text-sm font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 border border-[var(--primary)] flex items-center justify-center gap-2"
    >
      <span>⬇</span> Download PNG
    </button>
  );
}
