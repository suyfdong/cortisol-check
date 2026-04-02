import Link from "next/link";
import { personaTypes } from "@/lib/data";
import { MeterPreview } from "@/components/MeterPreview";

export default function Home() {
  const previewTypes = [personaTypes[0], personaTypes[3], personaTypes[6]];

  return (
    <div className="flex flex-col items-center">
      {/* Hero */}
      <section className="relative w-full flex flex-col items-center justify-center px-4 pt-16 pb-12 md:pt-24 md:pb-20 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-neon-green/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-neon-purple/5 blur-[100px] pointer-events-none" />

        {/* Meter animation */}
        <div className="relative mb-8">
          <MeterPreview />
        </div>

        <h1 className="relative text-4xl md:text-6xl lg:text-7xl font-black text-center tracking-tight leading-[1.1]">
          <span className="block">What&apos;s Your</span>
          <span className="block bg-gradient-to-r from-neon-green via-neon-yellow to-neon-orange bg-clip-text text-transparent">
            Cortisol Level?
          </span>
        </h1>

        <p className="mt-5 text-muted text-base md:text-lg text-center max-w-md">
          The 30-second personality test the internet is obsessing over.
        </p>

        <Link
          href="/quiz"
          className="mt-8 group relative inline-flex items-center gap-2 px-8 py-4 bg-neon-green/10 border border-neon-green/30 rounded-2xl text-neon-green font-bold text-lg transition-all hover:bg-neon-green/20 hover:border-neon-green/50 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,136,0.15)] active:scale-100"
        >
          <span>Find Out</span>
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </Link>

        <p className="mt-4 text-muted/60 text-xs">
          No signup required &middot; Takes 30 seconds
        </p>
      </section>

      {/* Preview Cards */}
      <section className="w-full max-w-5xl px-4 pb-16 md:pb-24">
        <h2 className="text-center text-muted text-sm font-mono uppercase tracking-[0.2em] mb-8">
          8 Cortisol Personality Types
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {previewTypes.map((type) => (
            <div
              key={type.slug}
              className="relative p-5 rounded-2xl border border-border bg-surface overflow-hidden group hover:border-border/80 transition-colors"
            >
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-20 pointer-events-none"
                style={{ backgroundColor: type.accent }}
              />
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{type.spiritAnimal.emoji}</span>
                <h3
                  className="font-bold text-sm tracking-wide"
                  style={{ color: type.accent }}
                >
                  {type.name}
                </h3>
              </div>
              <p className="text-muted text-xs leading-relaxed line-clamp-3">
                {type.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {type.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-border text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-muted/50 text-xs mt-6">
          ...and 5 more types waiting for you
        </p>
      </section>

      {/* Ad placeholder */}
      <div className="w-full max-w-3xl px-4 pb-8">
        <div className="h-[90px] rounded-xl border border-dashed border-border/50 flex items-center justify-center text-muted/30 text-xs font-mono">
          AD SPACE
        </div>
      </div>
    </div>
  );
}
