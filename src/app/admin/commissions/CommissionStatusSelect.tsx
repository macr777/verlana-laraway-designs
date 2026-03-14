"use client";

import { updateCommissionStatus } from "./actions";

export function CommissionStatusSelect({
  id,
  currentStatus,
}: {
  id: number;
  currentStatus: string;
}) {
  const colors: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    responded: "bg-yellow-100 text-yellow-700",
    completed: "bg-green-100 text-green-700",
  };

  return (
    <select
      value={currentStatus}
      onChange={(e) => updateCommissionStatus(id, e.target.value)}
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[currentStatus] || "bg-stone-100 text-stone-700"}`}
    >
      <option value="new">New</option>
      <option value="responded">Responded</option>
      <option value="completed">Completed</option>
    </select>
  );
}
