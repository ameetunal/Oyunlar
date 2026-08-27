"use client";

import { useState } from "react";

type RoutingRule = { id: string; eventType: string; tezgah: string | null };
type PushSubscription = { id: string };
type User = {
  id: string;
  name: string;
  role: string;
  subscriptions: PushSubscription[];
  routingRules: RoutingRule[];
};

// ERMAK'ın BILDIRIM_LOG.TIP kolonunda gördüğümüz bilinen değerler.
// Bu liste zamanla değişebilir/genişleyebilir — listede olmayan bir tip
// için "Diğer (elle yaz)" seçilip TIP değeri elle girilebilir.
const EVENT_TYPES = [
  { value: "hepsi", label: "Tüm olaylar" },
  { value: "YENI_IS", label: "Yeni iş eklendi" },
  { value: "YENI_TALEP", label: "Yeni iş talebi" },
  { value: "TEZGAH_DURUS", label: "Tezgah duruşu başladı" },
  { value: "UNUTULAN_IS", label: "Unutulan iş hatırlatması" },
  { value: "ESKALASYON", label: "Uzun süredir çözülmemiş iş" },
  { value: "ARA_KONTROL_ONAY", label: "Ara kontrol onaylandı" },
  { value: "ARA_KONTROL_RED", label: "Ara kontrol reddedildi" },
  { value: "KALITE_BITIS_ONAY", label: "Kalite bitiş onayı" },
  { value: "KALITE_BITIS_RED", label: "Kalite bitiş reddi" },
  { value: "ROTA_SONRAKI", label: "Sıradaki rota adımına geçti" },
  { value: "SIPARIS_DEGISTI", label: "Sipariş adedi değişti" },
  { value: "ANDON_AC", label: "Andon (yardım) çağrısı" },
  { value: "DUYURU", label: "Genel duyuru" },
  { value: "__custom__", label: "Diğer (elle yaz)" },
];

function eventTypeLabel(value: string): string {
  return EVENT_TYPES.find((t) => t.value === value)?.label ?? value;
}

// TEZGAH_DURUM tablosunda görülen örnek makine adları — sadece otomatik
// tamamlama önerisi içindir, tam liste değildir.
const KNOWN_MAKINE_SUGGESTIONS = [
  "1020-1",
  "1020-2",
  "1400",
  "1600",
  "ARION-1",
  "ARION-2",
  "B-HARTFORT",
  "DV-13",
  "DV-15",
  "FELLER",
  "FULLAND",
  "K-HARTFORD",
  "LAGUN",
  "M-HARTFORD",
  "TOPPER",
];

export default function AdminClient({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  async function refresh() {
    const res = await fetch("/api/users");
    setUsers(await res.json());
  }

  async function addUser(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !role) return;

    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role }),
    });

    setName("");
    setRole("");
    await refresh();
  }

  async function deleteUser(id: string) {
    if (!confirm("Bu kullanıcıyı ve tüm bildirim kurallarını silmek istiyor musunuz?")) return;
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    await refresh();
  }

  async function addRule(userId: string, eventType: string, tezgah: string) {
    await fetch("/api/routing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, eventType, tezgah: tezgah || null }),
    });
    await refresh();
  }

  async function deleteRule(id: string) {
    await fetch(`/api/routing/${id}`, { method: "DELETE" });
    await refresh();
  }

  async function logout() {
    await fetch("/api/admin-login", { method: "DELETE" });
    window.location.href = "/admin/login";
  }

  return (
    <>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h1>Yönetim Paneli</h1>
        <button className="secondary" onClick={logout}>
          Çıkış
        </button>
      </div>

      <form className="card" onSubmit={addUser}>
        <h2>Yeni Kişi Ekle</h2>
        <label htmlFor="name">Ad Soyad</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="role">Rol (örn. Kalite, Bölüm Şefi, Yönetici)</label>
        <input id="role" value={role} onChange={(e) => setRole(e.target.value)} />
        <button type="submit">Ekle</button>
      </form>

      {users.map((user) => (
        <UserCard key={user.id} user={user} onAddRule={addRule} onDeleteRule={deleteRule} onDeleteUser={deleteUser} />
      ))}

      {/* Bilinen tezgah adları için otomatik tamamlama önerisi.
          Sistemde bunların dışında tezgah da olabilir — bu sadece kolaylık içindir. */}
      <datalist id="tezgah-onerileri">
        {KNOWN_MAKINE_SUGGESTIONS.map((m) => (
          <option key={m} value={m} />
        ))}
      </datalist>
    </>
  );
}

