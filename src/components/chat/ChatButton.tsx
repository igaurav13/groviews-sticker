"use client";
import { useChatStore } from "@/app/store/chatStore";

export default function ChatButton() {
  const { openChat, unreadCount } = useChatStore();

  return (
    <button
      onClick={openChat}
      aria-label="Open support chat"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 text-white shadow-xl"
    >
      💬
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-2 rounded-full">
          {unreadCount}
        </span>
      )}
    </button>
  );
}
