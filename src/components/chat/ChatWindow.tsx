"use client";
import { useChatStore } from "@/app/store/chatStore";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatWindow() {
  const { isOpen, closeChat } = useChatStore();
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-96 max-w-[95vw] h-130
      bg-white rounded-xl shadow-2xl flex flex-col animate-slideUp">
      <ChatHeader onClose={closeChat} />
      <MessageList />
      <MessageInput />
    </div>
  );
}
