import Link from "next/link";

export const metadata = {
  title: "Gizlilik Politikası | Üretim Takip Bildirim",
};

export default function GizlilikPolitikasiPage() {
  return (
    <div className="container" style={{ maxWidth: 760 }}>
      <div className="card">
        <h1>
          Gizlilik <span style={{ color: "var(--accent)" }}>Politikası</span> ve KVKK Aydınlatma Metni
        </h1>
        <p className="muted">Son güncelleme: 2026</p>

        <p className="muted" style={{ background: "#0e1626", border: "1px solid var(--border)", borderRadius: 8, padding: 12 }}>
          <strong>Not (hizmet sahibi için):</strong> Bu metin bir taslaktır. Aşağıdaki
          "Veri Sorumlusu" bölümüne kendi gerçek firma/şahıs unvanınızı,
          adresinizi ve iletişim bilgilerinizi girmeden bu sayfayı canlıya
          almayın — KVKK gereği veri sorumlusunun açıkça tanımlanması
          zorunludur.
        </p>

        <h2>1. Veri Sorumlusu</h2>
        <p className="muted">
          Bu hizmet ("Üretim Takip Bildirim"), aşağıda kimliği belirtilecek
          veri sorumlusu tarafından işletilmektedir:{" "}
          <strong>[Firma/Şahıs Unvanınızı Buraya Yazın]</strong>.
        </p>

        <h2>2. İşlenen Kişisel Veriler</h2>
        <p className="muted">Hizmeti kullanırken şu veriler işlenir:</p>
        <ul className="muted">
          <li>
            <strong>Firma (Tenant) hesabı:</strong> firma adı, yetkili
            e-posta adresi, şifre (yalnızca hash'lenmiş hâliyle saklanır).
          </li>
          <li>
            <strong>Bildirim alacak kişiler (User):</strong> ad, rol/unvan ve
            bildirim tercihleri (hangi tezgah/olay türü).
          </li>
          <li>
            <strong>Push bildirim aboneliği:</strong> tarayıcınızın/cihazınızın
            oluşturduğu bir push aboneliği anahtarı (endpoint + şifreleme
            anahtarları) — bildirimi doğru cihaza iletmek için teknik olarak
            zorunludur.
          </li>
          <li>
            <strong>Faturalandırma:</strong> abone olan firmalar için ödeme
            işlemleri Stripe üzerinden yürütülür; kart bilgileriniz bizim
            sunucularımıza hiçbir zaman ulaşmaz, doğrudan Stripe tarafından
            işlenir.
          </li>
        </ul>

        <h2>3. İşleme Amaçları ve Hukuki Sebep</h2>
        <p className="muted">
          Veriler, aramızdaki hizmet sözleşmesinin kurulması ve ifası
          (KVKK m.5/2-c) kapsamında; kullanıcı hesabının oluşturulması,
          bildirimlerin doğru kişiye iletilmesi ve abonelik/faturalandırma
          süreçlerinin yürütülmesi amacıyla işlenir. Pazarlama amaçlı üçüncü
          taraflarla veri paylaşılmaz.
        </p>

        <h2>4. Veri Aktarımı</h2>
        <p className="muted">
          Push bildirimler, tarayıcınızın kullandığı push servisi üzerinden
          iletilir (ör. Chrome için Google, Firefox için Mozilla push
          servisleri) — bu, web push teknolojisinin doğası gereği zorunludur.
          Ödemeler Stripe, Inc. üzerinden işlenir. Bu sağlayıcılar yurt dışında
          konumlanmış olabilir; hizmeti kullanarak bu teknik aktarıma onay
          vermiş olursunuz.
        </p>

        <h2>5. Saklama Süresi</h2>
        <p className="muted">
          Veriler, hesabınız aktif olduğu sürece ve ilgili mevzuatın
          öngördüğü (ör. faturalandırma kayıtları için) yasal saklama
          süreleri boyunca tutulur. Hesap kapatma talebinde bulunduğunuzda
          verileriniz makul bir süre içinde silinir.
        </p>

        <h2>6. Çerezler</h2>
        <p className="muted">
          Sadece oturumunuzu açık tutmak için zorunlu, imzalı bir oturum
          çerezi kullanılır (<code>tenant_session</code>). Reklam veya analitik
          amaçlı takip çerezi kullanılmaz.
        </p>

        <h2>7. Haklarınız (KVKK m.11)</h2>
        <p className="muted">
          KVKK kapsamında; verilerinizin işlenip işlenmediğini öğrenme,
          işlenmişse buna ilişkin bilgi talep etme, düzeltilmesini veya
          silinmesini isteme ve bu işlemlerin üçüncü kişilere bildirilmesini
          talep etme haklarına sahipsiniz. Taleplerinizi{" "}
          <a href="mailto:kvkk@sizin-domaininiz.com">kvkk@sizin-domaininiz.com</a>{" "}
          adresine iletebilirsiniz (hizmet sahibi: bu adresi kendi gerçek
          e-postanızla değiştirin).
        </p>
      </div>
      <Link href="/" className="secondary-link">
        ← Ana sayfaya dön
      </Link>
    </div>
  );
}
