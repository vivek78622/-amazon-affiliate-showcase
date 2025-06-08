import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const trackClickSchema = z.object({
  productId: z.string().uuid(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId } = trackClickSchema.parse(body);

    // Get client IP and user agent
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Create click tracking record
    await prisma.clickTracking.create({
      data: {
        productId,
        ipAddress: ip,
        userAgent,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    console.error("Click tracking error:", error);
    return NextResponse.json(
      { error: "Failed to track click" },
      { status: 500 }
    );
  }
} 