import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, ShoppingBag, DollarSign, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
};

const stats = [
  {
    label: "Total Artworks",
    value: "24",
    sub: "6 added this month",
    icon: Palette,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Total Orders",
    value: "12",
    sub: "3 pending fulfillment",
    icon: ShoppingBag,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    label: "Revenue",
    value: "$3,450",
    sub: "Last 30 days",
    icon: DollarSign,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "Page Views",
    value: "1,284",
    sub: "Last 7 days",
    icon: Eye,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
];

export default function AdminDashboardPage() {
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

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, sub, icon: Icon, color, bg }) => (
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
              <p className="mt-1 text-xs text-stone-400">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholder recent activity */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card className="bg-white shadow-none">
          <CardHeader className="border-b border-stone-100">
            <CardTitle className="text-base font-semibold text-stone-700">
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="flex flex-col divide-y divide-stone-100">
              {[
                { id: "#1003", customer: "Sarah M.", total: "$295", status: "Pending" },
                { id: "#1002", customer: "James T.", total: "$680", status: "Shipped" },
                { id: "#1001", customer: "Emily R.", total: "$380", status: "Delivered" },
              ].map((order) => (
                <li
                  key={order.id}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <span className="font-medium text-stone-700">{order.id}</span>
                  <span className="text-stone-500">{order.customer}</span>
                  <span className="font-semibold text-stone-700">{order.total}</span>
                  <span className="text-stone-400">{order.status}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-none">
          <CardHeader className="border-b border-stone-100">
            <CardTitle className="text-base font-semibold text-stone-700">
              Recently Added Artworks
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="flex flex-col divide-y divide-stone-100">
              {[
                { title: "Glacier Morning Light", price: "$380", category: "Original" },
                { title: "Whitefish Lake at Dusk", price: "$295", category: "Original" },
                { title: "Mountain Lupine Field", price: "$420", category: "Original" },
              ].map((artwork) => (
                <li
                  key={artwork.title}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <span className="font-medium text-stone-700">{artwork.title}</span>
                  <span className="text-stone-400">{artwork.category}</span>
                  <span className="font-semibold text-stone-700">{artwork.price}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
