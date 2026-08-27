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

const EVENT_TYPES = [
  { value: "hepsi", label: "Tüm olaylar" },
  { value: "kalite_karari", label: "Kalite kararı" },
  { value: "durus", label: "Uzun duruş" },
  { value: "geciken_is", label: "Geciken iş" },
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
            {EVENT_TYPES.find((t) => t.value === rule.eventType)?.label ?? rule.eventType}
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
        <input
          placeholder="Tezgah (boş = tümü)"
          value={tezgah}
          onChange={(e) => setTezgah(e.target.value)}
          style={{ flex: 1, marginBottom: 0 }}
        />
        <button
          onClick={() => {
            onAddRule(user.id, eventType, tezgah);
            setTezgah("");
          }}
        >
          Kural Ekle
        </button>
      </div>
    </div>
  );
}
