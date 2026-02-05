"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, Home, MessageCircle, Receipt } from "lucide-react";

const items = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/transactions", label: "Transactions", icon: Receipt },
  { href: "/debts", label: "Debts", icon: CreditCard },
  { href: "/mi", label: "Mi", icon: MessageCircle }
];

export function BottomNav() {
  const path = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-around px-3 py-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active = path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold ${
                active ? "text-indigo-600" : "text-gray-500"
              }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
