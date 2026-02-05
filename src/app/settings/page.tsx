"use client";

import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import { useUser } from "@/lib/hooks";
import type { CurrencyCode } from "@/lib/types";

export default function SettingsPage() {
  const router = useRouter();
  const { user, update } = useUser();

  return (
    <Protected>
      <AppShell title="Settings">
        <div className="space-y-4">
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
            <p className="text-sm font-extrabold">Profile</p>
            <p className="mt-1 text-sm text-gray-700 font-semibold">{user?.email ?? "—"}</p>

            <div className="mt-4">
              <label className="text-xs font-semibold text-gray-700">Base currency</label>
              <Select
                value={user?.baseCurrency ?? "USD"}
                onChange={(e) => {
                  if (!user) return;
                  update({ ...user, baseCurrency: e.target.value as CurrencyCode });
                }}
              >
                <option value="USD">USD</option>
                <option value="NGN">NGN</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </Select>
            </div>
          </div>

          <Button
            variant="danger"
            onClick={() => {
              logout();
              router.replace("/login");
            }}
          >
            Logout
          </Button>

          <div className="text-xs text-gray-500">
            Data is stored in your browser only (localStorage).
          </div>
        </div>
      </AppShell>
    </Protected>
  );
}
