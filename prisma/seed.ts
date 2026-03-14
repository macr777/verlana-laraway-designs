import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { WebSocket } from "ws";
import bcrypt from "bcryptjs";

// Neon serverless driver needs WebSocket in Node.js
// @ts-expect-error - globalThis.WebSocket type mismatch with ws
globalThis.WebSocket = WebSocket;

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

const categories = [
  { name: "Wildlife", slug: "wildlife" },
  { name: "Landscape", slug: "landscape" },
  { name: "Portrait", slug: "portrait" },
  { name: "Nature", slug: "nature" },
  { name: "Still Life", slug: "still-life" },
  { name: "Animals", slug: "animals" },
  { name: "Whimsical", slug: "whimsical" },
];

const artworks = [
  { title: "Montana Bison", slug: "montana-bison", description: "A powerful bison stands stoic against the golden Montana plains. This watercolor captures the raw strength and quiet dignity of one of the West's most iconic animals.", category: "Wildlife", imageUrl: "/paintings/montana-bison.jpg", featured: true, sortOrder: 1, widthInches: 18, heightInches: 12.5 },
  { title: "Mountain Sentinel", slug: "mountain-sentinel", description: "A lone pine stands silhouetted against layered mountain ridges fading into purple twilight. The cascading blues evoke the vast solitude of Montana's high country.", category: "Landscape", imageUrl: "/paintings/mountain-sentinel.jpg", featured: true, sortOrder: 2, widthInches: 11.5, heightInches: 18 },
  { title: "Winter Snowfall", slug: "winter-snowfall", description: "Delicate snowflakes drift through a bright blue sky as a solitary tree stands in a pristine winter landscape. A celebration of the quiet beauty of a fresh Montana snowfall.", category: "Landscape", imageUrl: "/paintings/winter-snowfall.jpg", featured: false, sortOrder: 3, widthInches: 12.5, heightInches: 18 },
  { title: "Blue Reflections", slug: "blue-reflections", description: "A misty lake mirrors the sky in deep, moody blues. Trees line the distant shore as dramatic light breaks through clouds, casting ethereal reflections across still water.", category: "Landscape", imageUrl: "/paintings/blue-reflections.jpg", featured: false, sortOrder: 4, widthInches: 13.5, heightInches: 18 },
  { title: "Weathered Wisdom", slug: "weathered-wisdom", description: "An intimate portrait rendered in monochrome watercolor, capturing decades of life etched into every line and crease. The eyes hold stories that words cannot tell.", category: "Portrait", imageUrl: "/paintings/weathered-wisdom.jpg", featured: true, sortOrder: 5, widthInches: 13, heightInches: 18 },
  { title: "Lone Birch", slug: "lone-birch", description: "A single birch tree rises in stark elegance, its distinctive black-and-white bark rendered with bold, textured strokes. Soft green saplings emerge at its base, promising renewal.", category: "Nature", imageUrl: "/paintings/lone-birch.jpg", featured: false, sortOrder: 6, widthInches: 11.5, heightInches: 18 },
  { title: "Summer Peaches", slug: "summer-peaches", description: "Ripe peaches glow in warm hues of coral, orange, and pink against soft green leaves. This vibrant still life captures the lush abundance of a summer harvest.", category: "Still Life", imageUrl: "/paintings/summer-peaches.jpg", featured: false, sortOrder: 7, widthInches: 12.5, heightInches: 18 },
  { title: "Winter Stillness", slug: "winter-stillness", description: "An abstract winter landscape dissolves into mist and memory. Cool blues and earthen browns blend at the horizon where snow meets sky in perfect, meditative quiet.", category: "Landscape", imageUrl: "/paintings/winter-stillness.jpg", featured: false, sortOrder: 8, widthInches: 18, heightInches: 11 },
  { title: "Golden Sunset on the River", slug: "golden-sunset-on-the-river", description: "Warm golden light spills across a river at dusk as a tree stands in dark silhouette against the glowing sky. The water catches every color of the fading day.", category: "Landscape", imageUrl: "/paintings/golden-sunset-on-the-river.jpg", featured: false, sortOrder: 9, widthInches: 12.5, heightInches: 18 },
  { title: "Harvest Companion", slug: "harvest-companion", description: "A tuxedo cat with striking green eyes sits beside a plump orange pumpkin, the perfect autumn portrait. Playful yet poised, this feline owns the harvest season.", category: "Animals", imageUrl: "/paintings/harvest-companion.jpg", featured: false, sortOrder: 10, widthInches: 14, heightInches: 18 },
  { title: "Autumn Aspens", slug: "autumn-aspens", description: "A grove of aspen trees blazes with golden leaves against their signature black-and-white bark. Splashes of pink wildflowers add warmth to this iconic Montana autumn scene.", category: "Landscape", imageUrl: "/paintings/autumn-aspens.jpg", featured: true, sortOrder: 11, widthInches: 12.5, heightInches: 18 },
  { title: "Montana Morning", slug: "montana-morning", description: "A brown bear forages beneath towering pines as morning mist rises from the forest floor. The soft pink sky hints at dawn breaking over the Montana wilderness.", category: "Wildlife", imageUrl: "/paintings/montana-morning.jpg", featured: false, sortOrder: 12, widthInches: 13.5, heightInches: 18 },
  { title: "The Rooster", slug: "the-rooster", description: "A proud rooster struts with confidence, his white feathers rendered in delicate washes and his dark tail plumage in bold, sweeping strokes. A farmyard portrait full of personality.", category: "Animals", imageUrl: "/paintings/the-rooster.jpg", featured: false, sortOrder: 13, widthInches: 13, heightInches: 18 },
  { title: "White Egret", slug: "white-egret", description: "An elegant white egret stands in graceful repose, its plumage rendered with the most delicate watercolor washes. The golden eye and dark beak provide striking contrast.", category: "Wildlife", imageUrl: "/paintings/white-egret.jpg", featured: false, sortOrder: 14, widthInches: 13.5, heightInches: 18 },
  { title: "Snowy Pines", slug: "snowy-pines", description: "Dark evergreens emerge from a blanket of snow with misty mountains behind. This quintessential Montana winter scene captures the serene beauty of the northern Rockies.", category: "Landscape", imageUrl: "/paintings/snowy-pines.jpg", featured: false, sortOrder: 15, widthInches: 18, heightInches: 13.5 },
  { title: "Emperor Penguins", slug: "emperor-penguins", description: "Two emperor penguins share a tender moment against a dreamy lavender and blue backdrop. Their soft, rounded forms and gentle poses convey warmth in the coldest place on earth.", category: "Wildlife", imageUrl: "/paintings/emperor-penguins.jpg", featured: false, sortOrder: 16, widthInches: 18, heightInches: 12.5 },
  { title: "The Red Barn", slug: "the-red-barn", description: "A weathered red barn stands proud against a pale winter sky, flanked by pine trees. A figure near the door adds a sense of scale and rural life to this classic Americana scene.", category: "Landscape", imageUrl: "/paintings/the-red-barn.jpg", featured: false, sortOrder: 17, widthInches: 18, heightInches: 13.5 },
  { title: "Prairie Fox", slug: "prairie-fox", description: "A red fox sits alert on the open prairie, its warm amber fur glowing against a dramatic stormy sky. Grasses and wildflowers frame this watchful creature of the plains.", category: "Wildlife", imageUrl: "/paintings/prairie-fox.jpg", featured: true, sortOrder: 18, widthInches: 18, heightInches: 13.5 },
  { title: "Winter Thaw", slug: "winter-thaw", description: "Bare trees stand along a creek as winter begins to loosen its grip. Warm earth tones peek through melting snow, signaling the first whispers of a Montana spring.", category: "Landscape", imageUrl: "/paintings/winter-thaw.jpg", featured: false, sortOrder: 19, widthInches: 18, heightInches: 12.5 },
  { title: "Curious Tabby", slug: "curious-tabby", description: "A tabby cat with enormous golden eyes stares directly at the viewer with an irresistible mix of curiosity and mischief. Every stripe and whisker is rendered with loving detail.", category: "Animals", imageUrl: "/paintings/curious-tabby.jpg", featured: false, sortOrder: 20, widthInches: 18, heightInches: 13 },
  { title: "Farmhouse in Winter", slug: "farmhouse-in-winter", description: "A cozy farmhouse nestles among bare trees and evergreens under a soft winter sky. Fresh snow blankets the yard in this peaceful scene of rural Montana life.", category: "Landscape", imageUrl: "/paintings/farmhouse-in-winter.jpg", featured: false, sortOrder: 21, widthInches: 18, heightInches: 12 },
  { title: "Montana Snow Globe", slug: "montana-snow-globe", description: "A whimsical snow globe holds a miniature Montana winter scene complete with snow-dusted pines and a rustic signpost. A charming and imaginative watercolor full of holiday spirit.", category: "Whimsical", imageUrl: "/paintings/montana-snow-globe.jpg", featured: false, sortOrder: 22, widthInches: 18, heightInches: 13.5 },
  { title: "Coastal Arch", slug: "coastal-arch", description: "Dramatic sandstone cliffs and a natural arch frame the ocean beyond as waves wash across a sandy beach. This coastal scene captures the timeless power of sea meeting stone.", category: "Landscape", imageUrl: "/paintings/coastal-arch.jpg", featured: false, sortOrder: 23, widthInches: 18, heightInches: 13.5 },
  { title: "The Hen House", slug: "the-hen-house", description: "A colorful gathering of hens — speckled, red, and gray — fills a barn with warmth and personality. Each bird is rendered with distinct character in this charming farmyard scene.", category: "Animals", imageUrl: "/paintings/the-hen-house.jpg", featured: true, sortOrder: 24, widthInches: 18, heightInches: 13.5 },
];

