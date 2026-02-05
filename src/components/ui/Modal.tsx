"use client";

import { Button } from "@/components/ui/Button";

export function Modal({
  open,
  title,
  children,
  onClose
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 p-3">
      <div className="w-full max-w-lg rounded-2xl bg-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold">{title}</h3>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </div>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
