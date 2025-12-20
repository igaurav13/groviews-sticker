"use client";

import { useCanvasStore } from "@/store/canvasStore";

export default function LayerControls() {
  const selectedId = useCanvasStore((s) => s.present.selectedId);
  const bringForward = useCanvasStore((s) => s.bringForward);
  const sendBackward = useCanvasStore((s) => s.sendBackward);

  if (!selectedId) {
    return (
      <p className="text-xs text-gray-500">
        Select an element to manage layers
      </p>
    );
  }

  return (
    <div className="space-y-1">
      <button
        onClick={() => bringForward(selectedId)}
        className="w-full rounded border px-2 py-1 text-sm"
      >
        Bring Forward
      </button>
      <button
        onClick={() => sendBackward(selectedId)}
        className="w-full rounded border px-2 py-1 text-sm"
      >
        Send Backward
      </button>
    </div>
  );
}
