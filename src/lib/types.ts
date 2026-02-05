export type CurrencyCode = "USD" | "NGN" | "EUR" | "GBP";

export type IncomeType = "active" | "passive";
export type TransactionType = "income" | "expense";

export type Transaction = {
  id: string;
  type: TransactionType;
  incomeType?: IncomeType; // only if type === income
  category: string;
  amount: number; // positive
  createdAt: number; // epoch ms
};

export type Debt = {
  id: string;
  name: string;
  principal: number;        // current principal
  initialPrincipal: number; // for progress tracking
  apr: number;              // annual interest rate e.g 24.5
  monthlyPayment: number;
  createdAt: number;
};

export type MiPersonality = "genz" | "uncle" | "coach" | "pro";

export type ChatMessage = {
  id: string;
  role: "user" | "mi";
  text: string;
  createdAt: number;
};

export type UserProfile = {
  id: string;
  email: string;
  baseCurrency: CurrencyCode;
  personality: MiPersonality;
};

export type AuthState = {
  isAuthed: boolean;
  user: UserProfile | null;
};