const landscapePrints = [
  { sizeName: '10" × 8"', widthInches: 10, heightInches: 8, price: 125 },
  { sizeName: '14" × 11"', widthInches: 14, heightInches: 11, price: 200 },
  { sizeName: '20" × 16"', widthInches: 20, heightInches: 16, price: 450 },
];
const portraitPrints = [
  { sizeName: '8" × 10"', widthInches: 8, heightInches: 10, price: 125 },
  { sizeName: '11" × 14"', widthInches: 11, heightInches: 14, price: 200 },
  { sizeName: '16" × 20"', widthInches: 16, heightInches: 20, price: 450 },
];

async function main() {
  console.log("Seeding database...");

  // Upsert categories
  const categoryMap: Record<string, number> = {};
  for (const cat of categories) {
    const record = await prisma.artworkCategory.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: cat,
    });
    categoryMap[cat.name] = record.id;
  }
  console.log(`  ${categories.length} categories seeded`);

  // Upsert artworks with print options
  for (const art of artworks) {
    const isLandscape = art.widthInches > art.heightInches;
    const printOptions = isLandscape ? landscapePrints : portraitPrints;
    const artwork = await prisma.artwork.upsert({
      where: { slug: art.slug },
      update: {
        title: art.title,
        description: art.description,
        categoryId: categoryMap[art.category],
        widthInches: art.widthInches,
        heightInches: art.heightInches,
        imageUrl: art.imageUrl,
        featured: art.featured,
        sortOrder: art.sortOrder,
      },
      create: {
        title: art.title,
        slug: art.slug,
        description: art.description,
        categoryId: categoryMap[art.category],
        widthInches: art.widthInches,
        heightInches: art.heightInches,
        originalPrice: 2000,
        imageUrl: art.imageUrl,
        featured: art.featured,
        sortOrder: art.sortOrder,
        printOptions: {
          create: printOptions,
        },
      },
    });
  }
  console.log(`  ${artworks.length} artworks seeded`);

  // Seed admin user
  const passwordHash = await bcrypt.hash("Oceanmist@01", 12);
  await prisma.adminUser.upsert({
    where: { email: "randy@galeforceinc.com" },
    update: { passwordHash, name: "Randy" },
    create: {
      email: "randy@galeforceinc.com",
      passwordHash,
      name: "Randy",
      role: "admin",
    },
  });
  console.log("  Admin user seeded");

  // Seed site settings
  const settings = [
    { key: "artist_bio", value: "Verlana Laraway paints what she loves — the Glacier peaks, the wild lupine meadows, the way afternoon light breaks across Whitefish Lake. Each piece begins outside and finishes in her studio in the mountains she calls home." },
    { key: "contact_email", value: "verlana@verlana-laraway-designs.com" },
  ];
  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log("  Site settings seeded");

  console.log("Done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
