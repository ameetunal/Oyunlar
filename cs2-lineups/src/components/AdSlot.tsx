/**
 * Reklam alanı placeholder'ı. Google AdSense onayı alındığında
 * buraya gerçek <ins class="adsbygoogle"> etiketi ve script eklenecek.
 */
export function AdSlot({ label = "Reklam alanı" }: { label?: string }) {
  return (
    <div className="flex h-24 w-full items-center justify-center rounded-lg border border-dashed border-zinc-800 text-xs text-zinc-600">
      {label}
    </div>
  );
}
