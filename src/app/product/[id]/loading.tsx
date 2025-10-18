export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square w-full bg-black/10 dark:bg-white/10 rounded" />
        <div>
          <div className="h-8 w-3/4 bg-black/10 dark:bg-white/10 rounded mb-4" />
          <div className="space-y-2">
            <div className="h-4 w-5/6 bg-black/10 dark:bg-white/10 rounded" />
            <div className="h-4 w-2/3 bg-black/10 dark:bg-white/10 rounded" />
            <div className="h-4 w-1/2 bg-black/10 dark:bg-white/10 rounded" />
          </div>
          <div className="mt-6 h-10 w-40 bg-black/10 dark:bg-white/10 rounded" />
        </div>
      </div>
    </div>
  );
}
