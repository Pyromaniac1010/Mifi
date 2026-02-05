"use client";

import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { StarterPrompts } from "@/components/mi/StarterPrompts";
import { id } from "@/lib/utils";
import type { ChatMessage, MiPersonality } from "@/lib/types";
import { miRespond } from "@/lib/mi";
import type { MiContext } from "@/lib/mi";

export function ChatUI({
  personality,
  context,
  messages,
  setMessages
}: {
  personality: MiPersonality;
  context: MiContext;
  messages: ChatMessage[];
  setMessages: (next: ChatMessage[]) => void;
}) {
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);

  const sorted = useMemo(() => [...messages].sort((a, b) => a.createdAt - b.createdAt), [messages]);

  function send(content: string) {
    const c = content.trim();
    if (!c) return;

    const userMsg: ChatMessage = { id: id("msg"), role: "user", text: c, createdAt: Date.now() };
    const miText = miRespond(personality, c, context);
    const miMsg: ChatMessage = { id: id("msg"), role: "mi", text: miText, createdAt: Date.now() + 1 };

    const next = [...messages, userMsg, miMsg];
    setMessages(next);
    setText("");

    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  return (
    <div className="flex flex-col gap-3">
      {messages.length === 0 ? (
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
          <p className="text-sm font-extrabold">Hi, I’m Mi.</p>
          <p className="mt-1 text-sm text-gray-600">
            Ask me about your spending, debt, or how to raise passive income.
          </p>
          <div className="mt-3">
            <StarterPrompts onPick={(p) => send(p)} />
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 space-y-3">
          {sorted.map(m => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm font-semibold ${
                m.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-900"
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      )}

      <div className="flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message Mi…"
          onKeyDown={(e) => {
            if (e.key === "Enter") send(text);
          }}
        />
        <Button onClick={() => send(text)}>Send</Button>
      </div>
    </div>
  );
}
