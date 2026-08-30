"use client";

import { useState } from "react";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export default function JoinClient({ userId, userName }: { userId: string; userName: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function enableNotifications() {
    setStatus("loading");
    setMessage("");

    try {
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        throw new Error("Bu tarayıcı push bildirimlerini desteklemiyor.");
      }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        throw new Error("Bildirim izni verilmedi.");
      }

      const registration = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;

      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicKey) {
        throw new Error("Sunucu tarafında VAPID anahtarı ayarlanmamış.");
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey) as BufferSource,
      });

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, subscription }),
      });

      if (!res.ok) throw new Error("Kayıt sırasında hata oluştu.");

      setStatus("done");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Bilinmeyen hata");
    }
  }

  return (
    <>
      <h1>Merhaba, {userName}</h1>
      <p className="muted" style={{ marginBottom: 20 }}>
        Bu cihazda bildirimleri açtığınızda, size atanan tezgah ve olay
        türlerine ait bildirimleri buradan alacaksınız.
      </p>

      {status === "done" ? (
        <p className="status-ok">Bildirimler açıldı. Bu ekranı ana ekranınıza ekleyebilirsiniz.</p>
      ) : (
        <button onClick={enableNotifications} disabled={status === "loading"} style={{ width: "100%" }}>
          {status === "loading" ? "Açılıyor..." : "Bildirimleri Aç"}
        </button>
      )}

      {status === "error" && <p className="status-error">{message}</p>}
    </>
  );
}
