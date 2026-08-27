import fs from "fs";

/**
 * Her dedektörün "son gördüğüm kayıt neresiydi" bilgisini (watermark) tutar.
 * Böylece servis yeniden başlasa da aynı olayları tekrar bildirmez.
 */
export type State = Record<string, number | string | undefined>;

const STATE_FILE = process.env.STATE_FILE ?? "./state.json";

export function loadState(): State {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, "utf-8"));
  } catch {
    return {};
  }
}

export function saveState(state: State): void {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}