function UserCard({
  user,
  onAddRule,
  onDeleteRule,
  onDeleteUser,
}: {
  user: User;
  onAddRule: (userId: string, eventType: string, tezgah: string) => void;
  onDeleteRule: (id: string) => void;
  onDeleteUser: (id: string) => void;
}) {
  const [eventType, setEventType] = useState("hepsi");
  const [customEventType, setCustomEventType] = useState("");
  const [tezgah, setTezgah] = useState("");
  const [copied, setCopied] = useState(false);

  const joinUrl =
    typeof window !== "undefined" ? `${window.location.origin}/join/${user.id}` : `/join/${user.id}`;

  function copyLink() {
    navigator.clipboard.writeText(joinUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="card">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <h2 style={{ marginBottom: 4 }}>{user.name}</h2>
          <span className="tag">{user.role}</span>
          <span className="tag">
            {user.subscriptions.length > 0 ? "Cihaz bağlı" : "Henüz cihaz bağlamadı"}
          </span>
        </div>
        <button className="danger" onClick={() => onDeleteUser(user.id)}>
          Sil
        </button>
      </div>

      <p className="muted" style={{ marginTop: 12, marginBottom: 4 }}>
        Kişisel bağlantı (bu linki {user.name}&apos;e gönderin):
      </p>
      <div className="row">
        <div className="link-box" style={{ flex: 1 }}>
          {joinUrl}
        </div>
        <button className="secondary" onClick={copyLink}>
          {copied ? "Kopyalandı" : "Kopyala"}
        </button>
      </div>

      <h3 style={{ marginTop: 16, marginBottom: 8, fontSize: "0.95rem" }}>Bildirim Kuralları</h3>

      {user.routingRules.length === 0 && (
        <p className="muted">Henüz bir kural yok — hiçbir bildirim almayacak.</p>
      )}

      {user.routingRules.map((rule) => (
        <div className="list-item" key={rule.id}>
          <span>
            {eventTypeLabel(rule.eventType)}
            {" — "}
            {rule.tezgah ? rule.tezgah : "Tüm tezgahlar"}
          </span>
          <button className="secondary" onClick={() => onDeleteRule(rule.id)}>
            Kaldır
          </button>
        </div>
      ))}

      <div className="row" style={{ marginTop: 12 }}>
        <select value={eventType} onChange={(e) => setEventType(e.target.value)} style={{ flex: 1, marginBottom: 0 }}>
          {EVENT_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {eventType === "__custom__" && (
          <input
            placeholder="TIP değeri (örn. YENI_URUN)"
            value={customEventType}
            onChange={(e) => setCustomEventType(e.target.value)}
            style={{ flex: 1, marginBottom: 0 }}
          />
        )}
        <input
          placeholder="Tezgah (boş = tümü, örn. ARION-1)"
          list="tezgah-onerileri"
          value={tezgah}
          onChange={(e) => setTezgah(e.target.value)}
          style={{ flex: 1, marginBottom: 0 }}
        />
        <button
          onClick={() => {
            const finalEventType = eventType === "__custom__" ? customEventType.trim() : eventType;
            if (!finalEventType) return;
            onAddRule(user.id, finalEventType, tezgah);
            setTezgah("");
            setCustomEventType("");
          }}
        >
          Kural Ekle
        </button>
      </div>
    </div>
  );
}
