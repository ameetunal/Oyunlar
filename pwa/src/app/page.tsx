import Link from "next/link";

// Fiyatlandırma burada düzenlenir — kendi maliyet/marj hesabınıza göre güncelleyin.
const MONTHLY_PRICE = "1.490 ₺";

const FEATURES = [
  {
    title: "Kişi ve tezgah bazlı yönlendirme",
    desc: "Her kişi sadece kendisine atanan tezgah ve olay türünün bildirimini alır. Gereksiz bildirim yok.",
  },
  {
    title: "Tek yönlü, salt-okunur bağlantı",
    desc: "Üretim ağınıza internetten hiçbir gelen bağlantı açılmaz. Sadece dışarı, tek yönlü bildirim isteği gider.",
  },
  {
    title: "Uygulama kurulumu gerektirmez",
    desc: "PWA teknolojisiyle çalışır — çalışanlar bir link açıp \"Bildirimleri Aç\" der, hepsi bu.",
  },
  {
    title: "Dakikalar içinde kurulum",
    desc: "Mevcut üretim takip sisteminize (ERMAK ve benzerleri) dokunmadan, yanına kurulur.",
  },
  {
    title: "Firmanıza özel, izole ortam",
    desc: "Her firmanın kendi kullanıcıları, kendi kuralları ve kendi gizli API anahtarı vardır.",
  },
  {
    title: "Bulut tabanlı yönetim paneli",
    desc: "Kullanıcı ekleme, bildirim kuralı tanımlama ve kişisel bağlantı paylaşımı tarayıcıdan yapılır.",
  },
];

const STEPS = [
  {
    step: "1",
    title: "Ücretsiz hesap açın",
    desc: "14 günlük deneme için kredi kartı gerekmez.",
  },
  {
    step: "2",
    title: "haberci-servis'i bağlayın",
    desc: "Panelden aldığınız API anahtarını üretim ağınızdaki küçük servise girin.",
  },
  {
    step: "3",
    title: "Kişileri ve kuralları tanımlayın",
    desc: "Kimin hangi tezgahın hangi olayını göreceğini belirleyin, kişisel linki gönderin.",
  },
];

export default function HomePage() {
  return (
    <div className="landing">
      <header className="landing-nav">
        <div className="landing-nav-inner">
          <span className="landing-logo">Üretim Takip Bildirim</span>
          <nav className="row">
            <Link href="/admin/login" className="secondary-link">
              Giriş Yap
            </Link>
            <Link href="/signup" className="landing-nav-cta">
              Ücretsiz Başla
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="landing-hero">
          <div className="landing-glow" aria-hidden="true" />
          <p className="landing-eyebrow">Fabrikalar için anlık bildirim altyapısı</p>
          <h1 className="landing-title">
            Fabrikanızın nabzı,
            <br />
            <span className="landing-title-accent">doğru kişinin cebinde.</span>
          </h1>
          <p className="landing-subtitle">
            Üretim takip sisteminizden gelen olayları (yeni iş, tezgah duruşu, kalite kararı,
            eskalasyon...) kişi ve tezgah bazlı olarak doğrudan telefonlara push bildirim
            olarak iletir. Üretim ağınıza hiçbir gelen bağlantı açılmaz.
          </p>
          <div className="row" style={{ justifyContent: "center", marginTop: 28 }}>
            <Link href="/signup" className="landing-cta-primary">
              14 Gün Ücretsiz Dene
            </Link>
            <a href="#nasil-calisir" className="landing-cta-secondary">
              Nasıl çalışır?
            </a>
          </div>
          <p className="muted" style={{ marginTop: 12 }}>
            Kredi kartı gerekmez · Dakikalar içinde kurulum
          </p>
        </section>

        <section className="landing-section">
          <h2 className="landing-section-title">Neden Üretim Takip Bildirim?</h2>
          <div className="landing-grid">
            {FEATURES.map((f) => (
              <div className="landing-feature-card" key={f.title}>
                <h3>{f.title}</h3>
                <p className="muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-section" id="nasil-calisir">
          <h2 className="landing-section-title">Nasıl çalışır?</h2>
          <div className="landing-steps">
            {STEPS.map((s) => (
              <div className="landing-step" key={s.step}>
                <div className="landing-step-number">{s.step}</div>
                <h3>{s.title}</h3>
                <p className="muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="landing-section" id="fiyatlandirma">
          <h2 className="landing-section-title">Fiyatlandırma</h2>
          <div className="landing-pricing-card">
            <p className="landing-eyebrow">Standart Plan</p>
            <p className="landing-price">
              {MONTHLY_PRICE}
              <span className="muted"> / ay</span>
            </p>
            <ul className="landing-price-list">
              <li>Sınırsız kullanıcı ve bildirim kuralı</li>
              <li>Sınırsız push bildirim</li>
              <li>Kendi API anahtarınız</li>
              <li>14 gün ücretsiz deneme</li>
            </ul>
            <Link href="/signup" className="landing-cta-primary" style={{ display: "inline-block" }}>
              Ücretsiz Başla
            </Link>
          </div>
        </section>

        <section className="landing-section landing-final-cta">
          <h2 className="landing-section-title">Bildirimler doğru kişiye, saniyeler içinde ulaşsın.</h2>
          <Link href="/signup" className="landing-cta-primary" style={{ display: "inline-block" }}>
            Ücretsiz Başla
          </Link>
        </section>
      </main>

      <footer className="landing-footer">
        <span className="muted">Üretim Takip Bildirim</span>
        <div className="row">
          <Link href="/gizlilik-politikasi" className="secondary-link">
            Gizlilik Politikası
          </Link>
          <Link href="/kullanim-sartlari" className="secondary-link">
            Kullanım Şartları
          </Link>
          <Link href="/admin/login" className="secondary-link">
            Giriş Yap
          </Link>
        </div>
      </footer>
    </div>
  );
}
