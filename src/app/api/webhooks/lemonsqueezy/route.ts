import { NextResponse } from "next/server";
import crypto from "crypto";
import { getPrisma } from "@/lib/prisma";

// Lemon Squeezy webhook — configure in your Lemon Squeezy dashboard:
//   Settings → Webhooks → https://<your-domain>/api/webhooks/lemonsqueezy
//
// Events handled:
// - order_created: one-time Elite payment → grant premium
// - order_refunded: refund → revoke premium
// - subscription_created/updated: grant/keep premium while active
// - subscription_expired/cancelled: revoke premium

const ACTIVE_SUBSCRIPTION_STATUSES = ["on_trial", "active"];
const ENDED_SUBSCRIPTION_STATUSES = ["cancelled", "expired", "paused"];

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

    // Verify HMAC signature (compare in constant time)
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    const signatureBuf = Buffer.from(signature, "hex");
    const expectedBuf = Buffer.from(expectedSignature, "hex");
    if (
      signatureBuf.length !== expectedBuf.length ||
      !crypto.timingSafeEqual(signatureBuf, expectedBuf)
    ) {
      console.error("Invalid webhook signature received");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(payload);
    const eventName = event.meta?.event_name;

    console.log(`[Lemon Squeezy Webhook] Event: ${eventName}`);

    // Handle different event types
    switch (eventName) {
      case "subscription_created":
        await handleSubscriptionCreated(event);
        break;
      case "subscription_updated":
        await handleSubscriptionUpdated(event);
        break;
      case "subscription_expired":
      case "subscription_cancelled":
        await handleSubscriptionEnded(event);
        break;
      case "order_created":
        await handleOrderCreated(event);
        break;
      case "order_refunded":
        await handleOrderRefunded(event);
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

/**
 * Resolve the app user for an event:
 * 1. meta.custom_data.user_id (set via checkout_data.custom at checkout)
 * 2. fallback: customer email on the event
 */
async function resolveUser(event: any) {
  const prisma = getPrisma();

  const userId = event?.meta?.custom_data?.user_id;
  if (userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) return user;
  }

  const email = event?.data?.attributes?.customer_email;
  if (email) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) return user;
  }

  return null;
}

/** Flip a user's premium flag, stamping premiumSince on grant. */
async function setPremium(userId: string, premium: boolean) {
  const prisma = getPrisma();
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  if (premium && !user.isPremium) {
    await prisma.user.update({
      where: { id: userId },
      data: { isPremium: true, premiumSince: new Date() },
    });
    console.log(`[Lemon Squeezy Webhook] Premium granted to ${user.email}`);
  } else if (!premium && user.isPremium) {
    await prisma.user.update({
      where: { id: userId },
      data: { isPremium: false, premiumSince: null },
    });
    console.log(`[Lemon Squeezy Webhook] Premium revoked for ${user.email}`);
  } else {
    console.log(
      `[Lemon Squeezy Webhook] No change for ${user.email} (isPremium=${user.isPremium})`
    );
  }
}

function warnNoUser(event: any) {
  console.warn("[Lemon Squeezy Webhook] Could not match a user for event", {
    eventName: event?.meta?.event_name,
    customData: event?.meta?.custom_data,
    customerEmail: event?.data?.attributes?.customer_email,
  });
}

// Handle subscription creation - grant user access
async function handleSubscriptionCreated(event: any) {
  const attributes = event?.data?.attributes;
  const user = await resolveUser(event);

  console.log("[Lemon Squeezy Webhook] subscription_created", {
    subscriptionId: event?.data?.id,
    userId: user?.id,
    customerEmail: attributes?.customer_email,
    status: attributes?.status,
  });

  if (!user) return warnNoUser(event);
  if (ACTIVE_SUBSCRIPTION_STATUSES.includes(attributes?.status)) {
    await setPremium(user.id, true);
  }
}

// Handle subscription updates
async function handleSubscriptionUpdated(event: any) {
  const attributes = event?.data?.attributes;
  const status = attributes?.status;
  const user = await resolveUser(event);

  console.log("[Lemon Squeezy Webhook] subscription_updated", {
    subscriptionId: event?.data?.id,
    userId: user?.id,
    status,
    renewsAt: attributes?.renews_at,
  });

  if (!user) return warnNoUser(event);
  if (ACTIVE_SUBSCRIPTION_STATUSES.includes(status)) {
    await setPremium(user.id, true);
  } else if (ENDED_SUBSCRIPTION_STATUSES.includes(status)) {
    await setPremium(user.id, false);
  }
}

// Handle subscription expiration or cancellation - revoke access
async function handleSubscriptionEnded(event: any) {
  const attributes = event?.data?.attributes;
  const user = await resolveUser(event);

  console.log("[Lemon Squeezy Webhook] subscription_ended", {
    subscriptionId: event?.data?.id,
    userId: user?.id,
    customerEmail: attributes?.customer_email,
    status: attributes?.status,
  });

  if (!user) return warnNoUser(event);
  await setPremium(user.id, false);
}

// Handle one-time order creation (Elite lifetime purchase)
async function handleOrderCreated(event: any) {
  const attributes = event?.data?.attributes;
  const user = await resolveUser(event);

  console.log("[Lemon Squeezy Webhook] order_created", {
    orderId: event?.data?.id,
    userId: user?.id,
    total: attributes?.total,
    status: attributes?.status,
  });

  if (!user) return warnNoUser(event);
  if (attributes?.status === "paid") {
    await setPremium(user.id, true);
  }
}

// Handle refunded orders - revoke premium
async function handleOrderRefunded(event: any) {
  const attributes = event?.data?.attributes;
  const user = await resolveUser(event);

  console.log("[Lemon Squeezy Webhook] order_refunded", {
    orderId: event?.data?.id,
    userId: user?.id,
    status: attributes?.status,
  });

  if (!user) return warnNoUser(event);
  await setPremium(user.id, false);
}
