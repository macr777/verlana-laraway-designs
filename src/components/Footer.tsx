import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-700 text-stone-200">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
          {/* Tagline */}
          <p className="font-serif text-sm italic text-stone-300">
            Handcrafted in Whitefish, Montana
          </p>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-end">
            <Link
              href="/gallery"
              className="text-sm text-stone-300 transition-colors hover:text-stone-100"
            >
              Gallery
            </Link>
            <Link
              href="/about"
              className="text-sm text-stone-300 transition-colors hover:text-stone-100"
            >
              About
            </Link>
            <a
              href="mailto:contact@verlanadesigns.com"
              className="text-sm text-stone-300 transition-colors hover:text-stone-100"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-stone-600 pt-6 text-center">
          <p className="text-xs text-stone-400">
            &copy; 2026 Verlana Laraway Designs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
