export default function CartLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 animate-pulse">
      <div className="h-8 w-40 bg-black/10 dark:bg-white/10 rounded mb-6" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-4 border-b pb-4">
            <div className="w-40 h-28 bg-black/10 dark:bg-white/10 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 bg-black/10 dark:bg-white/10 rounded" />
              <div className="h-3 w-1/2 bg-black/10 dark:bg-white/10 rounded" />
              <div className="h-8 w-32 bg-black/10 dark:bg-white/10 rounded mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
