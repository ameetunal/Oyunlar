// Web Audio ile anlık sentezlenen kısa ton geri bildirimi — indirilecek
// bir ses dosyası yok. Profil > Ayarlar'dan kapatılabilir (varsayılan
// açık). Tarayıcı Web Audio'yu desteklemiyorsa sessizce hiçbir şey yapmaz.
const SOUND_PREF_KEY = 'osmanli-quiz:sound-pref';

let audioCtx = null;

function getContext() {
  if (typeof window === 'undefined') return null;
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return null;
  if (!audioCtx) audioCtx = new Ctor();
  if (audioCtx.state === 'suspended') audioCtx.resume().catch(() => {});
  return audioCtx;
}

export function soundEnabled() {
  try {
    return window.localStorage.getItem(SOUND_PREF_KEY) !== 'off';
  } catch {
    return true;
  }
}

function playTone(ctx, { freq, start, duration, type = 'sine', gain = 0.12 }) {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
  gainNode.gain.setValueAtTime(0, ctx.currentTime + start);
  gainNode.gain.linearRampToValueAtTime(gain, ctx.currentTime + start + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + duration + 0.02);
}

export function playAnswerSound(isCorrect) {
  if (!soundEnabled()) return;
  const ctx = getContext();
  if (!ctx) return;
  try {
    if (isCorrect) {
      playTone(ctx, { freq: 880, start: 0, duration: 0.12 });
      playTone(ctx, { freq: 1175, start: 0.09, duration: 0.16 });
    } else {
      playTone(ctx, { freq: 220, start: 0, duration: 0.22, type: 'sawtooth', gain: 0.08 });
    }
  } catch {
    // ses altyapısı beklenmedik şekilde başarısız olursa sessizce geç
  }
}
