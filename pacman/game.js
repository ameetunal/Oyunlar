"use strict";

/* ---------- Ayarlar ---------- */
const COLS = 21;
const ROWS = 21;
const TILE = 24;
const TUNNEL_ROW = 10;

const DIRS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};
const OPPOSITE = { up: "down", down: "up", left: "right", right: "left" };

const PLAYER_SPEED = 210; // px/sn
const GHOST_SPEED = 118;
const FRIGHTENED_SPEED = 84;
const FRIGHTENED_DURATION = 7; // saniye
const GHOST_HOUSE = { r0: 9, r1: 11, c0: 8, c1: 12 };
const EXTRA_LIFE_SCORE = 10000;
const LEADERBOARD_KEY = "nokta-avcisi-liderlik";
const LEADERBOARD_MAX = 10;
const FRUIT_CELL = { row: 13, col: 10 };
const FRUIT_DURATION = 9; // saniye, yenmezse kaybolur
const FRUIT_TYPES = [
  { name: "Kiraz", value: 100, color: "#ff5c6c", accent: "#ffb3ba" },
  { name: "Çilek", value: 300, color: "#ff3b8d", accent: "#ffc4e0" },
  { name: "Portakal", value: 500, color: "#ff9c33", accent: "#ffd9a0" },
  { name: "Elma", value: 700, color: "#4dd964", accent: "#c6ffce" },
  { name: "Yıldız", value: 1000, color: "#ffd23f", accent: "#fff3c4" },
];

const GHOST_DEFS = [
  { color: "#ff4d4d", glow: "rgba(255,77,77,0.8)", home: { col: 9, row: 10 } },
  { color: "#ff8fe8", glow: "rgba(255,143,232,0.8)", home: { col: 10, row: 10 } },
  { color: "#4dd9ff", glow: "rgba(77,217,255,0.8)", home: { col: 11, row: 10 } },
  { color: "#ffb852", glow: "rgba(255,184,82,0.8)", home: { col: 10, row: 9 } },
];

/* ---------- Labirent üretimi ----------
 * İç köşeler (r%2===0 && c%2===0) sütun oluşturur, aralarındaki tüm
 * hücreler koridordur — böylece labirentin tamamen bağlı (her noktaya
 * ulaşılabilir) olduğu garanti edilir. Hayalet evi ve tünel için birkaç
 * hücre elle açılır.
 */
function buildMaze() {
  const wall = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const border = r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1;
      const pillar = r % 2 === 0 && c % 2 === 0 && r > 0 && r < ROWS - 1 && c > 0 && c < COLS - 1;
      wall[r][c] = border || pillar;
    }
  }

  for (let r = GHOST_HOUSE.r0; r <= GHOST_HOUSE.r1; r++) {
    for (let c = GHOST_HOUSE.c0; c <= GHOST_HOUSE.c1; c++) {
      wall[r][c] = false;
    }
  }
  wall[GHOST_HOUSE.r0 - 1][10] = false; // hayalet evi kapısı

  wall[TUNNEL_ROW][0] = false;
  wall[TUNNEL_ROW][COLS - 1] = false;

  return wall;
}

function inGhostHouse(r, c) {
  return r >= GHOST_HOUSE.r0 && r <= GHOST_HOUSE.r1 && c >= GHOST_HOUSE.c0 && c <= GHOST_HOUSE.c1;
}

const POWER_CELLS = [
  { r: 1, c: 1 },
  { r: 1, c: COLS - 2 },
  { r: ROWS - 2, c: 1 },
  { r: ROWS - 2, c: COLS - 2 },
];

function isPowerCell(r, c) {
  return POWER_CELLS.some((p) => p.r === r && p.c === c);
}

/* ---------- Oyun durumu ---------- */
let wallGrid, dots, totalDots;
let player, ghosts;
let score = 0;
let lives = 3;
let level = 1;
let highScore = Number(localStorage.getItem("nokta-avcisi-rekor") || 0);
let frightenedTimer = 0;
let ghostEatStreak = 0;
let running = false;
let gameOver = false;
let paused = false;
let respawnPause = 0;
let banner = { text: "", timer: 0 };
let shake = { timer: 0, magnitude: 0 };
let floatingTexts = [];
let particles = [];
let muted = localStorage.getItem("nokta-avcisi-sessiz") === "1";
let wakaToggle = false;
let fruit = null;
let fruitSpawnedThisLevel = 0;
let extraLifeAwarded = false;

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const levelEl = document.getElementById("level");
const highscoreEl = document.getElementById("highscore");
const livesEl = document.getElementById("lives");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const btnMute = document.getElementById("btn-mute");
const btnPause = document.getElementById("btn-pause");
const overlayMessage = document.getElementById("overlay-message");
const overlayBtn = document.getElementById("overlay-btn");
const shareBtn = document.getElementById("share-btn");
const nameEntry = document.getElementById("name-entry");
const nameInput = document.getElementById("name-input");
const nameSubmit = document.getElementById("name-submit");
const leaderboardPanel = document.getElementById("leaderboard-panel");
const leaderboardList = document.getElementById("leaderboard-list");

