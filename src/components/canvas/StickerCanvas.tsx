"use client";

import {
  Stage,
  Layer,
  Group,
  Circle,
  Image as KonvaImage,
  Transformer,
  Text as KonvaText,
} from "react-konva";
import { useCanvasStore } from "@/store/canvasStore";
import useImage from "use-image";
import { useRef, useEffect } from "react";

const CANVAS_SIZE = 400;
const RADIUS = 180;

/* ---------------- IMAGE ELEMENT ---------------- */

function CanvasImage({ element }: { element: any }) {
  const [image] = useImage(element.src);
  const setSelectedId = useCanvasStore((s) => s.setSelectedId);
  const selectedId = useCanvasStore((s) => s.present.selectedId);
  const updateElement = useCanvasStore((s) => s.updateElement);

  return (
    <KonvaImage
      id={element.id}
      image={image}
      x={element.x}
      y={element.y}
      rotation={element.rotation}
      scaleX={element.scale}
      scaleY={element.scale}
      draggable
      onClick={() => setSelectedId(element.id)}
      onTap={() => setSelectedId(element.id)}
      onDragEnd={(e) => {
        updateElement(element.id, {
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
      onTransformEnd={(e) => {
        const node = e.target;
        const scaleX = node.scaleX();

        node.scaleX(1);
        node.scaleY(1);

        updateElement(element.id, {
          x: node.x(),
          y: node.y(),
          rotation: node.rotation(),
          scale: scaleX,
        });
      }}
      stroke={selectedId === element.id ? "#2563eb" : undefined}
      strokeWidth={selectedId === element.id ? 2 : 0}
    />
  );
}

/* ---------------- TEXT ELEMENT ---------------- */

function CanvasText({ element }: { element: any }) {
  const setSelectedId = useCanvasStore((s) => s.setSelectedId);
  const updateElement = useCanvasStore((s) => s.updateElement);
  const selectedId = useCanvasStore((s) => s.present.selectedId);

  return (
    <KonvaText
      id={element.id}
      text={element.text}
      x={element.x}
      y={element.y}
      rotation={element.rotation}
      fontSize={element.fontSize}
      fill={element.color}
      scaleX={element.scale}
      scaleY={element.scale}
      draggable
      onClick={() => setSelectedId(element.id)}
      onTap={() => setSelectedId(element.id)}
      onDragEnd={(e) => {
        updateElement(element.id, {
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
      onTransformEnd={(e) => {
        const node = e.target;
        const scaleX = node.scaleX();

        node.scaleX(1);
        node.scaleY(1);

        updateElement(element.id, {
          x: node.x(),
          y: node.y(),
          rotation: node.rotation(),
          scale: scaleX,
        });
      }}
      stroke={selectedId === element.id ? "#2563eb" : undefined}
      strokeWidth={selectedId === element.id ? 1 : 0}
    />
  );
}

/* ---------------- MAIN CANVAS ---------------- */

export default function StickerCanvas({
  stageRef,
}: {
  stageRef: React.RefObject<any>;
}) {
  const elements = useCanvasStore((s) => s.present.elements);
  const selectedId = useCanvasStore((s) => s.present.selectedId);

  const trRef = useRef<any>(null);

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
    <Stage
      ref={stageRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
    >
      <Layer>
        {/* CLIPPED STICKER AREA */}
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
          {/* STICKER BACKGROUND */}
          <Circle
            x={CANVAS_SIZE / 2}
            y={CANVAS_SIZE / 2}
            radius={RADIUS}
            fill="#ffffff"
          />

          {/* ELEMENTS */}
          {elements.map((el) => {
            if (el.type === "image") {
              return <CanvasImage key={el.id} element={el} />;
            }
            if (el.type === "text") {
              return <CanvasText key={el.id} element={el} />;
            }
            return null;
          })}
        </Group>

        {/* TRANSFORMER (OUTSIDE CLIP) */}
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
