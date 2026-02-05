import type { Transaction } from "@/lib/types";
import { TransactionItem } from "@/components/transactions/TransactionItem";

export function TransactionList({
  items,
  onUpdate,
  onDelete
}: {
  items: Transaction[];
  onUpdate: (t: Transaction) => void;
  onDelete: (id: string) => void;
}) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 p-5 text-sm text-gray-600">
        No transactions yet. Add your first one.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((t) => (
        <TransactionItem key={t.id} item={t} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}
