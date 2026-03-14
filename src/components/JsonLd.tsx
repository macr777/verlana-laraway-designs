const BASE_URL = "https://verlana-laraway-designs.vercel.app";

// ─── Schema helpers ──────────────────────────────────────────────────────────

export function getWebSiteJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Verlana Laraway Designs",
    url: BASE_URL,
    description:
      "Original watercolor paintings and prints by Verlana Laraway, a contemporary artist based in Whitefish, Montana.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/gallery?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getPersonJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Verlana Laraway",
    jobTitle: "Watercolor Artist",
    url: BASE_URL,
    sameAs: [],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Whitefish",
      addressRegion: "MT",
      addressCountry: "US",
    },
    description:
      "Verlana Laraway is a contemporary watercolor artist based in Whitefish, Montana, known for her vibrant landscapes and nature-inspired paintings.",
  };
}

export interface ArtworkData {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  slug: string;
  inStock: boolean;
}

export function getProductJsonLd(artwork: ArtworkData): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: artwork.title,
    description: artwork.description,
    image: artwork.imageUrl,
    url: `${BASE_URL}/gallery/${artwork.slug}`,
    brand: {
      "@type": "Person",
      name: "Verlana Laraway",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: artwork.price.toFixed(2),
      availability: artwork.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${BASE_URL}/gallery/${artwork.slug}`,
      seller: {
        "@type": "Person",
        name: "Verlana Laraway",
      },
    },
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Server component that injects a JSON-LD structured data script tag.
 * Renders safely — dangerouslySetInnerHTML is acceptable here because
 * the data originates from our own helpers, not user input.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
