"use client";

import { useEffect, useState } from "react";

interface CortisolMeterProps {
  position: number; // 0-100, -1 for glitch
  color: string;
  isGlitch?: boolean;
}

export function CortisolMeter({
  position,
  color,
  isGlitch = false,
}: CortisolMeterProps) {
  const [glitchAngle, setGlitchAngle] = useState(0);

  useEffect(() => {
    if (!isGlitch) return;
    const interval = setInterval(() => {
      setGlitchAngle(Math.random() * 160 - 80);
    }, 300);
    return () => clearInterval(interval);
  }, [isGlitch]);

  const needleAngle = isGlitch ? glitchAngle : (position / 100) * 160 - 80;

  // Segment colors matching the sticker style
  const segments = [
    { startAngle: 180, endAngle: 216, fill: "#22c55e" }, // green
    { startAngle: 216, endAngle: 252, fill: "#84cc16" }, // lime
    { startAngle: 252, endAngle: 288, fill: "#facc15" }, // yellow
    { startAngle: 288, endAngle: 324, fill: "#f97316" }, // orange
    { startAngle: 324, endAngle: 360, fill: "#ef4444" }, // red
  ];

  function arcPath(
    cx: number,
    cy: number,
    r: number,
    startDeg: number,
    endDeg: number
  ) {
    const startRad = (startDeg * Math.PI) / 180;
    const endRad = (endDeg * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  }

  const cx = 150;
  const cy = 130;
  const outerR = 110;
  const innerR = 70;

  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      <svg viewBox="0 0 300 175" className="w-full">
        {/* Color segments */}
        {segments.map((seg, i) => {
          const startRad = (seg.startAngle * Math.PI) / 180;
          const endRad = (seg.endAngle * Math.PI) / 180;
          const gap = 0.02; // small gap between segments

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

        {/* Segment border overlay for depth */}
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
              key={`border-${i}`}
              d={`M ${ox1} ${oy1} A ${outerR} ${outerR} 0 0 1 ${ox2} ${oy2} L ${ix1} ${iy1} A ${innerR} ${innerR} 0 0 0 ${ix2} ${iy2} Z`}
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
          );
        })}

        {/* Labels along the arc */}
        <text
          x="32"
          y="138"
          fill="rgba(0,0,0,0.5)"
          fontSize="11"
          fontWeight="800"
          fontFamily="system-ui"
        >
          LOW
        </text>
        <text
          x="127"
          y="32"
          fill="rgba(0,0,0,0.5)"
          fontSize="11"
          fontWeight="800"
          fontFamily="system-ui"
          textAnchor="middle"
        >
          MID
        </text>
        <text
          x="240"
          y="138"
          fill="rgba(0,0,0,0.5)"
          fontSize="11"
          fontWeight="800"
          fontFamily="system-ui"
        >
          HIGH
        </text>

        {/* CORTISOL text in the center */}
        <text
          x={cx}
          y={cy + 8}
          textAnchor="middle"
          fill="rgba(0,0,0,0.7)"
          fontSize="20"
          fontWeight="900"
          fontFamily="system-ui"
          letterSpacing="2"
        >
          CORTISOL
        </text>

        {/* Needle shadow */}
        <g
          style={{
            transform: `rotate(${needleAngle}deg)`,
            transformOrigin: `${cx}px ${cy}px`,
            transition: isGlitch
              ? "transform 0.15s linear"
              : "transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - innerR + 8}
            stroke="rgba(0,0,0,0.2)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - innerR + 8}
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Needle highlight */}
          <line
            x1={cx}
            y1={cy}
            x2={cx}
            y2={cy - innerR + 15}
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* Center hub */}
        <circle
          cx={cx}
          cy={cy}
          r="10"
          fill="white"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="2"
        />
        <circle cx={cx} cy={cy} r="5" fill={color} />
      </svg>
    </div>
  );
}
