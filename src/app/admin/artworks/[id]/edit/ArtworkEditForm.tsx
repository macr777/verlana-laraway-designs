"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateArtwork, deleteArtwork } from "../../actions";

type Category = { id: number; name: string };
type Artwork = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  categoryId: number;
  widthInches: number;
  heightInches: number;
  originalPrice: number;
  originalSold: boolean;
  featured: boolean;
  active: boolean;
  imageUrl: string;
  sortOrder: number;
};

export function ArtworkEditForm({
  artwork,
  categories,
}: {
  artwork: Artwork;
  categories: Category[];
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      updateArtwork(artwork.id, formData);
    });
  }

  function handleDelete() {
    if (!confirm("Are you sure you want to delete this artwork? This cannot be undone.")) return;
    startTransition(() => {
      deleteArtwork(artwork.id);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Image preview */}
      <div className="flex items-start gap-6">
        <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-lg bg-stone-100 ring-1 ring-stone-200">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            className="object-cover"
            sizes="128px"
          />
        </div>
        <div className="flex-1 space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            defaultValue={artwork.imageUrl}
            required
            className="h-9"
          />
          <p className="text-xs text-stone-400">
            Path to the painting image (e.g. /paintings/mountain-sentinel.jpg)
          </p>
        </div>
      </div>

      {/* Title & Slug */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            defaultValue={artwork.title}
            required
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="categoryId">Category</Label>
          <select
            id="categoryId"
            name="categoryId"
            defaultValue={artwork.categoryId}
            className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={artwork.description || ""}
          rows={4}
        />
      </div>

      {/* Dimensions & Price */}
      <div className="grid gap-6 sm:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="widthInches">Width (inches)</Label>
          <Input
            id="widthInches"
            name="widthInches"
            type="number"
            step="0.5"
            defaultValue={artwork.widthInches}
            required
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="heightInches">Height (inches)</Label>
          <Input
            id="heightInches"
            name="heightInches"
            type="number"
            step="0.5"
            defaultValue={artwork.heightInches}
            required
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="originalPrice">Price ($)</Label>
          <Input
            id="originalPrice"
            name="originalPrice"
            type="number"
            step="1"
            defaultValue={artwork.originalPrice}
            required
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sortOrder">Sort Order</Label>
          <Input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={artwork.sortOrder}
            className="h-9"
          />
        </div>
      </div>

      {/* Checkboxes */}
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm text-stone-700">
          <input
            type="checkbox"
            name="active"
            defaultChecked={artwork.active}
            className="size-4 rounded border-stone-300"
          />
          Active (visible in gallery)
        </label>
        <label className="flex items-center gap-2 text-sm text-stone-700">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={artwork.featured}
            className="size-4 rounded border-stone-300"
          />
          Featured (shown on home page)
        </label>
        <label className="flex items-center gap-2 text-sm text-stone-700">
          <input
            type="checkbox"
            name="originalSold"
            defaultChecked={artwork.originalSold}
            className="size-4 rounded border-stone-300"
          />
          Original Sold
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between border-t border-stone-200 pt-6">
        <Button
          type="button"
          variant="ghost"
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={handleDelete}
          disabled={isPending}
        >
          Delete Artwork
        </Button>
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/artworks")}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </div>
    </form>
  );
}
