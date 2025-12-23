"use client";

import { useChatStore } from "@/app/store/chatStore";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import PreChatForm from "./PreChatForm";

export default function ChatWindow() {
  const { isOpen, user } = useChatStore();
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed bottom-24 right-6 z-50
        w-90 max-w-[95vw]
        h-130
        bg-(--card-bg)
        border border-(--border)
        rounded-xl
        shadow-2xl
        flex flex-col
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="shrink-0">
        <ChatHeader />
      </div>

      {/* Body */}
      {!user ? (
        <PreChatForm />
      ) : (
        <>
          <MessageList />
          <MessageInput />
        </>
      )}
    </div>
  );
}
