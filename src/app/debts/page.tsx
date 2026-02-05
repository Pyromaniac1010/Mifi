"use client";

import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/AppShell";
import { useDebts } from "@/lib/hooks";
import { avalancheSort, estimateFreedomDate } from "@/lib/finance";
import { DebtForm } from "@/components/debts/DebtForm";
import { DebtList } from "@/components/debts/DebtList";
import { FreedomDateBanner } from "@/components/debts/FreedomDateBanner";
import { monthYear } from "@/lib/utils";

export default function DebtsPage() {
  const { items, set } = useDebts();

  const debts = avalancheSort(items);
  const freedomTs = estimateFreedomDate(debts);
  const freedomLabel = freedomTs ? monthYear(freedomTs) : "Not solvable (increase payment)";

  return (
    <Protected>
      <AppShell title="Debts">
        <div className="space-y-4">
          <FreedomDateBanner label={freedomLabel} />

          <DebtForm onAdd={(d) => set([d, ...items])} />

          <DebtList
            debts={debts}
            onUpdate={(d) => set(items.map(x => x.id === d.id ? d : x))}
            onDelete={(id) => set(items.filter(x => x.id !== id))}
            onLogPayment={(id, amount) => {
              set(items.map(d => {
                if (d.id !== id) return d;
                const nextPrincipal = Math.max(0, d.principal - amount);
                return { ...d, principal: nextPrincipal };
              }));
            }}
          />
        </div>
      </AppShell>
    </Protected>
  );
}
