import { create } from "zustand";
import type { User, Message } from "@/types/chat";

type ChatState = {
  // UI
  isOpen: boolean;

  // Session
  sessionId: string | null;
  user: User | null;

  // Chat
  messages: Message[];
  unreadCount: number;
  isTyping: boolean;

  // Actions
  openChat: () => void;
  closeChat: () => void;

  setUser: (user: User) => void;
  addMessage: (message: Message) => void;
  updateMessageStatus: (id: string, status: Message["status"]) => void;

  setTyping: (typing: boolean) => void;
  clearMessages: () => void;
};

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  sessionId: null,
  user: null,

  messages: [],
  unreadCount: 0,
  isTyping: false,

  openChat: () => set({ isOpen: true, unreadCount: 0 }),
  closeChat: () => set({ isOpen: false }),

  setUser: (user) =>
    set({
      user,
      sessionId: user.id, // sessionId = user.id
    }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
      unreadCount: state.isOpen ? 0 : state.unreadCount + 1,
    })),
  updateMessage: (tempId: string, data: Partial<ChatMessage>) => {
  set((state) => ({
    messages: state.messages.map((m) =>
      m.id === tempId ? { ...m, ...data } : m
    ),
  }));
},

  updateMessageStatus: (id, status) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, status } : m
      ),
    })),

  setTyping: (typing) => set({ isTyping: typing }),

  clearMessages: () => set({ messages: [], unreadCount: 0 }),
}));
