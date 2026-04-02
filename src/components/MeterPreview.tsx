"use client";

import { useEffect, useState } from "react";

export function MeterPreview() {
  const [angle, setAngle] = useState(-80);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle(Math.random() * 160 - 80);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const cx = 150;
  const cy = 130;
  const outerR = 110;
  const innerR = 70;

  const segments = [
    { startAngle: 180, endAngle: 216, fill: "#22c55e" },
    { startAngle: 216, endAngle: 252, fill: "#84cc16" },
    { startAngle: 252, endAngle: 288, fill: "#facc15" },
    { startAngle: 288, endAngle: 324, fill: "#f97316" },
    { startAngle: 324, endAngle: 360, fill: "#ef4444" },
  ];

  return (
    <div className="relative w-56 h-32 md:w-72 md:h-40">
      <svg viewBox="0 0 300 175" className="w-full h-full">
        {segments.map((seg, i) => {
          const startRad = (seg.startAngle * Math.PI) / 180;
          const endRad = (seg.endAngle * Math.PI) / 180;
          const gap = 0.02;
          const ox1 = cx + outerR * Math.cos(startRad + gap);
          const oy1 = cy + outerR * Math.sin(startRad + gap);
          const ox2 = cx + outerR * Math.cos(endRad - gap);
          const oy2 = cy + outerR * Math.sin(endRad - gap);
          const ix1 = cx + innerR * Math.cos(endRad - gap);
          const iy1 = cy + innerR * Math.sin(endRad - gap);
          const ix2 = cx + innerR * Math.cos(startRad + gap);
          const iy2 = cy + innerR * Math.sin(startRad + gap);
          return (
            <path
              key={i}
              d={`M ${ox1} ${oy1} A ${outerR} ${outerR} 0 0 1 ${ox2} ${oy2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 0 0 ${ix2} ${iy2} Z`}
              fill={seg.fill}
              opacity={0.85}
            />
          );
        })}

        <text x="32" y="138" fill="rgba(255,255,255,0.5)" fontSize="11" fontWeight="800" fontFamily="system-ui">LOW</text>
        <text x="127" y="32" fill="rgba(255,255,255,0.5)" fontSize="11" fontWeight="800" fontFamily="system-ui" textAnchor="middle">MID</text>
        <text x="240" y="138" fill="rgba(255,255,255,0.5)" fontSize="11" fontWeight="800" fontFamily="system-ui">HIGH</text>

        <text x={cx} y={cy + 8} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="20" fontWeight="900" fontFamily="system-ui" letterSpacing="2">
          CORTISOL
        </text>

        <g
          style={{
            transform: `rotate(${angle}deg)`,
            transformOrigin: `${cx}px ${cy}px`,
            transition: "transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <line x1={cx} y1={cy} x2={cx} y2={cy - innerR + 8} stroke="rgba(0,0,0,0.3)" strokeWidth="5" strokeLinecap="round" />
          <line x1={cx} y1={cy} x2={cx} y2={cy - innerR + 8} stroke="#e8e8f0" strokeWidth="3.5" strokeLinecap="round" />
        </g>

        <circle cx={cx} cy={cy} r="10" fill="#0c0c14" stroke="#333" strokeWidth="2" />
        <circle cx={cx} cy={cy} r="5" fill="#e8e8f0" />
      </svg>
    </div>
  );
}
