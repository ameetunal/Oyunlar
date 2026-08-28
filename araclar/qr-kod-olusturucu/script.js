"use strict";

const metinEl = document.getElementById("metin");
const boyutEl = document.getElementById("boyut");
const seviyeEl = document.getElementById("seviye");
const qrContainer = document.getElementById("qrcode");
const downloadBtn = document.getElementById("download-btn");

const LEVELS = {
  L: QRCode.CorrectLevel.L,
  M: QRCode.CorrectLevel.M,
  Q: QRCode.CorrectLevel.Q,
  H: QRCode.CorrectLevel.H,
};

let debounceTimer = null;

function render() {
  const text = metinEl.value.trim() || " ";
  const size = Number(boyutEl.value);

  qrContainer.innerHTML = "";
  new QRCode(qrContainer, {
    text,
    width: size,
    height: size,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: LEVELS[seviyeEl.value],
  });
}

function scheduleRender() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(render, 150);
}

downloadBtn.addEventListener("click", () => {
  const canvas = qrContainer.querySelector("canvas");
  const img = qrContainer.querySelector("img");
  const dataUrl = canvas ? canvas.toDataURL("image/png") : img ? img.src : null;
  if (!dataUrl) return;

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "qr-kod.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

metinEl.addEventListener("input", scheduleRender);
boyutEl.addEventListener("change", render);
seviyeEl.addEventListener("change", render);

render();
