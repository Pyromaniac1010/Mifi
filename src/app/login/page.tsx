"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { loginDemo } from "@/lib/auth";
import type { CurrencyCode } from "@/lib/types";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
        <h1 className="text-2xl font-extrabold">MiFi</h1>
        <p className="mt-1 text-sm text-gray-600">
          Demo login (localStorage). No password needed.
        </p>

        <div className="mt-5 space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-700">Email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700">Base currency</label>
            <Select value={currency} onChange={(e) => setCurrency(e.target.value as CurrencyCode)}>
              <option value="USD">USD</option>
              <option value="NGN">NGN</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </Select>
          </div>

          <Button
            className="w-full"
            onClick={() => {
              if (!email.trim()) return;
              loginDemo(email.trim(), currency);
              router.replace("/dashboard");
            }}
          >
            Login
          </Button>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          Tip: This app stores data in your browser only (localStorage).
        </p>
      </div>
    </div>
  );
}
