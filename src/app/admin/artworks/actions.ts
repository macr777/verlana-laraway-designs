"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function updateArtwork(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || null;
  const categoryId = Number(formData.get("categoryId"));
  const widthInches = Number(formData.get("widthInches"));
  const heightInches = Number(formData.get("heightInches"));
  const originalPrice = Number(formData.get("originalPrice"));
  const originalSold = formData.get("originalSold") === "on";
  const featured = formData.get("featured") === "on";
  const active = formData.get("active") === "on";
  const imageUrl = formData.get("imageUrl") as string;
  const sortOrder = Number(formData.get("sortOrder") || 0);

  await prisma.artwork.update({
    where: { id },
    data: {
      title,
      slug: slugify(title),
      description,
      categoryId,
      widthInches,
      heightInches,
      originalPrice,
      originalSold,
      featured,
      active,
      imageUrl,
      sortOrder,
    },
  });

  revalidatePath("/admin/artworks");
  revalidatePath("/gallery");
  revalidatePath("/");
  redirect("/admin/artworks");
}

export async function createArtwork(formData: FormData) {
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || null;
  const categoryId = Number(formData.get("categoryId"));
  const widthInches = Number(formData.get("widthInches"));
  const heightInches = Number(formData.get("heightInches"));
  const originalPrice = Number(formData.get("originalPrice"));
  const originalSold = formData.get("originalSold") === "on";
  const featured = formData.get("featured") === "on";
  const active = formData.get("active") !== null ? formData.get("active") === "on" : true;
  const imageUrl = formData.get("imageUrl") as string;
  const sortOrder = Number(formData.get("sortOrder") || 0);

  await prisma.artwork.create({
    data: {
      title,
      slug: slugify(title),
      description,
      categoryId,
      widthInches,
      heightInches,
      originalPrice,
      originalSold,
      featured,
      active,
      imageUrl,
      sortOrder,
    },
  });

  revalidatePath("/admin/artworks");
  revalidatePath("/gallery");
  revalidatePath("/");
  redirect("/admin/artworks");
}

export async function deleteArtwork(id: number) {
  await prisma.artwork.delete({ where: { id } });

  revalidatePath("/admin/artworks");
  revalidatePath("/gallery");
  revalidatePath("/");
  redirect("/admin/artworks");
}

export async function addPrintOption(artworkId: number, formData: FormData) {
  const sizeName = formData.get("sizeName") as string;
  const widthInches = Number(formData.get("printWidth"));
  const heightInches = Number(formData.get("printHeight"));
  const price = Number(formData.get("printPrice"));

  await prisma.printOption.create({
    data: { artworkId, sizeName, widthInches, heightInches, price },
  });

  revalidatePath(`/admin/artworks/${artworkId}/edit`);
  revalidatePath("/gallery");
}

export async function updatePrintOption(printId: number, artworkId: number, formData: FormData) {
  const sizeName = formData.get("sizeName") as string;
  const widthInches = Number(formData.get("printWidth"));
  const heightInches = Number(formData.get("printHeight"));
  const price = Number(formData.get("printPrice"));
  const inStock = formData.get("inStock") === "on";
  const active = formData.get("active") === "on";

  await prisma.printOption.update({
    where: { id: printId },
    data: { sizeName, widthInches, heightInches, price, inStock, active },
  });

  revalidatePath(`/admin/artworks/${artworkId}/edit`);
  revalidatePath("/gallery");
}

export async function deletePrintOption(printId: number, artworkId: number) {
  await prisma.printOption.delete({ where: { id: printId } });

  revalidatePath(`/admin/artworks/${artworkId}/edit`);
  revalidatePath("/gallery");
}
