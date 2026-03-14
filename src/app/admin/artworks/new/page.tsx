import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ArtworkNewForm } from "./ArtworkNewForm";

export const metadata: Metadata = { title: "Add New Artwork" };
export const dynamic = "force-dynamic";

export default async function NewArtworkPage() {
  const categories = await prisma.artworkCategory.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-semibold text-stone-800">
          Add New Artwork
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Add a new painting to the gallery
        </p>
      </div>

      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 ring-1 ring-stone-200">
        <ArtworkNewForm categories={categories} />
      </div>
    </div>
  );
}
