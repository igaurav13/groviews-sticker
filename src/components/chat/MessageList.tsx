"use client";

import { useEffect, useRef } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "@/app/lib/firebase";
import { useChatStore } from "@/app/store/chatStore";

export default function MessageList() {
  const {
    sessionId,
    messages,
    addMessage,
    updateMessage,
  } = useChatStore();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sessionId) return;

    const q = query(
      collection(db, "chats", sessionId, "messages"),
      orderBy("createdAt")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();

        // 1️⃣ Try to match optimistic message
        if (data.clientId) {
          const optimistic = messages.find(
            (m) => m.clientId === data.clientId
          );

          if (optimistic) {
            updateMessage(data.clientId, {
              id: doc.id,
              status: data.status,
            });
            return;
          }
        }

        // 2️⃣ Add only NON-user or admin messages
        const exists = messages.some((m) => m.id === doc.id);
        if (!exists && data.sender !== "user") {
          addMessage({
            id: doc.id,
            text: data.text,
            sender: data.sender,
            status: data.status,
            createdAt: data.createdAt,
          });
        }
      });
    });

    return () => unsub();
  }, [sessionId, messages, addMessage, updateMessage]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-3 py-4 space-y-2"
    >
      {messages.map((m) => (
        <div
          key={m.id}
          className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
            m.sender === "user"
              ? "ml-auto bg-(--primary) text-white"
              : "mr-auto bg-(--hover) text-foreground border border-(--border)"
          }`}
        >
          {m.text}
          <div className="mt-1 text-[10px] opacity-70">
            {new Date(m.createdAt).toLocaleTimeString()} •{" "}
            {m.status}
          </div>
        </div>
      ))}
    </div>
  );
}
