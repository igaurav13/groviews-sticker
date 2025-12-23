"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useChatSocket } from "@/app/hooks/useChatSocket";
import { useChatStore } from "@/app/store/chatStore";

export default function MessageInput() {
  const [text, setText] = useState("");
  const addMessage = useChatStore((s) => s.addMessage);
  const { sendMessage, sendTyping } = useChatSocket();

  const send = () => {
    if (!text) return;

    const msg = {
      id: uuid(),
      text,
      sender: "user" as const,
      status: "sending" as const,
      createdAt: Date.now(),
    };

    addMessage(msg);
    sendMessage(msg);
    setText("");
    sendTyping(false);
  };

  return (
    <div className="p-2 border-t flex gap-2">
      <input
        className="flex-1 border rounded px-2"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          sendTyping(true);
        }}
        onKeyDown={(e) => e.key === "Enter" && send()}
      />
      <button onClick={send} className="bg-blue-600 text-white px-4 rounded">
        Send
      </button>
    </div>
  );
}
