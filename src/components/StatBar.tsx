"use client";

import { useEffect, useState } from "react";

interface StatBarProps {
  label: string;
  value: number;
  color: string;
  glitched?: boolean;
}

export function StatBar({ label, value, color, glitched = false }: StatBarProps) {
  const [displayValue, setDisplayValue] = useState(glitched ? 0 : value);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!glitched) return;
    const interval = setInterval(() => {
      setDisplayValue(Math.floor(Math.random() * 100));
    }, 200);
    return () => clearInterval(interval);
  }, [glitched]);

  const finalValue = glitched ? displayValue : value;

  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-mono text-[#6b6b8a] w-[120px] flex-shrink-0 truncate">
        {label}
      </span>
      <div className="flex-1 h-2.5 bg-[#12121e] rounded-full overflow-hidden relative">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: animated ? `${finalValue}%` : "0%",
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}66, 0 0 2px ${color}44`,
            transition: glitched ? "width 0.15s linear" : "width 0.7s ease-out",
          }}
        />
      </div>
      <span
        className="text-[11px] font-mono font-bold w-[36px] text-right flex-shrink-0"
        style={{ color }}
      >
        {glitched ? "??" : finalValue}%
      </span>
    </div>
  );
}
