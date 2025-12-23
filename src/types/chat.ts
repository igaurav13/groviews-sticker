// src/types/chat.ts

export type Message = {
  id: string;
  text: string;
  sender: "user" | "admin";
  status: "sending" | "sent" | "read";
  createdAt: number;
};

export type TypingPayload = {
  userId: string;
  typing: boolean;
};
