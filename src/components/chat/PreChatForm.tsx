"use client";

import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useChatStore } from "@/app/store/chatStore";

export default function PreChatForm() {
  const setUser = useChatStore((s) => s.setUser);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [queryType, setQueryType] = useState("");

  const submit = () => {
    if (!name || !email) return;

    const user = {
      id: uuid(),
      name,
      email,
      queryType,
    };

    setUser(user);

    // Persist session
    localStorage.setItem("chat_session_id", user.id);
  };

  return (
    <div className="p-4 space-y-3">
      <input
        className="w-full border p-2 rounded"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        className="w-full border p-2 rounded"
        value={queryType}
        onChange={(e) => setQueryType(e.target.value)}
      >
        <option value="">Select query type</option>
        <option value="support">Support</option>
        <option value="sales">Sales</option>
        <option value="feedback">Feedback</option>
      </select>

      <button
        onClick={submit}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Start Chat
      </button>
    </div>
  );
}
