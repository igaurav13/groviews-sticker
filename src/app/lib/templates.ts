import { CanvasSnapshot } from "@/store/canvasStore";
import { nanoid } from "nanoid";

export const templates: CanvasSnapshot[] = [
  /* ---------- GRADIENT SALE ---------- */
  {
    elements: [
      {
        id: nanoid(),
        type: "text",
        x: 140,
        y: 160,
        rotation: 0,
        scale: 1,
        text: "FLASH",
        color: "#fbbf24",
        fontSize: 42,
      },
      {
        id: nanoid(),
        type: "text",
        x: 135,
        y: 220,
        rotation: 0,
        scale: 1,
        text: "SALE",
        color: "#ffffff",
        fontSize: 48,
      },
      {
        id: nanoid(),
        type: "text",
        x: 140,
        y: 280,
        rotation: 0,
        scale: 1,
        text: "70% OFF",
        color: "#fde68a",
        fontSize: 24,
      },
    ],
    selectedId: null,
    scale: 1,
    backgroundColor: "#1f2937",
  },

  /* ---------- NEON VIBRANT ---------- */
  {
    elements: [
      {
        id: nanoid(),
        type: "text",
        x: 110,
        y: 160,
        rotation: 0,
        scale: 1,
        text: "TRENDING",
        color: "#00ff88",
        fontSize: 40,
      },
      {
        id: nanoid(),
        type: "text",
        x: 130,
        y: 220,
        rotation: 0,
        scale: 1,
        text: "THIS WEEK",
        color: "#ff00ff",
        fontSize: 28,
      },
      {
        id: nanoid(),
        type: "text",
        x: 130,
        y: 270,
        rotation: 0,
        scale: 1,
        text: "⭐⭐⭐⭐⭐",
        color: "#00ffff",
        fontSize: 16,
      },
    ],
    selectedId: null,
    scale: 1,
    backgroundColor: "#0a0e27",
  },

  /* ---------- PREMIUM GOLD ---------- */
  {
    elements: [
      {
        id: nanoid(),
        type: "text",
        x: 140,
        y: 160,
        rotation: 0,
        scale: 1,
        text: "LUXURY",
        color: "#fbbf24",
        fontSize: 40,
      },
      {
        id: nanoid(),
        type: "text",
        x: 120,
        y: 220,
        rotation: 0,
        scale: 1,
        text: "COLLECTION",
        color: "#ffffff",
        fontSize: 32,
      },
      {
        id: nanoid(),
        type: "text",
        x: 140,
        y: 270,
        rotation: 0,
        scale: 1,
        text: "👑 PREMIUM",
        color: "#fef08a",
        fontSize: 20,
      },
    ],
    selectedId: null,
    scale: 1,
    backgroundColor: "#1a1a1a",
  },

  /* ---------- COOL BLUE GRADIENT ---------- */
  {
    elements: [
      {
        id: nanoid(),
        type: "text",
        x: 130,
        y: 165,
        rotation: 0,
        scale: 1,
        text: "LIMITED",
        color: "#58a6ff",
        fontSize: 40,
      },
      {
        id: nanoid(),
        type: "text",
        x: 145,
        y: 225,
        rotation: 0,
        scale: 1,
        text: "EDITION",
        color: "#ffffff",
        fontSize: 36,
      },
      {
        id: nanoid(),
        type: "text",
        x: 135,
        y: 280,
        rotation: 0,
        scale: 1,
        text: "ONLY 100 LEFT",
        color: "#79c0ff",
        fontSize: 18,
      },
    ],
    selectedId: null,
    scale: 1,
    backgroundColor: "#0d1b2a",
  },

  /* ---------- VIBRANT SUNSET ---------- */
  {
    elements: [
      {
        id: nanoid(),
        type: "text",
        x: 115,
        y: 160,
        rotation: 0,
        scale: 1,
        text: "EXCLUSIVE",
        color: "#fff5e6",
        fontSize: 38,
      },
      {
        id: nanoid(),
        type: "text",
        x: 155,
        y: 220,
        rotation: 0,
        scale: 1,
        text: "DROPS",
        color: "#fca5a5",
        fontSize: 40,
      },
      {
        id: nanoid(),
        type: "text",
        x: 140,
        y: 275,
        rotation: 0,
        scale: 1,
        text: "🔥 HOT ALERT",
        color: "#ff6b6b",
        fontSize: 20,
      },
    ],
    selectedId: null,
    scale: 1,
    backgroundColor: "#2d1b69",
  },
];

export const templateNames = [
  "Flash Sale",
  "Trending Now",
  "Luxury",
  "Limited Edition",
  "Exclusive Drops",
];

export const templateEmojis = ["🎉", "✨", "👑", "❄️", "🔥"];
