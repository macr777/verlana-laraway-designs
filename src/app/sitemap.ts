import type { MetadataRoute } from "next";

// For now use static pages. When DB is connected, add artwork slugs dynamically.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://verlana-laraway-designs.vercel.app";

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];

  // TODO: Add dynamic artwork pages from DB
  // const artworks = await prisma.artwork.findMany({ where: { active: true }, select: { slug: true, updatedAt: true } });
  // const artworkPages = artworks.map(a => ({
  //   url: `${baseUrl}/gallery/${a.slug}`,
  //   lastModified: a.updatedAt,
  //   changeFrequency: "monthly" as const,
  //   priority: 0.8,
  // }));
  // return [...staticPages, ...artworkPages];

  return staticPages;
}
