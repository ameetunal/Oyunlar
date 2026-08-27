import { redirect } from "next/navigation";
import { getCurrentTenant } from "@/lib/tenant";
import BillingClient from "./BillingClient";

export const dynamic = "force-dynamic";

export default async function BillingPage() {
  const tenant = await getCurrentTenant();
  if (!tenant) redirect("/admin/login");

  return (
    <div className="container">
      <BillingClient
        subscriptionStatus={tenant.subscriptionStatus}
        trialEndsAt={tenant.trialEndsAt.toISOString()}
        hasSubscription={!!tenant.stripeSubscriptionId}
      />
    </div>
  );
}
