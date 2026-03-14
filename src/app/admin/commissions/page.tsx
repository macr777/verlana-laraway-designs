import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CommissionStatusSelect } from "./CommissionStatusSelect";

export const metadata: Metadata = { title: "Commissions" };

export const dynamic = "force-dynamic";

export default async function AdminCommissionsPage() {
  const requests = await prisma.commissionRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">
          Commission Requests
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          {requests.length} total request{requests.length !== 1 ? "s" : ""}
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-lg border border-stone-200 bg-white p-12 text-center">
          <p className="text-stone-500">No commission requests yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="rounded-lg border border-stone-200 bg-white p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-stone-900">{req.name}</h3>
                    <CommissionStatusSelect
                      id={req.id}
                      currentStatus={req.status}
                    />
                  </div>
                  <p className="mt-0.5 text-sm text-stone-500">{req.email}</p>
                  <div className="mt-2 flex gap-4 text-xs text-stone-400">
                    <span>Subject: {req.subject}</span>
                    {req.size && <span>Size: {req.size}</span>}
                    <span>
                      {req.createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-stone-700">
                {req.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
