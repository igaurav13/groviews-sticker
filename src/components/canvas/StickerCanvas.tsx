"use client";

import { Stage, Layer, Group, Circle, Image as KonvaImage } from "react-konva";
import { useCanvasStore } from "@/store/canvasStore";
import useImage from "use-image";

const CANVAS_SIZE = 400;
const RADIUS = 180;

function CanvasImage({ element }: any) {
  const [image] = useImage(element.src);

  return (
    <KonvaImage
      image={image}
      x={element.x}
      y={element.y}
      draggable
    />
  );
}

export default function StickerCanvas() {
  const elements = useCanvasStore((state) => state.elements);

  return (
    <Stage width={CANVAS_SIZE} height={CANVAS_SIZE}>
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
            ) : null
          )}
        </Group>
      </Layer>
    </Stage>
  );
}
