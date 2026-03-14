import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Palette, Printer, Package } from "lucide-react";

const featuredWorks = [
  {
    id: 1,
    title: "Glacier Morning Light",
    dimensions: '11" × 14"',
    price: "$380",
  },
  {
    id: 2,
    title: "Whitefish Lake at Dusk",
    dimensions: '9" × 12"',
    price: "$295",
  },
  {
    id: 3,
    title: "Mountain Lupine Field",
    dimensions: '12" × 16"',
    price: "$420",
  },
];

const whyBuy = [
  {
    icon: Palette,
    heading: "One of a Kind",
    body: "Every original painting is a singular work — signed, dated, and never reproduced as an original.",
  },
  {
    icon: Printer,
    heading: "Quality Prints Available",
    body: "Museum-quality giclée prints on archival paper, produced in small runs so each feels special.",
  },
  {
    icon: Package,
    heading: "Ships from Montana",
    body: "Carefully packed and shipped directly from Whitefish. Flat-rate shipping on all U.S. orders.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative bg-background">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Copy */}
            <div className="flex flex-col gap-7">
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Whitefish, Montana
              </p>
              <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Original Watercolor Art from the Heart of Montana
              </h1>
              <p className="max-w-prose text-lg leading-relaxed text-muted-foreground">
                Handcrafted paintings by Verlana Laraway, inspired by the wild
                beauty of Whitefish, Montana — the mountains, the light on the
                lake, the meadows in bloom.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  render={<Link href="/gallery" />}
                  className="h-11 rounded-full px-8 text-base font-medium"
                >
                  Explore the Gallery
                </Button>
                <Button
                  render={<Link href="/about" />}
                  variant="outline"
                  className="h-11 rounded-full px-8 text-base font-medium"
                >
                  Meet the Artist
                </Button>
              </div>
            </div>

            {/* Hero image placeholder */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-secondary/60 ring-1 ring-foreground/8 lg:aspect-[3/4]">
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-background/70">
                    <Palette className="size-7 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Hero image
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/60">
                    Featured painting — coming soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
      </section>

      {/* ── Featured Works ───────────────────────────────────────── */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* Section header */}
          <div className="mb-14 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Original Paintings
              </p>
              <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
                Featured Works
              </h2>
            </div>
            <Link
              href="/gallery"
              className="shrink-0 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              View all paintings →
            </Link>
          </div>

          {/* Artwork grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredWorks.map((work) => (
              <Card
                key={work.id}
                className="cursor-pointer border-0 bg-transparent ring-0 transition-transform duration-200 hover:-translate-y-1"
              >
                {/* Image placeholder */}
                <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-secondary/70 ring-1 ring-foreground/8">
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-background/60">
                        <Palette className="size-5 text-muted-foreground/60" />
                      </div>
                      <p className="text-xs text-muted-foreground/50">
                        Artwork photo
                      </p>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <CardContent className="px-1 pt-4 pb-0">
                  <h3 className="font-serif text-lg font-medium leading-snug text-foreground">
                    {work.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Watercolor on archival paper &mdash; {work.dimensions}
                  </p>
                  <p className="mt-3 text-base font-semibold text-foreground">
                    {work.price}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 text-center">
            <Button
              render={<Link href="/gallery" />}
              variant="outline"
              className="h-11 rounded-full px-10 text-base"
            >
              View Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* ── Artist Preview ───────────────────────────────────────── */}
      <section className="border-y border-border bg-secondary/30 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Photo placeholder */}
            <div className="order-2 aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-secondary/80 ring-1 ring-foreground/8 lg:order-1">
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-background/70">
                    <Palette className="size-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Artist photo
                  </p>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="order-1 flex flex-col gap-5 lg:order-2">
              <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                The Artist
              </p>
              <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
                Meet Verlana
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Verlana Laraway paints what she loves — the Glacier peaks, the
                wild lupine meadows, the way afternoon light breaks across
                Whitefish Lake. Each piece begins outside and finishes in her
                studio in the mountains she calls home.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-base font-medium text-primary underline-offset-4 hover:underline"
                >
                  Read her story →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Buy Original Art ─────────────────────────────────── */}
      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
              Why Choose Original Art
            </h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {whyBuy.map(({ icon: Icon, heading, body }) => (
              <div
                key={heading}
                className="flex flex-col items-center gap-4 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Icon className="size-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {heading}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
