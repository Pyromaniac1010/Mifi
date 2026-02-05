import { Card, CardContent } from "@/components/ui/Card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function NetBalanceCard({ netLabel, positive }: { netLabel: string; positive: boolean }) {
  return (
    <Card className={`border-0 ${positive ? "bg-green-50" : "bg-red-50"}`}>
      <CardContent className="pt-5">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-700">Net Balance</p>
          {positive ? <ArrowUpRight className="text-green-700" size={18} /> : <ArrowDownRight className="text-red-700" size={18} />}
        </div>
        <div className={`mt-2 text-3xl font-extrabold ${positive ? "text-green-800" : "text-red-800"}`}>
          {netLabel}
        </div>
        <p className="mt-1 text-xs text-gray-600">Total income − total expenses</p>
      </CardContent>
    </Card>
  );
}
