"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { mirageLineups } from "@/data/mirage-lineups";
import { LineupCard } from "@/components/LineupCard";
import { FilterBar } from "@/components/FilterBar";
import { AdSlot } from "@/components/AdSlot";
import { Category, Side, Zone } from "@/types/lineup";

const zones: readonly Zone[] = ["A Site", "Mid", "B Site"];
const categories: readonly Category[] = ["Smoke", "Flash", "Molotov", "Peek"];
const sides: readonly Side[] = ["T", "CT"];

export default function MiragePage() {
  const [zone, setZone] = useState<Zone | "Hepsi">("Hepsi");
  const [category, setCategory] = useState<Category | "Hepsi">("Hepsi");
  const [side, setSide] = useState<Side | "Hepsi">("Hepsi");

  const filtered = useMemo(() => {
    return mirageLineups.filter(
      (l) =>
        (zone === "Hepsi" || l.zone === zone) &&
        (category === "Hepsi" || l.category === category) &&
        (side === "Hepsi" || l.side === side),
    );
  }, [zone, category, side]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-300">
            ← Haritalar
          </Link>
          <h1 className="text-2xl font-bold text-zinc-50">Mirage Lineup&apos;ları</h1>
          <p className="text-sm text-zinc-400">
            {mirageLineups.length} lineup · smoke, flash ve peek pozisyonları
          </p>
        </div>
      </div>

      <AdSlot />

      <div className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 sm:flex-row sm:flex-wrap sm:gap-8">
        <FilterBar label="Bölge" options={zones} active={zone} onChange={setZone} />
        <FilterBar
          label="Kategori"
          options={categories}
          active={category}
          onChange={setCategory}
        />
        <FilterBar label="Taraf" options={sides} active={side} onChange={setSide} />
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-zinc-500">
          Bu filtrelere uyan lineup yok.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((lineup) => (
            <LineupCard key={lineup.id} lineup={lineup} />
          ))}
        </div>
      )}

      <AdSlot />
    </div>
  );
}
