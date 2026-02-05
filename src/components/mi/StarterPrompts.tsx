"use client";

import { Button } from "@/components/ui/Button";

const prompts = [
  "How am I doing?",
  "Should I focus on debt or savings?",
  "How do I increase passive income?",
  "Give me budgeting tips."
];

export function StarterPrompts({ onPick }: { onPick: (p: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {prompts.map(p => (
        <Button key={p} variant="ghost" className="border border-gray-200" onClick={() => onPick(p)}>
          {p}
        </Button>
      ))}
    </div>
  );
}
