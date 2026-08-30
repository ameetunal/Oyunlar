"use strict";

const tutarEl = document.getElementById("tutar");
const oranEl = document.getElementById("oran");
const customOranWrap = document.getElementById("custom-oran-wrap");
const customOranEl = document.getElementById("custom-oran");
const resultEl = document.getElementById("result");
const baseLabelEl = document.getElementById("base-label");
const baseValueEl = document.getElementById("base-value");
const kdvValueEl = document.getElementById("kdv-value");
const totalLabelEl = document.getElementById("total-label");
const totalValueEl = document.getElementById("total-value");

function currentMode() {
  return document.querySelector('input[name="mode"]:checked').value;
}

function currentRate() {
  if (oranEl.value === "custom") {
    return Number(customOranEl.value) || 0;
  }
  return Number(oranEl.value);
}

function formatTL(n) {
  return n.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₺";
}

function calculate() {
  const tutar = Number(tutarEl.value);
  const oran = currentRate();

  if (!tutarEl.value || Number.isNaN(tutar) || tutar < 0) {
    resultEl.style.display = "none";
    return;
  }

  const mode = currentMode();
  let base, kdv, total;

  if (mode === "netToGross") {
    base = tutar;
    kdv = base * (oran / 100);
    total = base + kdv;
    baseLabelEl.textContent = "KDV Hariç Tutar";
    totalLabelEl.textContent = "KDV Dahil Toplam";
  } else {
    total = tutar;
    base = total / (1 + oran / 100);
    kdv = total - base;
    baseLabelEl.textContent = "KDV Hariç Tutar";
    totalLabelEl.textContent = "Girilen (KDV Dahil) Tutar";
  }

  baseValueEl.textContent = formatTL(base);
  kdvValueEl.textContent = formatTL(kdv);
  totalValueEl.textContent = formatTL(total);
  resultEl.style.display = "block";
}

document.querySelectorAll('input[name="mode"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    document.querySelectorAll(".radio-chip").forEach((chip) => chip.classList.remove("active"));
    radio.closest(".radio-chip").classList.add("active");
    calculate();
  });
});

oranEl.addEventListener("change", () => {
  customOranWrap.style.display = oranEl.value === "custom" ? "block" : "none";
  calculate();
});

tutarEl.addEventListener("input", calculate);
customOranEl.addEventListener("input", calculate);
