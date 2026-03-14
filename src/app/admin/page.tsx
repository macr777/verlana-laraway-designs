import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, ShoppingBag, MessageCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [artworkCount, orderCount, newCommissions, recentArtworks] =
    await Promise.all([
      prisma.artwork.count({ where: { active: true } }),
      prisma.order.count(),
      prisma.commissionRequest.count({ where: { status: "new" } }),
      prisma.artwork.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { category: true },
      }),
    ]);

  const stats = [
    {
      label: "Active Artworks",
      value: String(artworkCount),
      icon: Palette,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Orders",
      value: String(orderCount),
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "New Commissions",
      value: String(newCommissions),
      icon: MessageCircle,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="px-8 py-8">
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-semibold text-stone-800">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Welcome back. Here&apos;s an overview of your store.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="bg-white shadow-none">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-stone-500">
                  {label}
                </CardTitle>
                <div className={`rounded-lg p-2 ${bg}`}>
                  <Icon className={`size-4 ${color}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-stone-800">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <Card className="bg-white shadow-none">
          <CardHeader className="border-b border-stone-100">
            <CardTitle className="text-base font-semibold text-stone-700">
              Recently Added Artworks
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="flex flex-col divide-y divide-stone-100">
              {recentArtworks.map((artwork) => (
                <li
                  key={artwork.id}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <span className="font-medium text-stone-700">
                    {artwork.title}
                  </span>
                  <span className="text-stone-400">
                    {artwork.category.name}
                  </span>
                  <span className="font-semibold text-stone-700">
                    ${Number(artwork.originalPrice).toLocaleString()}.00
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
