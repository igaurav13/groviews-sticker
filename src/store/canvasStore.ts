import { create } from "zustand";

export type CanvasElement = {
  id: string;
  type: "image" | "text";
  x: number;
  y: number;
  rotation: number;
  scale: number;

  // image
  src?: string;

  // text
  text?: string;
  color?: string;
  fontSize?: number;
};

type CanvasState = {
  elements: CanvasElement[];
  selectedId: string | null;

  addElement: (el: CanvasElement) => void;
  updateElement: (id: string, attrs: Partial<CanvasElement>) => void;
  setSelectedId: (id: string | null) => void;
};

export const useCanvasStore = create<CanvasState>((set) => ({
  elements: [],
  selectedId: null,

  addElement: (el) =>
    set((state) => ({
      elements: [...state.elements, el],
    })),

  updateElement: (id, attrs) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...attrs } : el
      ),
    })),

  setSelectedId: (id) => set({ selectedId: id }),
}));
