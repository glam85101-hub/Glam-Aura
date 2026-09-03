import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Require authentication for checkout
    const { getSession } = await import("@/lib/session");
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // Validate environment variables
    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    const storeId = process.env.LEMONSQUEEZY_STORE_ID;

    if (!apiKey || !storeId) {
      console.error("Missing Lemon Squeezy environment variables");
      return NextResponse.json(
        { error: "Payment configuration error" },
        { status: 500 }
      );
    }

    const { variantId } = await req.json();

    if (!variantId) {
      return NextResponse.json({ error: "Missing variantId" }, { status: 400 });
    }

    // Validate variantId is a string and not empty
    if (typeof variantId !== "string" || variantId.trim() === "") {
      return NextResponse.json(
        { error: "Invalid variantId" },
        { status: 400 }
      );
    }

    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.api+json",
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_options: {
              embed: false,
              logo: true,
            },
            product_options: {
              redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com"}/success`,
            },
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: storeId,
              },
            },
            variant: {
              data: {
                type: "variants",
                id: variantId,
              },
            },
          },
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Lemon Squeezy API error:", data);
      const errorMessage =
        data.errors?.[0]?.detail || "Failed to create checkout";
      return NextResponse.json({ error: errorMessage }, { status: response.status });
    }

    // Return checkout URL
    const checkoutUrl = data.data?.attributes?.url;
    if (!checkoutUrl) {
      console.error("No checkout URL in response:", data);
      return NextResponse.json(
        { error: "Failed to generate checkout URL" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: checkoutUrl,
      id: data.data.id,
    });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
