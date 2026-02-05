import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Link href="/transactions">
        <Button className="w-full">Add Transaction</Button>
      </Link>
      <Link href="/debts">
        <Button variant="secondary" className="w-full">Manage Debts</Button>
      </Link>
    </div>
  );
}
