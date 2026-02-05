"use client";

import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/AppShell";
import { useTransactions } from "@/lib/hooks";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { TransactionList } from "@/components/transactions/TransactionList";

export default function TransactionsPage() {
  const { items, set } = useTransactions();

  const sorted = [...items].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <Protected>
      <AppShell title="Transactions">
        <div className="space-y-4">
          <TransactionForm onAdd={(t) => set([t, ...items])} />
          <TransactionList
            items={sorted}
            onUpdate={(t) => set(items.map(x => x.id === t.id ? t : x))}
            onDelete={(id) => set(items.filter(x => x.id !== id))}
          />
        </div>
      </AppShell>
    </Protected>
  );
}
