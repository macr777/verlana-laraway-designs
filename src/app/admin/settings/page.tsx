"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserCircle, Mail, ImageIcon } from "lucide-react";

const PLACEHOLDER_BIO = `Verlana Laraway is a watercolor artist based in Whitefish, Montana. Drawing inspiration from the sweeping landscapes of Glacier National Park, the mirror-still mornings on Flathead Lake, and the wildflower meadows that bloom each summer, Verlana's work captures the quiet beauty of the Mountain West.

She studied fine arts at Montana State University and has been painting professionally for over fifteen years. Her work has been shown in galleries throughout the Northwest and is held in private collections across the United States.

Every piece begins outside — a quick study in a field notebook — before being developed in her Whitefish studio. She paints on archival paper using high-quality professional watercolors, ensuring that each original will last for generations.`;

export default function SettingsPage() {
  const [bio, setBio] = useState(PLACEHOLDER_BIO);
  const [email, setEmail] = useState("verlana@verlana-laraway-designs.com");
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // Non-functional for now — DB integration coming later
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-semibold text-stone-800">
          Settings
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Manage your artist profile and site settings.
        </p>
      </div>

      <form onSubmit={handleSave} className="flex max-w-2xl flex-col gap-6">
        {/* Artist Bio */}
        <Card className="bg-white shadow-none">
          <CardHeader className="border-b border-stone-100">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-stone-700">
              <UserCircle className="size-4 text-stone-400" />
              Artist Bio
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 pt-5">
            <div className="grid gap-1.5">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={8}
                className="resize-y"
              />
              <p className="text-xs text-stone-400">
                This appears on the About page and in search result previews.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Artist Photo */}
        <Card className="bg-white shadow-none">
          <CardHeader className="border-b border-stone-100">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-stone-700">
              <ImageIcon className="size-4 text-stone-400" />
              Artist Photo
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="flex items-center gap-5">
              {/* Current photo placeholder */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-stone-100">
                <UserCircle className="size-10 text-stone-300" />
              </div>
              {/* Upload area */}
              <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-stone-200 bg-stone-50 px-4 py-5 text-center">
                <p className="text-sm font-medium text-stone-600">
                  Drop photo here
                </p>
                <p className="text-xs text-stone-400">
                  PNG or JPG — recommended 400×400 px or larger
                </p>
                <p className="text-xs text-stone-400">
                  (Photo upload integration coming soon)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="bg-white shadow-none">
          <CardHeader className="border-b border-stone-100">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-stone-700">
              <Mail className="size-4 text-stone-400" />
              Contact Info
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 pt-5">
            <div className="grid gap-1.5">
              <Label htmlFor="email">Contact Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="max-w-sm"
              />
              <p className="text-xs text-stone-400">
                Displayed on the contact page and used for order notifications.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Save */}
        <div className="flex items-center gap-4">
          <Button type="submit" size="sm">
            {saved ? "Saved!" : "Save Changes"}
          </Button>
          {saved && (
            <p className="text-sm text-emerald-600">
              Settings saved successfully.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
