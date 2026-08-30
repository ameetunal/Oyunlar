import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";

function mapStripeStatus(status: Stripe.Subscription.Status): string {
  switch (status) {
    case "active":
    case "trialing":
      return "active";
    case "past_due":
    case "unpaid":
    case "incomplete":
      return "past_due";
    default:
      return "canceled";
  }
}

async function syncSubscription(subscription: Stripe.Subscription) {
  const tenantId = subscription.metadata?.tenantId;
  const tenant = tenantId
    ? await prisma.tenant.findUnique({ where: { id: tenantId } })
    : await prisma.tenant.findUnique({ where: { stripeCustomerId: String(subscription.customer) } });

  if (!tenant) return;

  await prisma.tenant.update({
    where: { id: tenant.id },
    data: {
      stripeCustomerId: String(subscription.customer),
      stripeSubscriptionId: subscription.id,
      subscriptionStatus: mapStripeStatus(subscription.status),
    },
  });
}

/** Stripe'tan gelen abonelik olaylarını dinler ve tenant durumunu günceller. */
export async function POST(req: NextRequest) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook yapılandırılmadı" }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature ?? "", process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Stripe webhook imza doğrulama hatası:", err);
    return NextResponse.json({ error: "Geçersiz imza" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(String(session.subscription));
        await syncSubscription(subscription);
      }
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      await syncSubscription(event.data.object as Stripe.Subscription);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