highscoreEl.textContent = highScore;

function fitCanvasForDisplay() {
  const dpr = Math.max(window.devicePixelRatio || 1, 1);
  canvas.width = COLS * TILE * dpr;
  canvas.height = ROWS * TILE * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function cellCenter(col, row) {
  return { x: col * TILE + TILE / 2, y: row * TILE + TILE / 2 };
}

function isWalkable(col, row) {
  if (row === TUNNEL_ROW && (col < 0 || col >= COLS)) return true;
  if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return false;
  return !wallGrid[row][col];
}

function wrapCol(col) {
  if (col < 0) return COLS - 1;
  if (col >= COLS) return 0;
  return col;
}

/* ---------- Varlık hareketi (oyuncu ve hayaletler için ortak) ---------- */
function createMover(col, row, speed) {
  const center = cellCenter(col, row);
  return { x: center.x, y: center.y, dir: null, nextDir: null, speed, baseSpeed: speed };
}

function currentCell(mover) {
  return { col: Math.round((mover.x - TILE / 2) / TILE), row: Math.round((mover.y - TILE / 2) / TILE) };
}

function atCellCenter(mover) {
  const { col, row } = currentCell(mover);
  const c = cellCenter(wrapCol(col), row);
  const targetX = col < 0 || col >= COLS ? mover.x : c.x;
  return Math.abs(mover.x - targetX) < 1.2 && Math.abs(mover.y - c.y) < 1.2;
}

// Bir karede alınan mesafe, hücre merkezinin etrafındaki dar tespit
// penceresini atlayabilir (özellikle yüksek hızda) — bu da yön
// değişikliğinin bir sonraki kesişime kadar gecikmesine yol açardı. Bunun
// yerine, bu karede merkezin "geçilip geçilmeyeceğini" hesaplayıp tam o
// noktada yöne karar veriyoruz; böylece hiçbir kesişim atlanmaz.
function resolveDirectionAtCenter(mover, wcol, row) {
  if (mover.nextDir) {
    const nd = DIRS[mover.nextDir];
    if (isWalkable(wcol + nd.x, row + nd.y)) {
      mover.dir = mover.nextDir;
    }
  }
  if (mover.dir) {
    const cd = DIRS[mover.dir];
    if (!isWalkable(wcol + cd.x, row + cd.y)) {
      mover.dir = null;
    }
  }
}

// Not: "distToCenter < dist" (kesin küçük) kullanan önceki sürüm, bu
// karede tam merkeze ULAŞILACAK ama geçilmeyecek durumda (distToCenter
// dist'e eşit ya da kayan noktalı hata payıyla ondan hafifçe büyük)
// doğrulamayı atlıyor, oyuncuyu doğrulanmamış eski yönde bir hücre daha
// (gerekirse duvarın içine) taşıyordu — yüksek hızda dist büyüdükçe bu
// sınır durumu çok daha sık tetikleniyordu. Döngülü yapı ve "<=" ile bu
// düzeltiliyor; merkeze tam snap'lendikten sonra distToCenter kesin 0
// olduğundan aynı kesişim ikinci kez tetiklenip sonsuz döngüye girmez.
function stepMover(mover, dt) {
  let dist = mover.speed * dt;
  let guard = 0;

  while (dist > 0.0005 && guard++ < 12) {
    if (!mover.dir) {
      const { col, row } = currentCell(mover);
      resolveDirectionAtCenter(mover, wrapCol(col), row);
      if (!mover.dir) return;
    }

    const { col, row } = currentCell(mover);
    const wcol = wrapCol(col);
    const inTunnelOverflow = col < 0 || col >= COLS;
    const center = cellCenter(wcol, row);
    const d = DIRS[mover.dir];
    const distToCenter = d.x !== 0
      ? (inTunnelOverflow ? Infinity : (center.x - mover.x) * d.x)
      : (center.y - mover.y) * d.y;

    if (distToCenter > 0.0005 && distToCenter <= dist + 1e-6) {
      mover.x = center.x;
      mover.y = center.y;
      dist -= distToCenter;
      resolveDirectionAtCenter(mover, wcol, row);
      if (!mover.dir) return;
      continue;
    }

    mover.x += d.x * dist;
    mover.y += d.y * dist;

    if (row === TUNNEL_ROW) {
      const w = COLS * TILE;
      if (mover.x < -TILE / 2) mover.x = w + TILE / 2;
      if (mover.x > w + TILE / 2) mover.x = -TILE / 2;
    }
    dist = 0;
  }
}

/* ---------- Kurulum ---------- */
function ghostSpeedMultiplier() {
  return Math.min(1 + (level - 1) * 0.06, 1.6);
}

function resetEntitiesAndMaze() {
  wallGrid = buildMaze();
  dots = new Set();
  totalDots = 0;

  for (let r = 1; r < ROWS - 1; r++) {
    for (let c = 1; c < COLS - 1; c++) {
      if (wallGrid[r][c]) continue;
      if (inGhostHouse(r, c)) continue;
      if (isPowerCell(r, c)) continue;
      dots.add(`${r},${c}`);
      totalDots++;
    }
  }

  player = createMover(10, 15, PLAYER_SPEED);
  player.mouth = 0;

  const mul = ghostSpeedMultiplier();
  ghosts = GHOST_DEFS.map((def) => ({
    ...createMover(def.home.col, def.home.row, GHOST_SPEED * mul),
    dir: "up",
    color: def.color,
    glow: def.glow,
    home: def.home,
    frightened: false,
    eaten: false,
  }));

  frightenedTimer = 0;
  ghostEatStreak = 0;
  respawnPause = 0;
  particles = [];
  floatingTexts = [];
  fruit = null;
  fruitSpawnedThisLevel = 0;
}

function newGame() {
  level = 1;
  score = 0;
  lives = 3;
  gameOver = false;
  paused = false;
  extraLifeAwarded = false;
  resetEntitiesAndMaze();
  updateHud();
}

function goToNextLevel() {
  level++;
  resetEntitiesAndMaze();
  respawnPause = 1;
  showBanner(`Bölüm ${level}!`, 1);
  playSequence([392, 494, 587, 784], "triangle", 0.07, 0.1, 0.09);
  updateHud();
}

function updateHud() {
  scoreEl.textContent = score;
  levelEl.textContent = level;
  livesEl.textContent = "●".repeat(Math.max(lives, 0)) || "—";
}

function checkExtraLife() {
  if (extraLifeAwarded || score < EXTRA_LIFE_SCORE) return;
  extraLifeAwarded = true;
  lives++;
  updateHud();
  showBanner("🎉 Ekstra Can!", 1.6);
  playSequence([523, 659, 784, 1046, 784, 1046], "triangle", 0.09, 0.12, 0.09);
}

/* ---------- Bonus meyve ----------
 * Her bölümde noktaların %35'i ve %70'i yendiğinde labirentin sabit bir
 * noktasında kısa süreliğine belirir; yakalanırsa bölüme göre artan puan
 * kazandırır, süresi dolarsa sessizce kaybolur.
 */
function hexToRgbList(hex) {
  const num = parseInt(hex.slice(1), 16);
  return `${(num >> 16) & 0xff},${(num >> 8) & 0xff},${num & 0xff}`;
}

function maybeSpawnFruit() {
  if (fruit || fruitSpawnedThisLevel >= 2 || totalDots === 0) return;
  const eatenRatio = 1 - dots.size / totalDots;
  const thresholds = [0.35, 0.7];
  if (eatenRatio >= thresholds[fruitSpawnedThisLevel]) {
    const type = FRUIT_TYPES[Math.min(level - 1, FRUIT_TYPES.length - 1)];
    fruit = { type, timer: FRUIT_DURATION };
    fruitSpawnedThisLevel++;
  }
}

function updateFruit(dt) {
  maybeSpawnFruit();
  if (!fruit) return;

  fruit.timer -= dt;
  if (fruit.timer <= 0) {
    fruit = null;
    return;
  }

  const center = cellCenter(FRUIT_CELL.col, FRUIT_CELL.row);
  const dx = center.x - player.x;
  const dy = center.y - player.y;
  if (dx * dx + dy * dy < (TILE * 0.6) ** 2) {
    score += fruit.type.value;
    spawnFloatingText(center.x, center.y, `+${fruit.type.value}`, fruit.type.color);
    spawnBurst(center.x, center.y, hexToRgbList(fruit.type.color), 16);
    playSequence([880, 1175, 1568], "triangle", 0.08, 0.09, 0.06);
    updateHud();
    checkExtraLife();
    fruit = null;
  }
}

/* ---------- Efektler ---------- */
function showBanner(text, duration) {
  banner = { text, timer: duration };
}

function spawnFloatingText(x, y, text, color) {
  floatingTexts.push({ x, y, text, color, life: 0.9, maxLife: 0.9 });
}

function spawnBurst(x, y, color, count = 14) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const speed = 60 + Math.random() * 90;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0.5 + Math.random() * 0.3,
      maxLife: 0.8,
      color,
      size: 1.5 + Math.random() * 2,
    });
  }
}

