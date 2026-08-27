import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getCurrentTenant } from "@/lib/tenant";

/** Tenant için Stripe Checkout oturumu oluşturup ödeme sayfasına yönlendirir. */
export async function POST(req: NextRequest) {
  const tenant = await getCurrentTenant();
  if (!tenant) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  if (!stripe || !process.env.STRIPE_PRICE_ID) {
    return NextResponse.json(
      { error: "Ödeme sistemi henüz yapılandırılmadı (STRIPE_SECRET_KEY / STRIPE_PRICE_ID)" },
      { status: 503 }
    );
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? req.nextUrl.origin;

  let customerId = tenant.stripeCustomerId ?? undefined;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: tenant.email,
      name: tenant.companyName,
      metadata: { tenantId: tenant.id },
    });
    customerId = customer.id;
    await prisma.tenant.update({ where: { id: tenant.id }, data: { stripeCustomerId: customerId } });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: `${appUrl}/admin/billing?checkout=success`,
    cancel_url: `${appUrl}/admin/billing?checkout=cancel`,
    client_reference_id: tenant.id,
    metadata: { tenantId: tenant.id },
    subscription_data: { metadata: { tenantId: tenant.id } },
  });

  return NextResponse.json({ url: session.url });
}
