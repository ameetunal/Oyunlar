"use strict";

const anaparaEl = document.getElementById("anapara");
const faizEl = document.getElementById("faiz");
const vadeEl = document.getElementById("vade");
const resultEl = document.getElementById("result");
const taksitValueEl = document.getElementById("taksit-value");
const toplamValueEl = document.getElementById("toplam-value");
const faizValueEl = document.getElementById("faiz-value");

function formatTL(n) {
  return n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₺";
}

function calculate() {
  const P = Number(anaparaEl.value);
  const ratePct = Number(faizEl.value);
  const n = Number(vadeEl.value);

  if (!anaparaEl.value || !vadeEl.value || faizEl.value === "" || P <= 0 || n <= 0 || ratePct < 0) {
    resultEl.style.display = "none";
    return;
  }

  const r = ratePct / 100;
  let taksit;
  if (r === 0) {
    taksit = P / n;
  } else {
    const factor = Math.pow(1 + r, n);
    taksit = (P * r * factor) / (factor - 1);
  }

  const toplam = taksit * n;
  const toplamFaiz = toplam - P;

  taksitValueEl.textContent = formatTL(taksit);
  toplamValueEl.textContent = formatTL(toplam);
  faizValueEl.textContent = formatTL(toplamFaiz);
  resultEl.style.display = "block";
}

[anaparaEl, faizEl, vadeEl].forEach((el) => el.addEventListener("input", calculate));
