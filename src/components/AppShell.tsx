"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

export function AppShell({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-extrabold">{title}</h1>
          <Link
            href="/settings"
            className="rounded-xl p-2 hover:bg-gray-100"
            aria-label="Settings"
          >
            <Settings size={20} />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-5">{children}</main>

      <BottomNav />
    </div>
  );
}
