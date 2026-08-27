-- Çok kiracılı (multi-tenant) yapıya geçiş.
--
-- Bu migration production'da zaten çalışan tek-kiracılı bir kurulumun
-- (ERMAK) üzerine uygulanacağı için, mevcut User satırlarını kaybetmemek
-- amacıyla önce sabit id'li bir "legacy-tenant" satırı oluşturur ve
-- var olan tüm kullanıcıları ona bağlar. Bu legacy tenant'ın gerçek
-- email/şifre bilgisi yoktur — ilk deploy sonrası
-- `node scripts/set-tenant-credentials.js` ile atanmalıdır (bkz. pwa/README.md).

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "plan" TEXT NOT NULL DEFAULT 'standart',
    "subscriptionStatus" TEXT NOT NULL DEFAULT 'trialing',
    "trialEndsAt" TIMESTAMP(3) NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_email_key" ON "Tenant"("email");
CREATE UNIQUE INDEX "Tenant_apiKey_key" ON "Tenant"("apiKey");
CREATE UNIQUE INDEX "Tenant_stripeCustomerId_key" ON "Tenant"("stripeCustomerId");
CREATE UNIQUE INDEX "Tenant_stripeSubscriptionId_key" ON "Tenant"("stripeSubscriptionId");

-- Mevcut (tek-kiracılı dönemden kalan) kullanıcılar varsa onlar için
-- bir "legacy-tenant" oluştur. apiKey burada rastgele üretilir; ERMAK'ın
-- haberci-servis'i zaten var olan HABERCI_API_KEY ortam değişkeniyle
-- çalışmaya devam eder (bkz. /api/notify içindeki geriye dönük uyumluluk).
INSERT INTO "Tenant" ("id", "companyName", "email", "passwordHash", "apiKey", "subscriptionStatus", "trialEndsAt", "createdAt")
SELECT
    'legacy-tenant',
    'Mevcut Kurulum (ERMAK)',
    'legacy-tenant@local.invalid',
    '',
    'legacy-' || md5(random()::text || clock_timestamp()::text),
    'active',
    CURRENT_TIMESTAMP + INTERVAL '3650 days',
    CURRENT_TIMESTAMP
WHERE EXISTS (SELECT 1 FROM "User");

-- AlterTable
ALTER TABLE "User" ADD COLUMN "tenantId" TEXT;

UPDATE "User" SET "tenantId" = 'legacy-tenant' WHERE "tenantId" IS NULL;

ALTER TABLE "User" ALTER COLUMN "tenantId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "User_tenantId_idx" ON "User"("tenantId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
