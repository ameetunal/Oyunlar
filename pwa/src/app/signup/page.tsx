"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyName, email, password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Kayıt başarısız");
    }
  }

  return (
    <div className="container">
      <form className="card" onSubmit={handleSubmit}>
        <h1>14 gün ücretsiz deneyin</h1>
        <p className="muted">Kredi kartı gerekmez. İstediğiniz zaman iptal edebilirsiniz.</p>

        <label htmlFor="companyName">Firma adı</label>
        <input
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          autoFocus
        />
        <label htmlFor="email">E-posta</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Şifre</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Hesap oluşturuluyor..." : "Ücretsiz Başla"}
        </button>
        <p className="muted" style={{ marginTop: 10, fontSize: "0.78rem" }}>
          Kayıt olarak{" "}
          <Link href="/kullanim-sartlari">Kullanım Şartları</Link>'nı ve{" "}
          <Link href="/gizlilik-politikasi">Gizlilik Politikası</Link>'nı kabul etmiş olursunuz.
        </p>
        {error && <p className="status-error">{error}</p>}
        <p className="muted" style={{ marginTop: 16 }}>
          Zaten hesabınız var mı? <Link href="/admin/login">Giriş yapın</Link>
        </p>
      </form>
    </div>
  );
}