function triggerShake(magnitude, duration) {
  shake = { timer: duration, magnitude };
}

function updateEffects(dt) {
  if (banner.timer > 0) banner.timer = Math.max(0, banner.timer - dt);
  if (shake.timer > 0) shake.timer = Math.max(0, shake.timer - dt);

  floatingTexts = floatingTexts.filter((f) => f.life > 0);
  floatingTexts.forEach((f) => {
    f.life -= dt;
    f.y -= dt * 26;
  });

  particles = particles.filter((p) => p.life > 0);
  particles.forEach((p) => {
    p.life -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= 0.92;
    p.vy *= 0.92;
  });
}

/* ---------- Girdi ---------- */
function setDesiredDir(dir) {
  if (!player) return;
  // Sadece istenen yönü kaydeder; asıl yönü stepMover, duvar kontrolünden
  // geçirdikten sonra hücre merkezinde uygular. Burada doğrudan player.dir'i
  // atamak duvar kontrolünü atlatıp oyuncunun duvardan geçmesine yol açardı.
  player.nextDir = dir;
}

function handleInputStart(dir) {
  setDesiredDir(dir);
  if (!running && !gameOver) startGame();
}

const KEY_MAP = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
  W: "up",
  S: "down",
  A: "left",
  D: "right",
};

