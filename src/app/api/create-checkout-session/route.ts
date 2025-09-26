import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-08-27.basil", // use the required API version
});

export async function POST(req: Request) {
  try {
    const { amount } = await req.json();

    if (!amount || amount < 50) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Style PRO Plan" },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json({ url: session.url }); // ✅ always returns JSON
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
