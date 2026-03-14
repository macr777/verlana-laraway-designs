import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArtworkEditForm } from "./ArtworkEditForm";

export const metadata: Metadata = { title: "Edit Artwork" };
export const dynamic = "force-dynamic";

export default async function EditArtworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artworkId = Number(id);
  if (Number.isNaN(artworkId)) notFound();

  const [artwork, categories] = await Promise.all([
    prisma.artwork.findUnique({ where: { id: artworkId } }),
    prisma.artworkCategory.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!artwork) notFound();

  return (
    <div className="px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-semibold text-stone-800">
          Edit Artwork
        </h1>
        <p className="mt-1 text-sm text-stone-500">{artwork.title}</p>
      </div>

      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 ring-1 ring-stone-200">
        <ArtworkEditForm
          artwork={{
            ...artwork,
            originalPrice: Number(artwork.originalPrice),
          }}
          categories={categories}
        />
      </div>
    </div>
  );
}
