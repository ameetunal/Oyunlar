(() => {
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  const startScreen = document.getElementById('start-screen');
  const startBtn = document.getElementById('start-btn');
  const levelupScreen = document.getElementById('levelup-screen');
  const upgradeOptions = document.getElementById('upgrade-options');
  const gameoverScreen = document.getElementById('gameover-screen');
  const finalStats = document.getElementById('final-stats');
  const restartBtn = document.getElementById('restart-btn');

  const hpFill = document.getElementById('hp-fill');
  const hpText = document.getElementById('hp-text');
  const xpFill = document.getElementById('xp-fill');
  const lvlText = document.getElementById('lvl-text');
  const timerEl = document.getElementById('timer');
  const killsEl = document.getElementById('kills');
  const muteBtn = document.getElementById('mute-btn');
  const pauseBtn = document.getElementById('pause-btn');
  const pauseScreen = document.getElementById('pause-screen');
  const resumeBtn = document.getElementById('resume-btn');
  const bestScoreEl = document.getElementById('best-score');
  const recordBadge = document.getElementById('record-badge');
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  const shopBtn = document.getElementById('shop-btn');
  const shopScreen = document.getElementById('shop-screen');
  const shopBackBtn = document.getElementById('shop-back-btn');
  const shopList = document.getElementById('shop-list');
  const shopAkceTotal = document.getElementById('shop-akce-total');
  const akceDisplay = document.getElementById('akce-display');
  const akceEarnedEl = document.getElementById('akce-earned');

  const keys = {};
  window.addEventListener('keydown', e => {
    keys[e.key.toLowerCase()] = true;
    if (e.key === 'Escape' || e.key.toLowerCase() === 'p') togglePause();
  });
  window.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state === 'playing') togglePause();
  });

  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const rand = (min, max) => min + Math.random() * (max - min);
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  // ---- audio (procedural, no assets) ----
  let audioCtx = null;
  let muted = localStorage.getItem('calkanti_muted') === '1';
  function ensureAudio() {
    if (!audioCtx) {
      try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audioCtx = null; }
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  }
  function beep({ freq = 440, duration = 0.1, type = 'sine', volume = 0.2, glideTo = null, delay = 0 }) {
    if (muted || !audioCtx) return;
    const t0 = audioCtx.currentTime + delay;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (glideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(glideTo, 1), t0 + duration);
    gain.gain.setValueAtTime(volume, t0);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  }
  const sfx = {
    shoot: () => beep({ freq: 720, duration: 0.06, type: 'square', volume: 0.05, glideTo: 900 }),
    hit: () => beep({ freq: 220, duration: 0.05, type: 'square', volume: 0.06, glideTo: 120 }),
    kill: () => beep({ freq: 340, duration: 0.12, type: 'sawtooth', volume: 0.08, glideTo: 80 }),
    hurt: () => beep({ freq: 140, duration: 0.18, type: 'sawtooth', volume: 0.12, glideTo: 60 }),
    pickup: () => beep({ freq: 900, duration: 0.05, type: 'sine', volume: 0.04, glideTo: 1300 }),
    levelup: () => {
      [523, 659, 784, 1046].forEach((f, i) => beep({ freq: f, duration: 0.14, type: 'triangle', volume: 0.09, delay: i * 0.08 }));
    },
    boss: () => beep({ freq: 90, duration: 0.9, type: 'sawtooth', volume: 0.15, glideTo: 50 }),
    gameover: () => {
      [400, 340, 260, 180].forEach((f, i) => beep({ freq: f, duration: 0.22, type: 'triangle', volume: 0.1, delay: i * 0.14 }));
    },
  };
  function setMuted(v) {
    muted = v;
    localStorage.setItem('calkanti_muted', v ? '1' : '0');
    muteBtn.textContent = v ? '🔇' : '🔊';
  }
  setMuted(muted);
  muteBtn.addEventListener('click', () => { ensureAudio(); setMuted(!muted); });

  // ---- best score ----
  function getBest() {
    return {
      time: Number(localStorage.getItem('calkanti_best_time') || 0),
      level: Number(localStorage.getItem('calkanti_best_level') || 0),
    };
  }
  function maybeSaveRecord() {
    const best = getBest();
    const isRecord = elapsed > best.time;
    if (isRecord) {
      localStorage.setItem('calkanti_best_time', String(Math.floor(elapsed)));
      localStorage.setItem('calkanti_best_level', String(player.level));
    }
    return isRecord;
  }
  function fmtTime(sec) {
    const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
  function showBestOnStart() {
    const best = getBest();
    if (best.time > 0) {
      bestScoreEl.textContent = `🏆 Rekor: ${fmtTime(best.time)} — Lv ${best.level}`;
      bestScoreEl.classList.remove('hidden');
    } else {
      bestScoreEl.classList.add('hidden');
    }
  }
  showBestOnStart();

  // ---- permanent progression: Akçe currency + shop ----
  const META_STATS = [
    { id: 'hp', name: 'Simit Stoku', icon: '🥯', desc: 'Maks can +8/seviye', maxLevel: 10 },
    { id: 'dmg', name: 'Nazar Gücü', icon: '🧿', desc: 'Hasar +5%/seviye', maxLevel: 10 },
    { id: 'speed', name: 'Dolmuş Motoru', icon: '🚌', desc: 'Hareket hızı +4%/seviye', maxLevel: 10 },
    { id: 'magnet', name: 'Vapur Işığı', icon: '🚢', desc: 'Toplama menzili +8/seviye', maxLevel: 10 },
  ];
  function getAkce() {
    try { return Number(localStorage.getItem('calkanti_akce') || 0); } catch (e) { return 0; }
  }
  function addAkce(amount) {
    const total = getAkce() + amount;
    try { localStorage.setItem('calkanti_akce', String(total)); } catch (e) {}
    return total;
  }
  function getMeta() {
    try {
      const raw = JSON.parse(localStorage.getItem('calkanti_meta') || '{}');
      const meta = {};
      for (const s of META_STATS) meta[s.id] = raw[s.id] || 0;
      return meta;
    } catch (e) {
      const meta = {};
      for (const s of META_STATS) meta[s.id] = 0;
      return meta;
    }
  }
  function saveMeta(meta) {
    try { localStorage.setItem('calkanti_meta', JSON.stringify(meta)); } catch (e) {}
  }
  function metaCost(level) {
    return Math.round(50 * Math.pow(1.55, level));
  }
  function showAkceOnStart() {
    const akce = getAkce();
    akceDisplay.textContent = `🪙 Akçe: ${akce}`;
    akceDisplay.classList.remove('hidden');
  }
  showAkceOnStart();

  function renderShop() {
    const akce = getAkce();
    const meta = getMeta();
    shopAkceTotal.textContent = akce;
    shopList.innerHTML = '';
    for (const s of META_STATS) {
      const level = meta[s.id];
      const maxed = level >= s.maxLevel;
      const cost = maxed ? 0 : metaCost(level);
      const row = document.createElement('div');
      row.className = 'shop-row';
      row.innerHTML = `
        <div class="icon">${s.icon}</div>
        <div class="info">
          <div class="name">${s.name}</div>
          <div class="desc">${s.desc}</div>
          <div class="level">Seviye ${level}/${s.maxLevel}</div>
        </div>
        <button ${maxed || akce < cost ? 'disabled' : ''}>${maxed ? 'MAKS' : `🪙 ${cost}`}</button>
      `;
      if (!maxed) {
        row.querySelector('button').addEventListener('click', () => {
          const currentAkce = getAkce();
          const currentMeta = getMeta();
          const buyCost = metaCost(currentMeta[s.id]);
          if (currentAkce < buyCost) return;
          try { localStorage.setItem('calkanti_akce', String(currentAkce - buyCost)); } catch (e) {}
          currentMeta[s.id] += 1;
          saveMeta(currentMeta);
          renderShop();
          showAkceOnStart();
        });
      }
      shopList.appendChild(row);
    }
  }
  shopBtn.addEventListener('click', () => {
    renderShop();
    startScreen.classList.add('hidden');
    shopScreen.classList.remove('hidden');
  });
  shopBackBtn.addEventListener('click', () => {
    shopScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
  });

  // ---- touch controls: drag anywhere on the canvas, no visible joystick ----
  const touchVec = { x: 0, y: 0, active: false };
  let joyTouchId = null;
  let joyOriginX = 0, joyOriginY = 0;
  const JOY_RADIUS = 55;
  function joyStart(id, clientX, clientY) {
    joyTouchId = id;
    touchVec.active = true;
    joyOriginX = clientX;
    joyOriginY = clientY;
  }
  function joyMove(clientX, clientY) {
    if (!touchVec.active) return;
    let dx = clientX - joyOriginX, dy = clientY - joyOriginY;
    const len = Math.hypot(dx, dy);
    if (len > JOY_RADIUS) { dx = (dx / len) * JOY_RADIUS; dy = (dy / len) * JOY_RADIUS; }
    touchVec.x = dx / JOY_RADIUS;
    touchVec.y = dy / JOY_RADIUS;
  }
  function joyEnd() {
    touchVec.active = false;
    touchVec.x = 0; touchVec.y = 0;
    joyTouchId = null;
  }
  canvas.addEventListener('touchstart', e => {
    if (state !== 'playing') return;
    e.preventDefault();
    const t = e.changedTouches[0];
    joyStart(t.identifier, t.clientX, t.clientY);
  }, { passive: false });
  window.addEventListener('touchmove', e => {
    for (const t of e.changedTouches) {
      if (t.identifier === joyTouchId) { e.preventDefault(); joyMove(t.clientX, t.clientY); }
    }
  }, { passive: false });
  window.addEventListener('touchend', e => {
    for (const t of e.changedTouches) if (t.identifier === joyTouchId) joyEnd();
  });
  window.addEventListener('touchcancel', joyEnd);

  // ---- fullscreen ----
  function requestFullscreenSafe() {
    const el = document.documentElement;
    const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
    if (req) { try { req.call(el); } catch (e) {} }
  }
  function toggleFullscreen() {
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
    if (!fsEl) {
      requestFullscreenSafe();
    } else {
      const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
      if (exit) { try { exit.call(document); } catch (e) {} }
    }
  }
  fullscreenBtn.addEventListener('click', toggleFullscreen);
  function updateFullscreenBtn() {
    const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
    fullscreenBtn.title = isFs ? 'Tam ekrandan çık' : 'Tam ekran';
  }
  document.addEventListener('fullscreenchange', updateFullscreenBtn);
  document.addEventListener('webkitfullscreenchange', updateFullscreenBtn);

  function togglePause() {
    if (state === 'playing') {
      state = 'paused';
      pauseScreen.classList.remove('hidden');
    } else if (state === 'paused') {
      state = 'playing';
      pauseScreen.classList.add('hidden');
      lastTime = performance.now();
    }
  }
  pauseBtn.addEventListener('click', togglePause);
  resumeBtn.addEventListener('click', togglePause);

  let state = 'menu'; // menu | playing | paused | levelup | gameover
  let elapsed = 0;
  let killCount = 0;
  let lastTime = 0;
  let shake = 0;

  let player = null;
  let enemies = [], projectiles = [], gems = [], particles = [], floatingTexts = [], shockwaves = [];
  let spawnTimer = 0, bossTimer = 0, fireTimer = 0;
  let stars = [];
  function buildStars() {
    stars = [];
    for (let i = 0; i < 90; i++) {
      stars.push({ x: rand(0, W), y: rand(0, H), r: rand(0.5, 1.8), tw: rand(0, Math.PI * 2) });
    }
  }
  buildStars();

  // fixed skyline silhouette (İstanbul at night) — generated once, never changes
  let buildings = [];
  function buildSkyline() {
    buildings = [];
    let x = 0;
    while (x < W) {
      const w = rand(28, 64);
      const h = rand(35, 130);
      buildings.push({ x, w, h, lit: Math.random() < 0.4, litY: rand(10, h - 12) });
      x += w + rand(2, 8);
    }
  }
  buildSkyline();

  const UPGRADES = [
    { id: 'dmg', name: 'Güç Artışı', icon: '⚔️', desc: 'Hasar +25%', apply: p => p.damage *= 1.25 },
    { id: 'rate', name: 'Çılgın Hız', icon: '⚡', desc: 'Ateş hızı +20%', apply: p => p.fireRate *= 0.8 },
    { id: 'speed', name: 'Rüzgar Ayak', icon: '👟', desc: 'Hareket hızı +12%', apply: p => p.speed *= 1.12 },
    { id: 'hp', name: 'Zırh', icon: '🛡️', desc: 'Maks can +25, iyileş', apply: p => { p.maxHp += 25; p.hp = p.maxHp; } },
    { id: 'multi', name: 'Çoklu Atış', icon: '🔱', desc: '+1 mermi', apply: p => p.projCount += 1 },
    { id: 'pierce', name: 'Delici Mermi', icon: '🎯', desc: '+1 delme', apply: p => p.pierce += 1 },
    { id: 'magnet', name: 'Mıknatıs', icon: '🧲', desc: 'Toplama menzili +60', apply: p => p.magnet += 60 },
    { id: 'heal', name: 'Şifa', icon: '❤️', desc: 'Canı tamamen doldur', apply: p => { p.hp = p.maxHp; } },
    { id: 'orbit', name: 'Yörünge Kalkanı', icon: '🌀', desc: 'Etrafında dönen, hasar veren bir küre', apply: p => { p.orbCount += 1; } },
    { id: 'explosive', name: 'Patlayıcı Mermi', icon: '💥', desc: 'Vuruşlar çevreye alan hasarı verir', apply: p => { p.explosiveRadius += 45; } },
  ];

  function newPlayer() {
    const meta = getMeta();
    const maxHp = 100 + meta.hp * 8;
    return {
      x: W / 2, y: H / 2, r: 14,
      hp: maxHp, maxHp,
      speed: 220 * (1 + meta.speed * 0.04),
      damage: 12 * (1 + meta.dmg * 0.05),
      fireRate: 0.55, // seconds between shots
      projCount: 1,
      pierce: 0,
      magnet: 70 + meta.magnet * 8,
      level: 1, xp: 0, xpNeeded: 10,
      invuln: 0,
      orbCount: 0, orbDamage: 16, orbRadius: 65, orbAngle: 0,
      explosiveRadius: 0,
      facingAngle: -Math.PI / 2, ringSpin: 0,
    };
  }

  function resetGame() {
    player = newPlayer();
    enemies = [];
    projectiles = [];
    gems = [];
    particles = [];
    floatingTexts = [];
    shockwaves = [];
    elapsed = 0;
    killCount = 0;
    spawnTimer = 0;
    bossTimer = 25;
    fireTimer = 0;
    shake = 0;
  }

  function spawnEnemy(isBoss = false) {
    const edge = Math.floor(rand(0, 4));
    let x, y;
    if (edge === 0) { x = rand(0, W); y = -30; }
    else if (edge === 1) { x = W + 30; y = rand(0, H); }
    else if (edge === 2) { x = rand(0, W); y = H + 30; }
    else { x = -30; y = rand(0, H); }

    const t = elapsed / 60; // minutes-ish scaling
    const spikePhase = rand(0, Math.PI * 2);
    if (isBoss) {
      // Boğaz Canavarı — a deep-sea beast rising from the strait
      enemies.push({
        x, y, r: 34,
        hp: 220 + t * 140, maxHp: 220 + t * 140,
        speed: 55, damage: 26,
        color: '#0ea5e9', colorDark: '#075985', colorLight: '#bae6fd',
        boss: true, xpValue: 12, orbCooldown: 0, spikePhase, facingAngle: 0,
      });
      shake = 18;
      floatingTexts.push({ x: W / 2, y: 60, text: 'BOĞAZ CANAVARI YAKLAŞIYOR', life: 2.2, big: true, color: '#7dd3fc' });
      sfx.boss();
    } else {
      const tank = Math.random() < clamp(0.15 + t * 0.03, 0.15, 0.4);
      if (tank) {
        // Trafik Canavarı — an armored taxi-yellow brute
        enemies.push({
          x, y, r: 20,
          hp: 40 + t * 18, maxHp: 40 + t * 18,
          speed: 60, damage: 14,
          color: '#facc15', colorDark: '#92610a', colorLight: '#fff3b0',
          xpValue: 3, orbCooldown: 0, spikePhase, facingAngle: 0,
        });
      } else {
        // Martı — a small, fast seagull swarming for scraps
        enemies.push({
          x, y, r: 11,
          hp: 12 + t * 6, maxHp: 12 + t * 6,
          speed: rand(95, 130), damage: 8,
          color: '#e2e8f0', colorDark: '#475569', colorLight: '#ffffff',
          xpValue: 1, orbCooldown: 0, spikePhase, facingAngle: 0,
        });
      }
    }
  }

  function drawSpikeRing(x, y, r, count, len, halfWidth, rot, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = color;
    for (let i = 0; i < count; i++) {
      ctx.save();
      ctx.rotate((i / count) * Math.PI * 2);
      ctx.beginPath();
      ctx.moveTo(r, -halfWidth);
      ctx.lineTo(r + len, 0);
      ctx.lineTo(r, halfWidth);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }

  function drawRimPlates(x, y, r, count, size, rot, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = color;
    for (let i = 0; i < count; i++) {
      ctx.save();
      ctx.rotate((i / count) * Math.PI * 2);
      ctx.translate(r - size * 0.35, 0);
      ctx.fillRect(-size / 2, -size / 2, size, size);
      ctx.restore();
    }
    ctx.restore();
  }

  function spawnParticles(x, y, color, count = 10) {
    for (let i = 0; i < count; i++) {
      const ang = rand(0, Math.PI * 2);
      const spd = rand(40, 220);
      particles.push({
        x, y, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
        life: rand(0.3, 0.6), maxLife: 0.6, color,
      });
    }
  }

  function nearestEnemy(from) {
    let best = null, bestD = Infinity;
    for (const e of enemies) {
      const d = dist(from, e);
      if (d < bestD) { bestD = d; best = e; }
    }
    return best;
  }

  function fireWeapon() {
    const target = nearestEnemy(player);
    if (!target) return;
    const baseAngle = Math.atan2(target.y - player.y, target.x - player.x);
    const spread = 0.18;
    const n = player.projCount;
    for (let i = 0; i < n; i++) {
      const off = n === 1 ? 0 : (i - (n - 1) / 2) * spread;
      const ang = baseAngle + off;
      projectiles.push({
        x: player.x, y: player.y,
        vx: Math.cos(ang) * 480, vy: Math.sin(ang) * 480,
        r: 5, damage: player.damage, pierce: player.pierce, hits: new Set(),
      });
    }
    sfx.shoot();
  }

  function explodeAt(x, y, radius, damage, excludeEnemy) {
    if (radius <= 0) return;
    shockwaves.push({ x, y, r: 4, maxR: radius, life: 0.3, maxLife: 0.3 });
    for (const other of enemies.slice()) {
      if (other === excludeEnemy) continue;
      if (dist({ x, y }, other) < radius + other.r) {
        other.hp -= damage;
        if (other.hp <= 0) killEnemy(other);
      }
    }
  }

  function killEnemy(e) {
    const idx = enemies.indexOf(e);
    if (idx === -1) return;
    killCount++;
    spawnParticles(e.x, e.y, e.color, e.boss ? 26 : 12);
    gems.push({ x: e.x, y: e.y, r: 6, value: e.xpValue });
    enemies.splice(idx, 1);
    sfx.kill();
    if (e.boss) shake = Math.min(shake + 16, 24);
  }

  function gainXp(amount) {
    player.xp += amount;
    while (player.xp >= player.xpNeeded) {
      player.xp -= player.xpNeeded;
      player.level += 1;
      player.xpNeeded = Math.round(player.xpNeeded * 1.35 + 4);
      triggerLevelUp();
    }
  }

  function triggerLevelUp() {
    state = 'levelup';
    sfx.levelup();
    upgradeOptions.innerHTML = '';
    const pool = [...UPGRADES].sort(() => Math.random() - 0.5).slice(0, 3);
    for (const up of pool) {
      const card = document.createElement('div');
      card.className = 'upgrade-card';
      card.innerHTML = `<div class="icon">${up.icon}</div><div class="name">${up.name}</div><div class="desc">${up.desc}</div>`;
      card.onclick = () => {
        up.apply(player);
        levelupScreen.classList.add('hidden');
        if (state === 'levelup') state = 'playing';
      };
      upgradeOptions.appendChild(card);
    }
    levelupScreen.classList.remove('hidden');
  }

  function endGame() {
    state = 'gameover';
    sfx.gameover();
    const isRecord = maybeSaveRecord();
    recordBadge.classList.toggle('hidden', !isRecord);
    finalStats.textContent = `Süre: ${fmtTime(elapsed)} — Seviye: ${player.level} — Düşman: ${killCount}`;
    const earned = Math.round(elapsed) + killCount * 2;
    const total = addAkce(earned);
    akceEarnedEl.textContent = `🪙 +${earned} Akçe kazandın (Toplam: ${total})`;
    gameoverScreen.classList.remove('hidden');
  }

  function update(dt) {
    elapsed += dt;
    fireTimer -= dt;
    spawnTimer -= dt;
    bossTimer -= dt;
    if (player.invuln > 0) player.invuln -= dt;
    if (shake > 0) shake = Math.max(0, shake - dt * 40);

    // movement — keyboard gives full-speed digital direction, joystick gives analog direction+magnitude
    let dx = 0, dy = 0, magnitude = 1;
    if (keys['w'] || keys['arrowup']) dy -= 1;
    if (keys['s'] || keys['arrowdown']) dy += 1;
    if (keys['a'] || keys['arrowleft']) dx -= 1;
    if (keys['d'] || keys['arrowright']) dx += 1;
    if (!dx && !dy && touchVec.active) {
      dx = touchVec.x; dy = touchVec.y;
      magnitude = clamp(Math.hypot(touchVec.x, touchVec.y), 0, 1);
    }
    if (dx || dy) {
      const len = Math.hypot(dx, dy);
      player.x = clamp(player.x + (dx / len) * player.speed * dt * magnitude, player.r, W - player.r);
      player.y = clamp(player.y + (dy / len) * player.speed * dt * magnitude, player.r, H - player.r);
      player.facingAngle = Math.atan2(dy, dx);
    }
    player.ringSpin += dt * 1.4;

    // orbit shield
    if (player.orbCount > 0) {
      player.orbAngle += dt * 2.6;
      for (let k = 0; k < player.orbCount; k++) {
        const a = player.orbAngle + (k * Math.PI * 2) / player.orbCount;
        const ox = player.x + Math.cos(a) * player.orbRadius;
        const oy = player.y + Math.sin(a) * player.orbRadius;
        for (const e of enemies.slice()) {
          if (e.orbCooldown > 0) continue;
          if (dist({ x: ox, y: oy }, e) < 10 + e.r) {
            e.hp -= player.orbDamage;
            e.orbCooldown = 0.35;
            spawnParticles(ox, oy, '#c084fc', 5);
            if (e.hp <= 0) killEnemy(e);
          }
        }
      }
    }

    // spawning
    const difficulty = clamp(elapsed / 45, 0, 1);
    const spawnInterval = 1.15 - difficulty * 0.75; // gets faster
    if (spawnTimer <= 0) {
      spawnTimer = spawnInterval;
      spawnEnemy(false);
    }
    if (bossTimer <= 0) {
      bossTimer = 35;
      spawnEnemy(true);
    }

    // firing
    if (fireTimer <= 0) {
      fireTimer = player.fireRate;
      fireWeapon();
    }

    // projectiles
    for (let i = projectiles.length - 1; i >= 0; i--) {
      const p = projectiles[i];
      p.x += p.vx * dt; p.y += p.vy * dt;
      if (p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20) { projectiles.splice(i, 1); continue; }
    }

    // enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];
      if (e.orbCooldown > 0) e.orbCooldown -= dt;
      const ang = Math.atan2(player.y - e.y, player.x - e.x);
      e.x += Math.cos(ang) * e.speed * dt;
      e.y += Math.sin(ang) * e.speed * dt;
      e.facingAngle = ang;

      // hit player
      if (dist(e, player) < e.r + player.r && player.invuln <= 0) {
        player.hp -= e.damage;
        player.invuln = 0.6;
        shake = Math.min(shake + 8, 20);
        spawnParticles(player.x, player.y, '#ff5555', 8);
        sfx.hurt();
        if (player.hp <= 0) { player.hp = 0; endGame(); }
      }

      // hit by projectiles
      for (let j = projectiles.length - 1; j >= 0; j--) {
        const p = projectiles[j];
        if (p.hits.has(e)) continue;
        if (dist(p, e) < p.r + e.r) {
          e.hp -= p.damage;
          p.hits.add(e);
          floatingTexts.push({ x: e.x, y: e.y - e.r, text: Math.round(p.damage).toString(), life: 0.5, color: '#fff' });
          spawnParticles(p.x, p.y, e.color, 4);
          sfx.hit();
          if (p.pierce <= 0 || p.hits.size > p.pierce) {
            projectiles.splice(j, 1);
          }
          if (e.hp <= 0) {
            killEnemy(e);
            if (player.explosiveRadius > 0) explodeAt(e.x, e.y, player.explosiveRadius, player.damage * 0.5, e);
          }
          break;
        }
      }
    }

    // gems
    for (let i = gems.length - 1; i >= 0; i--) {
      const g = gems[i];
      const d = dist(g, player);
      if (d < player.magnet) {
        const ang = Math.atan2(player.y - g.y, player.x - g.x);
        const pull = clamp((player.magnet - d) * 6, 60, 520);
        g.x += Math.cos(ang) * pull * dt;
        g.y += Math.sin(ang) * pull * dt;
      }
      if (d < player.r + g.r + 4) {
        gainXp(g.value);
        gems.splice(i, 1);
        sfx.pickup();
      }
    }

    // shockwaves (explosion visuals)
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const s = shockwaves[i];
      s.life -= dt;
      s.r = s.maxR * (1 - s.life / s.maxLife);
      if (s.life <= 0) shockwaves.splice(i, 1);
    }

    // particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const pt = particles[i];
      pt.x += pt.vx * dt; pt.y += pt.vy * dt;
      pt.vx *= 0.9; pt.vy *= 0.9;
      pt.life -= dt;
      if (pt.life <= 0) particles.splice(i, 1);
    }

    // floating texts
    for (let i = floatingTexts.length - 1; i >= 0; i--) {
      const f = floatingTexts[i];
      f.y -= 30 * dt;
      f.life -= dt;
      if (f.life <= 0) floatingTexts.splice(i, 1);
    }
  }

  function updateHud() {
    hpFill.style.width = `${clamp((player.hp / player.maxHp) * 100, 0, 100)}%`;
    hpText.textContent = `${Math.max(0, Math.round(player.hp))}/${player.maxHp}`;
    xpFill.style.width = `${clamp((player.xp / player.xpNeeded) * 100, 0, 100)}%`;
    lvlText.textContent = `Lv ${player.level}`;
    const mins = Math.floor(elapsed / 60);
    const secs = Math.floor(elapsed % 60);
    timerEl.textContent = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
    killsEl.textContent = `Düşman: ${killCount}`;
  }

  function draw() {
    ctx.save();
    ctx.clearRect(0, 0, W, H);

    // starfield background (twinkles gently, unaffected by shake for depth)
    for (const s of stars) {
      s.tw += 0.02;
      ctx.globalAlpha = 0.35 + Math.sin(s.tw) * 0.25;
      ctx.fillStyle = '#8aa0d6';
      ctx.fillRect(s.x, s.y, s.r, s.r);
    }
    ctx.globalAlpha = 1;

    // crescent moon
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,244,214,0.85)';
    ctx.arc(W * 0.15, 70, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = '#0a0a12';
    ctx.arc(W * 0.15 + 11, 62, 22, 0, Math.PI * 2);
    ctx.fill();

    // Bosphorus bridge silhouette
    const bx1 = W * 0.32, bx2 = W * 0.68, bTop = H - 190, bBase = H - 40;
    ctx.strokeStyle = 'rgba(190,205,255,0.22)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(bx1, bBase); ctx.lineTo(bx1, bTop); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(bx2, bBase); ctx.lineTo(bx2, bTop); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(bx1, bTop);
    ctx.quadraticCurveTo(W / 2, bTop - 55, bx2, bTop);
    ctx.stroke();

    // city skyline silhouette (fixed shapes, low contrast so gameplay stays readable)
    for (const b of buildings) {
      ctx.fillStyle = '#14162c';
      ctx.fillRect(b.x, H - b.h, b.w, b.h);
      if (b.lit) {
        ctx.fillStyle = 'rgba(255,209,102,0.4)';
        ctx.fillRect(b.x + b.w * 0.35, H - b.h + b.litY, 3, 3);
      }
    }

    if (shake > 0) {
      ctx.translate(rand(-shake, shake), rand(-shake, shake));
    }

    // shockwaves (explosion rings)
    for (const s of shockwaves) {
      ctx.globalAlpha = clamp(s.life / s.maxLife, 0, 1) * 0.6;
      ctx.strokeStyle = '#ff8c42';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // gems
    for (const g of gems) {
      ctx.beginPath();
      ctx.fillStyle = '#6bc9ff';
      ctx.shadowColor = '#6bc9ff';
      ctx.shadowBlur = 8;
      ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // enemies — each archetype gets its own silhouette so the swarm reads at a glance
    for (const e of enemies) {
      if (e.boss) {
        // crown of long spikes, slowly rotating, tips poking out from under the body
        drawSpikeRing(e.x, e.y, e.r * 0.7, 8, 14, 6, elapsed * 0.4 + e.spikePhase, e.colorDark);

        const pulse = 4 + Math.sin(elapsed * 6) * 3;
        const grad = ctx.createRadialGradient(e.x - e.r * 0.3, e.y - e.r * 0.3, e.r * 0.1, e.x, e.y, e.r);
        grad.addColorStop(0, e.colorLight);
        grad.addColorStop(0.6, e.color);
        grad.addColorStop(1, e.colorDark);
        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.shadowColor = e.color;
        ctx.shadowBlur = 14 + pulse;
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // glowing core eye
        const eyePulse = 0.55 + Math.sin(elapsed * 4) * 0.25;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${eyePulse})`;
        ctx.shadowColor = e.colorLight;
        ctx.shadowBlur = 10;
        ctx.arc(e.x, e.y, e.r * 0.22, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      } else if (e.maxHp > 20) {
        // brute: armored gradient body with rim plates
        const grad = ctx.createRadialGradient(e.x - e.r * 0.3, e.y - e.r * 0.3, e.r * 0.1, e.x, e.y, e.r);
        grad.addColorStop(0, e.colorLight);
        grad.addColorStop(0.6, e.color);
        grad.addColorStop(1, e.colorDark);
        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = e.colorDark;
        ctx.lineWidth = 2;
        ctx.stroke();
        drawRimPlates(e.x, e.y, e.r, 6, 7, e.spikePhase, e.colorDark);
      } else {
        // mite: small spiky body with a dark eye facing its target
        drawSpikeRing(e.x, e.y, e.r * 0.6, 5, 5, 2, elapsed * 1.6 + e.spikePhase, e.colorDark);
        ctx.beginPath();
        ctx.fillStyle = e.color;
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = e.colorDark;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = e.colorDark;
        ctx.arc(e.x + Math.cos(e.facingAngle) * e.r * 0.35, e.y + Math.sin(e.facingAngle) * e.r * 0.35, e.r * 0.24, 0, Math.PI * 2);
        ctx.fill();
      }
      // hp bar for tanky/boss
      if (e.boss || e.maxHp > 20) {
        const w = e.r * 2;
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(e.x - w / 2, e.y - e.r - 10, w, 4);
        ctx.fillStyle = '#ff5555';
        ctx.fillRect(e.x - w / 2, e.y - e.r - 10, w * clamp(e.hp / e.maxHp, 0, 1), 4);
      }
    }

    // projectiles
    for (const p of projectiles) {
      ctx.beginPath();
      ctx.fillStyle = '#ffd166';
      ctx.shadowColor = '#ffd166';
      ctx.shadowBlur = 6;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // particles
    for (const pt of particles) {
      ctx.globalAlpha = clamp(pt.life / pt.maxLife, 0, 1);
      ctx.fillStyle = pt.color;
      ctx.fillRect(pt.x - 2, pt.y - 2, 4, 4);
    }
    ctx.globalAlpha = 1;

    // orbit shield
    if (player && player.orbCount > 0) {
      for (let k = 0; k < player.orbCount; k++) {
        const a = player.orbAngle + (k * Math.PI * 2) / player.orbCount;
        const ox = player.x + Math.cos(a) * player.orbRadius;
        const oy = player.y + Math.sin(a) * player.orbRadius;
        ctx.beginPath();
        ctx.fillStyle = '#c084fc';
        ctx.shadowColor = '#c084fc';
        ctx.shadowBlur = 10;
        ctx.arc(ox, oy, 8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    // player — layered glowing orb with a spinning containment ring and a facing chevron
    if (player) {
      const hit = player.invuln > 0;

      // spinning dashed containment ring (player's own identity marker)
      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.rotate(player.ringSpin);
      ctx.beginPath();
      ctx.strokeStyle = hit ? 'rgba(255,255,255,0.7)' : 'rgba(134,239,172,0.55)';
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 5]);
      ctx.arc(0, 0, player.r + 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // gradient body for a glassy, 3D orb look
      const grad = ctx.createRadialGradient(
        player.x - player.r * 0.3, player.y - player.r * 0.3, player.r * 0.15,
        player.x, player.y, player.r
      );
      if (hit) {
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(1, '#eafff1');
      } else {
        grad.addColorStop(0, '#d4ffe3');
        grad.addColorStop(0.55, '#4ade80');
        grad.addColorStop(1, '#15803d');
      }
      ctx.beginPath();
      ctx.fillStyle = grad;
      ctx.shadowColor = '#4ade80';
      ctx.shadowBlur = 14;
      ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // specular highlight
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.ellipse(player.x - player.r * 0.32, player.y - player.r * 0.35, player.r * 0.3, player.r * 0.18, -0.6, 0, Math.PI * 2);
      ctx.fill();

      // facing chevron
      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.rotate(player.facingAngle);
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.moveTo(player.r + 6, 0);
      ctx.lineTo(player.r - 4, -5);
      ctx.lineTo(player.r - 4, 5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // floating texts
    for (const f of floatingTexts) {
      ctx.globalAlpha = clamp(f.life / (f.big ? 2.2 : 0.5), 0, 1);
      ctx.fillStyle = f.color;
      ctx.font = f.big ? 'bold 26px sans-serif' : 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(f.text, f.x, f.y);
    }
    ctx.globalAlpha = 1;

    ctx.restore();

    // vignette (drawn without shake offset, screen-space)
    const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 0.75);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(1, 'rgba(0,0,0,0.45)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);
  }

  function loop(time) {
    const dt = Math.min((time - lastTime) / 1000, 0.05) || 0;
    lastTime = time;

    if (state === 'playing') {
      update(dt);
      updateHud();
    }
    draw();

    requestAnimationFrame(loop);
  }

  startBtn.addEventListener('click', () => {
    ensureAudio();
    requestFullscreenSafe();
    resetGame();
    startScreen.classList.add('hidden');
    state = 'playing';
    lastTime = performance.now();
  });

  restartBtn.addEventListener('click', () => {
    ensureAudio();
    resetGame();
    gameoverScreen.classList.add('hidden');
    recordBadge.classList.add('hidden');
    showBestOnStart();
    showAkceOnStart();
    state = 'playing';
    lastTime = performance.now();
  });

  requestAnimationFrame(loop);
})();
