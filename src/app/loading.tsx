export default function Loading() {
  return (
    <div
      className="content-shell min-h-[65vh] py-20"
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      <span className="sr-only">Loading page</span>
      <div className="animate-pulse space-y-7">
        <div className="h-3 w-32 rounded-full bg-mineral/20" />
        <div className="h-20 max-w-3xl rounded-2xl bg-paper" />
        <div className="h-5 max-w-xl rounded-full bg-ink/10" />
        <div className="grid gap-5 pt-10 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-56 rounded-2xl bg-paper" />
          ))}
        </div>
      </div>
    </div>
  );
}