window.addEventListener("keydown", (e) => {
  const dir = KEY_MAP[e.key];
  if (dir) {
    e.preventDefault();
    handleInputStart(dir);
  }
});

// Kaydırma (swipe) ile kontrol: parmağı kaldırmayı beklemeden, eşik
// aşılır aşılmaz yönü uygular ve referans noktasını sıfırlar — böylece
// parmağınızı kaldırmadan sürekli yön değiştirebilirsiniz (bekleme hissi
// olmadan, anlık tepki verir).
const SWIPE_THRESHOLD = 6;
let touchRef = null;

canvas.addEventListener(
  "touchstart",
  (e) => {
    const t = e.changedTouches[0];
    touchRef = { x: t.clientX, y: t.clientY };
  },
  { passive: true }
);

canvas.addEventListener(
  "touchmove",
  (e) => {
    if (!touchRef) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchRef.x;
    const dy = t.clientY - touchRef.y;

    if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) return;

    if (Math.abs(dx) > Math.abs(dy)) {
      handleInputStart(dx > 0 ? "right" : "left");
    } else {
      handleInputStart(dy > 0 ? "down" : "up");
    }
    touchRef = { x: t.clientX, y: t.clientY };
  },
  { passive: true }
);

canvas.addEventListener("touchend", () => (touchRef = null), { passive: true });

overlayBtn.addEventListener("click", () => {
  hideEndGameExtras();
  if (gameOver) newGame();
  startGame();
});

function togglePause() {
  if (gameOver) return;
  if (paused) {
    startGame();
  } else if (running) {
    paused = true;
    running = false;
    btnPause.textContent = "▶";
    hideEndGameExtras();
    showOverlay("Duraklatıldı", `Skor: ${score} · Bölüm: ${level}`, "Devam Et");
  }
}

btnPause.addEventListener("click", togglePause);

window.addEventListener("keydown", (e) => {
  if (e.key === "p" || e.key === "P" || e.key === "Escape") {
    e.preventDefault();
    togglePause();
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden && running && !paused) togglePause();
});

/* ---------- Liderlik tablosu (yerel) ---------- */
function loadLeaderboard() {
  try {
    const raw = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "[]");
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

function qualifiesForLeaderboard(list, s) {
  if (s <= 0) return false;
  return list.length < LEADERBOARD_MAX || s > list[list.length - 1].score;
}

function addToLeaderboard(name, s, lvl) {
  const list = loadLeaderboard();
  list.push({ name: (name || "Oyuncu").slice(0, 12), score: s, level: lvl });
  list.sort((a, b) => b.score - a.score);
  list.length = Math.min(list.length, LEADERBOARD_MAX);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(list));
  return list;
}

function renderLeaderboard() {
  const list = loadLeaderboard();
  leaderboardList.innerHTML =
    list
      .map(
        (e, i) =>
          `<li><span class="lb-rank">${i + 1}</span><span class="lb-name"></span><span class="lb-score">${e.score}</span></li>`
      )
      .join("") || `<li class="lb-empty">Henüz kayıt yok — ilk sen ol!</li>`;
  // İsimleri textContent ile ekleyip HTML enjeksiyonunu önlüyoruz.
  leaderboardList.querySelectorAll(".lb-name").forEach((el, i) => {
    el.textContent = list[i].name;
  });
}

