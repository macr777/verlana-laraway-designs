export interface PrintOption {
  sizeName: string;
  width: number;
  height: number;
  price: number;
}

export interface Artwork {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  width: number;
  height: number;
  unit: string;
  originalPrice: number;
  originalSold: boolean;
  imageUrl: string;
  featured: boolean;
  active: boolean;
  printOptions: PrintOption[];
}

const defaultPrintOptions: PrintOption[] = [
  { sizeName: '8" x 8"', width: 8, height: 8, price: 125 },
  { sizeName: '12" x 12"', width: 12, height: 12, price: 200 },
  { sizeName: '24" x 24"', width: 24, height: 24, price: 450 },
];

export const artworks: Artwork[] = [
  {
    id: 1,
    title: "Montana Bison",
    slug: "montana-bison",
    description:
      "A powerful bison stands stoic against the golden Montana plains. This watercolor captures the raw strength and quiet dignity of one of the West's most iconic animals.",
    category: "Wildlife",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/montana-bison.jpg",
    featured: true,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 2,
    title: "Mountain Sentinel",
    slug: "mountain-sentinel",
    description:
      "A lone pine stands silhouetted against layered mountain ridges fading into purple twilight. The cascading blues evoke the vast solitude of Montana's high country.",
    category: "Landscape",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/mountain-sentinel.jpg",
    featured: true,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 3,
    title: "Winter Snowfall",
    slug: "winter-snowfall",
    description:
      "Delicate snowflakes drift through a bright blue sky as a solitary tree stands in a pristine winter landscape. A celebration of the quiet beauty of a fresh Montana snowfall.",
    category: "Landscape",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/winter-snowfall.jpg",
    featured: false,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 4,
    title: "Blue Reflections",
    slug: "blue-reflections",
    description:
      "A misty lake mirrors the sky in deep, moody blues. Trees line the distant shore as dramatic light breaks through clouds, casting ethereal reflections across still water.",
    category: "Landscape",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/blue-reflections.jpg",
    featured: false,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 5,
    title: "Weathered Wisdom",
    slug: "weathered-wisdom",
    description:
      "An intimate portrait rendered in monochrome watercolor, capturing decades of life etched into every line and crease. The eyes hold stories that words cannot tell.",
    category: "Portrait",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/weathered-wisdom.jpg",
    featured: true,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 6,
    title: "Lone Birch",
    slug: "lone-birch",
    description:
      "A single birch tree rises in stark elegance, its distinctive black-and-white bark rendered with bold, textured strokes. Soft green saplings emerge at its base, promising renewal.",
    category: "Nature",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/lone-birch.jpg",
    featured: false,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 7,
    title: "Summer Peaches",
    slug: "summer-peaches",
    description:
      "Ripe peaches glow in warm hues of coral, orange, and pink against soft green leaves. This vibrant still life captures the lush abundance of a summer harvest.",
    category: "Still Life",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/summer-peaches.jpg",
    featured: false,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 8,
    title: "Winter Stillness",
    slug: "winter-stillness",
    description:
      "An abstract winter landscape dissolves into mist and memory. Cool blues and earthen browns blend at the horizon where snow meets sky in perfect, meditative quiet.",
    category: "Landscape",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/winter-stillness.jpg",
    featured: false,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 9,
    title: "Golden Sunset on the River",
    slug: "golden-sunset-on-the-river",
    description:
      "Warm golden light spills across a river at dusk as a tree stands in dark silhouette against the glowing sky. The water catches every color of the fading day.",
    category: "Landscape",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/golden-sunset-on-the-river.jpg",
    featured: false,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 10,
    title: "Harvest Companion",
    slug: "harvest-companion",
    description:
      "A tuxedo cat with striking green eyes sits beside a plump orange pumpkin, the perfect autumn portrait. Playful yet poised, this feline owns the harvest season.",
    category: "Animals",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/harvest-companion.jpg",
    featured: false,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 11,
    title: "Autumn Aspens",
    slug: "autumn-aspens",
    description:
      "A grove of aspen trees blazes with golden leaves against their signature black-and-white bark. Splashes of pink wildflowers add warmth to this iconic Montana autumn scene.",
    category: "Landscape",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/autumn-aspens.jpg",
    featured: true,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 12,
    title: "Montana Morning",
    slug: "montana-morning",
    description:
      "A brown bear forages beneath towering pines as morning mist rises from the forest floor. The soft pink sky hints at dawn breaking over the Montana wilderness.",
    category: "Wildlife",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/montana-morning.jpg",
    featured: false,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 13,
    title: "The Rooster",
    slug: "the-rooster",
    description:
      "A proud rooster struts with confidence, his white feathers rendered in delicate washes and his dark tail plumage in bold, sweeping strokes. A farmyard portrait full of personality.",
    category: "Animals",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/the-rooster.jpg",
    featured: false,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 14,
    title: "White Egret",
    slug: "white-egret",
    description:
      "An elegant white egret stands in graceful repose, its plumage rendered with the most delicate watercolor washes. The golden eye and dark beak provide striking contrast.",
    category: "Wildlife",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/white-egret.jpg",
    featured: false,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 15,
    title: "Snowy Pines",
    slug: "snowy-pines",
    description:
      "Dark evergreens emerge from a blanket of snow with misty mountains behind. This quintessential Montana winter scene captures the serene beauty of the northern Rockies.",
    category: "Landscape",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/snowy-pines.jpg",
    featured: false,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 16,
    title: "Emperor Penguins",
    slug: "emperor-penguins",
    description:
      "Two emperor penguins share a tender moment against a dreamy lavender and blue backdrop. Their soft, rounded forms and gentle poses convey warmth in the coldest place on earth.",
    category: "Wildlife",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/emperor-penguins.jpg",
    featured: false,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 17,
    title: "The Red Barn",
    slug: "the-red-barn",
    description:
      "A weathered red barn stands proud against a pale winter sky, flanked by pine trees. A figure near the door adds a sense of scale and rural life to this classic Americana scene.",
    category: "Landscape",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/the-red-barn.jpg",
    featured: false,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 18,
    title: "Prairie Fox",
    slug: "prairie-fox",
    description:
      "A red fox sits alert on the open prairie, its warm amber fur glowing against a dramatic stormy sky. Grasses and wildflowers frame this watchful creature of the plains.",
    category: "Wildlife",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/prairie-fox.jpg",
    featured: true,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 19,
    title: "Winter Thaw",
    slug: "winter-thaw",
    description:
      "Bare trees stand along a creek as winter begins to loosen its grip. Warm earth tones peek through melting snow, signaling the first whispers of a Montana spring.",
    category: "Landscape",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/winter-thaw.jpg",
    featured: false,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 20,
    title: "Curious Tabby",
    slug: "curious-tabby",
    description:
      "A tabby cat with enormous golden eyes stares directly at the viewer with an irresistible mix of curiosity and mischief. Every stripe and whisker is rendered with loving detail.",
    category: "Animals",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/curious-tabby.jpg",
    featured: false,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 21,
    title: "Farmhouse in Winter",
    slug: "farmhouse-in-winter",
    description:
      "A cozy farmhouse nestles among bare trees and evergreens under a soft winter sky. Fresh snow blankets the yard in this peaceful scene of rural Montana life.",
    category: "Landscape",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/farmhouse-in-winter.jpg",
    featured: false,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 22,
    title: "Montana Snow Globe",
    slug: "montana-snow-globe",
    description:
      "A whimsical snow globe holds a miniature Montana winter scene complete with snow-dusted pines and a rustic signpost. A charming and imaginative watercolor full of holiday spirit.",
    category: "Whimsical",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/montana-snow-globe.jpg",
    featured: false,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 23,
    title: "Coastal Arch",
    slug: "coastal-arch",
    description:
      "Dramatic sandstone cliffs and a natural arch frame the ocean beyond as waves wash across a sandy beach. This coastal scene captures the timeless power of sea meeting stone.",
    category: "Landscape",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/coastal-arch.jpg",
    featured: false,
    active: true,
    printOptions: defaultPrintOptions,
  },
  {
    id: 24,
    title: "The Hen House",
    slug: "the-hen-house",
    description:
      "A colorful gathering of hens — speckled, red, and gray — fills a barn with warmth and personality. Each bird is rendered with distinct character in this charming farmyard scene.",
    category: "Animals",
    width: 12,
    height: 12,
    unit: "in",
    originalPrice: 2000,
    originalSold: false,
    imageUrl: "/paintings/the-hen-house.jpg",
    featured: true,
    active: true,
    printOptions: defaultPrintOptions,
  },
];

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export function getFeaturedArtworks(): Artwork[] {
  return artworks.filter((a) => a.featured && a.active);
}

export function getActiveArtworks(): Artwork[] {
  return artworks.filter((a) => a.active);
}

export function getCategories(): string[] {
  return [...new Set(artworks.map((a) => a.category))];
}
