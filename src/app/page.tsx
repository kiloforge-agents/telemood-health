import Link from "next/link";
import { Section, Eyebrow } from "@/components/Section";
import { MoodOrb } from "@/components/MoodOrb";
import { Avatar } from "@/components/Avatar";
import { therapists } from "@/lib/therapists";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <FeatureGrid />
      <TherapistShowcase />
      <ARStrip />
      <PrivacyBlock />
      <Testimonials />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <Section className="pt-10 sm:pt-16 pb-20">
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <Eyebrow>Telemedicine · Mental health · Decentralized identity</Eyebrow>
          <h1 className="font-serif mt-5 text-[2.6rem] sm:text-[3.6rem] lg:text-[4.4rem] leading-[1.02] tracking-tight text-[var(--ink)]">
            Therapy that meets your{" "}
            <span className="italic text-[var(--accent)]">nervous system</span>{" "}
            where it actually is.
          </h1>
          <p className="mt-6 text-[1.05rem] sm:text-lg text-[var(--ink-2)] max-w-xl leading-relaxed">
            TeleMood pairs you with vetted clinicians through a gentle, AI-led mood intake — then keeps each
            session held by encrypted video, AR-guided emotion tracking, and a portable identity only you control.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/assessment" className="btn btn-primary">
              Take the 4-minute intake
              <Arrow />
            </Link>
            <Link href="/therapists" className="btn btn-ghost">
              Browse therapists
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <Stat n="38" l="states licensed" />
            <Stat n="<48h" l="to first session" />
            <Stat n="0" l="data sold, ever" />
          </div>
        </div>

        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </div>
    </Section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-serif text-3xl tracking-tight text-[var(--ink)]">{n}</div>
      <div className="text-xs uppercase tracking-widest text-[var(--muted)] mt-1">{l}</div>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative aspect-[5/6] sm:aspect-[5/5] lg:aspect-[5/6]">
      <div className="absolute inset-0 rounded-[36px] bg-[var(--bg-elev)] border border-[var(--line)] ring-soft overflow-hidden">
        <div className="absolute inset-0 dotgrid opacity-60" />
        <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-[var(--sage)] opacity-50 blur-2xl" />
        <div className="absolute -bottom-12 -left-10 w-72 h-72 rounded-full bg-[var(--warm-soft)] opacity-70 blur-2xl" />

        <div className="relative h-full flex flex-col p-6">
          <div className="flex items-center justify-between">
            <div className="chip">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
              Live intake · encrypted
            </div>
            <div className="text-xs text-[var(--muted)]">14:02</div>
          </div>

          <div className="flex-1 grid place-items-center">
            <MoodOrb size={260} valence={0.55} arousal={0.45} label="Wistful, settling" />
          </div>

          <div className="space-y-2.5">
            <Bubble side="ai">
              <span className="text-[var(--muted)] text-xs uppercase tracking-widest mr-2">Mira · AI</span>
              I’m hearing tightness in your chest most mornings. What does that feel like — sharp, heavy, fluttery?
            </Bubble>
            <Bubble side="me">
              Heavy. Like I’m bracing for a meeting that hasn’t happened yet.
            </Bubble>
            <Bubble side="ai">
              That makes sense. I’ll flag anticipatory anxiety in your intake notes — your therapist will see this before your first session.
            </Bubble>
          </div>
        </div>
      </div>

      <div className="absolute -left-4 bottom-10 hidden sm:block">
        <FloatingCard>
          <div className="text-xs text-[var(--muted)] uppercase tracking-widest">Identity</div>
          <div className="font-mono text-sm mt-1">did:tmh:0x71…f2c4</div>
          <div className="text-xs text-[var(--muted)] mt-1">held in your wallet</div>
        </FloatingCard>
      </div>
      <div className="absolute -right-2 top-12 hidden sm:block">
        <FloatingCard>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] inline-block animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-[var(--muted)]">Match</span>
          </div>
          <div className="font-serif text-lg mt-1">Dr. Ada Okonkwo</div>
          <div className="text-xs text-[var(--muted)]">CBT · ACT · trauma-aware</div>
        </FloatingCard>
      </div>
    </div>
  );
}

function FloatingCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="card p-3.5 ring-soft drift bg-[var(--bg-elev)]">{children}</div>
  );
}

