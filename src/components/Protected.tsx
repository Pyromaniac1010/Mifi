"use client";

import { useEffect, useState } from "react";
import { loadAuth } from "@/lib/storage";
import { usePathname, useRouter } from "next/navigation";

export function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const auth = loadAuth();
    const isLogin = pathname === "/login";
    if (!auth.isAuthed && !isLogin) {
      router.replace("/login");
      return;
    }
    setOk(true);
  }, [router, pathname]);

  if (!ok) return <div className="p-6 text-sm text-gray-600">Loading…</div>;
  return <>{children}</>;
}
