"use strict";

const dogumEl = document.getElementById("dogum-tarihi");
const resultEl = document.getElementById("result");
const statGridEl = document.getElementById("stat-grid");
const yasValueEl = document.getElementById("yas-value");
const toplamGunEl = document.getElementById("toplam-gun");
const toplamHaftaEl = document.getElementById("toplam-hafta");
const sonrakiDogumEl = document.getElementById("sonraki-dogum");
const haftaninGunuEl = document.getElementById("haftanin-gunu");

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function parseDateOnly(value) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function calculate() {
  if (!dogumEl.value) {
    resultEl.style.display = "none";
    statGridEl.style.display = "none";
    haftaninGunuEl.textContent = "";
    return;
  }

  const birth = parseDateOnly(dogumEl.value);
  const today = new Date();
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  if (birth > todayMidnight) {
    resultEl.style.display = "none";
    statGridEl.style.display = "none";
    haftaninGunuEl.textContent = "Doğum tarihi bugünden ileri bir tarih olamaz.";
    return;
  }

  let years = todayMidnight.getFullYear() - birth.getFullYear();
  let months = todayMidnight.getMonth() - birth.getMonth();
  let days = todayMidnight.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthLastDay = new Date(todayMidnight.getFullYear(), todayMidnight.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  yasValueEl.textContent = `${years} yıl, ${months} ay, ${days} gün`;
  resultEl.style.display = "block";

  const totalDays = Math.round((todayMidnight - birth) / MS_PER_DAY);
  toplamGunEl.textContent = totalDays.toLocaleString("tr-TR");
  toplamHaftaEl.textContent = Math.floor(totalDays / 7).toLocaleString("tr-TR");

  let nextBirthday = new Date(todayMidnight.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < todayMidnight) {
    nextBirthday = new Date(todayMidnight.getFullYear() + 1, birth.getMonth(), birth.getDate());
  }
  const daysUntil = Math.round((nextBirthday - todayMidnight) / MS_PER_DAY);
  sonrakiDogumEl.textContent = daysUntil === 0 ? "Bugün! 🎉" : `${daysUntil} gün`;

  statGridEl.style.display = "grid";

  const gunAdi = birth.toLocaleDateString("tr-TR", { weekday: "long" });
  haftaninGunuEl.textContent = `Doğduğunuz gün bir ${gunAdi} günüydü.`;
}

dogumEl.addEventListener("input", calculate);
dogumEl.addEventListener("change", calculate);
