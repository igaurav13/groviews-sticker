import { create } from "zustand";
import type { User, Message, ChatMessage } from "@/types/chat";

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

  // UI Actions
  openChat: () => void;
  closeChat: () => void;

  // Session
  setUser: (user: User) => void;

  // Messages
  addMessage: (message: Message) => void;
  updateMessage: (tempId: string, data: Partial<ChatMessage>) => void;
  updateMessageStatus: (
    id: string,
    status: Message["status"]
  ) => void;

  // Typing
  setTyping: (typing: boolean) => void;

  // Cleanup
  clearMessages: () => void;
};

export const useChatStore = create<ChatState>((set) => ({
  // ----------------
  // INITIAL STATE
  // ----------------
  isOpen: false,
  sessionId: null,
  user: null,

  messages: [],
  unreadCount: 0,
  isTyping: false,

  // ----------------
  // UI
  // ----------------
  openChat: () =>
    set({
      isOpen: true,
      unreadCount: 0,
    }),

  closeChat: () =>
    set({
      isOpen: false,
    }),

  // ----------------
  // SESSION
  // ----------------
  setUser: (user) =>
    set({
      user,
      sessionId: user.id, // session tied to user
    }),

  // ----------------
  // MESSAGES
  // ----------------
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
      unreadCount: state.isOpen ? 0 : state.unreadCount + 1,
    })),

  updateMessage: (tempId, data) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === tempId ? { ...m, ...data } : m
      ),
    })),

  updateMessageStatus: (id, status) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === id ? { ...m, status } : m
      ),
    })),

  // ----------------
  // TYPING
  // ----------------
  setTyping: (typing) =>
    set({
      isTyping: typing,
    }),

  // ----------------
  // RESET
  // ----------------
  clearMessages: () =>
    set({
      messages: [],
      unreadCount: 0,
    }),
}));
