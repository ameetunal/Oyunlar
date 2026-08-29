import Link from "next/link";

const maps = [
  { slug: "mirage", name: "Mirage", ready: true },
  { slug: "dust2", name: "Dust II", ready: false },
  { slug: "inferno", name: "Inferno", ready: false },
  { slug: "ancient", name: "Ancient", ready: false },
];

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-zinc-50">CS2 Lineup Rehberi</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Harita seç, smoke / flash / peek pozisyonlarını videolarla öğren.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {maps.map((map) =>
          map.ready ? (
            <Link
              key={map.slug}
              href={`/${map.slug}`}
              className="flex aspect-video flex-col items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-lg font-semibold text-zinc-100 transition-colors hover:border-emerald-500 hover:text-emerald-400"
            >
              {map.name}
            </Link>
          ) : (
            <div
              key={map.slug}
              className="flex aspect-video flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-zinc-800 text-lg font-semibold text-zinc-600"
            >
              {map.name}
              <span className="text-xs font-normal text-zinc-700">Yakında</span>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
