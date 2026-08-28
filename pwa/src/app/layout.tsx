import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Üretim Takip Bildirim",
  description: "Üretim takip sisteminden anlık bildirimler",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-touch-icon.png",
  },
  openGraph: {
    title: "Üretim Takip Bildirim",
    description: "Fabrikanızın nabzı, doğru kişinin cebinde. 14 gün ücretsiz dene.",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Üretim Takip Bildirim",
    description: "Fabrikanızın nabzı, doğru kişinin cebinde.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1120",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
