import type { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Orders",
};

type OrderStatus = "Pending" | "Shipped" | "Delivered";

interface Order {
  id: string;
  customer: string;
  email: string;
  total: string;
  status: OrderStatus;
  date: string;
}

const placeholderOrders: Order[] = [
  {
    id: "#1003",
    customer: "Sarah Mitchell",
    email: "sarah.m@example.com",
    total: "$295.00",
    status: "Pending",
    date: "Mar 12, 2026",
  },
  {
    id: "#1002",
    customer: "James Torres",
    email: "j.torres@example.com",
    total: "$680.00",
    status: "Shipped",
    date: "Mar 8, 2026",
  },
  {
    id: "#1001",
    customer: "Emily Reyes",
    email: "ereyes@example.com",
    total: "$380.00",
    status: "Delivered",
    date: "Feb 28, 2026",
  },
  {
    id: "#1000",
    customer: "Daniel Park",
    email: "dpark@example.com",
    total: "$145.00",
    status: "Delivered",
    date: "Feb 20, 2026",
  },
];

function StatusBadge({ status }: { status: OrderStatus }) {
  if (status === "Pending") {
    return (
      <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
        Pending
      </span>
    );
  }
  if (status === "Shipped") {
    return (
      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
        Shipped
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
      Delivered
    </span>
  );
}

export default function OrdersPage() {
  return (
    <div className="px-8 py-8">
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-semibold text-stone-800">
          Orders
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          {placeholderOrders.length} orders total
        </p>
      </div>

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
            {placeholderOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="pl-4 font-mono font-medium text-stone-700">
                  {order.id}
                </TableCell>
                <TableCell className="font-medium text-stone-800">
                  {order.customer}
                </TableCell>
                <TableCell className="text-stone-500">{order.email}</TableCell>
                <TableCell className="font-semibold text-stone-700">
                  {order.total}
                </TableCell>
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>
                <TableCell className="pr-4 text-stone-500">
                  {order.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
