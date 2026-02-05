import { Card, CardContent } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import type { Debt } from "@/lib/types";
import { debtProgressPercent } from "@/lib/finance";

export function DebtOverviewWidget({
  debts,
  totalDebtLabel,
  totalPaymentsLabel
}: {
  debts: Debt[];
  totalDebtLabel: string;
  totalPaymentsLabel: string;
}) {
  const top3 = debts.slice(0, 3);

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-extrabold">Debt Overview</p>
          <span className="text-xs font-semibold text-gray-500">{debts.length} debts</span>
        </div>

        {debts.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-gray-200 p-4">
            <p className="text-sm font-semibold">No debts yet.</p>
            <p className="mt-1 text-xs text-gray-600">Add your first debt to activate the Freedom Engine.</p>
          </div>
        ) : (
          <>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-gray-50 p-3">
                <p className="text-xs text-gray-600 font-semibold">Total debt</p>
                <p className="mt-1 text-lg font-extrabold">{totalDebtLabel}</p>
              </div>
              <div className="rounded-2xl bg-gray-50 p-3">
                <p className="text-xs text-gray-600 font-semibold">Monthly payments</p>
                <p className="mt-1 text-lg font-extrabold">{totalPaymentsLabel}</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {top3.map((d) => (
                <div key={d.id} className="rounded-2xl bg-gray-50 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">{d.name}</p>
                    <p className="text-xs font-semibold text-gray-600">{debtProgressPercent(d).toFixed(1)}%</p>
                  </div>
                  <div className="mt-2">
                    <Progress value={debtProgressPercent(d)} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
