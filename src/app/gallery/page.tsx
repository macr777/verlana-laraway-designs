import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FramedPainting } from "@/components/FramedPainting";
import { getActiveArtworks } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse Verlana Laraway's collection of original watercolor paintings and fine art prints — Montana landscapes, wildlife, portraits, and more.",
};

export default async function GalleryPage() {
  const artworks = await getActiveArtworks();

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
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {artworks.map((artwork) => (
          <Link
            key={artwork.id}
            href={`/gallery/${artwork.slug}`}
            className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
          >
            <Card className="overflow-visible border-0 bg-transparent ring-0 transition-transform duration-200 group-hover:-translate-y-1 py-0">
              {/* Framed painting */}
              <div className="relative">
                <FramedPainting
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Sold badge overlay */}
                {artwork.originalSold && (
                  <div className="absolute top-5 left-5 z-10">
                    <Badge variant="secondary" className="text-xs">
                      Original Sold — Prints Available
                    </Badge>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="flex flex-col gap-1 px-1 pt-2">
                <h2 className="font-serif text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                  {artwork.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {artwork.widthInches}&quot; &times; {artwork.heightInches}&quot;
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  ${artwork.originalPrice.toLocaleString()}.00
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
