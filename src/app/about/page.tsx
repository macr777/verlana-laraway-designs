import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About the Artist",
  description:
    "Meet Verlana 'V' Laraway — a contemporary watercolor artist based in the woods of Whitefish, Montana, painting her way back to a lifelong passion.",
};

const bioParagraphs = [
  "Verlana 'V' Laraway is a contemporary artist based in the woods of Whitefish, Montana, where she lives with her husband and youngest son.",
  "She's originally from rural central Ohio, but she's really from all over the country, having lived in 20 different houses and well over 10 states. This broad experience across America gives her a uniquely informed perspective in her work.",
  "Her early talent was formally recognized with a summer scholarship to the Columbus College of Art & Design through the national art honor society; however, logistical challenges meant her dream of becoming a professional artist was temporarily put on hold.",
  "V went on to serve as a Navy Nurse, specializing in labor and delivery. After delivering thousands of babies and continuing her work in civilian life, she shifted her focus to raising her three sons, dedicating herself to what she calls her 'life's work.'",
  "As her sons have grown, Verlana has found renewed time to return to her passion. For years, she gifted her original paintings as cards and presents until, encouraged by friends and her husband, she finally decided to share her work professionally. Welcome to her collection.",
];

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="bg-secondary/40 border-b border-border px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 font-sans text-xs font-light uppercase tracking-[0.3em] text-muted-foreground">
            The Artist
          </p>
          <h1 className="font-serif text-5xl font-semibold leading-tight tracking-wide text-foreground sm:text-6xl">
            About the Artist
          </h1>
          <div className="mx-auto mt-6 h-px w-16 bg-accent/50" />
        </div>
      </section>

      {/* Bio section */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          {/* Artist photo placeholder */}
          <div className="flex flex-col items-center md:items-start">
            <div className="aspect-square w-full max-w-sm overflow-hidden rounded-2xl bg-stone-200 shadow-md">
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-stone-300/70" />
                  <p className="font-sans text-sm font-light tracking-wide text-stone-500">
                    Artist Photo
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 font-sans text-xs tracking-widest text-muted-foreground uppercase text-center md:text-left w-full max-w-sm">
              Verlana Laraway — Whitefish, Montana
            </p>
          </div>

          {/* Bio text */}
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              {bioParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-sans text-base leading-8 text-foreground/85 md:text-[1.0625rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-border" />
      </div>

      {/* CTA */}
      <section className="px-6 py-20 text-center sm:py-24">
        <div className="mx-auto max-w-lg">
          <h2 className="font-serif text-3xl font-semibold tracking-wide text-foreground sm:text-4xl">
            See Her Work
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground">
            Browse Verlana's original watercolor paintings and fine art prints —
            each one a piece of the places and moments that shaped her.
          </p>
          <div className="mt-10">
            <Button
              render={<Link href="/gallery" />}
              size="lg"
              className="rounded-full px-10 py-6 font-sans text-base tracking-wide shadow-sm transition-opacity hover:opacity-90"
            >
              Explore the Collection
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
