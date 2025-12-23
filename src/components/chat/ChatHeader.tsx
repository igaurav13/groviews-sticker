"use client";

import { useChatStore } from "@/app/store/chatStore";

export default function ChatHeader() {
  const closeChat = useChatStore((s) => s.closeChat);

  return (
    <div
      className="
        flex items-center justify-between
        px-4 py-3
        border-b border-(--border)
      "
    >
      <span className="text-sm font-medium text-foreground">
        Customer Support
      </span>

      <button
        onClick={closeChat}
        aria-label="Close chat"
        className="icon-btn"
      >
        ✕
      </button>
    </div>
  );
}
