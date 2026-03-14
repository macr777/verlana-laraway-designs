import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Artworks" };
export const dynamic = "force-dynamic";

export default async function ArtworksPage() {
  const artworks = await prisma.artwork.findMany({
    include: { category: true },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-stone-800">
            Artworks
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Manage your artwork catalog ({artworks.length} works)
          </p>
        </div>
        <Button render={<Link href="/admin/artworks/new" />} size="sm">
          <Plus className="size-4" />
          Add New Artwork
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white ring-1 ring-stone-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-stone-50">
              <TableHead className="w-16 pl-4">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Dimensions</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-4 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {artworks.map((artwork) => (
              <TableRow key={artwork.id}>
                <TableCell className="pl-4">
                  <div className="relative h-10 w-10 overflow-hidden rounded-md bg-stone-100">
                    <Image
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium text-stone-800">
                  {artwork.title}
                </TableCell>
                <TableCell className="text-stone-500">
                  {artwork.category.name}
                </TableCell>
                <TableCell className="text-stone-500">
                  {artwork.widthInches}&quot; &times; {artwork.heightInches}
                  &quot;
                </TableCell>
                <TableCell className="font-semibold text-stone-700">
                  ${Number(artwork.originalPrice).toLocaleString()}.00
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      artwork.active
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    {artwork.active ? "Active" : "Inactive"}
                  </span>
                </TableCell>
                <TableCell className="pr-4 text-right">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    render={
                      <Link
                        href={`/admin/artworks/${artwork.id}/edit`}
                        aria-label={`Edit ${artwork.title}`}
                      />
                    }
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
