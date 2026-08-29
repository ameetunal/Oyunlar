"use client";

interface FilterBarProps<T extends string> {
  label: string;
  options: readonly T[];
  active: T | "Hepsi";
  onChange: (value: T | "Hepsi") => void;
}

export function FilterBar<T extends string>({
  label,
  options,
  active,
  onChange,
}: FilterBarProps<T>) {
  const all: (T | "Hepsi")[] = ["Hepsi", ...options];

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {all.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              active === option
                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
