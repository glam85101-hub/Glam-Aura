import { NextResponse } from "next/server";
import crypto from "crypto";

// This webhook handles Lemon Squeezy events for production
// Make sure to configure the webhook URL in your Lemon Squeezy dashboard:
// https://yourdomain.com/api/webhooks/lemonsqueezy
//
// Events to handle:
// - subscription_created: Grant access to premium features
// - subscription_updated: Update subscription details
// - subscription_expired/subscription_cancelled: Revoke access
// - order_created: Process one-time payments

export async function POST(req: Request) {
  try {
    const payload = await req.text();
    const signature = req.headers.get("x-signature") || "";

    // Verify webhook signature
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    if (!secret) {
      console.error("LEMONSQUEEZY_WEBHOOK_SECRET is not set");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    // Verify HMAC signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("Invalid webhook signature received");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(payload);
    const eventName = event.meta?.event_name;
    const eventData = event.data;

    console.log(`[Lemon Squeezy Webhook] Event: ${eventName}`);

    // Handle different event types
    switch (eventName) {
      case "subscription_created":
        await handleSubscriptionCreated(eventData);
        break;
      case "subscription_updated":
        await handleSubscriptionUpdated(eventData);
        break;
      case "subscription_expired":
      case "subscription_cancelled":
        await handleSubscriptionEnded(eventData);
        break;
      case "order_created":
        await handleOrderCreated(eventData);
        break;
      default:
        console.log(`[Lemon Squeezy Webhook] Unhandled event: ${eventName}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("[Lemon Squeezy Webhook] Error:", error);
    return NextResponse.json(
      { error: error.message || "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// Handle subscription creation - grant user access
async function handleSubscriptionCreated(data: any) {
  const attributes = data?.attributes;
  const userId = attributes?.custom_data?.user_id;
  const customerEmail = attributes?.customer_email;
  const subscriptionId = data?.id;

  console.log("[Subscription Created]", {
    subscriptionId,
    userId,
    customerEmail,
    status: attributes?.status,
  });

  // TODO: Add your database logic here
  // Example: Update user's subscription status in your database
  // await db.users.update({ where: { id: userId }, data: { isPremium: true, subscriptionId } });
}

// Handle subscription updates
async function handleSubscriptionUpdated(data: any) {
  const attributes = data?.attributes;
  const subscriptionId = data?.id;

  console.log("[Subscription Updated]", {
    subscriptionId,
    status: attributes?.status,
    renewsAt: attributes?.renews_at,
  });

  // TODO: Add your database logic here
  // Example: Update subscription details in your database
}

// Handle subscription expiration or cancellation - revoke access
async function handleSubscriptionEnded(data: any) {
  const attributes = data?.attributes;
  const userId = attributes?.custom_data?.user_id;
  const customerEmail = attributes?.customer_email;
  const subscriptionId = data?.id;

  console.log("[Subscription Ended]", {
    subscriptionId,
    userId,
    customerEmail,
    status: attributes?.status,
  });

  // TODO: Add your database logic here
  // Example: Update user's subscription status to revoke access
  // await db.users.update({ where: { id: userId }, data: { isPremium: false } });
}

// Handle one-time order creation
async function handleOrderCreated(data: any) {
  const attributes = data?.attributes;
  const orderId = data?.id;

  console.log("[Order Created]", {
    orderId,
    total: attributes?.total,
    status: attributes?.status,
  });

  // TODO: Add your database logic here
  // Example: Record the order and grant access
}
