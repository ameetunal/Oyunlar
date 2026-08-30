import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import JoinClient from "./JoinClient";

export const dynamic = "force-dynamic";

export default async function JoinPage({ params }: { params: { userId: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
    select: { id: true, name: true },
  });

  if (!user) notFound();

  return (
    <div className="auth-shell">
      <span className="auth-brand" style={{ cursor: "default" }}>
        <span className="logo-dot" />
        Üretim Takip Bildirim
      </span>
      <div className="auth-card">
        <JoinClient userId={user.id} userName={user.name} />
      </div>
    </div>
  );
}
