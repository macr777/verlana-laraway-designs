import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Artworks",
};

type ArtworkStatus = "Active" | "Inactive";

interface Artwork {
  id: number;
  title: string;
  category: string;
  dimensions: string;
  price: string;
  status: ArtworkStatus;
}

const placeholderArtworks: Artwork[] = [
  {
    id: 1,
    title: "Glacier Morning Light",
    category: "Watercolor Paintings",
    dimensions: '11" × 14"',
    price: "$380",
    status: "Active",
  },
  {
    id: 2,
    title: "Whitefish Lake at Dusk",
    category: "Watercolor Paintings",
    dimensions: '9" × 12"',
    price: "$295",
    status: "Active",
  },
  {
    id: 3,
    title: "Mountain Lupine Field",
    category: "Watercolor Paintings",
    dimensions: '12" × 16"',
    price: "$420",
    status: "Active",
  },
  {
    id: 4,
    title: "Bigfork Autumn Reflections",
    category: "Watercolor Paintings",
    dimensions: '16" × 20"',
    price: "$560",
    status: "Active",
  },
  {
    id: 5,
    title: "Wild Beargrass Study",
    category: "Botanical Studies",
    dimensions: '8" × 10"',
    price: "$195",
    status: "Active",
  },
  {
    id: 6,
    title: "Swan Range at Twilight",
    category: "Watercolor Paintings",
    dimensions: '18" × 24"',
    price: "$720",
    status: "Inactive",
  },
  {
    id: 7,
    title: "Flathead River Bend",
    category: "Watercolor Paintings",
    dimensions: '11" × 14"',
    price: "$350",
    status: "Active",
  },
  {
    id: 8,
    title: "Huckleberry Season",
    category: "Botanical Studies",
    dimensions: '6" × 8"',
    price: "$145",
    status: "Inactive",
  },
];

const statusStyles: Record<ArtworkStatus, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Inactive: "bg-stone-100 text-stone-500",
};

export default function ArtworksPage() {
  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-stone-800">
            Artworks
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Manage your artwork catalog ({placeholderArtworks.length} works)
          </p>
        </div>
        <Button render={<Link href="/admin/artworks/new" />} size="sm">
          <Plus className="size-4" />
          Add New Artwork
        </Button>
      </div>

      {/* Table */}
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
            {placeholderArtworks.map((artwork) => (
              <TableRow key={artwork.id}>
                {/* Thumbnail placeholder */}
                <TableCell className="pl-4">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md bg-stone-100">
                    <ImageIcon className="size-4 text-stone-400" />
                  </div>
                </TableCell>

                <TableCell className="font-medium text-stone-800">
                  {artwork.title}
                </TableCell>

                <TableCell className="text-stone-500">{artwork.category}</TableCell>

                <TableCell className="text-stone-500">{artwork.dimensions}</TableCell>

                <TableCell className="font-semibold text-stone-700">
                  {artwork.price}
                </TableCell>

                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[artwork.status]}`}
                  >
                    {artwork.status}
                  </span>
                </TableCell>

                <TableCell className="pr-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Edit ${artwork.title}`}
                    >
                      <Pencil className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Delete ${artwork.title}`}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
