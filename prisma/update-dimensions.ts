import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { WebSocket } from "ws";
import fs from "fs";
import path from "path";

// @ts-expect-error - globalThis.WebSocket type mismatch with ws
globalThis.WebSocket = WebSocket;

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

// Read actual image dimensions from files
function getImageDimensions(filePath: string): { w: number; h: number } | null {
  const buf = fs.readFileSync(filePath);
  // JPEG
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length - 1) {
      if (buf[i] !== 0xff) break;
      const marker = buf[i + 1];
      if (marker === 0xc0 || marker === 0xc2) {
        return { w: buf.readUInt16BE(i + 7), h: buf.readUInt16BE(i + 5) };
      }
      const len = buf.readUInt16BE(i + 2);
      i += 2 + len;
    }
  }
  // PNG
  if (buf[0] === 0x89 && buf[1] === 0x50) {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  return null;
}

// Convert pixel dimensions to reasonable art dimensions in inches
// We'll normalize so the longer side is ~18 inches (a common watercolor size)
function toArtInches(pw: number, ph: number): { width: number; height: number } {
  const maxSide = 18;
  const ratio = pw / ph;
  let w: number, h: number;
  if (pw >= ph) {
    w = maxSide;
    h = Math.round((maxSide / ratio) * 2) / 2; // round to nearest 0.5
  } else {
    h = maxSide;
    w = Math.round((maxSide * ratio) * 2) / 2;
  }
  return { width: w, height: h };
}

async function main() {
  const paintingsDir = path.join(__dirname, "..", "public", "paintings");
  const artworks = await prisma.artwork.findMany();

  console.log("Updating artwork dimensions from image files...\n");

  for (const art of artworks) {
    // Extract filename from imageUrl (e.g. /paintings/montana-bison.jpg)
    const filename = art.imageUrl.split("/").pop();
    if (!filename) continue;

    const filePath = path.join(paintingsDir, filename);
    if (!fs.existsSync(filePath)) {
      console.log(`  SKIP ${art.title} — file not found: ${filename}`);
      continue;
    }

    const dims = getImageDimensions(filePath);
    if (!dims) {
      console.log(`  SKIP ${art.title} — could not read dimensions`);
      continue;
    }

    const { width, height } = toArtInches(dims.w, dims.h);

    await prisma.artwork.update({
      where: { id: art.id },
      data: { widthInches: width, heightInches: height },
    });

    console.log(`  ${art.title}: ${dims.w}x${dims.h}px → ${width}" x ${height}"`);
  }

  // Also update print options to use proper rectangular sizes instead of all square
  // Get all artworks with their print options
  const artworksWithPrints = await prisma.artwork.findMany({
    include: { printOptions: { orderBy: { price: "asc" } } },
  });

  console.log("\nUpdating print option sizes to match artwork proportions...\n");

  for (const art of artworksWithPrints) {
    if (art.printOptions.length === 0) continue;

    const ratio = art.widthInches / art.heightInches;
    const isLandscape = ratio > 1;

    // Define standard print sizes based on orientation
    const sizes = isLandscape
      ? [
          { sizeName: '10" × 8"', w: 10, h: 8, price: 125 },
          { sizeName: '14" × 11"', w: 14, h: 11, price: 200 },
          { sizeName: '20" × 16"', w: 20, h: 16, price: 450 },
        ]
      : [
          { sizeName: '8" × 10"', w: 8, h: 10, price: 125 },
          { sizeName: '11" × 14"', w: 11, h: 14, price: 200 },
          { sizeName: '16" × 20"', w: 16, h: 20, price: 450 },
        ];

    for (let i = 0; i < art.printOptions.length && i < sizes.length; i++) {
      const po = art.printOptions[i];
      const s = sizes[i];
      await prisma.printOption.update({
        where: { id: po.id },
        data: {
          sizeName: s.sizeName,
          widthInches: s.w,
          heightInches: s.h,
          price: s.price,
        },
      });
    }

    console.log(`  ${art.title}: ${isLandscape ? "landscape" : "portrait"} prints updated`);
  }

  console.log("\nDone!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
