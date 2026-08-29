import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <div className="card" style={{ textAlign: "center", padding: "48px 24px" }}>
        <h1>
          404 — Bu sayfa <span style={{ color: "var(--accent)" }}>bulunamadı</span>
        </h1>
        <p className="muted">Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.</p>
        <Link href="/" className="secondary-link">
          ← Ana sayfaya dön
        </Link>
      </div>
    </div>
  );
}
