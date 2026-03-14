import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, size, description } = body;

    // Validate required fields
    if (!name || !email || !subject || !description) {
      return NextResponse.json(
        { error: "Name, email, subject, and description are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Save to database
    await prisma.commissionRequest.create({
      data: {
        name,
        email,
        subject,
        size: size || null,
        description,
      },
    });

    // TODO: Send email notification via Resend when configured

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
