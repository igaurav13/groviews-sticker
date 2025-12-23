"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useChatStore } from "@/app/store/chatStore";

export default function MessageInput() {
  const [text, setText] = useState("");
  const { sessionId, user, addMessage, updateMessage } =
    useChatStore();

  const sendMessage = async () => {
    if (!text.trim() || !sessionId || !user) return;

    const clientId = crypto.randomUUID();
    const messageText = text;

    // 1️⃣ Optimistic UI
    addMessage({
      id: clientId,
      clientId,
      text: messageText,
      sender: "user",
      status: "sending",
      createdAt: Date.now(),
    });

    setText("");

    // 2️⃣ Firestore write
    const docRef = await addDoc(
      collection(db, "chats", sessionId, "messages"),
      {
        clientId,
        text: messageText,
        sender: "user",
        status: "sent",
        createdAt: Date.now(),
      }
    );

    // 3️⃣ Replace optimistic message
    updateMessage(clientId, {
      id: docRef.id,
      status: "sent",
    });
  };

  return (
    <div className="shrink-0 border-t border-(--border) bg-background p-3 flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type your message…"
        className="flex-1 px-3 py-2 rounded-md bg-(--card-bg) border border-(--border) text-sm text-foreground outline-none focus:border-(--primary)"
      />

      <button
        onClick={sendMessage}
        className="px-4 rounded-md bg-(--primary) text-white text-sm font-medium hover:bg-(--primary-light) transition"
      >
        Send
      </button>
    </div>
  );
}
