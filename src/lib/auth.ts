import type { AuthState, UserProfile } from "@/lib/types";
import { id } from "@/lib/utils";
import { loadAuth, saveAuth, loadUser, saveUser, savePersonality } from "@/lib/storage";

export function getAuth(): AuthState {
  if (typeof window === "undefined") return { isAuthed: false, user: null };
  const auth = loadAuth();
  if (auth.user) return auth;

  const user = loadUser();
  if (user) {
    const next = { isAuthed: true, user };
    saveAuth(next);
    return next;
  }
  return auth;
}

export function loginDemo(email: string, baseCurrency: UserProfile["baseCurrency"] = "USD") {
  const user: UserProfile = {
    id: id("user"),
    email,
    baseCurrency,
    personality: "genz"
  };
  saveUser(user);
  savePersonality(user.personality);
  saveAuth({ isAuthed: true, user });
}

export function logout() {
  saveAuth({ isAuthed: false, user: null });
}
