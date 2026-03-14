import Image from "next/image";

interface FramedPaintingProps {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  aspectRatio?: string;
  showDisclaimer?: boolean;
}

export function FramedPainting({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  aspectRatio = "3/4",
  showDisclaimer = true,
}: FramedPaintingProps) {
  return (
    <div className="flex flex-col">
      {/* Frame */}
      <div
        className="rounded-sm bg-stone-900 p-2.5 sm:p-3"
        style={{
          boxShadow:
            "inset 1px 1px 2px rgba(255,255,255,0.08), inset -1px -1px 2px rgba(0,0,0,0.3), 2px 3px 12px rgba(0,0,0,0.25)",
        }}
      >
        {/* Matting */}
        <div
          className="bg-stone-100 p-3 sm:p-4"
          style={{
            boxShadow: "inset 0 0 4px rgba(0,0,0,0.08)",
          }}
        >
          {/* Painting */}
          <div className="relative w-full" style={{ aspectRatio }}>
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes={sizes}
              priority={priority}
            />
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      {showDisclaimer && (
        <p className="mt-1.5 text-center text-[10px] italic text-muted-foreground/60">
          Frame not included
        </p>
      )}
    </div>
  );
}
