"use client";

import { useState } from "react";
import type { Transaction, IncomeType, TransactionType } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { formatDate } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";

export function TransactionItem({
  item,
  onUpdate,
  onDelete
}: {
  item: Transaction;
  onUpdate: (t: Transaction) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);

  const [type, setType] = useState<TransactionType>(item.type);
  const [incomeType, setIncomeType] = useState<IncomeType>(item.incomeType ?? "active");
  const [category, setCategory] = useState(item.category);
  const [amount, setAmount] = useState(String(item.amount));

  const isIncome = item.type === "income";
  const sign = isIncome ? "+" : "-";
  const color = isIncome ? "text-green-700" : "text-red-700";

  if (!editing) {
    return (
      <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-extrabold">{item.category}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className={`text-sm font-extrabold ${color}`}>{sign}{item.amount.toFixed(2)}</span>
              {item.type === "income" && (
                <span className="rounded-full bg-indigo-50 px-2 py-1 text-[11px] font-bold text-indigo-700">
                  {item.incomeType === "active" ? "Active" : "Passive"}
                </span>
              )}
              <span className="text-xs text-gray-500">{formatDate(item.createdAt)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-xl p-2 hover:bg-gray-100" onClick={() => setEditing(true)} aria-label="Edit">
              <Pencil size={18} />
            </button>
            <button className="rounded-xl p-2 hover:bg-gray-100" onClick={() => onDelete(item.id)} aria-label="Delete">
              <Trash2 size={18} className="text-red-600" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
      <p className="text-sm font-extrabold">Edit</p>

      <div className="mt-3 grid grid-cols-1 gap-3">
        <div>
          <label className="text-xs font-semibold text-gray-700">Type</label>
          <Select value={type} onChange={(e) => setType(e.target.value as TransactionType)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Select>
        </div>

        {type === "income" && (
          <div>
            <label className="text-xs font-semibold text-gray-700">Income type</label>
            <Select value={incomeType} onChange={(e) => setIncomeType(e.target.value as IncomeType)}>
              <option value="active">Active</option>
              <option value="passive">Passive</option>
            </Select>
          </div>
        )}

        <div>
          <label className="text-xs font-semibold text-gray-700">Category</label>
          <Input value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700">Amount</label>
          <Input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => {
              const num = Number(amount);
              if (!category.trim()) return;
              if (!Number.isFinite(num) || num <= 0) return;

              onUpdate({
                ...item,
                type,
                incomeType: type === "income" ? incomeType : undefined,
                category: category.trim(),
                amount: num
              });
              setEditing(false);
            }}
          >
            Save
          </Button>
          <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}
