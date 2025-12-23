"use client";

import { useEffect } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "@/app/lib/firebase";
import { useChatStore } from "@/app/store/chatStore";

export default function MessageList() {
  const {
    sessionId,
    messages,
    addMessage,
    updateMessageStatus,
  } = useChatStore();

  useEffect(() => {
    if (!sessionId) return;

    const q = query(
      collection(db, "chats", sessionId, "messages"),
      orderBy("createdAt")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const data = change.doc.data();

          addMessage({
            id: change.doc.id,
            text: data.text,
            sender: data.sender,
            status: data.status,
            createdAt: data.createdAt,
          });

          // Mark admin messages as read
          if (data.sender === "admin" && data.status !== "read") {
            updateDoc(
              doc(db, "chats", sessionId, "messages", change.doc.id),
              { status: "read" }
            );

            updateMessageStatus(change.doc.id, "read");
          }
        }
      });
    });

    return () => unsub();
  }, [sessionId, addMessage, updateMessageStatus]);

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-2">
      {messages.map((m) => (
        <div
          key={m.id}
          className={`max-w-[75%] p-2 rounded text-sm ${
            m.sender === "user"
              ? "ml-auto bg-blue-600 text-white"
              : "mr-auto bg-gray-200"
          }`}
        >
          {m.text}
          <div className="text-[10px] opacity-70 mt-1">
            {new Date(m.createdAt).toLocaleTimeString()}
            {m.sender === "user" && ` • ${m.status}`}
          </div>
        </div>
      ))}
    </div>
  );
}
