"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {
  type CartItem,
  getCart,
  removeFromCart,
  updateQuantity,
  getCartTotal,
} from "@/lib/cart";

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function itemLabel(item: CartItem): string {
  if (item.isOriginal) return "Original painting";
  return item.printSize ? `Print — ${item.printSize}` : "Print";
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setCart(getCart());
    setMounted(true);
  }, []);

  function handleRemove(index: number) {
    removeFromCart(index);
    setCart(getCart());
  }

  function handleQuantity(index: number, delta: number) {
    const item = cart[index];
    const newQty = item.quantity + delta;
    // Originals are unique — quantity locked at 1
    if (item.isOriginal) return;
    updateQuantity(index, newQty);
    setCart(getCart());
  }

  const total = getCartTotal(cart);

  // Avoid hydration mismatch: render nothing until client has read localStorage
  if (!mounted) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="h-64 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <ShoppingCart
            className="size-16 text-muted-foreground"
            strokeWidth={1.25}
          />
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Your cart is empty
          </h1>
          <p className="text-base text-muted-foreground">
            Browse Verlana&apos;s collection and add a piece you love.
          </p>
          <Button
            size="lg"
            render={<Link href="/gallery" />}
          >
            Browse the Gallery
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4 -ml-1 text-muted-foreground"
          render={<Link href="/gallery" />}
        >
          <ArrowLeft className="size-4" />
          Continue Shopping
        </Button>
        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground">
          Your Cart
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {cart.length} {cart.length === 1 ? "item" : "items"}
        </p>
      </div>

      {/* Cart table */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Artwork</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">Qty</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
              <TableHead className="w-10 pr-4" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {cart.map((item, index) => (
              <TableRow key={index}>
                {/* Artwork title */}
                <TableCell className="pl-4">
                  <Link
                    href={`/gallery/${item.artworkSlug}`}
                    className="font-serif text-sm font-semibold text-foreground transition-colors hover:text-primary"
                  >
                    {item.artworkTitle}
                  </Link>
                  {/* Show type inline on small screens */}
                  <p className="mt-0.5 text-xs text-muted-foreground sm:hidden">
                    {itemLabel(item)}
                  </p>
                </TableCell>

                {/* Type (hidden on small screens, shown inline above) */}
                <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                  {itemLabel(item)}
                </TableCell>

                {/* Unit price */}
                <TableCell className="text-right text-sm tabular-nums text-foreground">
                  {formatPrice(item.price)}
                </TableCell>

                {/* Quantity controls */}
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    {item.isOriginal ? (
                      <span className="px-2 text-sm tabular-nums text-foreground">
                        1
                      </span>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="icon-xs"
                          aria-label="Decrease quantity"
                          disabled={item.quantity <= 1}
                          onClick={() => handleQuantity(index, -1)}
                        >
                          <Minus />
                        </Button>
                        <span className="w-6 text-center text-sm tabular-nums text-foreground">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon-xs"
                          aria-label="Increase quantity"
                          onClick={() => handleQuantity(index, 1)}
                        >
                          <Plus />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>

                {/* Line total */}
                <TableCell className="text-right text-sm font-medium tabular-nums text-foreground">
                  {formatPrice(item.price * item.quantity)}
                </TableCell>

                {/* Remove */}
                <TableCell className="pr-4 text-right">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    aria-label={`Remove ${item.artworkTitle}`}
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => handleRemove(index)}
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={4}
                className="pl-4 text-right text-base font-semibold text-foreground"
              >
                Subtotal
              </TableCell>
              <TableCell className="text-right text-base font-bold tabular-nums text-foreground">
                {formatPrice(total)}
              </TableCell>
              <TableCell className="pr-4" />
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col items-end gap-3 sm:flex-row sm:justify-end">
        <Button
          variant="outline"
          size="lg"
          render={<Link href="/gallery" />}
        >
          <ArrowLeft className="size-4" />
          Continue Shopping
        </Button>
        <Button
          size="lg"
          render={<Link href="/checkout" />}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
