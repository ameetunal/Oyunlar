import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminApi =
    pathname.startsWith("/api/users") ||
    pathname.startsWith("/api/routing") ||
    pathname.startsWith("/api/billing");

  if (isAdminPage || isAdminApi) {
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    const tenantId = await verifySessionToken(token);
    if (!tenantId) {
      if (isAdminApi) {
        return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/users/:path*", "/api/routing/:path*", "/api/billing/:path*"],
};
