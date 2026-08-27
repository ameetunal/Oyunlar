import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getCurrentTenant } from "@/lib/tenant";

/** Tenant'ı Stripe'ın kendi fatura/abonelik yönetim sayfasına yönlendirir. */
export async function POST(req: NextRequest) {
  const tenant = await getCurrentTenant();
  if (!tenant) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  if (!stripe || !tenant.stripeCustomerId) {
    return NextResponse.json({ error: "Henüz bir aboneliğiniz yok" }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? req.nextUrl.origin;

  const session = await stripe.billingPortal.sessions.create({
    customer: tenant.stripeCustomerId,
    return_url: `${appUrl}/admin/billing`,
  });

  return NextResponse.json({ url: session.url });
}
