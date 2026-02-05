"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Debt } from "@/lib/types";
import { id } from "@/lib/utils";

export function DebtForm({ onAdd }: { onAdd: (d: Debt) => void }) {
  const [name, setName] = useState("");
  const [principal, setPrincipal] = useState("");
  const [apr, setApr] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
      <p className="text-sm font-extrabold">Add Debt</p>

      <div className="mt-3 grid grid-cols-1 gap-3">
        <div>
          <label className="text-xs font-semibold text-gray-700">Debt name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Credit Card, Student Loan…" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700">Principal</label>
          <Input inputMode="decimal" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="0.00" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700">APR (%)</label>
          <Input inputMode="decimal" value={apr} onChange={(e) => setApr(e.target.value)} placeholder="24.9" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700">Monthly payment</label>
          <Input inputMode="decimal" value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} placeholder="0.00" />
        </div>

        <Button
          onClick={() => {
            const p = Number(principal);
            const a = Number(apr);
            const m = Number(monthlyPayment);

            if (!name.trim()) return;
            if (!Number.isFinite(p) || p <= 0) return;
            if (!Number.isFinite(a) || a < 0) return;
            if (!Number.isFinite(m) || m <= 0) return;

            const d: Debt = {
              id: id("debt"),
              name: name.trim(),
              principal: p,
              initialPrincipal: p,
              apr: a,
              monthlyPayment: m,
              createdAt: Date.now()
            };
            onAdd(d);
            setName("");
            setPrincipal("");
            setApr("");
            setMonthlyPayment("");
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