function Bubble({ children, side }: { children: React.ReactNode; side: "ai" | "me" }) {
  return (
    <div className={`flex ${side === "me" ? "justify-end" : ""}`}>
      <div
        className={`max-w-[85%] text-sm leading-relaxed px-4 py-2.5 rounded-2xl ${
          side === "ai"
            ? "bg-[var(--bg)] border border-[var(--line)] rounded-bl-md"
            : "bg-[var(--ink)] text-[var(--bg)] rounded-br-md"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrustBar() {
  const items = [
    "HIPAA-aligned",
    "GDPR + CCPA",
    "SOC 2 Type II",
    "End-to-end encrypted video",
    "Decentralized identity",
    "988 crisis routing",
    "Insurance & superbills",
  ];
  return (
    <div className="border-y border-[var(--line)] bg-[var(--bg-elev)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 flex items-center gap-6 text-[var(--muted)] text-xs uppercase tracking-[0.2em] overflow-hidden">
        <div className="flex items-center gap-10 marquee whitespace-nowrap">
          {[...items, ...items, ...items].map((t, i) => (
            <span key={i} className="flex items-center gap-2">
              <Dot />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
function Dot() {
  return <span className="h-1 w-1 rounded-full bg-[var(--accent)] inline-block" />;
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Gentle AI intake",
      body: "Mira, our clinically-trained intake guide, has a 4-minute conversation about how you’re actually doing. No checkbox forms.",
      tag: "≈ 4 min",
    },
    {
      n: "02",
      title: "Match in <48 hours",
      body: "We compare your needs to clinician availability, modality fit, identity preferences, language and insurance — and offer three real humans.",
      tag: "Human-vetted",
    },
    {
      n: "03",
      title: "Live video + AR tools",
      body: "Encrypted sessions with optional AR overlays that surface micro-expression patterns to you and your therapist, only if you opt in.",
      tag: "You control the data",
    },
    {
      n: "04",
      title: "Carry your story",
      body: "Your decentralized identity, intake notes and progress markers live in a wallet you own. Switch clinicians without starting from zero.",
      tag: "Portable forever",
    },
  ];
  return (
    <Section className="py-20" id="how">
      <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
        <div>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight mt-3 max-w-2xl">
            Soft on the surface, rigorous underneath.
          </h2>
        </div>
        <p className="text-[var(--ink-2)] max-w-md">
          Built with therapists, not just for them. Every step protects clinical depth and your privacy at the same time.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((s) => (
          <div
            key={s.n}
            className="card p-6 relative overflow-hidden hover:-translate-y-1 transition"
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[var(--sage)]/40 blur-xl" />
            <div className="font-mono text-xs text-[var(--muted)]">{s.n}</div>
            <div className="font-serif text-xl mt-4">{s.title}</div>
            <p className="mt-2 text-sm text-[var(--ink-2)] leading-relaxed">{s.body}</p>
            <div className="chip mt-5">{s.tag}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function FeatureGrid() {
  return (
    <Section className="py-20">
      <div className="grid lg:grid-cols-12 gap-5">
        <Feature
          className="lg:col-span-7"
          accent="sage"
          title="An intake that listens"
          body="Mira is trained on de-identified clinical interviews and supervised by licensed psychologists. She asks one thing at a time, in plain language, and never diagnoses."
          chip="AI · clinically-supervised"
          visual={<IntakeVisual />}
        />
        <Feature
          className="lg:col-span-5"
          accent="warm"
          title="Video that holds the room"
          body="Adaptive bandwidth, true end-to-end encryption, captions that don’t leak to a third party. Built so the conversation is the only thing in the way."
          chip="E2E · low-light tuned"
          visual={<VideoVisual />}
        />
        <Feature
          className="lg:col-span-5"
          accent="lavender"
          title="AR emotion tracking"
          body="Optional. On-device. Maps facial micro-tension to a private mood map you and your therapist can read together — without raw video ever leaving your phone."
          chip="On-device only"
          visual={<ARVisual />}
        />
        <Feature
          className="lg:col-span-7"
          accent="sun"
          title="Identity you actually own"
          body="A decentralized identifier (DID) in your wallet replaces your patient ID. Share verified credentials with any covered provider, revoke anytime."
          chip="DID · Verifiable Credentials"
          visual={<IdentityVisual />}
        />
      </div>
    </Section>
  );
}

function Feature({
  title,
  body,
  chip,
  visual,
  accent,
  className = "",
}: {
  title: string;
  body: string;
  chip: string;
  visual: React.ReactNode;
  accent: "sage" | "warm" | "lavender" | "sun";
  className?: string;
}) {
  const tones: Record<string, string> = {
    sage: "from-[var(--sage)]/40",
    warm: "from-[var(--warm-soft)]/70",
    lavender: "from-[var(--lavender)]/40",
    sun: "from-[var(--sun)]/40",
  };
  return (
    <div className={`card overflow-hidden relative group ${className}`}>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${tones[accent]} to-transparent opacity-80 pointer-events-none`}
      />
      <div className="relative p-7 sm:p-9 grid gap-6">
        <div className="chip self-start">{chip}</div>
        <h3 className="font-serif text-2xl sm:text-3xl tracking-tight max-w-md">{title}</h3>
        <p className="text-[var(--ink-2)] max-w-lg leading-relaxed">{body}</p>
        <div className="rounded-2xl bg-[var(--bg)]/70 border border-[var(--line)] p-5 backdrop-blur-sm">
          {visual}
        </div>
      </div>
    </div>
  );
}

