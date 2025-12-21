"use client";

export default function ExportButton({
  stageRef,
}: {
  stageRef: React.RefObject<any>;
}) {
  const handleExport = () => {
    if (!stageRef.current) return;

    const uri = stageRef.current.toDataURL({
      pixelRatio: 3, // high quality
    });

    const link = document.createElement("a");
    link.download = "sticker.png";
    link.href = uri;
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
