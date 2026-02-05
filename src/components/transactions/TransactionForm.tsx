"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import type { IncomeType, Transaction, TransactionType } from "@/lib/types";
import { id } from "@/lib/utils";

export function TransactionForm({
  onAdd
}: {
  onAdd: (t: Transaction) => void;
}) {
  const [type, setType] = useState<TransactionType>("expense");
  const [incomeType, setIncomeType] = useState<IncomeType>("active");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const num = Number(amount);

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
      <p className="text-sm font-extrabold">Add Transaction</p>

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
              <option value="passive">Passive / Digital</option>
            </Select>
          </div>
        )}

        <div>
          <label className="text-xs font-semibold text-gray-700">Category</label>
          <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Groceries, Salary, YouTube…" />
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-700">Amount</label>
          <Input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
        </div>

        <Button
          onClick={() => {
            if (!category.trim()) return;
            if (!Number.isFinite(num) || num <= 0) return;

            const tx: Transaction = {
              id: id("tx"),
              type,
              incomeType: type === "income" ? incomeType : undefined,
              category: category.trim(),
              amount: num,
              createdAt: Date.now()
            };
            onAdd(tx);
            setCategory("");
            setAmount("");
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
