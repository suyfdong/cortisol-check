"use client";

import { PersonaType } from "@/lib/data";
import { CortisolMeter } from "./CortisolMeter";

interface CortisolCardProps {
  persona: PersonaType;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}

export function CortisolCard({ persona, cardRef }: CortisolCardProps) {
  const isGlitch = persona.slug === "cortisol-glitch";

  return (
    <div
      ref={cardRef}
      className="relative w-full max-w-[400px] md:max-w-[440px] mx-auto rounded-[24px] overflow-hidden"
      style={{
        background: `linear-gradient(145deg, ${persona.gradient[0]}, ${persona.gradient[1]})`,
        color: persona.textColor,
      }}
    >
      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${persona.textColor} 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative px-6 pt-7 pb-6">
        {/* Meter — BIG, hero element */}
        <div className="mb-1">
          <CortisolMeter
            position={persona.meterPosition}
            color={persona.accent}
            isGlitch={isGlitch}
          />
        </div>

        {/* Spirit Animal — under meter */}
        <div className="text-center mb-1 -mt-2">
          <span
            className="text-5xl inline-block"
            style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))" }}
          >
            {persona.spiritAnimal.emoji}
          </span>
        </div>

        {/* Persona Name */}
        <h2
          className={`text-center font-black text-[22px] tracking-wide leading-tight ${
            isGlitch ? "animate-pulse" : ""
          }`}
        >
          {persona.name}
        </h2>

        {/* Spirit animal label */}
        <p className="text-center text-xs mt-1 opacity-60 font-medium">
          Spirit Animal: {persona.spiritAnimal.name}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
          {persona.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: `${persona.accent}18`,
                color: persona.accent,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description — varied styles, supports newlines */}
        <p className="text-[13px] leading-relaxed text-center mt-4 opacity-80 font-medium whitespace-pre-line">
          {persona.description}
        </p>

        {/* Stats — 3 circles in a row */}
        <div className="flex justify-center gap-4 mt-5">
          {persona.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center font-black text-lg"
                style={{
                  backgroundColor: `${persona.accent}15`,
                  border: `2.5px solid ${persona.accent}40`,
                  color: persona.accent,
                }}
              >
                {stat.glitched ? "??" : `${stat.value}%`}
              </div>
              <span className="text-[10px] font-bold mt-1.5 opacity-60 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Brand Footer */}
        <div className="mt-6 pt-4 border-t text-center" style={{ borderColor: `${persona.textColor}15` }}>
          <p className="text-[11px] opacity-40 font-medium">
            What&apos;s YOUR cortisol type?
          </p>
          <p className="text-[13px] font-black mt-0.5 opacity-50">
            cortisollevel.xyz
          </p>
        </div>
      </div>
    </div>
  );
}
