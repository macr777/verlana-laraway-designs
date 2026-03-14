import type { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = { title: "Orders" };
export const dynamic = "force-dynamic";

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    shipped: "bg-blue-100 text-blue-700",
    delivered: "bg-emerald-100 text-emerald-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${styles[status] || "bg-stone-100 text-stone-500"}`}
    >
      {status}
    </span>
  );
}

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { orderItems: true },
  });

  return (
    <div className="px-8 py-8">
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-semibold text-stone-800">
          Orders
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          {orders.length} order{orders.length !== 1 ? "s" : ""} total
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-lg border border-stone-200 bg-white p-12 text-center">
          <p className="text-stone-500">No orders yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl bg-white ring-1 ring-stone-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-stone-50">
                <TableHead className="pl-4">Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-4">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="pl-4 font-mono font-medium text-stone-700">
                    #{order.id}
                  </TableCell>
                  <TableCell className="font-medium text-stone-800">
                    {order.customerName}
                  </TableCell>
                  <TableCell className="text-stone-500">
                    {order.email}
                  </TableCell>
                  <TableCell className="font-semibold text-stone-700">
                    ${Number(order.total).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="pr-4 text-stone-500">
                    {order.createdAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
