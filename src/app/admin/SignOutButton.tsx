"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-stone-400 transition-colors hover:bg-stone-700 hover:text-stone-100"
    >
      <LogOut className="size-4" />
      Sign Out
    </button>
  );
}
