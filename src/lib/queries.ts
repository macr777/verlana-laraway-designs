import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

type ArtworkWithRelations = Prisma.ArtworkGetPayload<{
  include: { category: true; printOptions: true };
}>;

export async function getActiveArtworks() {
  const artworks = await prisma.artwork.findMany({
    where: { active: true },
    include: {
      category: true,
      printOptions: { where: { active: true }, orderBy: { price: "asc" } },
    },
    orderBy: { sortOrder: "asc" },
  });
  return artworks.map(serializeArtwork);
}

export async function getFeaturedArtworks() {
  const artworks = await prisma.artwork.findMany({
    where: { active: true, featured: true },
    include: {
      category: true,
      printOptions: { where: { active: true }, orderBy: { price: "asc" } },
    },
    orderBy: { sortOrder: "asc" },
  });
  return artworks.map(serializeArtwork);
}

export async function getArtworkBySlug(slug: string) {
  const artwork = await prisma.artwork.findUnique({
    where: { slug },
    include: {
      category: true,
      printOptions: { where: { active: true }, orderBy: { price: "asc" } },
    },
  });
  if (!artwork) return null;
  return serializeArtwork(artwork);
}

export async function getCategories() {
  return prisma.artworkCategory.findMany({
    orderBy: { name: "asc" },
  });
}

// Convert Prisma Decimal types to numbers for use in components
function serializeArtwork(artwork: ArtworkWithRelations) {
  return {
    ...artwork,
    originalPrice: Number(artwork.originalPrice),
    printOptions: artwork.printOptions.map((p) => ({
      ...p,
      price: Number(p.price),
    })),
  };
}
