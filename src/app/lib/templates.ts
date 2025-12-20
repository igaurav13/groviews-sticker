import { CanvasSnapshot } from "@/store/canvasStore";
import { nanoid } from "nanoid";

export const templates: CanvasSnapshot[] = [
  {
    elements: [
      {
        id: nanoid(),
        type: "text",
        x: 120,
        y: 180,
        rotation: 0,
        scale: 1,
        text: "SALE",
        color: "#ff0000",
        fontSize: 40,
      },
    ],
    selectedId: null,
    scale: 1,
    backgroundColor: "#ffffff",
  },

  {
    elements: [
      {
        id: nanoid(),
        type: "text",
        x: 80,
        y: 190,
        rotation: 0,
        scale: 1,
        text: "NEW ARRIVAL",
        color: "#111827",
        fontSize: 28,
      },
    ],
    selectedId: null,
    scale: 1,
    backgroundColor: "#fde68a",
  },

  {
    elements: [
      {
        id: nanoid(),
        type: "text",
        x: 90,
        y: 190,
        rotation: 0,
        scale: 1,
        text: "HANDMADE",
        color: "#065f46",
        fontSize: 32,
      },
    ],
    selectedId: null,
    scale: 1,
    backgroundColor: "#d1fae5",
  },

  /* ---------- NEW TEMPLATE 4 ---------- */
  {
    elements: [
      {
        id: nanoid(),
        type: "text",
        x: 95,
        y: 185,
        rotation: 0,
        scale: 1,
        text: "50% OFF",
        color: "#ffffff",
        fontSize: 36,
      },
    ],
    selectedId: null,
    scale: 1,
    backgroundColor: "#dc2626", // red-600
  },

  /* ---------- NEW TEMPLATE 5 ---------- */
  {
    elements: [
      {
        id: nanoid(),
        type: "text",
        x: 70,
        y: 185,
        rotation: 0,
        scale: 1,
        text: "ORGANIC • ECO",
        color: "#064e3b",
        fontSize: 26,
      },
    ],
    selectedId: null,
    scale: 1,
    backgroundColor: "#ecfdf5", // green-50
  },
];
