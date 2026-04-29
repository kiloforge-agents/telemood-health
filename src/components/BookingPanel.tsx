"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const TIMES = ["7:30 AM", "9:00 AM", "11:00 AM", "1:30 PM", "3:00 PM", "5:45 PM", "7:30 PM"];

export function BookingPanel({
  therapistId,
  therapistName,
  rate,
  nextSlot,
}: {
  therapistId: string;
  therapistName: string;
  rate: number;
  nextSlot: string;
}) {
  const days = useMemo(() => buildDays(), []);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <div className="card p-6 sticky top-24">
        <div className="chip">Booked · credential issued</div>
        <h3 className="font-serif text-2xl mt-3 leading-snug">
          You’re on with {therapistName.split(" ")[0]}.
        </h3>
        <p className="text-sm text-[var(--ink-2)] mt-2">
          {days[day].long} at {time}. We sent a calendar hold and a private one-tap join link to your wallet.
        </p>
        <div className="mt-5 rounded-xl bg-[var(--bg)] border border-[var(--line)] p-4 font-mono text-xs text-[var(--muted)]">
          vc:tmh:session.{therapistId}.{Date.now().toString(36).slice(-6)}
        </div>
        <div className="mt-6 flex gap-3">
          <Link href="/session" className="btn btn-primary flex-1 justify-center">Open waiting room</Link>
          <button onClick={() => setConfirmed(false)} className="btn btn-ghost">Edit</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 sticky top-24">
      <div className="flex items-baseline justify-between">
        <div className="text-xs uppercase tracking-widest text-[var(--muted)]">Book a session</div>
        <div className="text-sm">${rate}<span className="text-[var(--muted)] text-xs"> / 50 min</span></div>
      </div>
      <div className="mt-2 chip"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />{nextSlot} earliest</div>

      <div className="mt-6 grid grid-cols-7 gap-1.5">
        {days.map((d, i) => (
          <button
            key={d.iso}
            type="button"
            onClick={() => { setDay(i); setTime(null); }}
            className={`rounded-xl border px-1 py-2 text-xs transition ${
              day === i
                ? "bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]"
                : "border-[var(--line)] hover:border-[var(--ink)]/40"
            }`}
          >
            <div>{d.dow}</div>
            <div className="font-serif text-base">{d.dom}</div>
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {TIMES.map((t, i) => {
          const open = (i + day) % 4 !== 1;
          return (
            <button
              key={t}
              type="button"
              disabled={!open}
              onClick={() => setTime(t)}
              className={`px-3 py-2 rounded-full text-sm border transition ${
                time === t
                  ? "bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]"
                  : "bg-[var(--bg)] border-[var(--line)] hover:border-[var(--ink)]/40 disabled:opacity-30 disabled:line-through"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl bg-[var(--bg)] border border-[var(--line)] p-4 text-xs text-[var(--muted)] leading-relaxed">
        Booking issues a one-time consent credential to your wallet. Reschedule up to 24h before — covered by your policy where eligible.
      </div>

      <button
        disabled={!time}
        onClick={() => setConfirmed(true)}
        className="btn btn-primary w-full justify-center mt-5 disabled:opacity-40"
      >
        {time ? `Confirm ${days[day].short} · ${time}` : "Pick a time to continue"}
      </button>
    </div>
  );
}

function buildDays() {
  const arr: { iso: string; dow: string; dom: number; short: string; long: string }[] = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(now.getTime() + i * 86400000);
    arr.push({
      iso: d.toISOString(),
      dow: d.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 3),
      dom: d.getDate(),
      short: d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
      long: d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
    });
  }
  return arr;
}
