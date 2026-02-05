import { Card, CardContent } from "@/components/ui/Card";

export function FreedomDateBanner({ label }: { label: string }) {
  return (
    <Card className="border-0 bg-gradient-to-r from-green-600 to-teal-500 text-white">
      <CardContent className="pt-5">
        <p className="text-xs font-semibold opacity-90">Debt Freedom Date</p>
        <p className="mt-2 text-2xl font-extrabold">{label}</p>
        <p className="mt-1 text-xs opacity-80">Assumes consistent monthly payments</p>
      </CardContent>
    </Card>
  );
}
