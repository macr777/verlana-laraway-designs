"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateCommissionStatus(id: number, status: string) {
  await prisma.commissionRequest.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/commissions");
}
