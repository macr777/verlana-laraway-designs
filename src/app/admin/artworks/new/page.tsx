"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Plus, Trash2, ImageIcon } from "lucide-react";

interface PrintOption {
  id: number;
  name: string;
  price: string;
}

export default function NewArtworkPage() {
  const [printOptions, setPrintOptions] = useState<PrintOption[]>([
    { id: 1, name: '5" × 7"', price: "35" },
    { id: 2, name: '8" × 10"', price: "55" },
  ]);

  function addPrintOption() {
    setPrintOptions((prev) => [
      ...prev,
      { id: Date.now(), name: "", price: "" },
    ]);
  }

  function removePrintOption(id: number) {
    setPrintOptions((prev) => prev.filter((p) => p.id !== id));
  }

  function updatePrintOption(id: number, field: "name" | "price", value: string) {
    setPrintOptions((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Artwork creation coming soon");
  }

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Button
          render={<Link href="/admin/artworks" />}
          variant="ghost"
          size="icon-sm"
          aria-label="Back to artworks"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <div>
          <h1 className="font-serif text-2xl font-semibold text-stone-800">
            Add New Artwork
          </h1>
          <p className="mt-0.5 text-sm text-stone-500">
            Fill in the details for your new artwork listing.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
        {/* Left column — main fields */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Basic info */}
          <Card className="bg-white shadow-none">
            <CardHeader className="border-b border-stone-100">
              <CardTitle className="text-base font-semibold text-stone-700">
                Artwork Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5 pt-5">
              {/* Title */}
              <div className="grid gap-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Glacier Morning Light"
                  required
                />
              </div>

              {/* Description */}
              <div className="grid gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the artwork — medium, inspiration, what makes it special..."
                  rows={4}
                />
              </div>

              {/* Category */}
              <div className="grid gap-1.5">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue="watercolor">
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="watercolor">
                      Watercolor Paintings
                    </SelectItem>
                    <SelectItem value="botanical">Botanical Studies</SelectItem>
                    <SelectItem value="landscape">Landscapes</SelectItem>
                    <SelectItem value="wildlife">Wildlife</SelectItem>
                    <SelectItem value="abstract">Abstract</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dimensions */}
              <div className="grid gap-1.5">
                <Label>Dimensions (inches)</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="width"
                    type="number"
                    min={1}
                    step={0.5}
                    placeholder="Width"
                    className="max-w-28"
                  />
                  <span className="text-sm text-stone-400">×</span>
                  <Input
                    id="height"
                    type="number"
                    min={1}
                    step={0.5}
                    placeholder="Height"
                    className="max-w-28"
                  />
                </div>
              </div>

              {/* Original Price */}
              <div className="grid gap-1.5">
                <Label htmlFor="price">Original Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  step={1}
                  placeholder="e.g. 380"
                  className="max-w-40"
                />
              </div>
            </CardContent>
          </Card>

          {/* Print options */}
          <Card className="bg-white shadow-none">
            <CardHeader className="border-b border-stone-100">
              <CardTitle className="text-base font-semibold text-stone-700">
                Print Options
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <p className="mb-4 text-sm text-stone-500">
                Add available print sizes and their prices.
              </p>

              <div className="flex flex-col gap-3">
                {printOptions.length > 0 && (
                  <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-3 pb-1">
                    <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">
                      Size / Name
                    </p>
                    <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">
                      Price ($)
                    </p>
                    <span />
                  </div>
                )}

                {printOptions.map((opt) => (
                  <div
                    key={opt.id}
                    className="grid grid-cols-[1fr_1fr_auto] items-center gap-3"
                  >
                    <Input
                      placeholder='e.g. 8" × 10"'
                      value={opt.name}
                      onChange={(e) =>
                        updatePrintOption(opt.id, "name", e.target.value)
                      }
                    />
                    <Input
                      type="number"
                      min={0}
                      step={1}
                      placeholder="55"
                      value={opt.price}
                      onChange={(e) =>
                        updatePrintOption(opt.id, "price", e.target.value)
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removePrintOption(opt.id)}
                      aria-label="Remove print option"
                      className="text-stone-400 hover:text-destructive"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPrintOption}
                className="mt-4"
              >
                <Plus className="size-3.5" />
                Add Print Size
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right column — image + submit */}
        <div className="flex flex-col gap-6">
          {/* Image upload */}
          <Card className="bg-white shadow-none">
            <CardHeader className="border-b border-stone-100">
              <CardTitle className="text-base font-semibold text-stone-700">
                Artwork Image
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              {/* Upload placeholder */}
              <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-stone-200 bg-stone-50 px-4 py-8 text-center transition-colors hover:border-stone-300 hover:bg-stone-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-200">
                  <ImageIcon className="size-5 text-stone-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-600">
                    Drop image here
                  </p>
                  <p className="mt-1 text-xs text-stone-400">
                    PNG, JPG, WebP — up to 10 MB
                  </p>
                </div>
                <p className="text-xs text-stone-400">
                  (Image upload integration coming soon)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button type="submit" className="w-full">
              Save Artwork
            </Button>
            <Button
              type="button"
              variant="outline"
              render={<Link href="/admin/artworks" />}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
