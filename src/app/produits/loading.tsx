export default function Loading() {
  return (
    <div className="min-h-screen">
      <div className="mb-6">
        <div className="h-8 w-56 bg-black/10 rounded animate-pulse" />
        <div className="mt-2 h-4 w-64 bg-black/10 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white border border-emerald-100 rounded-lg shadow-sm overflow-hidden">
            <div className="w-full h-48 bg-black/10 animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-5 w-3/4 bg-black/10 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-black/10 rounded animate-pulse" />
              <div className="h-6 w-24 bg-black/10 rounded animate-pulse mt-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
