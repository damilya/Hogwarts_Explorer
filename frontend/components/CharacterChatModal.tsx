"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  character: any;
  onClose: () => void;
};

export default function CharacterChatModal({ character, onClose }: Props) {
  const [messages, setMessages] = useState<Array<{ from: "user" | "bot"; text: string; id: number }>>([
    { from: "bot", text: `Hello, I'm ${character.name}. How can I help you today?`, id: Date.now() },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const [loading, setLoading] = useState(false);

  async function sendMessage(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { from: "user" as const, text, id: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    // add typing placeholder
    const typingId = Date.now() + 1;
    setMessages((m) => [...m, { from: "bot", text: "…", id: typingId }]);
    setLoading(true);

    try {
      const apiBase = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(/\/$/, "");
      const res = await fetch(`${apiBase}/api/characters/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ character, message: text }),
      });
      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      const reply = data.reply ?? "(no reply)";
      setMessages((m) => m.map((msg) => (msg.id === typingId ? { ...msg, text: reply } : msg)));
    } catch (err) {
      console.error("Chat error", err);
      setMessages((m) => m.map((msg) => (msg.id === typingId ? { ...msg, text: "Error: failed to get reply" } : msg)));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />

      <div className="relative bg-white text-black dark:bg-gray-900 dark:text-white rounded-lg w-full max-w-xl mx-4 shadow-lg">
        <div className="flex items-center justify-between p-4 border-b border-black/5">
          <div>
            <div className="font-semibold">Chat with {character.name}</div>
            <div className="text-sm text-gray-500">Speaking as the character — demo responses</div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        <div ref={listRef} className="p-4 max-h-[60vh] overflow-auto space-y-3">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`rounded-md px-3 py-2 max-w-[80%] ${m.from === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-black"}`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="p-4 border-t border-black/5 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded px-3 py-2 border border-black/10 bg-transparent"
            placeholder={`Ask ${character.name} something...`}
            aria-label={`Message ${character.name}`}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
            aria-label="Send message"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
