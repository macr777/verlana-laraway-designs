"use client";

import { useState } from "react";

export function CommissionForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLSelectElement).value,
      size: (form.elements.namedItem("size") as HTMLSelectElement).value,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/commissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Something went wrong");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <h3 className="font-serif text-xl font-semibold text-green-800">
          Thank you for your interest!
        </h3>
        <p className="mt-2 text-sm text-green-700">
          Your commission request has been received. Verlana will get back to
          you within a few days to discuss your project.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Name & Email */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="jane@example.com"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          What would you like painted?
        </label>
        <select
          id="subject"
          name="subject"
          required
          className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">Select a category...</option>
          <option value="landscape">Landscape / Scenic View</option>
          <option value="pet">Pet Portrait</option>
          <option value="home">Home / Building</option>
          <option value="floral">Floral / Still Life</option>
          <option value="portrait">Portrait</option>
          <option value="gift">Custom Gift</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Preferred size */}
      <div>
        <label
          htmlFor="size"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Preferred Size (optional)
        </label>
        <select
          id="size"
          name="size"
          className="w-full rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">Not sure yet</option>
          <option value="small">Small (up to 8&quot; &times; 10&quot;)</option>
          <option value="medium">
            Medium (11&quot; &times; 14&quot; to 12&quot; &times; 16&quot;)
          </option>
          <option value="large">
            Large (16&quot; &times; 20&quot; or bigger)
          </option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Tell Verlana about your vision
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          className="w-full resize-y rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Describe what you'd like — a specific place, a pet, colors you love, the feeling you want the painting to capture. The more detail, the better!"
        />
      </div>

      {/* Reference photos note */}
      <p className="text-xs text-muted-foreground">
        Have reference photos? You can reply to Verlana&apos;s response email
        with any images that will help bring your idea to life.
      </p>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 sm:w-auto"
        >
          {loading ? "Sending..." : "Send Commission Request"}
        </button>
      </div>
    </form>
  );
}