function showEndGameExtras() {
  leaderboardPanel.classList.remove("hidden");
  shareBtn.classList.remove("hidden");
  const list = loadLeaderboard();
  if (qualifiesForLeaderboard(list, score)) {
    nameEntry.classList.remove("hidden");
    nameInput.value = "";
    setTimeout(() => nameInput.focus(), 50);
    renderLeaderboard();
  } else {
    nameEntry.classList.add("hidden");
    renderLeaderboard();
  }
}

function hideEndGameExtras() {
  nameEntry.classList.add("hidden");
  leaderboardPanel.classList.add("hidden");
  shareBtn.classList.add("hidden");
}

function submitLeaderboardName() {
  addToLeaderboard(nameInput.value.trim(), score, level);
  renderLeaderboard();
  nameEntry.classList.add("hidden");
}

nameSubmit.addEventListener("click", submitLeaderboardName);
nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") submitLeaderboardName();
});

shareBtn.addEventListener("click", async () => {
  const text = `Nokta Avcısı'nda ${score} puan yaptım, ${level}. bölüme ulaştım! Sen de dene:`;
  const url = location.href.split("#")[0];
  if (navigator.share) {
    try {
      await navigator.share({ title: "Nokta Avcısı", text, url });
    } catch {
      // Kullanıcı paylaşımı iptal etti; sessizce geç.
    }
  } else {
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      const original = shareBtn.textContent;
      shareBtn.textContent = "✅ Kopyalandı!";
      setTimeout(() => (shareBtn.textContent = original), 1600);
    } catch {
      // Pano erişimi yoksa sessizce geç.
    }
  }
});

renderLeaderboard();

/* ---------- Ses (küçük WebAudio efektleri, dosya gerekmez) ---------- */
let audioCtx = null;
function getAudioCtx() {
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function beep(freq, duration, type = "square", volume = 0.05, delay = 0) {
  if (muted) return;
  try {
    const ctx2 = getAudioCtx();
    const startAt = ctx2.currentTime + delay;
    const osc = ctx2.createOscillator();
    const gain = ctx2.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    gain.gain.setValueAtTime(volume, startAt);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    osc.connect(gain).connect(ctx2.destination);
    osc.start(startAt);
    osc.stop(startAt + duration);
  } catch {
    // Ses desteklenmiyorsa sessizce geç.
  }
}

function playSweep(fromFreq, toFreq, duration, type = "sawtooth", volume = 0.06) {
  if (muted) return;
  try {
    const ctx2 = getAudioCtx();
    const osc = ctx2.createOscillator();
    const gain = ctx2.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(fromFreq, ctx2.currentTime);
    osc.frequency.linearRampToValueAtTime(toFreq, ctx2.currentTime + duration);
    gain.gain.setValueAtTime(volume, ctx2.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx2.currentTime + duration);
    osc.connect(gain).connect(ctx2.destination);
    osc.start();
    osc.stop(ctx2.currentTime + duration);
  } catch {
    // Ses desteklenmiyorsa sessizce geç.
  }
}

function playSequence(notes, type = "square", volume = 0.06, noteDuration = 0.11, gap = 0.09) {
  notes.forEach((freq, i) => beep(freq, noteDuration, type, volume, i * gap));
}

function setMuted(next) {
  muted = next;
  localStorage.setItem("nokta-avcisi-sessiz", muted ? "1" : "0");
  btnMute.textContent = muted ? "🔇" : "🔊";
  btnMute.classList.toggle("is-off", muted);
  btnMute.setAttribute("aria-label", muted ? "Sesi aç" : "Sesi kapat");
}

btnMute.addEventListener("click", () => setMuted(!muted));
setMuted(muted);

/* ---------- Hayalet yapay zekası ---------- */
function ghostChooseDirection(ghost) {
  const { col, row } = currentCell(ghost);
  const wcol = wrapCol(col);

  const options = Object.keys(DIRS).filter((dir) => {
    if (ghost.dir && OPPOSITE[dir] === ghost.dir) return false;
    const d = DIRS[dir];
    return isWalkable(wcol + d.x, row + d.y);
  });

  if (options.length === 0) {
    ghost.nextDir = ghost.dir ? OPPOSITE[ghost.dir] : "up";
    return;
  }

  if (ghost.frightened) {
    ghost.nextDir = options[Math.floor(Math.random() * options.length)];
    return;
  }

  const target = ghost.eaten ? ghost.home : currentCell(player);
  let best = options[0];
  let bestDist = Infinity;
  for (const dir of options) {
    const d = DIRS[dir];
    const nc = wcol + d.x;
    const nr = row + d.y;
    const dist = (nc - target.col) ** 2 + (nr - target.row) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      best = dir;
    }
  }
  ghost.nextDir = best;
}

