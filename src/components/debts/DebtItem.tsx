"use client";

import { useState } from "react";
import type { Debt } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Progress } from "@/components/ui/Progress";
import { debtProgressPercent } from "@/lib/finance";
import { Pencil, Trash2 } from "lucide-react";

export function DebtItem({
  debt,
  rank,
  onUpdate,
  onDelete,
  onLogPayment
}: {
  debt: Debt;
  rank: number;
  onUpdate: (d: Debt) => void;
  onDelete: (id: string) => void;
  onLogPayment: (id: string, amount: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [payment, setPayment] = useState("");

  const [name, setName] = useState(debt.name);
  const [principal, setPrincipal] = useState(String(debt.principal));
  const [apr, setApr] = useState(String(debt.apr));
  const [monthlyPayment, setMonthlyPayment] = useState(String(debt.monthlyPayment));

  const progress = debtProgressPercent(debt);

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-extrabold">
                {rank}
              </span>
              <p className="text-sm font-extrabold">{debt.name}</p>
            </div>
            <p className="mt-1 text-xs font-semibold text-gray-500">Avalanche Priority #{rank}</p>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-xl p-2 hover:bg-gray-100" onClick={() => setEditing(v => !v)} aria-label="Edit">
              <Pencil size={18} />
            </button>
            <button className="rounded-xl p-2 hover:bg-gray-100" onClick={() => onDelete(debt.id)} aria-label="Delete">
              <Trash2 size={18} className="text-red-600" />
            </button>
          </div>
        </div>

        {!editing ? (
          <>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-2xl bg-gray-50 p-3">
                <p className="text-[11px] font-semibold text-gray-600">Principal</p>
                <p className="mt-1 text-sm font-extrabold">{debt.principal.toFixed(2)}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-3">
                <p className="text-[11px] font-semibold text-gray-600">APR</p>
                <p className="mt-1 text-sm font-extrabold">{debt.apr.toFixed(2)}%</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-3">
                <p className="text-[11px] font-semibold text-gray-600">Monthly</p>
                <p className="mt-1 text-sm font-extrabold">{debt.monthlyPayment.toFixed(2)}</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-600">Progress</p>
                <p className="text-xs font-bold text-gray-700">{progress.toFixed(1)}% paid off</p>
              </div>
              <div className="mt-2">
                <Progress value={progress} />
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Input
                inputMode="decimal"
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                placeholder="Payment amount"
              />
              <Button
                onClick={() => {
                  const amt = Number(payment);
                  if (!Number.isFinite(amt) || amt <= 0) return;
                  onLogPayment(debt.id, amt);
                  setPayment("");
                }}
              >
                Log Payment
              </Button>
            </div>
          </>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-700">Debt name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700">Principal</label>
              <Input inputMode="decimal" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700">APR (%)</label>
              <Input inputMode="decimal" value={apr} onChange={(e) => setApr(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700">Monthly payment</label>
              <Input inputMode="decimal" value={monthlyPayment} onChange={(e) => setMonthlyPayment(e.target.value)} />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => {
                  const p = Number(principal);
                  const a = Number(apr);
                  const m = Number(monthlyPayment);
                  if (!name.trim()) return;
                  if (!Number.isFinite(p) || p <= 0) return;
                  if (!Number.isFinite(a) || a < 0) return;
                  if (!Number.isFinite(m) || m <= 0) return;

                  onUpdate({
                    ...debt,
                    name: name.trim(),
                    principal: p,
                    apr: a,
                    monthlyPayment: m
                  });
                  setEditing(false);
                }}
              >
                Save
              </Button>
              <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
