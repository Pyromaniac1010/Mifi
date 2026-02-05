import type { Debt, Transaction } from "@/lib/types";

export function sumIncomeActive(tx: Transaction[]) {
  return tx.filter(t => t.type === "income" && t.incomeType === "active").reduce((a, b) => a + b.amount, 0);
}
export function sumIncomePassive(tx: Transaction[]) {
  return tx.filter(t => t.type === "income" && t.incomeType === "passive").reduce((a, b) => a + b.amount, 0);
}
export function sumExpenses(tx: Transaction[]) {
  return tx.filter(t => t.type === "expense").reduce((a, b) => a + b.amount, 0);
}

export function totalDebt(debts: Debt[]) {
  return debts.reduce((a, b) => a + b.principal, 0);
}
export function totalDebtPayments(debts: Debt[]) {
  return debts.reduce((a, b) => a + b.monthlyPayment, 0);
}

export function solvencyScore(passiveIncome: number, expenses: number, debtPayments: number) {
  const denom = expenses + debtPayments;
  if (denom <= 0) return 0;
  return (passiveIncome / denom) * 100;
}

// Avalanche ranking: highest APR first
export function avalancheSort(debts: Debt[]) {
  return [...debts].sort((a, b) => b.apr - a.apr);
}

// Debt payoff simulation: month-by-month (simple + robust)
export function estimateFreedomDate(debts: Debt[], now = Date.now()): number | null {
  if (debts.length === 0) return null;

  const items = debts.map(d => ({
    principal: d.principal,
    apr: d.apr,
    payment: d.monthlyPayment
  }));

  // If payment does not cover monthly interest, payoff may be impossible under current payments.
  for (const d of items) {
    const r = (d.apr / 100) / 12;
    if (d.principal > 0 && d.payment <= d.principal * r + 0.01) {
      return null;
    }
  }

  let months = 0;
  const cap = 60 * 12; // 60 years

  while (months < cap) {
    let remaining = 0;

    for (const d of items) {
      if (d.principal <= 0) continue;
      const r = (d.apr / 100) / 12;
      d.principal = d.principal + d.principal * r - d.payment;
      if (d.principal < 0) d.principal = 0;
      remaining += d.principal;
    }

    months += 1;
    if (remaining <= 0.01) break;
  }

  if (months >= cap) return null;

  const date = new Date(now);
  date.setMonth(date.getMonth() + months);
  return date.getTime();
}

export function debtProgressPercent(d: { initialPrincipal: number; principal: number }) {
  if (d.initialPrincipal <= 0) return 0;
  const paid = d.initialPrincipal - d.principal;
  return Math.max(0, Math.min(100, (paid / d.initialPrincipal) * 100));
}
