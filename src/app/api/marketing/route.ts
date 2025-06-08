import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NewsletterSubscriber, Product } from "@prisma/client";

const marketingEmailSchema = z.object({
  subject: z.string().min(1),
  content: z.string().min(1),
  productIds: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  try {
    // Check admin authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { subject, content, productIds } = marketingEmailSchema.parse(body);

    // Get active subscribers
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: { status: "active" },
    }) as NewsletterSubscriber[];

    // If product IDs are provided, get product details
    let products: Product[] = [];
    if (productIds?.length) {
      products = await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: {
          id: true,
          title: true,
          price: true,
          amazonLink: true,
        },
      }) as Product[];
    }

    // Send marketing emails
    const emailPromises = subscribers.map((subscriber) =>
      sendEmail({
        to: subscriber.email,
        template: "marketing",
        data: {
          products: products.map((product) => ({
            title: product.title,
            price: product.price,
            link: product.amazonLink,
          })),
        },
      }).catch((error) => {
        console.error(
          `Failed to send marketing email to ${subscriber.email}:`,
          error
        );
        return null;
      })
    );

    await Promise.all(emailPromises);

    // Create campaign record
    await prisma.marketingCampaign.create({
      data: {
        subject,
        content,
        sentTo: subscribers.length,
        productIds: productIds || [],
        sentBy: session.user.id,
      },
    });

    return NextResponse.json(
      {
        message: `Marketing email sent to ${subscribers.length} subscribers`,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }

    console.error("Marketing email error:", error);
    return NextResponse.json(
      { error: "Failed to send marketing emails" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // Check admin authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get campaign history
    const campaigns = await prisma.marketingCampaign.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        sentBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error("Failed to fetch marketing campaigns:", error);
    return NextResponse.json(
      { error: "Failed to fetch marketing campaigns" },
      { status: 500 }
    );
  }
} 