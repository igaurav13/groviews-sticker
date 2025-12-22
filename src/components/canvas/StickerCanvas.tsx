"use client";

import {
  Stage,
  Layer,
  Group,
  Circle,
  Line,
  Transformer,
  Image as KonvaImage,
  Text as KonvaText,
} from "react-konva";
import { useCanvasStore } from "@/app/store/canvasStore";
import useImage from "use-image";
import { useEffect, useRef } from "react";

const BASE_SIZE = 400;
const RADIUS = 180;
const GRID_SIZE = 20;

/* =======================
   GRID
======================= */
function Grid() {
  const lines = [];

  for (let i = -RADIUS; i <= RADIUS; i += GRID_SIZE) {
    lines.push(
      <Line key={`v-${i}`} points={[i, -RADIUS, i, RADIUS]} stroke="#e5e7eb" />,
      <Line key={`h-${i}`} points={[-RADIUS, i, RADIUS, i]} stroke="#e5e7eb" />
    );
  }

  return <>{lines}</>;
}

/* =======================
   IMAGE
======================= */
function CanvasImage({ el }: any) {
  const [img] = useImage(el.src);
  const update = useCanvasStore((s) => s.updateElement);
  const select = useCanvasStore((s) => s.setSelectedId);

  return (
    <KonvaImage
      id={el.id}
      image={img}
      x={el.x}
      y={el.y}
      rotation={el.rotation}
      scaleX={el.scale}
      scaleY={el.scale}
      draggable
      onClick={() => select(el.id)}
      onDragEnd={(e) =>
        update(el.id, { x: e.target.x(), y: e.target.y() })
      }
      onTransformEnd={(e) => {
        const node = e.target;
        const scale = node.scaleX();
        node.scaleX(1);
        node.scaleY(1);

        update(el.id, {
          x: node.x(),
          y: node.y(),
          rotation: node.rotation(),
          scale,
        });
      }}
    />
  );
}

/* =======================
   TEXT
======================= */
function CanvasText({ el }: any) {
  const update = useCanvasStore((s) => s.updateElement);
  const select = useCanvasStore((s) => s.setSelectedId);

  return (
    <KonvaText
      id={el.id}
      text={el.text}
      x={el.x}
      y={el.y}
      rotation={el.rotation}
      scaleX={el.scale}
      scaleY={el.scale}
      fontSize={el.fontSize}
      fill={el.color}
      draggable
      onClick={() => select(el.id)}
      onDragEnd={(e) =>
        update(el.id, { x: e.target.x(), y: e.target.y() })
      }
      onTransformEnd={(e) => {
        const node = e.target;
        const scale = node.scaleX();
        node.scaleX(1);
        node.scaleY(1);

        update(el.id, {
          x: node.x(),
          y: node.y(),
          rotation: node.rotation(),
          scale,
        });
      }}
    />
  );
}

/* =======================
   MAIN CANVAS
======================= */
export default function StickerCanvas() {
  
  const { elements, selectedId, scale, backgroundColor } =
    useCanvasStore((s) => s.present);

  const showGrid = useCanvasStore((s) => s.showGrid);
  const setPreview = useCanvasStore((s: any) => s.setPreview); // <-- safe optional
  const trRef = useRef<any>(null);
  const stageRef = useRef<any>(null);

  /* ---------- Transformer ---------- */
  useEffect(() => {
    if (!selectedId || !trRef.current) return;
    const stage = trRef.current.getStage();
    const node = stage?.findOne(`#${selectedId}`);
    if (node) {
      trRef.current.nodes([node]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [selectedId]);

  /* ---------- EXPORT PREVIEW (PNG) ---------- */
  useEffect(() => {
    if (!stageRef.current || !setPreview) return;

    const timeout = setTimeout(() => {
      const uri = stageRef.current.toDataURL({
        pixelRatio: 2,
      });
      setPreview(uri);
    }, 300);

    return () => clearTimeout(timeout);
  }, [elements, backgroundColor, scale, showGrid, setPreview]);

  return (
    <Stage
      ref={stageRef}
      width={BASE_SIZE * scale}
      height={BASE_SIZE * scale}
      scaleX={scale}
      scaleY={scale}
    >
      <Layer>
        {/* CENTER GROUP — NEVER SCALED */}
        <Group x={BASE_SIZE / 2} y={BASE_SIZE / 2}>
          {/* CLIP — NEVER SCALED */}
          <Group
            clipFunc={(ctx) => {
              ctx.beginPath();
              ctx.arc(0, 0, RADIUS, 0, Math.PI * 2);
              ctx.closePath();
            }}
          >
            <Circle radius={RADIUS} fill={backgroundColor} />
            {showGrid && <Grid />}

            {elements.map((el) =>
              el.type === "image" ? (
                <CanvasImage key={el.id} el={el} />
              ) : (
                <CanvasText key={el.id} el={el} />
              )
            )}
          </Group>

          {selectedId && <Transformer ref={trRef} />}
        </Group>
      </Layer>
    </Stage>
  );
}
