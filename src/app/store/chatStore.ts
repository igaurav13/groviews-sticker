"use client";

import { create } from "zustand";
import { Message, User } from "@/app/types/chat";

type ChatState = {
  isOpen: boolean;
  user: User | null;
  messages: Message[];
  unreadCount: number;
  isTyping: boolean;

  openChat: () => void;
  closeChat: () => void;
  setUser: (user: User) => void;
  addMessage: (msg: Message) => void;
  markRead: () => void;
  setTyping: (typing: boolean) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  user: null,
  messages: [],
  unreadCount: 0,
  isTyping: false,

  openChat: () => set({ isOpen: true, unreadCount: 0 }),
  closeChat: () => set({ isOpen: false }),

  setUser: (user) => set({ user }),

  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
      unreadCount:
        !state.isOpen && msg.sender === "admin"
          ? state.unreadCount + 1
          : state.unreadCount,
    })),

  markRead: () => set({ unreadCount: 0 }),

  setTyping: (typing) => set({ isTyping: typing }),
}));