function IntakeVisual() {
  return (
    <div className="grid grid-cols-[auto,1fr] gap-3">
      <div className="h-9 w-9 rounded-full bg-[var(--accent)] grid place-items-center text-white text-xs">M</div>
      <div className="flex-1 space-y-2">
        <div className="text-sm">
          When did the heaviness start showing up most?
        </div>
        <div className="flex gap-2 flex-wrap">
          {["mornings", "before sleep", "weekends", "in meetings"].map((t) => (
            <span key={t} className="chip bg-[var(--bg)]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function VideoVisual() {
  return (
    <div className="aspect-video rounded-xl bg-gradient-to-br from-[#1a1f2c] to-[#0c1018] relative overflow-hidden">
      <div className="absolute inset-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-gradient-to-br from-[#2c3a4a] to-[#0f161e] grid place-items-end p-2">
          <span className="text-[10px] text-white/70 font-mono">you</span>
        </div>
        <div className="rounded-lg bg-gradient-to-br from-[#3b4f3a] to-[#16201a] grid place-items-end p-2">
          <span className="text-[10px] text-white/70 font-mono">dr. ada</span>
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur text-white text-[10px]">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        E2E · 248 ms
      </div>
    </div>
  );
}

function ARVisual() {
  return (
    <div className="aspect-[4/3] rounded-xl bg-[var(--ink)] relative overflow-hidden">
      <div className="absolute inset-0 grid place-items-center">
        <FaceMesh />
      </div>
      <div className="absolute top-2 left-2 chip bg-white/10 text-white border-white/20">on-device</div>
      <div className="absolute bottom-2 right-2 chip bg-white/10 text-white border-white/20">brow · jaw · eye</div>
    </div>
  );
}

function FaceMesh() {
  return (
    <svg viewBox="0 0 200 160" className="w-3/4 text-[var(--lavender)]" fill="none" stroke="currentColor" strokeWidth="0.6">
      <ellipse cx="100" cy="85" rx="55" ry="65" opacity="0.5" />
      <ellipse cx="100" cy="85" rx="40" ry="55" opacity="0.4" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1="45" y1={20 + i * 10} x2="155" y2={25 + i * 10} opacity="0.25" />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} y1="20" y2="150" x1={50 + i * 14} x2={48 + i * 14} opacity="0.25" />
      ))}
      <circle cx="80" cy="75" r="4" fill="currentColor" opacity="0.7" className="blink" />
      <circle cx="120" cy="75" r="4" fill="currentColor" opacity="0.7" className="blink" />
      <path d="M80 110 Q100 122 120 110" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IdentityVisual() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Cred title="Insurance" v="Aetna · PPO" tone="sage" />
      <Cred title="License" v="NY · LMHC-VR" tone="warm" />
      <Cred title="Crisis" v="988 contact" tone="lavender" />
      <Cred title="Pronouns" v="she/her" tone="sun" />
      <Cred title="Allergies" v="bupropion" tone="sage" />
      <Cred title="Therapist" v="Dr. A. Okonkwo" tone="warm" />
    </div>
  );
}

