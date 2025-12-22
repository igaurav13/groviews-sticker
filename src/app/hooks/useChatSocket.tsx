"use client";

import { io, Socket } from "socket.io-client";
import { useEffect, useRef } from "react";
import { useChatStore } from "@/app/store/chatStore";
import { Message, TypingPayload } from "@/app/types/chat";

const SOCKET_URL = "http://localhost:3001";

export const useChatSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const addMessage = useChatStore((s) => s.addMessage);
  const setTyping = useChatStore((s) => s.setTyping);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);

    socketRef.current.on("message", (msg: Message) => {
      addMessage({ ...msg, status: "sent" });
    });

    socketRef.current.on("typing", (data: TypingPayload) => {
      setTyping(data.typing);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [addMessage, setTyping]);

  const sendMessage = (msg: Message) => {
    socketRef.current?.emit("message", msg);
  };

  const sendTyping = (typing: boolean) => {
    socketRef.current?.emit("typing", { typing });
  };

  return { sendMessage, sendTyping };
};
