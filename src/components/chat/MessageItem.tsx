"use client";

import { Message } from "@/app/types/chat";

export default function MessageItem({ msg }: { msg: Message }) {
  return (
    <div className={`p-2 rounded max-w-[80%] text-sm ${
      msg.sender === "user" ? "ml-auto bg-blue-500 text-white" : "bg-gray-200"
    }`}>
      {msg.text}
      <div className="text-[10px] opacity-70">
        {new Date(msg.createdAt).toLocaleTimeString()}
      </div>
    </div>
  );
}
