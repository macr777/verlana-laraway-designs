import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd, { getWebSiteJsonLd, getPersonJsonLd } from "@/components/JsonLd";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://verlana-laraway-designs.vercel.app"),
  title: {
    template: "%s | Verlana Laraway Designs",
    default: "Verlana Laraway Designs | Montana Watercolor Artist",
  },
  description:
    "Original watercolor paintings and prints by Verlana Laraway, a contemporary artist based in Whitefish, Montana. Shop original artwork and high-quality prints.",
  keywords: [
    "watercolor",
    "paintings",
    "art",
    "prints",
    "Montana",
    "Whitefish",
    "Verlana Laraway",
    "original art",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Verlana Laraway Designs | Montana Watercolor Artist",
    description:
      "Original watercolor paintings and prints by Verlana Laraway, a contemporary artist based in Whitefish, Montana. Shop original artwork and high-quality prints.",
    siteName: "Verlana Laraway Designs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased flex min-h-screen flex-col`}
      >
        <JsonLd data={getWebSiteJsonLd()} />
        <JsonLd data={getPersonJsonLd()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
