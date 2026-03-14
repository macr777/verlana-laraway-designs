import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ---------------------------------------------------------------------------
// Placeholder data — replace with DB lookups once Prisma is connected
// ---------------------------------------------------------------------------

interface PrintOption {
  size: string;
  price: number;
}

interface ArtworkDetail {
  title: string;
  slug: string;
  dimensions: string;
  price: number;
  originalSold: boolean;
  description: string;
  prints: PrintOption[];
}

const placeholderArtworks: Record<string, ArtworkDetail> = {
  "glacier-morning-light": {
    title: "Glacier Morning Light",
    slug: "glacier-morning-light",
    dimensions: "12 × 16",
    price: 485,
    originalSold: false,
    description:
      "Soft alpenglow washes across the peaks of Glacier National Park in the quiet moments just after sunrise. Painted en plein air during a July morning, this piece captures the fleeting pink and amber tones that briefly illuminate the high country before giving way to the clear blue of a Montana summer day.",
    prints: [
      { size: "5 × 7", price: 35 },
      { size: "8 × 10", price: 65 },
      { size: "11 × 14", price: 110 },
      { size: "16 × 20", price: 175 },
    ],
  },
  "whitefish-lake-at-dusk": {
    title: "Whitefish Lake at Dusk",
    slug: "whitefish-lake-at-dusk",
    dimensions: "9 × 12",
    price: 320,
    originalSold: true,
    description:
      "The still surface of Whitefish Lake mirrors a gradient of violet and deep rose as the last light of day fades behind the Cabinet Mountains. A favorite evening view from the east shore, captured in a single watercolor session with wet-on-wet technique.",
    prints: [
      { size: "5 × 7", price: 30 },
      { size: "8 × 10", price: 55 },
      { size: "11 × 14", price: 95 },
    ],
  },
};

// Fallback detail for slugs not in the placeholder map
function buildFallback(slug: string): ArtworkDetail {
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title,
    slug,
    dimensions: "12 × 16",
    price: 425,
    originalSold: false,
    description:
      "An original watercolor painting by Verlana Laraway, inspired by the landscapes and natural beauty of northwestern Montana. Each painting is created with archival-quality pigments on 140 lb cold-press paper.",
    prints: [
      { size: "5 × 7", price: 35 },
      { size: "8 × 10", price: 65 },
      { size: "11 × 14", price: 110 },
    ],
  };
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artwork = placeholderArtworks[slug] ?? buildFallback(slug);
  return {
    title: artwork.title,
    description: `${artwork.title} — an original watercolor painting by Verlana Laraway. ${artwork.dimensions} inches. ${artwork.originalSold ? "Original sold; prints available." : "Original available."}`,
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = placeholderArtworks[slug] ?? buildFallback(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/gallery"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        Back to Gallery
      </Link>

      {/* Main content */}
      <div className="mt-2 flex flex-col gap-10 lg:flex-row lg:gap-14 lg:items-start">
        {/* ----------------------------------------------------------------- */}
        {/* Left — Image                                                       */}
        {/* ----------------------------------------------------------------- */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-24">
          <div
            className="relative w-full overflow-hidden rounded-xl bg-stone-200 dark:bg-stone-700"
            style={{ aspectRatio: "3/4" }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <Palette
                className="size-16 text-stone-400 dark:text-stone-500"
                strokeWidth={1.25}
              />
              <span className="text-sm text-stone-400 dark:text-stone-500 select-none">
                {artwork.dimensions} inches
              </span>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Right — Details                                                    */}
        {/* ----------------------------------------------------------------- */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          {/* Title */}
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {artwork.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Watercolor on paper &mdash; {artwork.dimensions} inches
            </p>
          </div>

          {/* Original section */}
          <section aria-labelledby="original-heading">
            <h2
              id="original-heading"
              className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Original Painting
            </h2>

            {artwork.originalSold ? (
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-sm px-3 py-1 h-auto">
                  Sold
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Prints are still available below
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-2xl font-semibold text-foreground">
                  ${artwork.price.toFixed(2)}
                </span>
                <Button size="lg" className="gap-2">
                  <ShoppingCart className="size-4" />
                  Add to Cart
                </Button>
              </div>
            )}
          </section>

          {/* Prints section */}
          <section aria-labelledby="prints-heading">
            <h2
              id="prints-heading"
              className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Available Prints
            </h2>

            <ul className="flex flex-col gap-3">
              {artwork.prints.map((print) => (
                <li
                  key={print.size}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
                >
                  <div>
                    <span className="text-sm font-medium text-foreground">
                      {print.size} inches
                    </span>
                    <span className="ml-3 text-sm text-muted-foreground">
                      ${print.price.toFixed(2)}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <ShoppingCart className="size-3.5" />
                    Add to Cart
                  </Button>
                </li>
              ))}
            </ul>
          </section>

          {/* Description */}
          <section aria-labelledby="description-heading">
            <h2
              id="description-heading"
              className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
            >
              About This Piece
            </h2>
            <p className="text-sm leading-relaxed text-foreground/80">
              {artwork.description}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
