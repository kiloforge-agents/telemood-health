"use client";

import { useEffect, useState } from "react";

type Props = {
  size?: number;
  className?: string;
  /** 0..1 valence (calm/positive) */
  valence?: number;
  /** 0..1 arousal */
  arousal?: number;
  label?: string;
};

export function MoodOrb({
  size = 280,
  className = "",
  valence = 0.55,
  arousal = 0.4,
  label,
}: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const hueA = 150 + valence * 60;
  const hueB = 20 + (1 - valence) * 40;
  const sat = 35 + arousal * 25;
  const speed = 6 - arousal * 3;

  return (
    <div
      className={`relative grid place-items-center ${className}`}
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-70"
        style={{
          background: `radial-gradient(circle at 30% 30%, hsl(${hueA} ${sat}% 70%), transparent 60%), radial-gradient(circle at 70% 70%, hsl(${hueB} ${sat}% 72%), transparent 60%)`,
          transition: "background 1.2s ease",
        }}
      />
      <div
        className="absolute inset-6 rounded-full"
        style={{
          background: `conic-gradient(from 120deg, hsl(${hueA} 50% 78%), hsl(${hueB} 55% 80%), hsl(${hueA} 50% 78%))`,
          filter: "blur(6px)",
          opacity: 0.65,
          animation: mounted ? `breathe ${speed}s ease-in-out infinite` : undefined,
        }}
      />
      <div
        className="relative rounded-full border border-white/40"
        style={{
          width: size * 0.62,
          height: size * 0.62,
          background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85), rgba(255,255,255,0.05) 55%), radial-gradient(circle at 70% 80%, hsl(${hueA} 60% 70% / 0.7), transparent 60%)`,
          boxShadow:
            "inset 0 -20px 40px rgba(0,0,0,0.08), inset 0 30px 60px rgba(255,255,255,0.4)",
          backdropFilter: "blur(6px)",
        }}
      />
      <div
        className="absolute rounded-full border border-[var(--ink)]/10"
        style={{ width: size * 0.92, height: size * 0.92 }}
      />
      <div
        className="absolute rounded-full border border-dashed border-[var(--ink)]/15"
        style={{ width: size, height: size }}
      />
      {label && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 chip bg-white/80">
          {label}
        </div>
      )}
    </div>
  );
}
