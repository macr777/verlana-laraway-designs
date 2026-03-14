"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createArtwork } from "../actions";

type Category = { id: number; name: string };

export function ArtworkNewForm({ categories }: { categories: Category[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      createArtwork(formData);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Image URL */}
      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          placeholder="/paintings/my-painting.jpg"
          required
          className="h-9"
        />
        <p className="text-xs text-stone-400">
          Path to the painting image (e.g. /paintings/mountain-sentinel.jpg)
        </p>
      </div>

      {/* Title & Category */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" required className="h-9" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="categoryId">Category</Label>
          <select
            id="categoryId"
            name="categoryId"
            required
            className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">Select a category…</option>
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
        <Textarea id="description" name="description" rows={4} />
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
            defaultValue={0}
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
            defaultChecked={true}
            className="size-4 rounded border-stone-300"
          />
          Active (visible in gallery)
        </label>
        <label className="flex items-center gap-2 text-sm text-stone-700">
          <input
            type="checkbox"
            name="featured"
            className="size-4 rounded border-stone-300"
          />
          Featured (shown on home page)
        </label>
        <label className="flex items-center gap-2 text-sm text-stone-700">
          <input
            type="checkbox"
            name="originalSold"
            className="size-4 rounded border-stone-300"
          />
          Original Sold
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 border-t border-stone-200 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/artworks")}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating…" : "Create Artwork"}
        </Button>
      </div>
    </form>
  );
}
