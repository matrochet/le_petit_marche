export default function RootLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 animate-pulse">
      <div className="h-8 w-52 bg-black/10 dark:bg-white/10 rounded mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-3">
            <div className="aspect-[4/3] w-full bg-black/10 dark:bg-white/10 rounded" />
            <div className="mt-3 h-4 w-3/5 bg-black/10 dark:bg-white/10 rounded" />
            <div className="mt-2 h-3 w-2/5 bg-black/10 dark:bg-white/10 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
