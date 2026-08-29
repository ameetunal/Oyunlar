import { NextRequest, NextResponse } from "next/server";

/**
 * req.json() bozuk/boş bir gövdede senkron olarak fırlatır; bu da route
 * handler'ı yakalanmamış bir hatayla 500 döndürmesine yol açar. Bunun yerine
 * temiz bir 400 dönmek için kullanılır.
 */
export async function readJsonBody<T = unknown>(
  req: NextRequest
): Promise<{ data: T; error?: undefined } | { data?: undefined; error: NextResponse }> {
  try {
    const data = (await req.json()) as T;
    return { data };
  } catch {
    return { error: NextResponse.json({ error: "Geçersiz istek gövdesi" }, { status: 400 }) };
  }
}
