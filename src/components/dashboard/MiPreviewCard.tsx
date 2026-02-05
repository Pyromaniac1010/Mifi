import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function MiPreviewCard({ text }: { text: string }) {
  return (
    <Link href="/mi">
      <Card className="border-0 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <CardContent className="pt-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-extrabold">Mi AI</p>
            <Sparkles size={18} />
          </div>
          <p className="mt-2 text-sm font-semibold opacity-95">{text}</p>
          <p className="mt-2 text-xs opacity-80">Tap to open full chat</p>
        </CardContent>
      </Card>
    </Link>
  );
}
