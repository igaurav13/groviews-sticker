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
      className="rounded border px-2 py-1 text-sm"
    >
      Export PNG
    </button>
  );
}
