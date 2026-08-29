import { Lineup } from "@/types/lineup";

const categoryStyle: Record<Lineup["category"], string> = {
  Smoke: "bg-slate-700 text-slate-100",
  Flash: "bg-yellow-500 text-yellow-950",
  Molotov: "bg-orange-600 text-orange-50",
  Peek: "bg-sky-600 text-sky-50",
};

const sideStyle: Record<Lineup["side"], string> = {
  T: "bg-amber-800/20 text-amber-300 border-amber-800/40",
  CT: "bg-blue-800/20 text-blue-300 border-blue-800/40",
};

export function LineupCard({ lineup }: { lineup: Lineup }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
      <div className="aspect-video w-full bg-black">
        {lineup.videoId ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${lineup.videoId}`}
            title={lineup.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-zinc-500">
            <span className="text-sm">Video yakında eklenecek</span>
            <span className="text-xs text-zinc-600">
              Aşağıdaki açıklamayı kullanarak dener misin?
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`rounded px-2 py-0.5 text-xs font-semibold ${categoryStyle[lineup.category]}`}
          >
            {lineup.category}
          </span>
          <span
            className={`rounded border px-2 py-0.5 text-xs font-semibold ${sideStyle[lineup.side]}`}
          >
            {lineup.side}
          </span>
          <span className="text-xs text-zinc-500">{lineup.zone}</span>
        </div>

        <h3 className="text-base font-semibold text-zinc-50">{lineup.title}</h3>
        <p className="text-xs text-zinc-400">
          {lineup.from} <span className="text-zinc-600">→</span> {lineup.to}
        </p>

        <div className="mt-1 space-y-1.5 text-sm text-zinc-300">
          <p>
            <span className="font-medium text-zinc-200">Atış: </span>
            {lineup.technique}
          </p>
          <p>
            <span className="font-medium text-zinc-200">Nişan: </span>
            {lineup.aim}
          </p>
        </div>

        {lineup.notes && (
          <p className="mt-auto pt-2 text-xs text-zinc-500">{lineup.notes}</p>
        )}
      </div>
    </div>
  );
}
