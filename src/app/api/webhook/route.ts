import { stripe } from "../../lib/stripe";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    // Example: find user by email and upgrade plan
    const email = session.customer_email;

    if (email) {
      await prisma.user.update({
        where: { email },
        data: { plan: "pro" },
      });
    }
  }

  return NextResponse.json({ received: true });
}
