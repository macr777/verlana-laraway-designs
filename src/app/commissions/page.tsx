import type { Metadata } from "next";
import Image from "next/image";
import { Paintbrush, Clock, MessageCircle, Palette } from "lucide-react";
import { CommissionForm } from "@/components/CommissionForm";

export const metadata: Metadata = {
  title: "Commission a Painting",
  description:
    "Request a custom watercolor painting by Verlana Laraway. Personalized original artwork created just for you — landscapes, portraits, pets, and more.",
};

const processSteps = [
  {
    icon: MessageCircle,
    title: "Share Your Vision",
    description:
      "Tell Verlana about your idea — a favorite landscape, a beloved pet, a special place. Share reference photos and any details that matter to you.",
  },
  {
    icon: Palette,
    title: "Concept & Quote",
    description:
      "Verlana will discuss size, style, and pricing with you. Every commission is unique, so she'll provide a personalized quote based on your request.",
  },
  {
    icon: Paintbrush,
    title: "Creation",
    description:
      "Once approved, Verlana begins painting. She'll share progress updates along the way so you can see your vision come to life.",
  },
  {
    icon: Clock,
    title: "Delivery",
    description:
      "Your finished painting is carefully packaged and shipped directly to you from Whitefish, Montana. Typical turnaround is 4–8 weeks.",
  },
];

export default function CommissionsPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <section className="bg-secondary/40 border-b border-border px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 font-sans text-xs font-light uppercase tracking-[0.3em] text-muted-foreground">
            Custom Artwork
          </p>
          <h1 className="font-serif text-4xl font-semibold leading-tight tracking-wide text-foreground sm:text-5xl">
            Commission a Painting
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Have something special in mind? Verlana creates custom watercolor
            paintings tailored to your vision — a cherished landscape, a family
            pet, a meaningful place, or anything that speaks to you.
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-accent/50" />
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mb-14 text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            From idea to finished artwork in four simple steps
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map(({ icon: Icon, title, description }, index) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Icon className="size-6 text-primary" />
              </div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Step {index + 1}
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-border" />
      </div>

      {/* What can be commissioned */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Image side */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-foreground/8">
            <Image
              src="/paintings/golden-sunset-on-the-river.jpg"
              alt="Example commissioned watercolor — Golden Sunset on the River by Verlana Laraway"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text side */}
          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
              What Can Be Commissioned
            </h2>
            <ul className="mt-6 space-y-4 text-base leading-relaxed text-foreground/85">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">&#x2022;</span>
                <span>
                  <strong>Landscapes</strong> — A favorite mountain view, lake,
                  trail, or place that holds meaning for you
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">&#x2022;</span>
                <span>
                  <strong>Pet Portraits</strong> — Capture your furry (or
                  feathered) companion in watercolor
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">&#x2022;</span>
                <span>
                  <strong>Homes & Buildings</strong> — A family home, cabin,
                  barn, or any structure with a story
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">&#x2022;</span>
                <span>
                  <strong>Florals & Still Life</strong> — Bouquets, garden
                  scenes, or meaningful objects
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-primary">&#x2022;</span>
                <span>
                  <strong>Custom Gifts</strong> — Wedding, anniversary, or
                  memorial paintings make unforgettable one-of-a-kind gifts
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-border" />
      </div>

      {/* Request form */}
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            Request a Commission
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Fill out the form below and Verlana will get back to you within a
            few days to discuss your project.
          </p>
        </div>

        <CommissionForm />
      </section>

      {/* Pricing note */}
      <section className="border-t border-border bg-secondary/30 px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h3 className="font-serif text-xl font-semibold text-foreground">
            Pricing
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Commission pricing varies based on size, complexity, and subject
            matter. Verlana will provide a detailed quote after discussing your
            project. A 50% deposit is required to begin work, with the balance
            due upon completion. Typical commissions range from $300 to $3,000+.
          </p>
        </div>
      </section>
    </div>
  );
}
