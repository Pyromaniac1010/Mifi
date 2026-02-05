import { Card, CardContent } from "@/components/ui/Card";
import { TrendingDown, TrendingUp } from "lucide-react";

export function StatCards({
  activeIncome,
  passiveIncome,
  expenses,
  currencyLabel
}: {
  activeIncome: string;
  passiveIncome: string;
  expenses: string;
  currencyLabel: string;
}) {
  const items = [
    { title: "Active Income", value: activeIncome, icon: TrendingUp, accent: "text-green-700" },
    { title: "Passive Income", value: passiveIncome, icon: TrendingUp, accent: "text-purple-700" },
    { title: "Total Expenses", value: expenses, icon: TrendingDown, accent: "text-red-700" }
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {items.map((it) => (
        <Card key={it.title}>
          <CardContent className="pt-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-600">{it.title}</p>
              <it.icon className={it.accent} size={18} />
            </div>
            <div className="mt-2 text-xl font-extrabold">{it.value}</div>
            <p className="mt-1 text-xs text-gray-500">Monthly total ({currencyLabel})</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
