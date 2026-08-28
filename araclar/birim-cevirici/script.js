"use strict";

const UNITS = {
  uzunluk: {
    label: "Uzunluk",
    base: "m",
    factors: { mm: 0.001, cm: 0.01, m: 1, km: 1000, inc: 0.0254, fit: 0.3048, mil: 1609.344 },
    names: { mm: "Milimetre (mm)", cm: "Santimetre (cm)", m: "Metre (m)", km: "Kilometre (km)", inc: "İnç (in)", fit: "Fit (ft)", mil: "Mil (mi)" },
  },
  agirlik: {
    label: "Ağırlık",
    base: "g",
    factors: { mg: 0.001, g: 1, kg: 1000, ton: 1000000, ons: 28.3495, lb: 453.592 },
    names: { mg: "Miligram (mg)", g: "Gram (g)", kg: "Kilogram (kg)", ton: "Ton (t)", ons: "Ons (oz)", lb: "Pound (lb)" },
  },
  sicaklik: {
    label: "Sıcaklık",
    factors: null,
    names: { c: "Santigrat (°C)", f: "Fahrenayt (°F)", k: "Kelvin (K)" },
  },
};

const kategoriEl = document.getElementById("kategori");
const degerEl = document.getElementById("deger");
const fromEl = document.getElementById("from-unit");
const toEl = document.getElementById("to-unit");
const sonucEl = document.getElementById("sonuc-value");
const swapBtn = document.getElementById("swap-btn");

function populateUnits(category, defaultFrom, defaultTo) {
  const def = UNITS[category];
  const keys = Object.keys(def.names);
  fromEl.innerHTML = keys.map((k) => `<option value="${k}">${def.names[k]}</option>`).join("");
  toEl.innerHTML = keys.map((k) => `<option value="${k}">${def.names[k]}</option>`).join("");
  fromEl.value = defaultFrom || keys[0];
  toEl.value = defaultTo || keys[1] || keys[0];
}

function toCelsius(value, unit) {
  if (unit === "c") return value;
  if (unit === "f") return ((value - 32) * 5) / 9;
  return value - 273.15; // k
}

function fromCelsius(celsius, unit) {
  if (unit === "c") return celsius;
  if (unit === "f") return (celsius * 9) / 5 + 32;
  return celsius + 273.15; // k
}

function convert() {
  const category = kategoriEl.value;
  const value = Number(degerEl.value);
  const from = fromEl.value;
  const to = toEl.value;

  if (degerEl.value === "" || Number.isNaN(value)) {
    sonucEl.textContent = "—";
    return;
  }

  let result;
  if (category === "sicaklik") {
    result = fromCelsius(toCelsius(value, from), to);
  } else {
    const def = UNITS[category];
    const base = value * def.factors[from];
    result = base / def.factors[to];
  }

  sonucEl.textContent = result.toLocaleString("tr-TR", { maximumFractionDigits: 6 }) + " " + UNITS[category].names[to].split("(")[1].replace(")", "");
}

kategoriEl.addEventListener("change", () => {
  const defaults = {
    uzunluk: ["m", "km"],
    agirlik: ["kg", "lb"],
    sicaklik: ["c", "f"],
  }[kategoriEl.value];
  populateUnits(kategoriEl.value, defaults[0], defaults[1]);
  convert();
});

swapBtn.addEventListener("click", () => {
  const f = fromEl.value;
  fromEl.value = toEl.value;
  toEl.value = f;
  convert();
});

[degerEl, fromEl, toEl].forEach((el) => el.addEventListener("input", convert));
[fromEl, toEl].forEach((el) => el.addEventListener("change", convert));

populateUnits("uzunluk", "m", "km");
convert();
