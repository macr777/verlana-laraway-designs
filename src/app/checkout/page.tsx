"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type CartItem, getCart, getCartTotal } from "@/lib/cart";

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

interface ShippingForm {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

const emptyForm: ShippingForm = {
  name: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<ShippingForm>(emptyForm);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setCart(getCart());
    setMounted(true);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const total = getCartTotal(cart);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="h-96 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Back link */}
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 -ml-1 text-muted-foreground"
        render={<Link href="/cart" />}
      >
        <ArrowLeft className="size-4" />
        Back to Cart
      </Button>

      {/* Payment coming soon banner */}
      <div className="mb-8 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-4 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200">
        <AlertCircle className="mt-0.5 size-4 shrink-0" />
        <p>
          <span className="font-semibold">Payment processing is coming soon.</span>{" "}
          For now, please{" "}
          <Link
            href="/about"
            className="underline underline-offset-2 transition-opacity hover:opacity-70"
          >
            contact us directly
          </Link>{" "}
          to complete your order.
        </p>
      </div>

      <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground mb-8">
        Checkout
      </h1>

      {submitted ? (
        /* Confirmation state */
        <div className="flex flex-col items-center gap-6 py-16 text-center">
          <ShoppingCart
            className="size-16 text-primary"
            strokeWidth={1.25}
          />
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Thank you for your interest!
          </h2>
          <p className="max-w-md text-base text-muted-foreground">
            Payment processing is coming soon. We&apos;ve noted your details —
            please reach out via the contact page and we&apos;ll help you
            complete your purchase.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" render={<Link href="/gallery" />}>
              Back to Gallery
            </Button>
            <Button render={<Link href="/about" />}>Contact Us</Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
            {/* Left: Shipping form */}
            <div className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-serif text-xl">
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Smith"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="h-10"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@example.com"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="h-10"
                    />
                  </div>

                  {/* Street address */}
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      autoComplete="street-address"
                      placeholder="123 Glacier Way"
                      required
                      value={form.address}
                      onChange={handleChange}
                      className="h-10"
                    />
                  </div>

                  {/* City / State / Zip */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_6rem_7rem]">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        placeholder="Whitefish"
                        required
                        value={form.city}
                        onChange={handleChange}
                        className="h-10"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        type="text"
                        autoComplete="address-level1"
                        placeholder="MT"
                        maxLength={2}
                        required
                        value={form.state}
                        onChange={handleChange}
                        className="h-10 uppercase"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        name="zip"
                        type="text"
                        autoComplete="postal-code"
                        placeholder="59937"
                        required
                        value={form.zip}
                        onChange={handleChange}
                        className="h-10"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment placeholder card */}
              <Card className="opacity-60">
                <CardHeader>
                  <CardTitle className="font-serif text-xl text-muted-foreground">
                    Payment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Secure payment processing is coming soon. Contact us
                    directly to arrange payment.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right: Order summary */}
            <div className="flex flex-col gap-4">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="font-serif text-xl">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  {cart.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Your cart is empty.{" "}
                      <Link
                        href="/gallery"
                        className="text-primary underline underline-offset-2"
                      >
                        Browse the gallery
                      </Link>
                    </p>
                  ) : (
                    <>
                      <ul className="flex flex-col gap-3">
                        {cart.map((item, i) => (
                          <li key={i} className="flex items-start justify-between gap-3">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium leading-snug text-foreground">
                                {item.artworkTitle}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {itemLabel(item)}
                                {item.quantity > 1 && ` × ${item.quantity}`}
                              </span>
                            </div>
                            <span className="shrink-0 text-sm tabular-nums text-foreground">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Subtotal
                        </span>
                        <span className="text-sm tabular-nums text-foreground">
                          {formatPrice(total)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Shipping
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Calculated at confirmation
                        </span>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-foreground">
                          Total
                        </span>
                        <span className="text-base font-bold tabular-nums text-foreground">
                          {formatPrice(total)}
                        </span>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="mt-2 w-full"
                        disabled={cart.length === 0}
                      >
                        Place Order
                      </Button>

                      <p className="text-center text-xs text-muted-foreground">
                        No payment will be charged — we&apos;ll contact you to
                        complete your order.
                      </p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
