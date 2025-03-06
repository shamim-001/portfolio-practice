export function LoadingState() {
  return (
    <div className="container py-12 animate-in fade-in duration-500" aria-busy="true" aria-label="Loading content">
      <div className="space-y-8 max-w-3xl mx-auto">
        <div className="h-8 w-[60%] animate-pulse rounded-md bg-muted" />
        <div className="space-y-4">
          <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-[90%] animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-[80%] animate-pulse rounded-md bg-muted" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg border p-4 space-y-3">
              <div className="aspect-video w-full animate-pulse rounded-md bg-muted" />
              <div className="h-6 w-[70%] animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-[90%] animate-pulse rounded-md bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