/* ---------- Güncelleme ---------- */
function resetPositionsAfterDeath() {
  const c = cellCenter(10, 15);
  player.x = c.x;
  player.y = c.y;
  player.dir = null;
  player.nextDir = null;

  const mul = ghostSpeedMultiplier();
  ghosts.forEach((g) => {
    const gc = cellCenter(g.home.col, g.home.row);
    g.x = gc.x;
    g.y = gc.y;
    g.dir = "up";
    g.nextDir = null;
    g.frightened = false;
    g.eaten = false;
    g.baseSpeed = GHOST_SPEED * mul;
    g.speed = g.baseSpeed;
  });
  frightenedTimer = 0;
}

function update(dt) {
  updateEffects(dt);
  if (!running) return;

  if (respawnPause > 0) {
    respawnPause -= dt;
    return;
  }

  stepMover(player, dt);
  player.mouth += dt * 10;

  const pc = currentCell(player);
  const wpc = wrapCol(pc.col);
  const key = `${pc.row},${wpc}`;
  if (dots.has(key)) {
    dots.delete(key);
    score += 10;
    wakaToggle = !wakaToggle;
    beep(wakaToggle ? 420 : 330, 0.05, "square", 0.045);
    checkExtraLife();
  }
  if (isPowerCell(pc.row, wpc)) {
    const center = cellCenter(wpc, pc.row);
    score += 50;
    spawnFloatingText(center.x, center.y, "+50", "#ffe9a8");
    spawnBurst(center.x, center.y, "255,233,168", 16);
    frightenedTimer = FRIGHTENED_DURATION;
    ghostEatStreak = 0;
    ghosts.forEach((g) => {
      if (!g.eaten) {
        g.frightened = true;
        g.speed = FRIGHTENED_SPEED;
      }
    });
    playSweep(700, 160, 0.35, "sawtooth", 0.06);
    checkExtraLife();
  }
  updateHud();

  if (dots.size === 0) {
    goToNextLevel();
    return;
  }

  updateFruit(dt);

  if (frightenedTimer > 0) {
    frightenedTimer -= dt;
    if (frightenedTimer <= 0) {
      ghosts.forEach((g) => {
        if (!g.eaten) {
          g.frightened = false;
          g.speed = g.baseSpeed;
        }
      });
    }
  }

  ghosts.forEach((g) => {
    if (atCellCenter(g)) ghostChooseDirection(g);
    stepMover(g, dt);

    if (g.eaten) {
      const gc = currentCell(g);
      if (gc.row === g.home.row && wrapCol(gc.col) === g.home.col) {
        g.eaten = false;
        g.frightened = false;
        g.speed = g.baseSpeed;
      }
    }
  });

  for (const g of ghosts) {
    if (g.eaten) continue;
    const dx = g.x - player.x;
    const dy = g.y - player.y;
    if (dx * dx + dy * dy < (TILE * 0.6) ** 2) {
      if (g.frightened) {
        g.eaten = true;
        g.frightened = false;
        g.speed = g.baseSpeed * 1.6;
        ghostEatStreak++;
        const gained = 100 * ghostEatStreak;
        score += gained;
        spawnFloatingText(g.x, g.y, `+${gained}`, "#4dd9ff");
        spawnBurst(g.x, g.y, "77,217,255", 18);
        playSequence([660, 990], "square", 0.08, 0.08, 0.07);
        updateHud();
        checkExtraLife();
      } else {
        loseLife();
        return;
      }
    }
  }
}

function loseLife() {
  lives--;
  updateHud();
  playSequence([200, 130], "sawtooth", 0.09, 0.22, 0.16);
  triggerShake(6, 0.35);
  spawnBurst(player.x, player.y, "255,77,94", 20);
  if (lives <= 0) {
    gameOver = true;
    running = false;
    const isNewRecord = score > highScore;
    if (isNewRecord) {
      highScore = score;
      localStorage.setItem("nokta-avcisi-rekor", String(highScore));
      highscoreEl.textContent = highScore;
      playSequence([523, 659, 784, 1046], "square", 0.07, 0.13, 0.11);
    }
    showOverlay(
      isNewRecord ? "🏆 Yeni Rekor!" : "Oyun Bitti",
      `Skor: ${score} · Bölüm: ${level}`,
      "Tekrar Oyna"
    );
    showEndGameExtras();
    return;
  }
  resetPositionsAfterDeath();
  respawnPause = 0.6;
}

/* ---------- Çizim ---------- */
function drawBackground() {
  const w = COLS * TILE;
  const h = ROWS * TILE;
  const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.75);
  grad.addColorStop(0, "#0c0c1e");
  grad.addColorStop(1, "#020205");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "rgba(77, 217, 255, 0.04)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= w; x += TILE) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y <= h; y += TILE) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
}

