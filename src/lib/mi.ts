import type { MiPersonality } from "@/lib/types";

export type MiContext = {
  incomeActive: number;
  incomePassive: number;
  expenses: number;
  net: number;
  totalDebt: number;
  debtPayments: number;
  solvency: number;
};

function tone(p: MiPersonality) {
  switch (p) {
    case "genz":
      return {
        style: (s: string) => `Bestie 😎 ${s} 💸✨`,
        warn: (s: string) => `Bestie… ${s} 😬`,
        praise: (s: string) => `Okayyy, love to see it! ${s} 🫶`
      };
    case "uncle":
      return {
        style: (s: string) => `Hey kiddo 🤙 ${s}`,
        warn: (s: string) => `Listen champ—${s}`,
        praise: (s: string) => `Proud of you. ${s}`
      };
    case "coach":
      return {
        style: (s: string) => `💪 ${s.toUpperCase()}`,
        warn: (s: string) => `💪 UNACCEPTABLE. ${s.toUpperCase()}`,
        praise: (s: string) => `💪 GOOD. NOW GO HARDER. ${s.toUpperCase()}`
      };
    case "pro":
    default:
      return {
        style: (s: string) => `💼 Analysis: ${s}`,
        warn: (s: string) => `💼 Risk flag: ${s}`,
        praise: (s: string) => `💼 Positive trend: ${s}`
      };
  }
}

export function miPreview(personality: MiPersonality, c: MiContext) {
  const t = tone(personality);
  if (c.net < 0) return t.warn("your net balance is negative. Reduce expenses or increase income this month.");
  if (c.solvency < 25) return t.style(`your solvency score is low (${c.solvency.toFixed(1)}%). Build passive income.`);
  if (c.solvency >= 100) return t.praise(`you’re at ${c.solvency.toFixed(0)}% solvency. That’s financial freedom territory.`);
  return t.praise("net positive and moving right. Push solvency toward 100% by boosting passive income.");
}

export function miRespond(personality: MiPersonality, userText: string, c: MiContext) {
  const t = tone(personality);
  const text = userText.toLowerCase();

  const spendingTooHigh = c.expenses > (c.incomeActive + c.incomePassive);
  const highDebtLoad = c.totalDebt > (c.incomeActive + c.incomePassive) * 3; // rough heuristic

  const asksStatus = /(how am i|how are my finances|how am i doing|status|overview)/.test(text);
  const asksDebtVsSavings = /(debt or savings|pay off debt|debt vs savings|invest or pay debt)/.test(text);
  const asksPassive = /(passive income|side hustle|increase income|build wealth)/.test(text);

  if (asksStatus) {
    if (spendingTooHigh) return t.warn(`you’re spending more than you make. Net: ${c.net.toFixed(2)}. Start by cutting one category by 10–20%.`);
    if (c.solvency < 25) return t.style(`net positive, but solvency is ${c.solvency.toFixed(1)}%. Your freedom engine needs more passive income.`);
    return t.praise(`you’re net positive. Solvency: ${c.solvency.toFixed(1)}%. Next goal: raise passive income and reduce fixed expenses.`);
  }

  if (asksDebtVsSavings) {
    if (highDebtLoad || c.debtPayments > c.expenses * 0.35) {
      return t.style("prioritize high-interest debt first (avalanche). Keep a small emergency buffer while you attack APR-heavy balances.");
    }
    return t.style("split approach: build a small emergency fund, then optimize by paying high-APR debt while investing consistently.");
  }

  if (asksPassive) {
    if (personality === "genz") {
      return t.style("easy wins: digital services, consulting, templates, UGC, affiliate content. Pick ONE and ship weekly. Keep it consistent fr.");
    }
    if (personality === "pro") {
      return t.style("recommendation: select a scalable channel (digital products, consulting retainers, dividends/interest). Set a monthly target and track conversion.");
    }
    return t.style("focus on one side income lane and run it like a business—weekly output, clear offer, and consistent distribution.");
  }

  if (spendingTooHigh) return t.warn("cashflow is negative. Cut expenses or add income. Start with your top 2 expense categories.");
  if (c.totalDebt > 0 && c.solvency < 50) return t.style("keep paying debts consistently and grow passive income. Your solvency improves fastest when passive covers expenses + debt payments.");
  return t.praise("you’re trending okay. Want me to suggest a 30-day plan to push solvency up?");
}
