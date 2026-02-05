"use client";

import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/AppShell";
import { useDebts, useTransactions, useUser } from "@/lib/hooks";
import { avalancheSort, solvencyScore, sumExpenses, sumIncomeActive, sumIncomePassive, totalDebt, totalDebtPayments } from "@/lib/finance";
import { formatMoney } from "@/lib/utils";
import { SolvencyScoreCard } from "@/components/dashboard/SolvencyScoreCard";
import { StatCards } from "@/components/dashboard/StatCards";
import { NetBalanceCard } from "@/components/dashboard/NetBalanceCard";
import { DebtOverviewWidget } from "@/components/dashboard/DebtOverviewWidget";
import { MiPreviewCard } from "@/components/dashboard/MiPreviewCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { miPreview } from "@/lib/mi";

export default function DashboardPage() {
  const { user } = useUser();
  const { items: tx } = useTransactions();
  const { items: debtsRaw } = useDebts();

  const currency = user?.baseCurrency ?? "USD";
  const incomeA = sumIncomeActive(tx);
  const incomeP = sumIncomePassive(tx);
  const expenses = sumExpenses(tx);
  const net = incomeA + incomeP - expenses;

  const debts = avalancheSort(debtsRaw);
  const debtTotal = totalDebt(debts);
  const debtPay = totalDebtPayments(debts);

  const solvency = solvencyScore(incomeP, expenses, debtPay);

  const preview = miPreview(user?.personality ?? "genz", {
    incomeActive: incomeA,
    incomePassive: incomeP,
    expenses,
    net,
    totalDebt: debtTotal,
    debtPayments: debtPay,
    solvency
  });

  return (
    <Protected>
      <AppShell title="Dashboard">
        <div className="space-y-4">
          <SolvencyScoreCard score={solvency} />

          <StatCards
            activeIncome={formatMoney(incomeA, currency)}
            passiveIncome={formatMoney(incomeP, currency)}
            expenses={formatMoney(expenses, currency)}
            currencyLabel={currency}
          />

          <NetBalanceCard netLabel={formatMoney(net, currency)} positive={net >= 0} />

          <DebtOverviewWidget
            debts={debts}
            totalDebtLabel={formatMoney(debtTotal, currency)}
            totalPaymentsLabel={formatMoney(debtPay, currency)}
          />

          <MiPreviewCard text={preview} />

          <QuickActions />
        </div>
      </AppShell>
    </Protected>
  );
}
