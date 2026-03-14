import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, Printer, Package } from "lucide-react";
import { FramedPainting } from "@/components/FramedPainting";
import { getFeaturedArtworks } from "@/lib/queries";

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

export default async function HomePage() {
  const featured = await getFeaturedArtworks();

  return (
    <>
      {/* Hero */}
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

            {/* Hero image — framed featured painting */}
            <FramedPainting
              src="/paintings/mountain-sentinel.jpg"
              alt="Mountain Sentinel — watercolor painting by Verlana Laraway"
              sizes="(max-width: 1024px) 100vw, 50vw"
              aspectRatio="3/4"
              priority
              showDisclaimer={false}
            />
          </div>
        </div>

        {/* Subtle divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
      </section>

      {/* Featured Works */}
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
            {featured.slice(0, 6).map((work) => (
              <Link key={work.id} href={`/gallery/${work.slug}`} className="group">
                <Card className="cursor-pointer border-0 bg-transparent ring-0 transition-transform duration-200 group-hover:-translate-y-1">
                  {/* Framed painting */}
                  <FramedPainting
                    src={work.imageUrl}
                    alt={work.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Info */}
                  <CardContent className="px-1 pt-3 pb-0">
                    <h3 className="font-serif text-lg font-medium leading-snug text-foreground group-hover:text-primary transition-colors">
                      {work.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Watercolor on archival paper &mdash; {work.widthInches}&quot;
                      &times; {work.heightInches}&quot;
                    </p>
                    <p className="mt-3 text-base font-semibold text-foreground">
                      ${work.originalPrice.toLocaleString()}.00
                    </p>
                  </CardContent>
                </Card>
              </Link>
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

      {/* Artist Preview */}
      <section className="border-y border-border bg-secondary/30 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Artist photo */}
            <div className="order-2 relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl ring-1 ring-foreground/8 lg:order-1">
              <Image
                src="/verlana-portrait.jpg"
                alt="Verlana Laraway — watercolor artist from Whitefish, Montana"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
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

      {/* Why Buy Original Art */}
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
