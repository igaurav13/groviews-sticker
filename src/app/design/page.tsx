"use client";

import { useRef } from "react";
import StickerCanvas from "@/components/canvas/StickerCanvas";
import TextTool from "@/components/tools/TextTool";
import TextProperties from "@/components/properties/TextProperties";
import HistoryControls from "@/components/tools/HistoryControls";
import ExportButton from "@/components/tools/ExportButton";
import ImageUpload from "@/components/tools/ImageUpload";
import ZoomControls from "@/components/tools/ZoomControls";
import LayerControls from "@/components/tools/LayerControls";
import BackgroundColorPicker from "@/components/tools/BackgroundColorPicker";
import TemplatePicker from "@/components/tools/TemplatePicker";
import GridToggle from "@/components/tools/GridToggle";

export default function DesignPage() {
  const stageRef = useRef<any>(null);

  return (
    <div className="h-screen flex">
      {/* Left Panel */}
      <div className="w-64 border-r p-4 space-y-4">
        <h2 className="font-semibold">Tools</h2>

        <HistoryControls />
        <TemplatePicker />
        <ZoomControls />
        <BackgroundColorPicker />
        <LayerControls />
        <ImageUpload />
        <GridToggle />
        <TextTool />
        <ExportButton stageRef={stageRef} />
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <StickerCanvas />
      </div>

      {/* Right Panel */}
      <div className="w-64 border-l p-4">
        <h2 className="font-semibold mb-4">Properties</h2>
        <TextProperties />
      </div>
    </div>
  );
}
