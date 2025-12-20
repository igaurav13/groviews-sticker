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


export type CanvasSnapshot = {
  elements: CanvasElement[];
  selectedId: string | null;
  scale: number;
  backgroundColor: string;
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

  setBackgroundColor: (color: string) => void;

  undo: () => void;
  redo: () => void;
  loadDraft: () => void;

  setScale: (scale: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;

  loadTemplate: (template: CanvasSnapshot) => void;
};

const STORAGE_KEY = "sticker-draft-v1";

const save = (present: CanvasSnapshot) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(present));
};

export const useCanvasStore = create<CanvasState>((set, get) => ({
  past: [],
  present: {
    elements: [],
    selectedId: null,
    scale: 1,
    backgroundColor: "#ffffff",
  },
  future: [],

  /* ---------- ELEMENTS ---------- */
  addElement: (el) => {
    const { past, present } = get();
    const next = {
      ...present,
      elements: [...present.elements, el],
      selectedId: el.id,
    };
    save(next);
    set({ past: [...past, present], present: next, future: [] });
  },

  updateElement: (id, attrs) => {
    const { past, present } = get();
    const next = {
      ...present,
      elements: present.elements.map((el) =>
        el.id === id ? { ...el, ...attrs } : el
      ),
    };
    save(next);
    set({ past: [...past, present], present: next, future: [] });
  },

  setSelectedId: (id) => {
    const next = { ...get().present, selectedId: id };
    save(next);
    set({ present: next });
  },

  /* ---------- LAYERS ---------- */
  bringForward: (id) => {
    const { past, present } = get();
    const idx = present.elements.findIndex((e) => e.id === id);
    if (idx === -1 || idx === present.elements.length - 1) return;

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

  /* ---------- BACKGROUND ---------- */
  setBackgroundColor: (color) => {
    const { past, present } = get();
    const next = { ...present, backgroundColor: color };
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

  /* ---------- DRAFT ---------- */
  loadDraft: () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    set({ past: [], present: JSON.parse(raw), future: [] });
  },

  /* ---------- ZOOM ---------- */
  setScale: (scale) => {
    const { past, present } = get();
    const clamped = Math.min(2.5, Math.max(0.5, scale));
    const next = { ...present, scale: clamped };
    save(next);
    set({ past: [...past, present], present: next, future: [] });
  },

  zoomIn: () => get().setScale(get().present.scale + 0.1),
  zoomOut: () => get().setScale(get().present.scale - 0.1),

  /* ---------- TEMPLATES ---------- */
  loadTemplate: (template) => {
    const { past, present } = get();
    save(template);
    set({
      past: [...past, present],
      present: template,
      future: [],
    });
  },
}));
