"use strict";

const metinEl = document.getElementById("metin");
const els = {
  karakterBosluklu: document.getElementById("karakter-bosluklu"),
  karakterBosluksuz: document.getElementById("karakter-bosluksuz"),
  kelime: document.getElementById("kelime"),
  cumle: document.getElementById("cumle"),
  paragraf: document.getElementById("paragraf"),
  okumaSuresi: document.getElementById("okuma-suresi"),
};

function update() {
  const text = metinEl.value;
  const trimmed = text.trim();

  const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
  const sentenceMatches = trimmed.match(/[^.!?]+[.!?]+/g);
  const sentences = trimmed === "" ? 0 : (sentenceMatches ? sentenceMatches.length : 1);
  const paragraphs = trimmed === "" ? 0 : trimmed.split(/\n+/).map((p) => p.trim()).filter(Boolean).length;
  const readingMinutes = words === 0 ? 0 : Math.max(1, Math.ceil(words / 200));

  els.karakterBosluklu.textContent = text.length.toLocaleString("tr-TR");
  els.karakterBosluksuz.textContent = text.replace(/\s/g, "").length.toLocaleString("tr-TR");
  els.kelime.textContent = words.toLocaleString("tr-TR");
  els.cumle.textContent = sentences.toLocaleString("tr-TR");
  els.paragraf.textContent = paragraphs.toLocaleString("tr-TR");
  els.okumaSuresi.textContent = `${readingMinutes} dk`;
}

document.getElementById("btn-buyuk").addEventListener("click", () => {
  metinEl.value = metinEl.value.toLocaleUpperCase("tr-TR");
  update();
});

document.getElementById("btn-kucuk").addEventListener("click", () => {
  metinEl.value = metinEl.value.toLocaleLowerCase("tr-TR");
  update();
});

document.getElementById("btn-baslik").addEventListener("click", () => {
  metinEl.value = metinEl.value
    .toLocaleLowerCase("tr-TR")
    .replace(/(^|\s)\S/g, (c) => c.toLocaleUpperCase("tr-TR"));
  update();
});

document.getElementById("btn-temizle").addEventListener("click", () => {
  metinEl.value = "";
  update();
});

metinEl.addEventListener("input", update);
update();
