'use client';
import { useRef } from "react";
import ImageUpload from "@/components/tools/ImageUpload";
import StickerCanvas from "@/components/canvas/StickerCanvas";
import TextTool from "@/components/tools/TextTool";
import TextProperties from "@/components/properties/TextProperties";
import HistoryControls from "@/components/tools/HistoryControls";
import ExportButton from "@/components/tools/ExportButton";

export default function DesignPage() {
  const stageRef = useRef<any>(null);

  return (
    <div className="h-screen flex">
      {/* Left Panel */}
      <div className="w-64 border-r p-4 space-y-4">
        <h2 className="font-semibold">Tools</h2>
        <HistoryControls />
        <ImageUpload />
        <TextTool />
        <ExportButton stageRef={stageRef} />
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <StickerCanvas stageRef={stageRef} />
      </div>

      {/* Right Panel */}
      <div className="w-64 border-l p-4">
        <h2 className="font-semibold mb-4">Properties</h2>
        <TextProperties />
      </div>
    </div>
  );
}