const LEVEL_THEMES = [
  { top: "#1c3f8f", bottom: "#0e1f4a", stroke: "rgba(120,190,255,0.55)", glow: "rgba(77,217,255,0.55)" },
  { top: "#6a1c8f", bottom: "#2e0e4a", stroke: "rgba(220,150,255,0.55)", glow: "rgba(200,77,255,0.55)" },
  { top: "#1c8f6a", bottom: "#0e4a35", stroke: "rgba(150,255,210,0.55)", glow: "rgba(77,255,180,0.55)" },
  { top: "#8f5a1c", bottom: "#4a2e0e", stroke: "rgba(255,210,150,0.55)", glow: "rgba(255,170,77,0.55)" },
  { top: "#8f1c3a", bottom: "#4a0e1f", stroke: "rgba(255,150,180,0.55)", glow: "rgba(255,77,120,0.55)" },
];

function drawWalls() {
  const theme = LEVEL_THEMES[(level - 1) % LEVEL_THEMES.length];
  ctx.save();
  ctx.shadowColor = theme.glow;
  ctx.shadowBlur = 6;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (!wallGrid[r][c]) continue;
      const x = c * TILE + 2;
      const y = r * TILE + 2;
      const size = TILE - 4;
      const g = ctx.createLinearGradient(x, y, x, y + size);
      g.addColorStop(0, theme.top);
      g.addColorStop(1, theme.bottom);
      ctx.fillStyle = g;
      roundRect(x, y, size, size, 5);
      ctx.fill();
      ctx.strokeStyle = theme.stroke;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
  ctx.restore();
}

