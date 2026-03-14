import type { Metadata } from "next";
import Link from "next/link";
import { Palette } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse Verlana Laraway's collection of original watercolor paintings and fine art prints — Montana landscapes, botanicals, and more.",
};

interface Artwork {
  id: number;
  title: string;
  slug: string;
  dimensions: string;
  price: number;
  originalSold: boolean;
  imagePlaceholder: true;
}

const artworks: Artwork[] = [
  {
    id: 1,
    title: "Glacier Morning Light",
    slug: "glacier-morning-light",
    dimensions: "12×16",
    price: 485,
    originalSold: false,
    imagePlaceholder: true,
  },
  {
    id: 2,
    title: "Whitefish Lake at Dusk",
    slug: "whitefish-lake-at-dusk",
    dimensions: "9×12",
    price: 320,
    originalSold: true,
    imagePlaceholder: true,
  },
  {
    id: 3,
    title: "Wild Prairie Blooms",
    slug: "wild-prairie-blooms",
    dimensions: "11×14",
    price: 395,
    originalSold: false,
    imagePlaceholder: true,
  },
  {
    id: 4,
    title: "Swan River Reflections",
    slug: "swan-river-reflections",
    dimensions: "16×20",
    price: 650,
    originalSold: false,
    imagePlaceholder: true,
  },
  {
    id: 5,
    title: "Bighorn in Snow",
    slug: "bighorn-in-snow",
    dimensions: "12×16",
    price: 520,
    originalSold: true,
    imagePlaceholder: true,
  },
  {
    id: 6,
    title: "Autumn Aspens, Flathead Valley",
    slug: "autumn-aspens-flathead-valley",
    dimensions: "14×18",
    price: 575,
    originalSold: false,
    imagePlaceholder: true,
  },
];

function formatPrice(cents: number): string {
  return `$${cents.toFixed(2)}`;
}

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-10 text-center">
        <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Gallery
        </h1>
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">
          Browse Verlana&apos;s collection of original watercolor paintings and
          prints
        </p>
      </div>

      {/* Artwork grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {artworks.map((artwork) => (
          <Link
            key={artwork.id}
            href={`/gallery/${artwork.slug}`}
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
          >
            <Card className="overflow-hidden transition-shadow duration-300 group-hover:shadow-md py-0">
              {/* Image placeholder — aspect-ratio 3/4 */}
              <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-stone-200 dark:bg-stone-700">
                  <Palette
                    className="size-10 text-stone-400 dark:text-stone-500"
                    strokeWidth={1.25}
                  />
                  <span className="text-xs text-stone-400 dark:text-stone-500 select-none">
                    {artwork.dimensions}
                  </span>
                </div>

                {/* Sold badge overlay */}
                {artwork.originalSold && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="text-xs">
                      Original Sold — Prints Available
                    </Badge>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="flex flex-col gap-1 px-4 py-3">
                <h2 className="font-serif text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                  {artwork.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {artwork.dimensions} inches
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {formatPrice(artwork.price)}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
