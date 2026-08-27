import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "admin_session";

/**
 * Basit paylaşılan şifre tabanlı oturum. İç kullanım için yeterlidir;
 * çok kullanıcılı/rol bazlı bir yönetim gerekiyorsa gerçek bir kimlik
 * doğrulama sistemiyle (ör. NextAuth) değiştirilmelidir.
 */
export function isAdminAuthenticated(): boolean {
  const cookie = cookies().get(ADMIN_COOKIE_NAME);
  return !!cookie && cookie.value === process.env.ADMIN_PASSWORD;
}

export function isValidHaberciApiKey(key: string | null): boolean {
  return !!key && key === process.env.HABERCI_API_KEY;
}
