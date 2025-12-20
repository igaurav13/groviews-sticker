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

/* ---------- IMAGE ---------- */
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
      onDragEnd={(e) =>
        updateElement(element.id, { x: e.target.x(), y: e.target.y() })
      }
      onTransformEnd={(e) => {
        const node = e.target;
        const scale = node.scaleX();
        node.scaleX(1);
        node.scaleY(1);

        updateElement(element.id, {
          x: node.x(),
          y: node.y(),
          rotation: node.rotation(),
          scale,
        });
      }}
      stroke={selectedId === element.id ? "#2563eb" : undefined}
      strokeWidth={selectedId === element.id ? 2 : 0}
    />
  );
}

/* ---------- TEXT ---------- */
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
      onDragEnd={(e) =>
        updateElement(element.id, { x: e.target.x(), y: e.target.y() })
      }
      onTransformEnd={(e) => {
        const node = e.target;
        const scale = node.scaleX();
        node.scaleX(1);
        node.scaleY(1);

        updateElement(element.id, {
          x: node.x(),
          y: node.y(),
          rotation: node.rotation(),
          scale,
        });
      }}
      stroke={selectedId === element.id ? "#2563eb" : undefined}
      strokeWidth={selectedId === element.id ? 1 : 0}
    />
  );
}

/* ---------- MAIN ---------- */
export default function StickerCanvas() {
  const elements = useCanvasStore((s) => s.present.elements);
  const selectedId = useCanvasStore((s) => s.present.selectedId);
  const scale = useCanvasStore((s) => s.present.scale);

  const trRef = useRef<any>(null);

  useEffect(() => {
    if (!selectedId || !trRef.current) return;

    const stage = trRef.current.getStage();
    const node = stage?.findOne(`#${selectedId}`);

    if (node) {
      trRef.current.nodes([node]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [selectedId]);

  return (
    <Stage
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      scaleX={scale}
      scaleY={scale}
      x={(CANVAS_SIZE * (1 - scale)) / 2}
      y={(CANVAS_SIZE * (1 - scale)) / 2}
    >
      <Layer>
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
          <Circle
            x={CANVAS_SIZE / 2}
            y={CANVAS_SIZE / 2}
            radius={RADIUS}
            fill="#ffffff"
          />

          {elements.map((el) =>
            el.type === "image" ? (
              <CanvasImage key={el.id} element={el} />
            ) : (
              <CanvasText key={el.id} element={el} />
            )
          )}
        </Group>

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
