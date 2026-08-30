import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCurrentTenant, hasActiveAccess } from "@/lib/tenant";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const tenant = await getCurrentTenant();
  if (!tenant) redirect("/admin/login");

  if (!hasActiveAccess(tenant)) {
    redirect("/admin/billing");
  }

  const users = await prisma.user.findMany({
    where: { tenantId: tenant.id },
    include: { subscriptions: true, routingRules: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container">
      <AdminClient
        initialUsers={users}
        tenant={{ companyName: tenant.companyName, apiKey: tenant.apiKey }}
      />
    </div>
  );
}
