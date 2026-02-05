import type { Debt } from "@/lib/types";
import { DebtItem } from "@/components/debts/DebtItem";

export function DebtList({
  debts,
  onUpdate,
  onDelete,
  onLogPayment
}: {
  debts: Debt[];
  onUpdate: (d: Debt) => void;
  onDelete: (id: string) => void;
  onLogPayment: (id: string, amount: number) => void;
}) {
  if (debts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 p-5 text-sm text-gray-600">
        No debts yet. Add one to activate avalanche ranking.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {debts.map((d, idx) => (
        <DebtItem
          key={d.id}
          debt={d}
          rank={idx + 1}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onLogPayment={onLogPayment}
        />
      ))}
    </div>
  );
}
