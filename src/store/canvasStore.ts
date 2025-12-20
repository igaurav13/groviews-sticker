import { create } from "zustand";

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

  undo: () => void;
  redo: () => void;
};

export const useCanvasStore = create<CanvasState>((set, get) => ({
  past: [],
  present: {
    elements: [],
    selectedId: null,
  },
  future: [],

  addElement: (el) => {
    const { past, present } = get();
    set({
      past: [...past, present],
      present: {
        elements: [...present.elements, el],
        selectedId: el.id,
      },
      future: [],
    });
  },

  updateElement: (id, attrs) => {
    const { past, present } = get();
    set({
      past: [...past, present],
      present: {
        ...present,
        elements: present.elements.map((el) =>
          el.id === id ? { ...el, ...attrs } : el
        ),
      },
      future: [],
    });
  },

  setSelectedId: (id) => {
    const { present } = get();
    set({
      present: { ...present, selectedId: id },
    });
  },

  undo: () => {
    const { past, present, future } = get();
    if (past.length === 0) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

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

    set({
      past: [...past, present],
      present: next,
      future: newFuture,
    });
  },
}));
