import fs from "fs";

export interface KaliteKararlariMapping {
  table: string;
  idColumn: string;
  tezgahColumn: string;
  durumColumn: string;
  isKoduColumn: string;
  isAdiColumn: string;
  timestampColumn: string;
}

export interface DuruslarMapping {
  table: string;
  idColumn: string;
  tezgahColumn: string;
  nedenColumn: string;
  sureDakikaColumn: string;
  timestampColumn: string;
  uzunDurusEsikDakika: number;
}

export interface IslerMapping {
  table: string;
  idColumn: string;
  tezgahColumn: string;
  durumColumn: string;
  isKoduColumn: string;
  isAdiColumn: string;
  tahminiBitisColumn: string;
  timestampColumn: string;
}

export interface Mapping {
  kaliteKararlari: KaliteKararlariMapping;
  duruslar: DuruslarMapping;
  isler: IslerMapping;
}

export function loadMapping(): Mapping {
  const file = process.env.MAPPING_FILE ?? "./mapping.json";
  if (!fs.existsSync(file)) {
    throw new Error(
      `Eşleştirme dosyası bulunamadı: ${file}. mapping.example.json dosyasını ` +
        `gerçek tablo/kolon isimlerinizle düzenleyip mapping.json olarak kaydedin.`
    );
  }
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}
