export type Side = "T" | "CT";
export type Category = "Smoke" | "Flash" | "Molotov" | "Peek";
export type Zone = "A Site" | "Mid" | "B Site";

export interface Lineup {
  id: string;
  zone: Zone;
  category: Category;
  side: Side;
  title: string;
  from: string;
  to: string;
  technique: string;
  aim: string;
  /** YouTube video id — dolu değilse "video yakında" gösterilir */
  videoId?: string;
  notes?: string;
}
