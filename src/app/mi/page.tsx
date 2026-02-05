"use client";

import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/AppShell";
import { useDebts, useMessages, usePersonality, useTransactions, useUser } from "@/lib/hooks";
import { sumExpenses, sumIncomeActive, sumIncomePassive, totalDebt, totalDebtPayments, solvencyScore } from "@/lib/finance";
import { ChatUI } from "@/components/mi/ChatUI";
import { PersonalityPicker } from "@/components/mi/PersonalityPicker";

export default function MiPage() {
  const { user } = useUser();
  const { items: tx } = useTransactions();
  const { items: debts } = useDebts();
  const { items: messages, set: setMessages } = useMessages();
  const { personality, setPersonality } = usePersonality();

  const incomeA = sumIncomeActive(tx);
  const incomeP = sumIncomePassive(tx);
  const expenses = sumExpenses(tx);
  const net = incomeA + incomeP - expenses;
  const debtTotal = totalDebt(debts);
  const debtPay = totalDebtPayments(debts);
  const solvency = solvencyScore(incomeP, expenses, debtPay);

  return (
    <Protected>
      <AppShell title="Mi">
        <div className="space-y-4">
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4">
            <p className="text-sm font-extrabold">Personality</p>
            <p className="mt-1 text-xs text-gray-600 font-semibold">
              Current: {user?.personality ?? personality}
            </p>
            <div className="mt-3">
              <PersonalityPicker value={personality} onChange={setPersonality} />
            </div>
          </div>

          <ChatUI
            personality={personality}
            context={{
              incomeActive: incomeA,
              incomePassive: incomeP,
              expenses,
              net,
              totalDebt: debtTotal,
              debtPayments: debtPay,
              solvency
            }}
            messages={messages}
            setMessages={setMessages}
          />
        </div>
      </AppShell>
    </Protected>
  );
}
