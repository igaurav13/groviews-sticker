"use client";

import { useCanvasStore } from "@/store/canvasStore";

export default function LayerControls() {
  const selectedId = useCanvasStore((s) => s.present.selectedId);
  const bringForward = useCanvasStore((s) => s.bringForward);
  const sendBackward = useCanvasStore((s) => s.sendBackward);

  if (!selectedId) {
    return (
      <p className="text-sm text-gray-500">
        Select an element to manage layers
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Layers</h3>

      <button
        onClick={() => bringForward(selectedId)}
        className="w-full px-3 py-1 border rounded text-sm"
      >
        Bring Forward
      </button>

      <button
        onClick={() => sendBackward(selectedId)}
        className="w-full px-3 py-1 border rounded text-sm"
      >
        Send Backward
      </button>
    </div>
  );
}
