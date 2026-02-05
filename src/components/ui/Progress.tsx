import { clamp } from "@/lib/utils";

export function Progress({ value }: { value: number }) {
  const v = clamp(value, 0, 100);
  return (
    <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500"
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
