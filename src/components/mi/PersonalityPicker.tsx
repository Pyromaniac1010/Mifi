"use client";

import type { MiPersonality } from "@/lib/types";
import { Button } from "@/components/ui/Button";

const options: { key: MiPersonality; label: string; desc: string }[] = [
  { key: "genz", label: "😎 Gen Z Friend", desc: "Casual, emoji-heavy" },
  { key: "uncle", label: "🤙 Cool Uncle", desc: "Warm, supportive" },
  { key: "coach", label: "💪 Harsh Coach", desc: "Direct, tough-love" },
  { key: "pro", label: "💼 Professional", desc: "Formal, data-driven" }
];

export function PersonalityPicker({
  value,
  onChange
}: {
  value: MiPersonality;
  onChange: (p: MiPersonality) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {options.map(o => (
        <button
          key={o.key}
          onClick={() => onChange(o.key)}
          className={`rounded-2xl border p-4 text-left transition ${
            value === o.key ? "border-indigo-600 bg-indigo-50" : "border-gray-200 bg-white hover:bg-gray-50"
          }`}
        >
          <p className="text-sm font-extrabold">{o.label}</p>
          <p className="mt-1 text-xs text-gray-600 font-semibold">{o.desc}</p>
        </button>
      ))}
      <div className="sm:col-span-2">
        <Button variant="ghost" className="w-full border border-gray-200" onClick={() => onChange(value)}>
          Keep current
        </Button>
      </div>
    </div>
  );
}
