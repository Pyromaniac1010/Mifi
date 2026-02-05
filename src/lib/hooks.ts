"use client";

import { useEffect, useState } from "react";
import type { Debt, Transaction, ChatMessage, UserProfile, MiPersonality } from "@/lib/types";
import {
  loadDebts, loadMessages, loadTransactions, loadUser,
  saveDebts, saveMessages, saveTransactions, saveUser, savePersonality
} from "@/lib/storage";

export function useUser() {
  const [user, setUser] = useState<UserProfile | null>(null);
  useEffect(() => setUser(loadUser()), []);
  const update = (next: UserProfile) => { setUser(next); saveUser(next); savePersonality(next.personality); };
  return { user, update };
}

export function useTransactions() {
  const [items, setItems] = useState<Transaction[]>([]);
  useEffect(() => setItems(loadTransactions()), []);
  const set = (next: Transaction[]) => { setItems(next); saveTransactions(next); };
  return { items, set };
}

export function useDebts() {
  const [items, setItems] = useState<Debt[]>([]);
  useEffect(() => setItems(loadDebts()), []);
  const set = (next: Debt[]) => { setItems(next); saveDebts(next); };
  return { items, set };
}

export function useMessages() {
  const [items, setItems] = useState<ChatMessage[]>([]);
  useEffect(() => setItems(loadMessages()), []);
  const set = (next: ChatMessage[]) => { setItems(next); saveMessages(next); };
  return { items, set };
}

export function usePersonality() {
  const { user, update } = useUser();
  const p: MiPersonality = user?.personality ?? "genz";
  const set = (next: MiPersonality) => {
    if (!user) return;
    update({ ...user, personality: next });
  };
  return { personality: p, setPersonality: set };
}
