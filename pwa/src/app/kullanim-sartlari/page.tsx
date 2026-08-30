import Link from "next/link";

export const metadata = {
  title: "Kullanım Şartları | Üretim Takip Bildirim",
};

export default function KullanimSartlariPage() {
  return (
    <div className="container" style={{ maxWidth: 760 }}>
      <div className="card">
        <h1>
          Kullanım <span style={{ color: "var(--accent)" }}>Şartları</span>
        </h1>
        <p className="muted">Son güncelleme: 2026</p>

        <h2>1. Hizmet</h2>
        <p className="muted">
          "Üretim Takip Bildirim", müşterinin kendi üretim takip sistemindeki
          olayları, yetkilendirilmiş kullanıcılara push bildirim olarak
          ileten bir yazılım hizmetidir (SaaS). Hizmet "olduğu gibi" sunulur;
          kesintisiz veya hatasız çalışacağına dair bir garanti verilmez.
        </p>

        <h2>2. Deneme Süresi ve Abonelik</h2>
        <p className="muted">
          Yeni hesaplar 14 gün ücretsiz deneme süresiyle başlar, kredi kartı
          istenmez. Deneme süresi sonunda hizmete kesintisiz erişim için
          ücretli bir plana abone olunması gerekir. Abonelik, iptal
          edilmediği sürece otomatik olarak yenilenir; ödemeler Stripe
          üzerinden tahsil edilir. Aboneliğinizi yönetim panelindeki
          faturalandırma sayfasından istediğiniz zaman iptal edebilirsiniz.
        </p>

        <h2>3. Müşterinin Sorumlulukları</h2>
        <ul className="muted">
          <li>
            Üretim ağınızdaki <code>haberci-servis</code>'in kurulumu ve
            güvenliği (salt-okunur veritabanı kullanıcısı, ağ/firewall
            ayarları) müşterinin sorumluluğundadır.
          </li>
          <li>
            Size özel API anahtarınızı gizli tutmak, hesabınızın
            güvenliğinden sizi sorumlu kılar.
          </li>
          <li>
            Bildirim gönderdiğiniz kişilerin (çalışanlarınızın) bu hizmeti
            kullanacağından haberdar olmasını sağlamak sizin
            sorumluluğunuzdadır.
          </li>
        </ul>

        <h2>4. Sorumluluğun Sınırlandırılması</h2>
        <p className="muted">
          Hizmet, üretim takip sisteminizin yerine geçmez; sadece ona ek bir
          bildirim katmanıdır. Bildirimlerin gecikmesi, iletilememesi veya
          hizmet kesintilerinden doğabilecek dolaylı zararlardan (üretim
          kaybı, iş kaybı vb.) sorumluluk kabul edilmez.
        </p>

        <h2>5. Fesih</h2>
        <p className="muted">
          Hizmeti istediğiniz zaman iptal edebilirsiniz. Kötüye kullanım,
          ödeme yapılmaması veya bu şartların ihlali durumunda hesabınız
          askıya alınabilir veya kapatılabilir.
        </p>

        <h2>6. Uygulanacak Hukuk</h2>
        <p className="muted">
          Bu şartlar Türkiye Cumhuriyeti kanunlarına tabidir.
        </p>

        <p className="muted">
          Kişisel verilerin işlenmesi hakkında detaylı bilgi için{" "}
          <Link href="/gizlilik-politikasi">Gizlilik Politikamızı</Link>{" "}
          inceleyebilirsiniz.
        </p>
      </div>
      <Link href="/" className="secondary-link">
        ← Ana sayfaya dön
      </Link>
    </div>
  );
}
