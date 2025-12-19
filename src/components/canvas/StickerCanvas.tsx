"use client";

import { Stage, Layer, Group, Circle, Image as KonvaImage, Transformer } from "react-konva";
import { useCanvasStore } from "@/store/canvasStore";
import useImage from "use-image";
import { useRef, useEffect } from "react";

const CANVAS_SIZE = 400;
const RADIUS = 180;

function CanvasImage({ element }: { element: any }) {
  const [image] = useImage(element.src);
  const setSelectedId = useCanvasStore((s) => s.setSelectedId);
  const selectedId = useCanvasStore((s) => s.selectedId);

  return (
    <KonvaImage
      id={element.id}
      image={image}
      x={element.x}
      y={element.y}
      draggable
      onClick={() => setSelectedId(element.id)}
      onTap={() => setSelectedId(element.id)}
      stroke={selectedId === element.id ? "#2563eb" : undefined}
      strokeWidth={selectedId === element.id ? 2 : 0}
    />
  );
}

export default function StickerCanvas() {
  const elements = useCanvasStore((state) => state.elements);
  const selectedId = useCanvasStore((state) => state.selectedId);

  const trRef = useRef<any>(null);
  const layerRef = useRef<any>(null);

  useEffect(() => {
    if (!selectedId || !trRef.current) return;

    const stage = trRef.current.getStage();
    const selectedNode = stage?.findOne(`#${selectedId}`);

    if (selectedNode) {
      trRef.current.nodes([selectedNode]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [selectedId]);

  return (
    <Stage width={CANVAS_SIZE} height={CANVAS_SIZE}>
      <Layer ref={layerRef}>
        <Group
          clipFunc={(ctx) => {
            ctx.beginPath();
            ctx.arc(
              CANVAS_SIZE / 2,
              CANVAS_SIZE / 2,
              RADIUS,
              0,
              Math.PI * 2
            );
            ctx.closePath();
          }}
        >
          {/* Sticker background */}
          <Circle
            x={CANVAS_SIZE / 2}
            y={CANVAS_SIZE / 2}
            radius={RADIUS}
            fill="#ffffff"
          />

          {/* Render images */}
          {elements.map((el) =>
            el.type === "image" ? (
              <CanvasImage key={el.id} element={el} />
            ) : null
          )}
        </Group>

        {/* Transformer */}
        {selectedId && (
          <Transformer
            ref={trRef}
            rotateEnabled
            enabledAnchors={[
              "top-left",
              "top-right",
              "bottom-left",
              "bottom-right",
            ]}
          />
        )}
      </Layer>
    </Stage>
  );
}
