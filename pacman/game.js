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

const PLAYER_SPEED = 132; // px/sn
const GHOST_SPEED = 108;
const FRIGHTENED_SPEED = 76;
const FRIGHTENED_DURATION = 7; // saniye
const GHOST_HOUSE = { r0: 9, r1: 11, c0: 8, c1: 12 };

/* ---------- Labirent üretimi ----------
 * İç köşeler (r%2===0 && c%2===0) sütun/kolon oluşturur, aralarındaki
 * tüm hücreler koridordur — böylece labirentin tamamen bağlı (her
 * noktaya ulaşılabilir) olduğu garanti edilir. Hayalet evi ve tünel
 * için birkaç hücre elle açılır.
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

  // Hayalet evi: içini tamamen aç.
  for (let r = GHOST_HOUSE.r0; r <= GHOST_HOUSE.r1; r++) {
    for (let c = GHOST_HOUSE.c0; c <= GHOST_HOUSE.c1; c++) {
      wall[r][c] = false;
    }
  }
  // Hayalet evi kapısı.
  wall[GHOST_HOUSE.r0 - 1][10] = false;

  // Sol-sağ tünel.
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
let highScore = Number(localStorage.getItem("nokta-avcisi-rekor") || 0);
let frightenedTimer = 0;
let ghostEatStreak = 0;
let running = false;
let gameOver = false;
let won = false;
let respawnPause = 0;

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const highscoreEl = document.getElementById("highscore");
const livesEl = document.getElementById("lives");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayMessage = document.getElementById("overlay-message");
const overlayBtn = document.getElementById("overlay-btn");

highscoreEl.textContent = highScore;

function cellCenter(col, row) {
  return { x: col * TILE + TILE / 2, y: row * TILE + TILE / 2 };
}

function isWalkable(col, row) {
  if (row === TUNNEL_ROW && (col < 0 || col >= COLS)) return true; // tünelin dışı
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

function stepMover(mover, dt) {
  const dist = mover.speed * dt;
  const { col, row } = currentCell(mover);

  if (atCellCenter(mover)) {
    const center = cellCenter(wrapCol(col), row);
    mover.x = col < 0 || col >= COLS ? mover.x : center.x;
    mover.y = center.y;

    if (mover.nextDir) {
      const d = DIRS[mover.nextDir];
      if (isWalkable(wrapCol(col) + d.x, row + d.y)) {
        mover.dir = mover.nextDir;
      }
    }

    if (mover.dir) {
      const d = DIRS[mover.dir];
      if (!isWalkable(wrapCol(col) + d.x, row + d.y)) {
        mover.dir = null;
      }
    }
  }

  if (mover.dir) {
    const d = DIRS[mover.dir];
    mover.x += d.x * dist;
    mover.y += d.y * dist;

    if (row === TUNNEL_ROW) {
      const w = COLS * TILE;
      if (mover.x < -TILE / 2) mover.x = w + TILE / 2;
      if (mover.x > w + TILE / 2) mover.x = -TILE / 2;
    }
  }
}

/* ---------- Kurulum ---------- */
function setupLevel() {
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

  ghosts = [
    { ...createMover(9, 10, GHOST_SPEED), color: "#ff4d4d", frightened: false, eaten: false, home: { col: 9, row: 10 } },
    { ...createMover(10, 10, GHOST_SPEED), color: "#ffb8ff", frightened: false, eaten: false, home: { col: 10, row: 10 } },
    { ...createMover(11, 10, GHOST_SPEED), color: "#00e5ff", frightened: false, eaten: false, home: { col: 11, row: 10 } },
    { ...createMover(10, 9, GHOST_SPEED), color: "#ffb852", frightened: false, eaten: false, home: { col: 10, row: 9 } },
  ];
  ghosts.forEach((g) => (g.dir = "up"));

  score = 0;
  lives = 3;
  frightenedTimer = 0;
  ghostEatStreak = 0;
  gameOver = false;
  won = false;
  respawnPause = 0;
  updateHud();
}

function updateHud() {
  scoreEl.textContent = score;
  livesEl.textContent = "●".repeat(Math.max(lives, 0)) || "—";
}

/* ---------- Girdi ---------- */
function setDesiredDir(dir) {
  if (!player) return;
  player.nextDir = dir;
  if (!player.dir) player.dir = dir; // ilk hareket
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
    setDesiredDir(dir);
    if (!running && !gameOver && !won) startGame();
  }
});

["up", "down", "left", "right"].forEach((dir) => {
  const btn = document.getElementById(`btn-${dir}`);
  btn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    setDesiredDir(dir);
    if (!running && !gameOver && !won) startGame();
  });
  btn.addEventListener("mousedown", () => {
    setDesiredDir(dir);
    if (!running && !gameOver && !won) startGame();
  });
});

let touchStart = null;
canvas.addEventListener(
  "touchstart",
  (e) => {
    const t = e.changedTouches[0];
    touchStart = { x: t.clientX, y: t.clientY };
  },
  { passive: true }
);
canvas.addEventListener(
  "touchend",
  (e) => {
    if (!touchStart) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.x;
    const dy = t.clientY - touchStart.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > 18) setDesiredDir(dx > 0 ? "right" : "left");
    } else {
      if (Math.abs(dy) > 18) setDesiredDir(dy > 0 ? "down" : "up");
    }
    touchStart = null;
    if (!running && !gameOver && !won) startGame();
  },
  { passive: true }
);

