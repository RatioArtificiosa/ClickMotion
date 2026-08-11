import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const body = await req.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-12-18.acceptor" as any });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 });
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerId = session.customer as string;
      const priceId = session.line_items?.data[0]?.price?.id ?? (session as any).metadata?.priceId;
      // Map priceId → plan id via env
      const planMap: Record<string, string> = {
        [process.env.STRIPE_STARTER_PRICE_ID!]: "starter",
        [process.env.STRIPE_PRO_PRICE_ID!]: "pro",
        [process.env.STRIPE_LIFETIME_PRICE_ID!]: "lifetime",
        [process.env.STRIPE_AGENCY_PRICE_ID!]: "agency",
      };
      const plan = planMap[priceId ?? ""] ?? "pro";
      const email = session.customer_details?.email ?? session.customer_email;
      if (email) {
        await supabase.from("profiles").update({ plan, stripe_customer_id: customerId }).eq("email", email);
      }
      break;
    }
    case "customer.subscription.deleted":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const customerId = sub.customer as string;
      const status = sub.status;
      // Downgrade on cancel
      if (status === "canceled" || status === "unpaid") {
        await supabase.from("profiles").update({ plan: "free" }).eq("stripe_customer_id", customerId);
      }
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
