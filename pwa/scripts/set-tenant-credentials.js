#!/usr/bin/env node
/**
 * Bir tenant'ın (varsayılan olarak "legacy-tenant" — tek kiracılı dönemden
 * kalan ERMAK kurulumu) e-posta ve şifresini belirler/sıfırlar.
 *
 * Kullanım:
 *   node scripts/set-tenant-credentials.js <email> <sifre> ["Firma Adı"] [tenantId]
 *
 * DATABASE_URL ortam değişkeninin (production veritabanınız) tanımlı
 * olması gerekir.
 */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

async function main() {
  const [email, password, companyName, tenantId] = process.argv.slice(2);

  if (!email || !password) {
    console.error(
      'Kullanım: node scripts/set-tenant-credentials.js <email> <sifre> ["Firma Adı"] [tenantId]'
    );
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("Şifre en az 8 karakter olmalı.");
    process.exit(1);
  }

  const prisma = new PrismaClient();
  const id = tenantId || "legacy-tenant";

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const data = { email: email.trim().toLowerCase(), passwordHash };
    if (companyName) data.companyName = companyName;

    const tenant = await prisma.tenant.update({ where: { id }, data });
    console.log(`Tamamlandı: ${tenant.companyName} (${tenant.email}) artık ${id} için giriş yapabilir.`);
  } catch (err) {
    console.error("Güncelleme başarısız:", err.message ?? err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
