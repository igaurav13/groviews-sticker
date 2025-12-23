// src/types/chat.ts

/* -----------------------------
   USER
------------------------------*/
export type User = {
  id: string;
  name: string;
  email?: string;
};

/* -----------------------------
   MESSAGE
------------------------------*/
export type Message = {
  id: string;
  text: string;
  sender: "user" | "admin";
  status: "sending" | "sent" | "read";
  createdAt: number;
};

/**
 * Alias for compatibility
 * Some parts of the app use ChatMessage
 */
export type ChatMessage = Message;

/* -----------------------------
   TYPING
------------------------------*/
export type TypingPayload = {
  userId: string;
  typing: boolean;
};
