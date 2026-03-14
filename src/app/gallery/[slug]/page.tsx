import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FramedPainting } from "@/components/FramedPainting";
import { getArtworkBySlug, getActiveArtworks } from "@/lib/queries";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const artworks = await getActiveArtworks();
  return artworks.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);
  if (!artwork) return { title: "Not Found" };
  return {
    title: artwork.title,
    description: `${artwork.title} — an original watercolor painting by Verlana Laraway. ${artwork.widthInches}" × ${artwork.heightInches}". ${artwork.originalSold ? "Original sold; prints available." : "Original available."}`,
  };
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = await getArtworkBySlug(slug);
  if (!artwork) notFound();

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
        {/* Left — Framed Image */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-24">
          <FramedPainting
            src={artwork.imageUrl}
            alt={artwork.title}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Right — Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          {/* Title */}
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {artwork.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Watercolor on paper &mdash; {artwork.widthInches}&quot; &times;{" "}
              {artwork.heightInches}&quot;
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
                  ${artwork.originalPrice.toLocaleString()}.00
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
              {artwork.printOptions.map((print) => (
                <li
                  key={print.sizeName}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
                >
                  <div>
                    <span className="text-sm font-medium text-foreground">
                      {print.sizeName}
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
