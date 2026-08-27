import { prisma } from "@/lib/db";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const users = await prisma.user.findMany({
    include: { subscriptions: true, routingRules: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container">
      <AdminClient initialUsers={users} />
    </div>
  );
}
