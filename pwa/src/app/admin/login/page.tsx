"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Giriş başarısız");
    }
  }

  return (
    <div className="auth-shell">
      <Link href="/" className="auth-brand">
        <span className="logo-dot" />
        Üretim Takip Bildirim
      </Link>
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Giriş Yap</h1>
        <p className="muted" style={{ marginBottom: 20 }}>
          Yönetim panelinize erişmek için giriş yapın.
        </p>
        <label htmlFor="email">E-posta</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <label htmlFor="password">Şifre</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
        {error && <p className="status-error">{error}</p>}
        <p className="muted auth-footer">
          Hesabınız yok mu? <Link href="/signup">Ücretsiz deneyin</Link>
        </p>
      </form>
    </div>
  );
}
