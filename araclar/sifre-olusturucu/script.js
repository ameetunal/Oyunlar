"use strict";

const SETS = {
  buyuk: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  kucuk: "abcdefghijklmnopqrstuvwxyz",
  rakam: "0123456789",
  sembol: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

const uzunlukEl = document.getElementById("uzunluk");
const uzunlukDegerEl = document.getElementById("uzunluk-deger");
const outputEl = document.getElementById("output");
const copyBtn = document.getElementById("copy-btn");
const generateBtn = document.getElementById("generate-btn");
const strengthNoteEl = document.getElementById("strength-note");
const checkboxes = {
  buyuk: document.getElementById("buyuk"),
  kucuk: document.getElementById("kucuk"),
  rakam: document.getElementById("rakam"),
  sembol: document.getElementById("sembol"),
};

function randomInt(max) {
  const limit = Math.floor(0xffffffff / max) * max;
  const bytes = new Uint32Array(1);
  let x;
  do {
    crypto.getRandomValues(bytes);
    x = bytes[0];
  } while (x >= limit);
  return x % max;
}

function activePools() {
  return Object.keys(checkboxes)
    .filter((key) => checkboxes[key].checked)
    .map((key) => SETS[key]);
}

function strengthLabel(length, poolSize) {
  if (poolSize === 0) return { text: "", cls: "" };
  const entropy = length * Math.log2(poolSize);
  if (entropy < 40) return { text: "Zayıf", color: "var(--danger)" };
  if (entropy < 60) return { text: "Orta", color: "var(--accent)" };
  if (entropy < 80) return { text: "Güçlü", color: "var(--ok)" };
  return { text: "Çok Güçlü", color: "var(--neon)" };
}

function generate() {
  const length = Number(uzunlukEl.value);
  uzunlukDegerEl.textContent = length;

  const pools = activePools();
  if (pools.length === 0) {
    outputEl.value = "";
    strengthNoteEl.textContent = "En az bir karakter türü seçin.";
    return;
  }

  const fullPool = pools.join("");
  const chars = pools.map((p) => p[randomInt(p.length)]);
  while (chars.length < length) {
    chars.push(fullPool[randomInt(fullPool.length)]);
  }
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  outputEl.value = chars.slice(0, length).join("");

  const s = strengthLabel(length, fullPool.length);
  strengthNoteEl.innerHTML = `Tahmini güç: <strong style="color:${s.color}">${s.text}</strong>`;
}

copyBtn.addEventListener("click", async () => {
  if (!outputEl.value) return;
  await navigator.clipboard.writeText(outputEl.value);
  const original = copyBtn.textContent;
  copyBtn.textContent = "Kopyalandı ✓";
  setTimeout(() => (copyBtn.textContent = original), 1200);
});

generateBtn.addEventListener("click", generate);
uzunlukEl.addEventListener("input", generate);
Object.values(checkboxes).forEach((cb) => cb.addEventListener("change", generate));

generate();
