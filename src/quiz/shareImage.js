// Sonuç ekranından, Instagram/hikaye paylaşımına uygun markalı bir PNG
// kartı üretir. Sitenin CSS değişkenlerine bağlı kalmadan sabit marka
// renkleri kullanır — paylaşılan görsel, kullanıcının o anki açık/koyu
// tema tercihinden bağımsız olarak hep aynı görünmeli.
const COLORS = {
  maroonDeep: '#4a0e17',
  maroon: '#6b1420',
  gold: '#d3a94f',
  paper: '#faf3e4',
};

const SIZE = 1080;

function drawOrnamentDivider(ctx, centerX, y) {
  ctx.strokeStyle = COLORS.gold;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX - 110, y);
  ctx.lineTo(centerX - 22, y);
  ctx.moveTo(centerX + 22, y);
  ctx.lineTo(centerX + 110, y);
  ctx.stroke();

  ctx.save();
  ctx.translate(centerX, y);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = COLORS.gold;
  ctx.fillRect(-7, -7, 14, 14);
  ctx.restore();
}

async function ensureFonts() {
  try {
    await Promise.all([
      document.fonts.load('700 220px "Cormorant Garamond"'),
      document.fonts.load('600 40px "Cormorant Garamond"'),
      document.fonts.load('700 30px "Source Sans 3"'),
      document.fonts.load('600 26px "Source Sans 3"'),
    ]);
    await document.fonts.ready;
  } catch {
    // Yazı tipleri yüklenemezse tarayıcı varsayılan serif/sans ile devam eder.
  }
}

export async function generateShareImage({ correct, total, modeLabel, isTimeAttack }) {
  await ensureFonts();

  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  const cx = SIZE / 2;

  const gradient = ctx.createLinearGradient(0, 0, 0, SIZE);
  gradient.addColorStop(0, COLORS.maroonDeep);
  gradient.addColorStop(1, COLORS.maroon);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, SIZE, SIZE);

  // Çerçeve
  ctx.strokeStyle = COLORS.gold;
  ctx.lineWidth = 2;
  ctx.strokeRect(48, 48, SIZE - 96, SIZE - 96);
  ctx.lineWidth = 1;
  ctx.strokeRect(64, 64, SIZE - 128, SIZE - 128);

  ctx.textAlign = 'center';

  // Üst etiket
  ctx.fillStyle = COLORS.gold;
  ctx.font = '700 30px "Source Sans 3", sans-serif';
  try {
    ctx.letterSpacing = '6px';
  } catch {
    // desteklenmiyorsa harf aralığı olmadan devam eder
  }
  ctx.fillText('OSMANLI TARİHİ QUIZ', cx, 220);
  try {
    ctx.letterSpacing = '0px';
  } catch {
    // no-op
  }

  drawOrnamentDivider(ctx, cx, 270);

  // Büyük skor
  ctx.fillStyle = COLORS.paper;
  ctx.font = '700 260px "Cormorant Garamond", serif';
  ctx.fillText(String(correct), cx, isTimeAttack ? 560 : 540);

  ctx.font = '600 46px "Cormorant Garamond", serif';
  ctx.fillStyle = COLORS.gold;
  ctx.fillText(isTimeAttack ? 'DOĞRU CEVAP · 60 SANİYE' : `/ ${total} DOĞRU`, cx, isTimeAttack ? 630 : 610);

  // Mod / kategori rozeti
  const badgeText = modeLabel.toUpperCase();
  ctx.font = '700 28px "Source Sans 3", sans-serif';
  const badgeWidth = ctx.measureText(badgeText).width + 64;
  const badgeHeight = 56;
  const badgeY = 700;
  ctx.fillStyle = COLORS.gold;
  const radius = badgeHeight / 2;
  const bx = cx - badgeWidth / 2;
  ctx.beginPath();
  ctx.moveTo(bx + radius, badgeY);
  ctx.arcTo(bx + badgeWidth, badgeY, bx + badgeWidth, badgeY + badgeHeight, radius);
  ctx.arcTo(bx + badgeWidth, badgeY + badgeHeight, bx, badgeY + badgeHeight, radius);
  ctx.arcTo(bx, badgeY + badgeHeight, bx, badgeY, radius);
  ctx.arcTo(bx, badgeY, bx + badgeWidth, badgeY, radius);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = COLORS.maroonDeep;
  ctx.textBaseline = 'middle';
  ctx.fillText(badgeText, cx, badgeY + badgeHeight / 2 + 2);
  ctx.textBaseline = 'alphabetic';

  drawOrnamentDivider(ctx, cx, 850);

  // Alt çağrı ve alan adı
  ctx.fillStyle = COLORS.paper;
  ctx.font = '600 34px "Cormorant Garamond", serif';
  ctx.fillText('Sen de dener misin?', cx, 920);

  ctx.fillStyle = COLORS.gold;
  ctx.font = '600 26px "Source Sans 3", sans-serif';
  ctx.fillText(window.location.hostname, cx, 980);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png', 0.95);
  });
}
