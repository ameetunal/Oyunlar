import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isAdminApi =
    pathname.startsWith("/api/users") || pathname.startsWith("/api/routing");

  if (isAdminPage || isAdminApi) {
    const cookie = req.cookies.get(ADMIN_COOKIE_NAME);
    if (!cookie || cookie.value !== process.env.ADMIN_PASSWORD) {
      if (isAdminApi) {
        return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/users/:path*", "/api/routing/:path*"],
};