function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawDots() {
  ctx.save();
  ctx.fillStyle = "#ffe9a8";
  ctx.shadowColor = "rgba(255, 233, 168, 0.85)";
  ctx.shadowBlur = 5;
  dots.forEach((key) => {
    const [r, c] = key.split(",").map(Number);
    const { x, y } = cellCenter(c, r);
    ctx.beginPath();
    ctx.arc(x, y, 2.4, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();

  const pulse = 3.5 + Math.sin(performance.now() / 150) * 1.6;
  ctx.save();
  ctx.fillStyle = "#fff3c4";
  ctx.shadowColor = "rgba(255, 233, 168, 0.95)";
  ctx.shadowBlur = 14;
  POWER_CELLS.forEach(({ r, c }) => {
    const { x, y } = cellCenter(c, r);
    ctx.beginPath();
    ctx.arc(x, y, pulse, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function drawFruit() {
  if (!fruit) return;
  const { x, y } = cellCenter(FRUIT_CELL.col, FRUIT_CELL.row);
  const pulse = 1 + Math.sin(performance.now() / 130) * 0.08;
  const blinking = fruit.timer < 2.5 && Math.floor(fruit.timer * 6) % 2 === 0;

  ctx.save();
  ctx.globalAlpha = blinking ? 0.35 : 1;
  ctx.translate(x, y);
  ctx.scale(pulse, pulse);
  ctx.shadowColor = fruit.type.color;
  ctx.shadowBlur = 12;
  const g = ctx.createRadialGradient(-3, -3, 1, 0, 0, TILE / 2 - 3);
  g.addColorStop(0, fruit.type.accent);
  g.addColorStop(1, fruit.type.color);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, TILE / 2 - 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#5a3d1e";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -(TILE / 2 - 4));
  ctx.lineTo(3, -(TILE / 2 + 2));
  ctx.stroke();
  ctx.restore();
}

function drawPlayer() {
  const mouthOpen = Math.abs(Math.sin(player.mouth)) * 0.22 + 0.04;
  const angle = { right: 0, down: Math.PI / 2, left: Math.PI, up: -Math.PI / 2 }[player.dir || "right"];
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.rotate(angle);
  ctx.shadowColor = "rgba(255, 210, 63, 0.9)";
  ctx.shadowBlur = 12;
  const g = ctx.createRadialGradient(-3, -3, 2, 0, 0, TILE / 2);
  g.addColorStop(0, "#fff3c4");
  g.addColorStop(1, "#ffb52e");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(0, 0, TILE / 2 - 2, mouthOpen * Math.PI, (2 - mouthOpen) * Math.PI);
  ctx.lineTo(0, 0);
  ctx.fill();
  ctx.restore();
}

function drawGhosts() {
  ghosts.forEach((g) => {
    const flashing = g.frightened && frightenedTimer < 2 && Math.floor(frightenedTimer * 8) % 2 === 0;
    const bodyColor = g.eaten ? "rgba(255,255,255,0.28)" : g.frightened ? (flashing ? "#e8ecff" : "#3a3aff") : g.color;

    ctx.save();
    if (!g.eaten) {
      ctx.shadowColor = g.frightened ? "rgba(77,120,255,0.8)" : g.glow;
      ctx.shadowBlur = 10;
    }
    const r = TILE / 2 - 2;
    const grad = ctx.createLinearGradient(g.x, g.y - r, g.x, g.y + r);
    grad.addColorStop(0, bodyColor);
    grad.addColorStop(1, shade(bodyColor, -18));
    ctx.fillStyle = g.eaten ? bodyColor : grad;

    ctx.beginPath();
    ctx.arc(g.x, g.y - 2, r, Math.PI, 0);
    ctx.lineTo(g.x + r, g.y + r - 2);
    const waves = 4;
    for (let i = 0; i <= waves; i++) {
      const wx = g.x + r - (i * (2 * r)) / waves;
      const wy = g.y + (i % 2 === 0 ? r - 2 : r - 8);
      ctx.lineTo(wx, wy);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    if (!g.eaten) {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(g.x - 4, g.y - 3, 3, 0, Math.PI * 2);
      ctx.arc(g.x + 4, g.y - 3, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = g.frightened ? "#1a1acc" : "#1a1a2e";
      ctx.beginPath();
      ctx.arc(g.x - 4, g.y - 3, 1.4, 0, Math.PI * 2);
      ctx.arc(g.x + 4, g.y - 3, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

function shade(hexOrRgba, amt) {
  if (hexOrRgba.startsWith("rgba") || hexOrRgba.startsWith("#") === false) return hexOrRgba;
  const num = parseInt(hexOrRgba.slice(1), 16);
  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0x00ff) + amt;
  let b = (num & 0x0000ff) + amt;
  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);
  return `rgb(${r},${g},${b})`;
}

function drawParticles() {
  particles.forEach((p) => {
    const alpha = Math.max(p.life / p.maxLife, 0);
    ctx.fillStyle = `rgba(${p.color},${alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawFloatingTexts() {
  ctx.font = "800 13px -apple-system, sans-serif";
  ctx.textAlign = "center";
  floatingTexts.forEach((f) => {
    const alpha = Math.max(f.life / f.maxLife, 0);
    ctx.fillStyle = f.color.startsWith("#") ? f.color : `rgb(${f.color})`;
    ctx.globalAlpha = alpha;
    ctx.fillText(f.text, f.x, f.y);
  });
  ctx.globalAlpha = 1;
}

function drawBanner() {
  if (banner.timer <= 0) return;
  const w = COLS * TILE;
  const h = ROWS * TILE;
  const alpha = Math.min(banner.timer / 0.3, 1);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.font = "800 26px -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(77, 217, 255, 0.9)";
  ctx.shadowBlur = 16;
  ctx.fillStyle = "#e8f6ff";
  ctx.fillText(banner.text, w / 2, h / 2);
  ctx.restore();
}

function drawVignette() {
  const w = COLS * TILE;
  const h = ROWS * TILE;
  const g = ctx.createRadialGradient(w / 2, h / 2, h * 0.35, w / 2, h / 2, h * 0.72);
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function draw() {
  ctx.save();
  if (shake.timer > 0) {
    const m = shake.magnitude * (shake.timer / 0.35);
    ctx.translate((Math.random() - 0.5) * m, (Math.random() - 0.5) * m);
  }

  drawBackground();
  drawWalls();
  drawDots();
  drawFruit();
  drawPlayer();
  drawGhosts();
  drawParticles();
  drawFloatingTexts();
  drawVignette();
  drawBanner();

  ctx.restore();
}

/* ---------- Döngü ---------- */
function showOverlay(title, message, btnLabel) {
  overlayTitle.textContent = title;
  overlayMessage.textContent = message;
  overlayBtn.textContent = btnLabel;
  overlay.classList.remove("hidden");
}

function startGame() {
  overlay.classList.add("hidden");
  running = true;
  paused = false;
  btnPause.textContent = "⏸";
}

let lastTime = performance.now();
function loop(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

fitCanvasForDisplay();
newGame();
draw();
showOverlay("Nokta Avcısı", "Tüm noktaları topla, hayaletlerden kaç! Güç topu yersen hayaletleri sen avlarsın.", "Başla");
leaderboardPanel.classList.remove("hidden");
requestAnimationFrame(loop);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then((reg) => reg.update())
      .catch(() => {
        // Service worker desteklenmiyorsa (ör. file:// üzerinden açılmışsa) sessizce geç.
      });

    // Yeni bir service worker devreye girdiğinde (deploy sonrası), açık sayfayı
    // otomatik yeniler; böylece kullanıcı elle birden fazla kez yenilemek
    // zorunda kalmadan her zaman en güncel sürümü oynar.
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      window.location.reload();
    });
  });
}
