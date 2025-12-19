import ImageUpload from "@/components/tools/ImageUpload";
import StickerCanvas from "@/components/canvas/StickerCanvas";

export default function DesignPage() {
  return (
    <div className="h-screen flex">
      {/* Left Panel */}
      <div className="w-64 border-r bg-red-400 p-4 space-y-4">
        <h2 className="font-semibold">Tools</h2>
        <ImageUpload />
      </div>

      {/* Canvas Area */}
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <StickerCanvas />
      </div>

      {/* Right Panel */}
      <div className="w-64 border-l p-4">
        <h2 className="font-semibold">Properties</h2>
      </div>
    </div>
  );
}