function Cred({ title, v, tone }: { title: string; v: string; tone: string }) {
  const map: Record<string, string> = {
    sage: "bg-[var(--sage)]/40",
    warm: "bg-[var(--warm-soft)]/60",
    lavender: "bg-[var(--lavender)]/40",
    sun: "bg-[var(--sun)]/40",
  };
  return (
    <div className={`rounded-xl border border-[var(--line)] p-3 ${map[tone]}`}>
      <div className="text-[10px] uppercase tracking-widest text-[var(--ink-2)]/80">{title}</div>
      <div className="text-sm font-medium mt-1 leading-tight">{v}</div>
    </div>
  );
}

function TherapistShowcase() {
  const featured = therapists.slice(0, 3);
  return (
    <Section className="py-20">
      <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
        <div>
          <Eyebrow>Real clinicians</Eyebrow>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight mt-3 max-w-2xl">
            Vetted, insured, and chosen by the therapists they refer to.
          </h2>
        </div>
        <Link href="/therapists" className="btn btn-ghost">
          See all 240+ clinicians
          <Arrow />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {featured.map((t) => (
          <Link
            key={t.id}
            href={`/therapists/${t.id}`}
            className="card p-6 group hover:-translate-y-1 transition relative overflow-hidden"
          >
            <Avatar accent={t.accent} initials={t.initials} />
            <div className="mt-5 font-serif text-xl">{t.name}</div>
            <div className="text-sm text-[var(--muted)]">{t.title}</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {t.modalities.slice(0, 3).map((m) => (
                <span key={m} className="chip bg-[var(--bg)]">{m}</span>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--muted)]">
              <span>★ {t.rating} · {t.sessions.toLocaleString()} sessions</span>
              <span>{t.nextSlot}</span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

function ARStrip() {
  return (
    <Section className="py-20">
      <div className="card overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--ink)] to-[#1f1f1a]" />
        <div className="absolute inset-0 dotgrid opacity-10" />
        <div className="relative p-8 sm:p-14 grid lg:grid-cols-2 gap-10 items-center text-[var(--bg)]">
          <div>
            <Eyebrow>
              <span className="text-[var(--bg)]/70">AR emotion tools</span>
            </Eyebrow>
            <h3 className="font-serif text-3xl sm:text-5xl mt-4 leading-[1.05] tracking-tight">
              Notice the feeling{" "}
              <span className="italic text-[var(--sage)]">before it has a story.</span>
            </h3>
            <p className="mt-5 text-[var(--bg)]/70 max-w-lg leading-relaxed">
              Our optional AR overlay highlights jaw tension, brow furrow and breath cadence — privately, on your device — so you and your clinician can ground a session in what your body is actually saying.
            </p>
            <div className="mt-7 flex gap-3 flex-wrap">
              <Link href="/ar-tools" className="btn bg-[var(--bg)] text-[var(--ink)] hover:bg-white">
                Try the AR demo
                <Arrow />
              </Link>
              <Link
                href="/privacy"
                className="btn btn-ghost text-[var(--bg)] border-white/20 hover:bg-white/10"
              >
                How privacy works
              </Link>
            </div>
          </div>
          <div className="relative aspect-square max-w-md ml-auto w-full">
            <div className="absolute inset-0 rounded-3xl border border-white/10 overflow-hidden bg-black/40">
              <FaceMesh />
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/60">
                <span>frame 02:14</span>
                <span>arousal · 0.42</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
                {[
                  ["brow", 0.6],
                  ["jaw", 0.3],
                  ["breath", 0.45],
                ].map(([k, v]) => (
                  <div key={k as string} className="bg-white/10 rounded-lg p-2">
                    <div className="text-[10px] text-white/60 uppercase tracking-widest">{k}</div>
                    <div className="mt-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
                      <div
                        className="h-full bg-[var(--sage)]"
                        style={{ width: `${(v as number) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="absolute inset-x-12 inset-y-0 overflow-hidden rounded-3xl pointer-events-none"
              aria-hidden
            >
              <div className="absolute inset-x-0 h-12 bg-gradient-to-b from-[var(--sage)]/40 to-transparent scan" />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function PrivacyBlock() {
  return (
    <Section className="py-20" id="privacy">
      <div className="grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <Eyebrow>Privacy by design</Eyebrow>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight mt-3">
            Your story isn’t a data set.
          </h2>
          <p className="mt-5 text-[var(--ink-2)] leading-relaxed">
            Decentralized identifiers replace patient IDs. Verifiable credentials prove insurance, licensing,
            and consent — without exposing the underlying records. You can revoke any access in a tap.
          </p>
          <Link href="/privacy" className="btn btn-primary mt-7">Read the privacy paper</Link>
        </div>
        <div className="lg:col-span-7">
          <PrivacyCard />
        </div>
      </div>
    </Section>
  );
}

function PrivacyCard() {
  const principles = [
    { t: "You hold the keys", d: "Identity lives in your device wallet — biometric or passphrase guarded." },
    { t: "Granular consent", d: "Share a verified credential, a specific note, or nothing at all. Per session." },
    { t: "Zero-knowledge proofs", d: "Prove you’re insured without revealing your policy number." },
    { t: "Right to be unseen", d: "Delete your account and the data is cryptographically unreadable in 24h." },
  ];
  return (
    <div className="card p-6 sm:p-8">
      <div className="grid sm:grid-cols-2 gap-4">
        {principles.map((p, i) => (
          <div key={p.t} className="rounded-2xl bg-[var(--bg)] border border-[var(--line)] p-5">
            <div className="font-mono text-xs text-[var(--muted)]">P/{(i + 1).toString().padStart(2, "0")}</div>
            <div className="font-serif text-lg mt-2">{p.t}</div>
            <div className="text-sm text-[var(--ink-2)] mt-2 leading-relaxed">{p.d}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl bg-[var(--ink)] text-[var(--bg)] p-5 flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-[var(--bg)]/60">Active credential</div>
          <div className="font-mono mt-1 text-sm sm:text-base">vc:tmh:therapy.session.consent</div>
        </div>
        <div className="flex items-center gap-3">
          <span className="chip bg-white/10 text-white border-white/20">Revocable</span>
          <span className="chip bg-white/10 text-white border-white/20">Expires in 50:00</span>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  const t = [
    {
      q: "I’ve tried four telehealth apps. TeleMood is the first one that didn’t feel like an Uber ride to a stranger.",
      a: "Marisol, 34 · NYC",
    },
    {
      q: "The AR overlay helped me realize I clench my jaw the second my boss’ name comes up. That alone changed my week.",
      a: "Devin, 41 · Austin",
    },
    {
      q: "As a clinician, I finally have intake notes that actually read like the person who wrote them. Less paperwork, more presence.",
      a: "Dr. Hana Lee, LMFT",
    },
  ];
  return (
    <Section className="py-20">
      <Eyebrow>Quiet wins</Eyebrow>
      <h2 className="font-serif text-3xl sm:text-5xl tracking-tight mt-3 max-w-3xl">
        From people who stopped white-knuckling Mondays.
      </h2>
      <div className="mt-10 grid md:grid-cols-3 gap-5">
        {t.map((x, i) => (
          <div key={i} className="card p-6 sm:p-7 relative">
            <span className="font-serif text-6xl text-[var(--sage)] absolute -top-2 left-4 leading-none">“</span>
            <p className="font-serif text-lg leading-snug mt-4">{x.q}</p>
            <div className="mt-6 text-xs uppercase tracking-widest text-[var(--muted)]">{x.a}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function CTA() {
  return (
    <Section className="py-20">
      <div className="card p-8 sm:p-14 relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-72 h-72 rounded-full bg-[var(--warm-soft)] blur-2xl opacity-70" />
        <div className="absolute -bottom-12 -right-12 w-80 h-80 rounded-full bg-[var(--sage)] blur-2xl opacity-60" />
        <div className="relative grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight">
              Whatever brought you here, it’s reasonable.
            </h2>
            <p className="mt-5 text-[var(--ink-2)] max-w-xl leading-relaxed">
              Take the four-minute intake. No card, no commitment. You’ll leave with a clearer picture of what you’re feeling — and three real humans you could talk to next.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
            <Link href="/assessment" className="btn btn-primary">
              Start intake
              <Arrow />
            </Link>
            <Link href="/therapists" className="btn btn-ghost">
              Meet therapists
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
