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

  const keys = {};
  window.addEventListener('keydown', e => { keys[e.key.toLowerCase()] = true; });
  window.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

  const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const rand = (min, max) => min + Math.random() * (max - min);
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  let state = 'menu'; // menu | playing | levelup | gameover
  let elapsed = 0;
  let killCount = 0;
  let lastTime = 0;
  let shake = 0;

  let player = null;
  let enemies = [], projectiles = [], gems = [], particles = [], floatingTexts = [];
  let spawnTimer = 0, bossTimer = 0, fireTimer = 0;

  const UPGRADES = [
    { id: 'dmg', name: 'Güç Artışı', icon: '⚔️', desc: 'Hasar +25%', apply: p => p.damage *= 1.25 },
    { id: 'rate', name: 'Çılgın Hız', icon: '⚡', desc: 'Ateş hızı +20%', apply: p => p.fireRate *= 0.8 },
    { id: 'speed', name: 'Rüzgar Ayak', icon: '👟', desc: 'Hareket hızı +12%', apply: p => p.speed *= 1.12 },
    { id: 'hp', name: 'Zırh', icon: '🛡️', desc: 'Maks can +25, iyileş', apply: p => { p.maxHp += 25; p.hp = p.maxHp; } },
    { id: 'multi', name: 'Çoklu Atış', icon: '🔱', desc: '+1 mermi', apply: p => p.projCount += 1 },
    { id: 'pierce', name: 'Delici Mermi', icon: '🎯', desc: '+1 delme', apply: p => p.pierce += 1 },
    { id: 'magnet', name: 'Mıknatıs', icon: '🧲', desc: 'Toplama menzili +60', apply: p => p.magnet += 60 },
    { id: 'heal', name: 'Şifa', icon: '❤️', desc: 'Canı tamamen doldur', apply: p => { p.hp = p.maxHp; } },
  ];

  function newPlayer() {
    return {
      x: W / 2, y: H / 2, r: 14,
      hp: 100, maxHp: 100,
      speed: 220,
      damage: 12,
      fireRate: 0.55, // seconds between shots
      projCount: 1,
      pierce: 0,
      magnet: 70,
      level: 1, xp: 0, xpNeeded: 10,
      invuln: 0,
    };
  }

  function resetGame() {
    player = newPlayer();
    enemies = [];
    projectiles = [];
    gems = [];
    particles = [];
    floatingTexts = [];
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
    if (isBoss) {
      enemies.push({
        x, y, r: 34,
        hp: 220 + t * 140, maxHp: 220 + t * 140,
        speed: 55, damage: 26,
        color: '#b83bff', boss: true, xpValue: 12,
      });
      shake = 18;
      floatingTexts.push({ x: W / 2, y: 60, text: 'BÜYÜK TEHDİT YAKLAŞIYOR', life: 2.2, big: true, color: '#b83bff' });
    } else {
      const tank = Math.random() < clamp(0.15 + t * 0.03, 0.15, 0.4);
      if (tank) {
        enemies.push({
          x, y, r: 20,
          hp: 40 + t * 18, maxHp: 40 + t * 18,
          speed: 60, damage: 14,
          color: '#ff8c42', xpValue: 3,
        });
      } else {
        enemies.push({
          x, y, r: 11,
          hp: 12 + t * 6, maxHp: 12 + t * 6,
          speed: rand(95, 130), damage: 8,
          color: '#ff5555', xpValue: 1,
        });
      }
    }
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
    const mins = Math.floor(elapsed / 60);
    const secs = Math.floor(elapsed % 60);
    finalStats.textContent = `Süre: ${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')} — Seviye: ${player.level} — Düşman: ${killCount}`;
    gameoverScreen.classList.remove('hidden');
  }

  function update(dt) {
    elapsed += dt;
    fireTimer -= dt;
    spawnTimer -= dt;
    bossTimer -= dt;
    if (player.invuln > 0) player.invuln -= dt;
    if (shake > 0) shake = Math.max(0, shake - dt * 40);

    // movement
    let dx = 0, dy = 0;
    if (keys['w'] || keys['arrowup']) dy -= 1;
    if (keys['s'] || keys['arrowdown']) dy += 1;
    if (keys['a'] || keys['arrowleft']) dx -= 1;
    if (keys['d'] || keys['arrowright']) dx += 1;
    if (dx || dy) {
      const len = Math.hypot(dx, dy);
      player.x = clamp(player.x + (dx / len) * player.speed * dt, player.r, W - player.r);
      player.y = clamp(player.y + (dy / len) * player.speed * dt, player.r, H - player.r);
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
      const ang = Math.atan2(player.y - e.y, player.x - e.x);
      e.x += Math.cos(ang) * e.speed * dt;
      e.y += Math.sin(ang) * e.speed * dt;

      // hit player
      if (dist(e, player) < e.r + player.r && player.invuln <= 0) {
        player.hp -= e.damage;
        player.invuln = 0.6;
        shake = Math.min(shake + 8, 20);
        spawnParticles(player.x, player.y, '#ff5555', 8);
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
          if (p.pierce <= 0 || p.hits.size > p.pierce) {
            projectiles.splice(j, 1);
          }
          if (e.hp <= 0) {
            killCount++;
            spawnParticles(e.x, e.y, e.color, e.boss ? 26 : 12);
            gems.push({ x: e.x, y: e.y, r: 6, value: e.xpValue });
            enemies.splice(i, 1);
            if (e.boss) shake = Math.min(shake + 16, 24);
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
      }
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

    if (shake > 0) {
      ctx.translate(rand(-shake, shake), rand(-shake, shake));
    }

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

    // enemies
    for (const e of enemies) {
      ctx.beginPath();
      ctx.fillStyle = e.color;
      ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
      ctx.fill();
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

    // player
    if (player) {
      ctx.beginPath();
      ctx.fillStyle = player.invuln > 0 ? '#ffffff' : '#4ade80';
      ctx.shadowColor = '#4ade80';
      ctx.shadowBlur = 10;
      ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
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
    resetGame();
    startScreen.classList.add('hidden');
    state = 'playing';
  });

  restartBtn.addEventListener('click', () => {
    resetGame();
    gameoverScreen.classList.add('hidden');
    state = 'playing';
  });

  requestAnimationFrame(loop);
})();
