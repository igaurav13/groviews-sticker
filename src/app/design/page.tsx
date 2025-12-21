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
    <div className="h-screen flex bg-[var(--background)] overflow-hidden">
      {/* Left Sidebar - All Tools */}
      <div className="w-80 border-r border-[var(--border)] bg-[var(--card-bg)] flex flex-col shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-6 border-b border-[var(--border)] bg-gradient-to-r from-[var(--primary)] via-[#0d47a1] to-[var(--primary-light)] text-white">
          <h1 className="text-2xl font-bold tracking-tight">✨ Design</h1>
          <p className="text-xs opacity-80 mt-1.5 font-medium">Create amazing stickers</p>
        </div>

        {/* Tools Container - with proper scroll */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scroll-smooth">
          {/* History Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)] opacity-70 px-1">History</h3>
            <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-colors">
              <HistoryControls />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>

          {/* Templates Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)] opacity-70 px-1">Templates</h3>
            <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-colors">
              <TemplatePicker />
            </div>
          </div>

                {/* Grid Toggle */}
              <GridToggle />

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>

          {/* View Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)] opacity-70 px-1">View</h3>
            <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] space-y-3">
              <ZoomControls />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>

          {/* Content Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)] opacity-70 px-1">Content</h3>
            <div className="space-y-2">
              <ImageUpload />
              <TextTool />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>

          {/* Layers Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)] opacity-70 px-1">Layers</h3>
            <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-colors">
              <LayerControls />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent"></div>

          {/* Appearance Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)] opacity-70 px-1">Appearance</h3>
            <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-colors">
              <BackgroundColorPicker />
            </div>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header Bar */}
        <div className="border-b border-[var(--border)] bg-gradient-to-r from-[var(--card-bg)] to-[var(--hover)] px-6 py-5 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[var(--foreground)]">🎨 Canvas</h2>
              <p className="text-xs text-[var(--foreground)] opacity-60 mt-1">Design your sticker</p>
            </div>
          </div>
        </div>

        {/* Canvas Container */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#161b22] via-[var(--card-bg)] to-[#0d1117]">
          <StickerCanvas />
        </div>
      </div>

      {/* Right Panel - Properties & Export */}
      <div className="w-80 border-l border-[var(--border)] bg-[var(--card-bg)] flex flex-col shadow-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-6 border-b border-[var(--border)] bg-gradient-to-r from-[var(--primary)] via-[#0d47a1] to-[var(--primary-light)] text-white">
          <h3 className="text-2xl font-bold tracking-tight">⚙️ Properties</h3>
          <p className="text-xs opacity-80 mt-1.5 font-medium">Customize selected</p>
        </div>

        {/* Properties Container */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scroll-smooth">
          <div className="bg-[var(--background)] p-4 rounded-lg border border-[var(--border)] space-y-4">
            <TextProperties />
          </div>
        </div>

        {/* Export Section */}
        <div className="border-t border-[var(--border)] bg-[var(--background)] p-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--foreground)] opacity-70 mb-4 px-1">Export</h3>
          <ExportButton stageRef={stageRef} />
        </div>
      </div>
    </div>
  );
}

