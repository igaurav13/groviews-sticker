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
};

/* =======================
   LOCAL STORAGE HELPER
======================= */

const STORAGE_KEY = "sticker-draft-v1";

const saveToLocalStorage = (present: CanvasSnapshot) => {
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
  },
  future: [],

  /* ---------- ADD ELEMENT ---------- */
  addElement: (el) => {
    const { past, present } = get();

    const nextPresent: CanvasSnapshot = {
      elements: [...present.elements, el],
      selectedId: el.id,
    };

    saveToLocalStorage(nextPresent);

    set({
      past: [...past, present],
      present: nextPresent,
      future: [],
    });
  },

  /* ---------- UPDATE ELEMENT ---------- */
  updateElement: (id, attrs) => {
    const { past, present } = get();

    const nextPresent: CanvasSnapshot = {
      ...present,
      elements: present.elements.map((el) =>
        el.id === id ? { ...el, ...attrs } : el
      ),
    };

    saveToLocalStorage(nextPresent);

    set({
      past: [...past, present],
      present: nextPresent,
      future: [],
    });
  },

  /* ---------- SELECTION ---------- */
  setSelectedId: (id) => {
    const { present } = get();

    const nextPresent = { ...present, selectedId: id };
    saveToLocalStorage(nextPresent);

    set({ present: nextPresent });
  },

  /* ---------- LAYER ORDER ---------- */
  bringForward: (id) => {
    const { past, present } = get();
    const index = present.elements.findIndex((el) => el.id === id);

    if (index === -1 || index === present.elements.length - 1) return;

    const newElements = [...present.elements];
    [newElements[index], newElements[index + 1]] = [
      newElements[index + 1],
      newElements[index],
    ];

    const nextPresent = { ...present, elements: newElements };
    saveToLocalStorage(nextPresent);

    set({
      past: [...past, present],
      present: nextPresent,
      future: [],
    });
  },

  sendBackward: (id) => {
    const { past, present } = get();
    const index = present.elements.findIndex((el) => el.id === id);

    if (index <= 0) return;

    const newElements = [...present.elements];
    [newElements[index], newElements[index - 1]] = [
      newElements[index - 1],
      newElements[index],
    ];

    const nextPresent = { ...present, elements: newElements };
    saveToLocalStorage(nextPresent);

    set({
      past: [...past, present],
      present: nextPresent,
      future: [],
    });
  },

  /* ---------- UNDO / REDO ---------- */
  undo: () => {
    const { past, present, future } = get();
    if (past.length === 0) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    saveToLocalStorage(previous);

    set({
      past: newPast,
      present: previous,
      future: [present, ...future],
    });
  },

  redo: () => {
    const { past, present, future } = get();
    if (future.length === 0) return;

    const next = future[0];
    const newFuture = future.slice(1);

    saveToLocalStorage(next);

    set({
      past: [...past, present],
      present: next,
      future: newFuture,
    });
  },

  /* ---------- LOAD DRAFT ---------- */
  loadDraft: () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    try {
      const data = JSON.parse(raw) as CanvasSnapshot;

      set({
        past: [],
        present: data,
        future: [],
      });
    } catch (err) {
      console.error("Failed to load canvas draft", err);
    }
  },
}));
