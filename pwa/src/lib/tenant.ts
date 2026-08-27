import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/session";

/** Oturum çerezinden mevcut tenant id'sini çözer (Server Component / Route Handler). */
export async function getCurrentTenantId(): Promise<string | null> {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function getCurrentTenant() {
  const tenantId = await getCurrentTenantId();
  if (!tenantId) return null;
  return prisma.tenant.findUnique({ where: { id: tenantId } });
}

const TRIAL_DAYS = 14;

export function trialEndsAt(from: Date = new Date()): Date {
  return new Date(from.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000);
}

/** Tenant, panele erişebilecek geçerli bir abonelik/deneme süresine sahip mi? */
export function hasActiveAccess(tenant: { subscriptionStatus: string; trialEndsAt: Date }): boolean {
  if (tenant.subscriptionStatus === "active") return true;
  if (tenant.subscriptionStatus === "trialing") return new Date(tenant.trialEndsAt) > new Date();
  return false;
}
