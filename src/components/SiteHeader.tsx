"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/assessment", label: "Mood intake" },
  { href: "/therapists", label: "Therapists" },
  { href: "/session", label: "Live session" },
  { href: "/ar-tools", label: "AR tools" },
  { href: "/privacy", label: "Privacy" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled
          ? "backdrop-blur-md bg-[var(--bg)]/80 border-b border-[var(--line)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo />
          <span className="font-serif text-[1.15rem] tracking-tight">
            TeleMood
          </span>
          <span className="hidden sm:inline text-[var(--muted)] text-sm">/ Health</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`px-3 py-2 text-sm rounded-full transition ${
                  active
                    ? "bg-[var(--ink)] text-[var(--bg)]"
                    : "text-[var(--ink-2)] hover:bg-black/5"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/assessment" className="btn btn-ghost focus-ring">
            Start free intake
          </Link>
          <Link href="/therapists" className="btn btn-primary focus-ring">
            Book a therapist
            <Arrow />
          </Link>
        </div>

        <button
          className="md:hidden p-2 -mr-2"
          aria-label="Toggle menu"
          onClick={() => setOpen((s) => !s)}
        >
          <span className="block w-6 h-[2px] bg-[var(--ink)] mb-1.5" />
          <span className="block w-6 h-[2px] bg-[var(--ink)] mb-1.5" />
          <span className="block w-4 h-[2px] bg-[var(--ink)]" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--line)] bg-[var(--bg)]">
          <div className="px-5 py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`px-3 py-2.5 rounded-xl text-sm ${
                  pathname === n.href ? "bg-[var(--ink)] text-[var(--bg)]" : "hover:bg-black/5"
                }`}
              >
                {n.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Link href="/assessment" className="btn btn-ghost flex-1 justify-center">
                Free intake
              </Link>
              <Link href="/therapists" className="btn btn-primary flex-1 justify-center">
                Book
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Logo() {
  return (
    <span className="relative h-8 w-8 grid place-items-center">
      <span className="absolute inset-0 rounded-full bg-[var(--accent)]" />
      <span className="absolute inset-[3px] rounded-full bg-[var(--bg)]" />
      <span className="absolute inset-[6px] rounded-full bg-[var(--accent)] breathe" />
    </span>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
