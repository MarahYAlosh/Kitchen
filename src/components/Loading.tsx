export default function Loading() {
  return (
    <section className="container mx-auto px-2 min-h-[70vh] flex justify-center items-center">
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-16 h-16">
          <div
            className="absolute inset-0 rounded-full animate-spin"
            style={{
              border: "3px solid transparent",
              borderTopColor: "#f59e0b",
              borderRightColor: "#10b981",
            }}
          />
          <div
            className="absolute inset-2 rounded-full animate-spin"
            style={{
              border: "2px solid transparent",
              borderTopColor: "#10b981",
              animationDirection: "reverse",
              animationDuration: "0.8s",
            }}
          />
        </div>
        <span className="text-amber-400 font-semibold tracking-widest text-sm uppercase animate-pulse">
          Loading...
        </span>
      </div>
    </section>
  );
}
