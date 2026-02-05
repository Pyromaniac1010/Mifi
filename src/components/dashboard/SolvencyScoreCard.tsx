import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";

export function SolvencyScoreCard({ score }: { score: number }) {
  const status =
    score >= 100 ? "Freedom achieved (100%+). Keep it stable." :
    score >= 50 ? "Strong progress. Push passive income harder." :
    score >= 25 ? "Okay… but you’re still dependent on active income." :
    "Low solvency. Passive income is the mission.";

  const badgeColor =
    score >= 100 ? "bg-green-50 text-green-700" :
    score >= 50 ? "bg-indigo-50 text-indigo-700" :
    score >= 25 ? "bg-orange-50 text-orange-700" :
    "bg-red-50 text-red-700";

  return (
    <Card className="overflow-hidden border-0">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600">
        <CardHeader className="text-white">
          <p className="text-xs font-semibold opacity-90">Financial Solvency Score</p>
          <div className="mt-2 text-4xl font-extrabold">{score.toFixed(1)}%</div>
          <p className={`mt-2 text-sm font-semibold inline-block rounded-xl px-3 py-1 ${badgeColor}`}>
            {status}
          </p>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="mt-4">
            <Progress value={score} />
          </div>
          <p className="mt-3 text-xs text-white/80">
            Formula: Passive Income / (Expenses + Debt Payments) × 100
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
