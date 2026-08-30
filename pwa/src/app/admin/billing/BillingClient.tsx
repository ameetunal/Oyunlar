"use client";

import { useState } from "react";

export default function BillingClient({
  subscriptionStatus,
  trialEndsAt,
  hasSubscription,
}: {
  subscriptionStatus: string;
  trialEndsAt: string;
  hasSubscription: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function goToCheckout() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/billing/checkout", { method: "POST" });
    const data = await res.json();
    setLoading(false);
    if (res.ok && data.url) {
      window.location.href = data.url;
    } else {
      setError(data.error ?? "Bir hata oluştu");
    }
  }

  async function goToPortal() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/billing/portal", { method: "POST" });
    const data = await res.json();
    setLoading(false);
    if (res.ok && data.url) {
      window.location.href = data.url;
    } else {
      setError(data.error ?? "Bir hata oluştu");
    }
  }

  const trialDate = new Date(trialEndsAt);
  const trialActive = subscriptionStatus === "trialing" && trialDate > new Date();

  return (
    <div className="card">
      <h1>Abonelik</h1>

      {subscriptionStatus === "active" && (
        <p className="status-ok">Aboneliğiniz aktif. Panele tam erişiminiz var.</p>
      )}

      {trialActive && (
        <p className="muted">
          Ücretsiz deneme sürenizde ({trialDate.toLocaleDateString("tr-TR")} tarihine kadar).
          Kesintisiz devam etmek için şimdi abone olabilirsiniz.
        </p>
      )}

      {!trialActive && subscriptionStatus !== "active" && (
        <p className="status-error">
          Deneme süreniz doldu ya da aboneliğiniz pasif. Panele erişim için abone olun.
        </p>
      )}

      <div className="row" style={{ marginTop: 16 }}>
        <button onClick={goToCheckout} disabled={loading}>
          {hasSubscription ? "Planı Güncelle" : "Abone Ol"}
        </button>
        {hasSubscription && (
          <button className="secondary" onClick={goToPortal} disabled={loading}>
            Faturaları / Aboneliği Yönet
          </button>
        )}
      </div>

      {error && <p className="status-error">{error}</p>}
    </div>
  );
}
