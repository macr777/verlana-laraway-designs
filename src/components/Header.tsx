"use client";

import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#faf8f4]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Wordmark */}
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-serif text-2xl font-semibold tracking-wide text-stone-800 transition-colors group-hover:text-stone-600">
            Verlana Laraway
          </span>
          <span className="text-xs font-light tracking-[0.25em] text-stone-500 uppercase">
            Designs
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              size="sm"
              render={
                <Link
                  href={link.href}
                  className="font-sans text-sm tracking-wide text-stone-700"
                />
              }
            >
              {link.label}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            render={
              <Link
                href="/cart"
                aria-label="Shopping cart"
                className="text-stone-700"
              />
            }
          >
            <ShoppingCart className="size-4" />
            <span className="ml-1 font-sans text-sm tracking-wide">Cart</span>
          </Button>
        </nav>

        {/* Mobile nav */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            render={
              <Link href="/cart" aria-label="Shopping cart" className="text-stone-700" />
            }
          >
            <ShoppingCart className="size-5" />
          </Button>

          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="size-5 text-stone-700" />
                </Button>
              }
            />
            <SheetContent side="right" className="bg-[#faf8f4] w-64">
              <SheetHeader className="mb-6">
                <SheetTitle className="font-serif text-xl font-semibold text-stone-800">
                  Verlana Laraway
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    variant="ghost"
                    className="justify-start font-sans text-base text-stone-700"
                    render={<Link href={link.href} />}
                  >
                    {link.label}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  className="justify-start font-sans text-base text-stone-700"
                  render={<Link href="/cart" className="flex items-center gap-2" />}
                >
                  <ShoppingCart className="size-4" />
                  Cart
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
