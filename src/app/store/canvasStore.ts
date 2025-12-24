import { create } from "zustand";


export type CropRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type CanvasElement = {
  id: string;
  type: "image" | "text";
  x: number;
  y: number;
  rotation: number;
  scale: number;

  /* Image only */
  src?: string;
  crop?: CropRect;

  /* Text only */
  text?: string;
  color?: string;
  fontSize?: number;
};

export type CanvasSnapshot = {
  elements: CanvasElement[];
  selectedId: string | null;
  scale: number;
  backgroundColor: string;

  /* Export / Summary */
  preview?: string; 
};

type CanvasState = {
  /* History */
  past: CanvasSnapshot[];
  present: CanvasSnapshot;
  future: CanvasSnapshot[];

  /* UI flags */
  showGrid: boolean;
  isCropping: boolean;

  /* Element actions */
  addElement: (el: CanvasElement) => void;
  updateElement: (id: string, attrs: Partial<CanvasElement>) => void;
  setSelectedId: (id: string | null) => void;

  /* Layer actions */
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;

  /* Canvas actions */
  setBackgroundColor: (color: string) => void;

  /* Undo / Redo */
  undo: () => void;
  redo: () => void;

  /* Zoom */
  setScale: (scale: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;

  /* Grid */
  toggleGrid: () => void;

  /* Crop */
  startCrop: () => void;
  endCrop: () => void;

  /* Templates */
  loadTemplate: (t: CanvasSnapshot) => void;

  /* Export */
  setPreview: (dataUrl: string) => void;
};

/* =======================
   STORE
======================= */

export const useCanvasStore = create<CanvasState>((set, get) => ({
  past: [],
  present: {
    elements: [],
    selectedId: null,
    scale: 1,
    backgroundColor: "#ffffff",
  },
  future: [],

  showGrid: true,
  isCropping: false,

  /* ---------- ELEMENTS ---------- */

  addElement: (el) => {
    const { past, present } = get();
    const next = {
      ...present,
      elements: [...present.elements, el],
      selectedId: el.id,
    };
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
    set({ past: [...past, present], present: next, future: [] });
  },

  setSelectedId: (id) =>
    set({
      present: {
        ...get().present,
        selectedId: id,
      },
    }),

  /* ---------- LAYERS ---------- */

  bringForward: (id) => {
    const els = [...get().present.elements];
    const i = els.findIndex((e) => e.id === id);
    if (i < 0 || i === els.length - 1) return;

    [els[i], els[i + 1]] = [els[i + 1], els[i]];

    set({
      past: [...get().past, get().present],
      present: { ...get().present, elements: els },
      future: [],
    });
  },

  sendBackward: (id) => {
    const els = [...get().present.elements];
    const i = els.findIndex((e) => e.id === id);
    if (i <= 0) return;

    [els[i], els[i - 1]] = [els[i - 1], els[i]];

    set({
      past: [...get().past, get().present],
      present: { ...get().present, elements: els },
      future: [],
    });
  },

  /* ---------- BACKGROUND ---------- */

  setBackgroundColor: (color) =>
    set({
      past: [...get().past, get().present],
      present: { ...get().present, backgroundColor: color },
      future: [],
    }),

  /* ---------- UNDO / REDO ---------- */

  undo: () => {
    const { past, present, future } = get();
    if (!past.length) return;
    const prev = past[past.length - 1];
    set({
      past: past.slice(0, -1),
      present: prev,
      future: [present, ...future],
    });
  },

  redo: () => {
    const { past, present, future } = get();
    if (!future.length) return;
    set({
      past: [...past, present],
      present: future[0],
      future: future.slice(1),
    });
  },

  /* ---------- ZOOM ---------- */

  setScale: (scale) =>
    set({
      past: [...get().past, get().present],
      present: {
        ...get().present,
        scale: Math.min(3, Math.max(0.5, scale)),
      },
      future: [],
    }),

  zoomIn: () => get().setScale(get().present.scale + 0.1),
  zoomOut: () => get().setScale(get().present.scale - 0.1),

  /* ---------- GRID ---------- */

  toggleGrid: () => set((s) => ({ showGrid: !s.showGrid })),

  /* ---------- CROP ---------- */

  startCrop: () => set({ isCropping: true }),
  endCrop: () => set({ isCropping: false }),

  /* ---------- TEMPLATE ---------- */

  loadTemplate: (t) =>
    set({
      past: [],
      present: t,
      future: [],
    }),

  /* ---------- EXPORT ---------- */

  setPreview: (dataUrl) =>
    set({
      present: {
        ...get().present,
        preview: dataUrl,
      },
    }),
}));
