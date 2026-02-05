import type { AuthState, Debt, Transaction, ChatMessage, MiPersonality, UserProfile } from "@/lib/types";

export const KEYS = {
  user: "mifi_user",
  auth: "mifi_auth",
  transactions: "mifi_transactions",
  debts: "mifi_debts",
  personality: "mifi_personality",
  messages: "mifi_messages"
} as const;

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadAuth(): AuthState {
  return safeParse<AuthState>(localStorage.getItem(KEYS.auth), { isAuthed: false, user: null });
}

export function saveAuth(state: AuthState) {
  localStorage.setItem(KEYS.auth, JSON.stringify(state));
  if (state.user) localStorage.setItem(KEYS.user, JSON.stringify(state.user));
}

export function loadUser(): UserProfile | null {
  return safeParse<UserProfile | null>(localStorage.getItem(KEYS.user), null);
}

export function saveUser(user: UserProfile) {
  localStorage.setItem(KEYS.user, JSON.stringify(user));
}

export function loadTransactions(): Transaction[] {
  return safeParse<Transaction[]>(localStorage.getItem(KEYS.transactions), []);
}

export function saveTransactions(items: Transaction[]) {
  localStorage.setItem(KEYS.transactions, JSON.stringify(items));
}

export function loadDebts(): Debt[] {
  return safeParse<Debt[]>(localStorage.getItem(KEYS.debts), []);
}

export function saveDebts(items: Debt[]) {
  localStorage.setItem(KEYS.debts, JSON.stringify(items));
}

export function loadPersonality(): MiPersonality {
  return safeParse<MiPersonality>(localStorage.getItem(KEYS.personality), "genz");
}

export function savePersonality(p: MiPersonality) {
  localStorage.setItem(KEYS.personality, JSON.stringify(p));
}

export function loadMessages(): ChatMessage[] {
  return safeParse<ChatMessage[]>(localStorage.getItem(KEYS.messages), []);
}

export function saveMessages(items: ChatMessage[]) {
  localStorage.setItem(KEYS.messages, JSON.stringify(items));
}