overlayBtn.addEventListener("click", () => {
  if (gameOver || won) {
    setupLevel();
  }
  startGame();
});

/* ---------- Ses (küçük WebAudio bip'leri, dosya gerekmez) ---------- */
let audioCtx = null;
function beep(freq, duration, type = "square", volume = 0.05) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // Ses desteklenmiyorsa sessizce geç.
  }
}

/* ---------- Hayalet yapay zekası ---------- */
function ghostChooseDirection(ghost) {
  const { col, row } = currentCell(ghost);
  const wcol = wrapCol(col);

  const options = Object.keys(DIRS).filter((dir) => {
    if (ghost.dir && OPPOSITE[dir] === ghost.dir) return false; // geri dönme
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

  ghosts.forEach((g) => {
    const gc = cellCenter(g.home.col, g.home.row);
    g.x = gc.x;
    g.y = gc.y;
    g.dir = "up";
    g.nextDir = null;
    g.frightened = false;
    g.eaten = false;
    g.speed = g.baseSpeed;
  });
  frightenedTimer = 0;
}

function update(dt) {
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
    beep(880, 0.04);
  }
  if (isPowerCell(pc.row, wpc)) {
    score += 50;
    frightenedTimer = FRIGHTENED_DURATION;
    ghostEatStreak = 0;
    ghosts.forEach((g) => {
      if (!g.eaten) {
        g.frightened = true;
        g.speed = FRIGHTENED_SPEED;
      }
    });
    beep(220, 0.15, "sawtooth", 0.06);
  }
  updateHud();

  if (dots.size === 0) {
    won = true;
    running = false;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("nokta-avcisi-rekor", String(highScore));
      highscoreEl.textContent = highScore;
    }
    showOverlay("Kazandın!", `Tüm noktaları topladın. Skor: ${score}`, "Tekrar Oyna");
    return;
  }

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
        g.speed = GHOST_SPEED * 1.6;
        ghostEatStreak++;
        score += 100 * ghostEatStreak;
        beep(660, 0.12, "square", 0.07);
        updateHud();
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
  beep(120, 0.3, "sawtooth", 0.08);
  if (lives <= 0) {
    gameOver = true;
    running = false;
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("nokta-avcisi-rekor", String(highScore));
      highscoreEl.textContent = highScore;
    }
    showOverlay("Oyun Bitti", `Skor: ${score}`, "Tekrar Oyna");
    return;
  }
  resetPositionsAfterDeath();
  respawnPause = 1;
}

/* ---------- Çizim ---------- */
function draw() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#1b3a8a";
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (wallGrid[r][c]) {
        ctx.fillRect(c * TILE + 1, r * TILE + 1, TILE - 2, TILE - 2);
      }
    }
  }

  ctx.fillStyle = "#ffe9a8";
  dots.forEach((key) => {
    const [r, c] = key.split(",").map(Number);
    const { x, y } = cellCenter(c, r);
    ctx.beginPath();
    ctx.arc(x, y, 2.4, 0, Math.PI * 2);
    ctx.fill();
  });

  const pulse = 3.5 + Math.sin(performance.now() / 150) * 1.5;
  ctx.fillStyle = "#ffe9a8";
  POWER_CELLS.forEach(({ r, c }) => {
    const { x, y } = cellCenter(c, r);
    ctx.beginPath();
    ctx.arc(x, y, pulse, 0, Math.PI * 2);
    ctx.fill();
  });

  // Oyuncu
  const mouthOpen = Math.abs(Math.sin(player.mouth)) * 0.22 + 0.04;
  const angle = { right: 0, down: Math.PI / 2, left: Math.PI, up: -Math.PI / 2 }[player.dir || "right"];
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.rotate(angle);
  ctx.fillStyle = "#ffd23f";
  ctx.beginPath();
  ctx.arc(0, 0, TILE / 2 - 2, mouthOpen * Math.PI, (2 - mouthOpen) * Math.PI);
  ctx.lineTo(0, 0);
  ctx.fill();
  ctx.restore();

  // Hayaletler
  ghosts.forEach((g) => {
    const color = g.eaten ? "rgba(255,255,255,0.35)" : g.frightened ? "#3a3aff" : g.color;
    ctx.fillStyle = color;
    const r = TILE / 2 - 2;
    ctx.beginPath();
    ctx.arc(g.x, g.y - 2, r, Math.PI, 0);
    ctx.lineTo(g.x + r, g.y + r - 2);
    for (let i = 0; i < 4; i++) {
      const wx = g.x + r - (i * (2 * r)) / 3;
      ctx.lineTo(wx, g.y + (i % 2 === 0 ? r - 2 : r - 7));
    }
    ctx.closePath();
    ctx.fill();

    if (!g.eaten) {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(g.x - 4, g.y - 3, 3, 0, Math.PI * 2);
      ctx.arc(g.x + 4, g.y - 3, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = g.frightened ? "#3a3aff" : "#1a1a2e";
      ctx.beginPath();
      ctx.arc(g.x - 4, g.y - 3, 1.4, 0, Math.PI * 2);
      ctx.arc(g.x + 4, g.y - 3, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
  });
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
}

let lastTime = performance.now();
function loop(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;
  update(dt);
  draw();
  requestAnimationFrame(loop);
}

setupLevel();
draw();
showOverlay("Nokta Avcısı", "Tüm noktaları topla, hayaletlerden kaç! Güç topu yersen hayaletleri sen avlarsın.", "Başla");
requestAnimationFrame(loop);
