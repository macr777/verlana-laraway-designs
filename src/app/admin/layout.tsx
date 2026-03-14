import type { Metadata } from "next";
import Link from "next/link";
import {
  LayoutDashboard,
  Image,
  ShoppingBag,
  Settings,
  ArrowLeft,
  MessageCircle,
  LogOut,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { SignOutButton } from "./SignOutButton";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin — Verlana Laraway Designs",
    default: "Admin | Verlana Laraway Designs",
  },
};

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/artworks", label: "Artworks", icon: Image },
  { href: "/admin/commissions", label: "Commissions", icon: MessageCircle },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // If no session (login page), just render children without sidebar
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="flex w-60 shrink-0 flex-col bg-stone-800 text-stone-200">
        {/* Branding */}
        <div className="border-b border-stone-700 px-5 py-5">
          <p className="text-xs font-medium uppercase tracking-widest text-stone-400">
            Admin
          </p>
          <p className="mt-0.5 font-serif text-base font-medium text-stone-100">
            Verlana Laraway
          </p>
        </div>

        {/* Back to Site */}
        <div className="border-b border-stone-700 px-3 py-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-stone-400 transition-colors hover:bg-stone-700 hover:text-stone-100"
          >
            <ArrowLeft className="size-4" />
            Back to Site
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4">
          <ul className="flex flex-col gap-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-stone-300 transition-colors hover:bg-stone-700 hover:text-stone-100"
                >
                  <Icon className="size-4 shrink-0" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer with user info & sign out */}
        <div className="border-t border-stone-700 px-4 py-4">
          <p className="mb-2 truncate text-sm text-stone-300">
            {session.user?.name || session.user?.email}
          </p>
          <SignOutButton />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-stone-50">
        {children}
      </main>
    </div>
  );
}
