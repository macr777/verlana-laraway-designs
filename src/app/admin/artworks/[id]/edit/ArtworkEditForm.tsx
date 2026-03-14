"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  updateArtwork,
  deleteArtwork,
  addPrintOption,
  updatePrintOption,
  deletePrintOption,
} from "../../actions";

type Category = { id: number; name: string };
type PrintOpt = {
  id: number;
  sizeName: string;
  widthInches: number;
  heightInches: number;
  price: number;
  inStock: boolean;
  active: boolean;
};
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
  printOptions: PrintOpt[];
};

export function ArtworkEditForm({
  artwork,
  categories,
}: {
  artwork: Artwork;
  categories: Category[];
}) {
  const [isPending, startTransition] = useTransition();
  const [showAddPrint, setShowAddPrint] = useState(false);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      updateArtwork(artwork.id, formData);
    });
  }

  function handleDelete() {
    if (
      !confirm(
        "Are you sure you want to delete this artwork? This cannot be undone."
      )
    )
      return;
    startTransition(() => {
      deleteArtwork(artwork.id);
    });
  }

  function handleAddPrint(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      await addPrintOption(artwork.id, formData);
      setShowAddPrint(false);
      router.refresh();
    });
  }

  function handleDeletePrint(printId: number) {
    if (!confirm("Remove this print option?")) return;
    startTransition(async () => {
      await deletePrintOption(printId, artwork.id);
      router.refresh();
    });
  }

  function handleUpdatePrint(printId: number, form: HTMLFormElement) {
    const formData = new FormData(form);
    startTransition(async () => {
      await updatePrintOption(printId, artwork.id, formData);
      router.refresh();
    });
  }

  return (
    <div className="space-y-10">
      {/* Main artwork form */}
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

        {/* Title & Category */}
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
              {isPending ? "Saving\u2026" : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>

      {/* Print Options Section (separate from main form) */}
      <div className="border-t border-stone-200 pt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-stone-800">
              Print Options
            </h2>
            <p className="text-sm text-stone-500">
              Manage available print sizes and prices for this artwork
            </p>
          </div>
          {!showAddPrint && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAddPrint(true)}
            >
              <Plus className="size-3.5" />
              Add Print Size
            </Button>
          )}
        </div>

        {/* Existing print options */}
        {artwork.printOptions.length > 0 && (
          <div className="space-y-3">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_0.7fr_0.7fr_0.7fr_auto_auto_auto] items-center gap-3 px-1 text-xs font-medium uppercase tracking-wide text-stone-400">
              <span>Size Name</span>
              <span>Width</span>
              <span>Height</span>
              <span>Price</span>
              <span>Stock</span>
              <span>Active</span>
              <span />
            </div>

            {artwork.printOptions.map((po) => (
              <PrintOptionRow
                key={po.id}
                printOption={po}
                artworkId={artwork.id}
                isPending={isPending}
                onSave={handleUpdatePrint}
                onDelete={handleDeletePrint}
              />
            ))}
          </div>
        )}

        {artwork.printOptions.length === 0 && !showAddPrint && (
          <div className="rounded-lg border border-dashed border-stone-200 bg-stone-50 px-6 py-8 text-center">
            <p className="text-sm text-stone-500">
              No print options yet. Add print sizes to offer reproductions of
              this artwork.
            </p>
          </div>
        )}

        {/* Add new print option form */}
        {showAddPrint && (
          <form
            onSubmit={handleAddPrint}
            className="mt-4 rounded-lg border border-stone-200 bg-stone-50 p-4"
          >
            <p className="mb-3 text-sm font-medium text-stone-700">
              New Print Option
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="space-y-1">
                <Label htmlFor="sizeName" className="text-xs">
                  Size Name
                </Label>
                <Input
                  id="sizeName"
                  name="sizeName"
                  placeholder='e.g. 8" × 10"'
                  required
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="printWidth" className="text-xs">
                  Width (in)
                </Label>
                <Input
                  id="printWidth"
                  name="printWidth"
                  type="number"
                  step="0.5"
                  placeholder="8"
                  required
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="printHeight" className="text-xs">
                  Height (in)
                </Label>
                <Input
                  id="printHeight"
                  name="printHeight"
                  type="number"
                  step="0.5"
                  placeholder="10"
                  required
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="printPrice" className="text-xs">
                  Price ($)
                </Label>
                <Input
                  id="printPrice"
                  name="printPrice"
                  type="number"
                  step="1"
                  placeholder="55"
                  required
                  className="h-8 text-sm"
                />
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Button type="submit" size="sm" disabled={isPending}>
                {isPending ? "Adding\u2026" : "Add Print"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowAddPrint(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* Inline-editable row for an existing print option */
function PrintOptionRow({
  printOption,
  artworkId,
  isPending,
  onSave,
  onDelete,
}: {
  printOption: PrintOpt;
  artworkId: number;
  isPending: boolean;
  onSave: (printId: number, form: HTMLFormElement) => void;
  onDelete: (printId: number) => void;
}) {
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <div className="grid grid-cols-[1fr_0.7fr_0.7fr_0.7fr_auto_auto_auto] items-center gap-3 rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm">
        <span className="font-medium text-stone-800">
          {printOption.sizeName}
        </span>
        <span className="text-stone-600">{printOption.widthInches}&quot;</span>
        <span className="text-stone-600">{printOption.heightInches}&quot;</span>
        <span className="font-semibold text-stone-700">
          ${printOption.price}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${printOption.inStock ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
        >
          {printOption.inStock ? "In Stock" : "Out"}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${printOption.active ? "bg-emerald-100 text-emerald-700" : "bg-stone-100 text-stone-500"}`}
        >
          {printOption.active ? "Active" : "Off"}
        </span>
        <div className="flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => setEditing(true)}
            className="text-stone-400 hover:text-stone-700"
          >
            <span className="text-xs">Edit</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(printOption.id)}
            disabled={isPending}
            className="text-stone-400 hover:text-red-600"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(printOption.id, e.currentTarget);
        setEditing(false);
      }}
      className="rounded-lg border border-blue-200 bg-blue-50/50 px-3 py-3"
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="space-y-1">
          <Label className="text-xs">Size Name</Label>
          <Input
            name="sizeName"
            defaultValue={printOption.sizeName}
            required
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Width (in)</Label>
          <Input
            name="printWidth"
            type="number"
            step="0.5"
            defaultValue={printOption.widthInches}
            required
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Height (in)</Label>
          <Input
            name="printHeight"
            type="number"
            step="0.5"
            defaultValue={printOption.heightInches}
            required
            className="h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Price ($)</Label>
          <Input
            name="printPrice"
            type="number"
            step="1"
            defaultValue={printOption.price}
            required
            className="h-8 text-sm"
          />
        </div>
      </div>
      <div className="mt-2 flex items-center gap-4">
        <label className="flex items-center gap-1.5 text-xs text-stone-600">
          <input
            type="checkbox"
            name="inStock"
            defaultChecked={printOption.inStock}
            className="size-3.5"
          />
          In Stock
        </label>
        <label className="flex items-center gap-1.5 text-xs text-stone-600">
          <input
            type="checkbox"
            name="active"
            defaultChecked={printOption.active}
            className="size-3.5"
          />
          Active
        </label>
        <div className="ml-auto flex gap-2">
          <Button type="submit" size="sm" disabled={isPending}>
            Save
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setEditing(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
