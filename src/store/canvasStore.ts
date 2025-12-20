import { create } from "zustand";

/* =======================
   TYPES
======================= */

export type CanvasElement = {
  id: string;
  type: "image" | "text";
  x: number;
  y: number;
  rotation: number;
  scale: number;
  src?: string;
  text?: string;
  color?: string;
  fontSize?: number;
};

type CanvasSnapshot = {
  elements: CanvasElement[];
  selectedId: string | null;
  scale: number; // ✅ canvas zoom
};

type CanvasState = {
  past: CanvasSnapshot[];
  present: CanvasSnapshot;
  future: CanvasSnapshot[];

  addElement: (el: CanvasElement) => void;
  updateElement: (id: string, attrs: Partial<CanvasElement>) => void;
  setSelectedId: (id: string | null) => void;

  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;

  undo: () => void;
  redo: () => void;
  loadDraft: () => void;

  setScale: (scale: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
};

/* =======================
   LOCAL STORAGE
======================= */

const STORAGE_KEY = "sticker-draft-v1";

const save = (present: CanvasSnapshot) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(present));
};

/* =======================
   STORE
======================= */

export const useCanvasStore = create<CanvasState>((set, get) => ({
  past: [],
  present: {
    elements: [],
    selectedId: null,
    scale: 1, // ✅ IMPORTANT DEFAULT
  },
  future: [],

  /* ---------- ADD ---------- */
  addElement: (el) => {
    const { past, present } = get();

    const next: CanvasSnapshot = {
      ...present,
      elements: [...present.elements, el],
      selectedId: el.id,
    };

    save(next);

    set({
      past: [...past, present],
      present: next,
      future: [],
    });
  },

  /* ---------- UPDATE ---------- */
  updateElement: (id, attrs) => {
    const { past, present } = get();

    const next: CanvasSnapshot = {
      ...present,
      elements: present.elements.map((el) =>
        el.id === id ? { ...el, ...attrs } : el
      ),
    };

    save(next);

    set({
      past: [...past, present],
      present: next,
      future: [],
    });
  },

  /* ---------- SELECTION ---------- */
  setSelectedId: (id) => {
    const { present } = get();
    const next = { ...present, selectedId: id };
    save(next);
    set({ present: next });
  },

  /* ---------- LAYERS ---------- */
  bringForward: (id) => {
    const { past, present } = get();
    const idx = present.elements.findIndex((e) => e.id === id);
    if (idx < 0 || idx === present.elements.length - 1) return;

    const els = [...present.elements];
    [els[idx], els[idx + 1]] = [els[idx + 1], els[idx]];

    const next = { ...present, elements: els };
    save(next);

    set({ past: [...past, present], present: next, future: [] });
  },

  sendBackward: (id) => {
    const { past, present } = get();
    const idx = present.elements.findIndex((e) => e.id === id);
    if (idx <= 0) return;

    const els = [...present.elements];
    [els[idx], els[idx - 1]] = [els[idx - 1], els[idx]];

    const next = { ...present, elements: els };
    save(next);

    set({ past: [...past, present], present: next, future: [] });
  },

  /* ---------- HISTORY ---------- */
  undo: () => {
    const { past, present, future } = get();
    if (!past.length) return;

    const prev = past[past.length - 1];
    save(prev);

    set({
      past: past.slice(0, -1),
      present: prev,
      future: [present, ...future],
    });
  },

  redo: () => {
    const { past, present, future } = get();
    if (!future.length) return;

    const next = future[0];
    save(next);

    set({
      past: [...past, present],
      present: next,
      future: future.slice(1),
    });
  },

  /* ---------- LOAD ---------- */
  loadDraft: () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const data = JSON.parse(raw) as CanvasSnapshot;
      set({ past: [], present: data, future: [] });
    } catch {
      console.error("Invalid draft data");
    }
  },

  /* ---------- ZOOM ---------- */
  setScale: (scale) => {
    const { past, present } = get();
    const clamped = Math.min(2.5, Math.max(0.5, scale));

    const next = { ...present, scale: clamped };
    save(next);

    set({
      past: [...past, present],
      present: next,
      future: [],
    });
  },

  zoomIn: () => {
    const { present, setScale } = get();
    setScale(present.scale + 0.1);
  },

  zoomOut: () => {
    const { present, setScale } = get();
    setScale(present.scale - 0.1);
  },
}));
