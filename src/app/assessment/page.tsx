"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Section } from "@/components/Section";
import { MoodOrb } from "@/components/MoodOrb";

type Step =
  | { id: "open"; kind: "open"; prompt: string; placeholder: string; tag: string }
  | {
      id: string;
      kind: "scale";
      prompt: string;
      tag: string;
      anchors: [string, string];
    }
  | {
      id: string;
      kind: "choice";
      prompt: string;
      tag: string;
      multi?: boolean;
      options: string[];
    }
  | {
      id: string;
      kind: "free";
      prompt: string;
      placeholder: string;
      tag: string;
    };

const STEPS: Step[] = [
  {
    id: "open",
    kind: "open",
    prompt: "Hi — I’m Mira. Before any forms, what’s the truest sentence about how you’ve been lately?",
    placeholder: "“I’m exhausted but I can’t name why.”",
    tag: "open question",
  },
  {
    id: "valence",
    kind: "scale",
    prompt: "On most days this week, how would you describe the overall texture of your mood?",
    anchors: ["Heavy / dark", "Bright / open"],
    tag: "valence",
  },
  {
    id: "arousal",
    kind: "scale",
    prompt: "And the energy underneath it — wired and busy, or flat and slow?",
    anchors: ["Flat / slow", "Wired / busy"],
    tag: "arousal",
  },
  {
    id: "themes",
    kind: "choice",
    multi: true,
    prompt: "Which of these has been showing up the most? Pick anything that fits.",
    options: [
      "Anxiety / worry",
      "Low mood",
      "Grief / loss",
      "Burnout",
      "Relationship friction",
      "Identity / self-worth",
      "Sleep trouble",
      "Trauma replay",
      "ADHD / focus",
      "Anger I can’t explain",
    ],
    tag: "themes",
  },
  {
    id: "where",
    kind: "choice",
    multi: false,
    prompt: "Where do you feel it most in your body?",
    options: ["Chest", "Stomach", "Throat", "Shoulders", "Behind the eyes", "Everywhere"],
    tag: "somatic",
  },
  {
    id: "support",
    kind: "choice",
    multi: false,
    prompt: "What kind of support sounds right, today?",
    options: [
      "A weekly therapist I can build with",
      "Short-term, focused on one issue",
      "Couples / relationship work",
      "Medication evaluation alongside therapy",
      "Honestly, I don’t know yet",
    ],
    tag: "preference",
  },
  {
    id: "logistics",
    kind: "choice",
    multi: true,
    prompt: "Anything that would make this easier to actually show up to?",
    options: [
      "Evening sessions",
      "In my first language",
      "Same-gender clinician",
      "LGBTQ+ affirming",
      "Trauma-informed",
      "Insurance coverage",
    ],
    tag: "logistics",
  },
  {
    id: "free",
    kind: "free",
    prompt: "Last thing — anything you want your future therapist to know before session one?",
    placeholder: "It’s okay if it’s messy.",
    tag: "note to clinician",
  },
];

export default function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[] | number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const [aiNote, setAiNote] = useState("");

  const current = STEPS[step];

  const valence = (typeof answers.valence === "number" ? answers.valence : 0.5) as number;
  const arousal = (typeof answers.arousal === "number" ? answers.arousal : 0.45) as number;

  const set = (id: string, v: string | string[] | number) =>
    setAnswers((s) => ({ ...s, [id]: v }));

  const next = () => {
    if (step < STEPS.length - 1) {
      setAiTyping(true);
      setTimeout(() => {
        setAiTyping(false);
        setStep(step + 1);
      }, 700);
    } else {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setDone(true);
      }, 1200);
    }
  };
  const back = () => step > 0 && setStep(step - 1);

  useEffect(() => {
    if (step === 0) {
      setAiNote("Take your time. Anything you say here stays on this device until you choose to share it.");
      return;
    }
    const reflections: Record<string, string> = {
      valence: "Got it. I’ll note the overall pull of the week. The shape will start showing up in the orb on your right.",
      arousal: "Thanks. Mood and energy aren’t the same thing — pairing them helps your therapist see the texture, not just the label.",
      themes: "Noted. I won’t turn these into diagnoses — just signals for your clinician to listen for.",
      where: "The body remembers what we don’t always have words for. Useful to know.",
      support: "Helpful. We’ll match against availability, modality fit and credentials in the next step.",
      logistics: "Almost there. These filters protect your time and your wallet.",
      free: "Thank you for trusting me with that.",
    };
    const id = STEPS[step - 1].id;
    setAiNote(reflections[id] || "");
  }, [step]);

  const progress = useMemo(() => ((step + (done ? 1 : 0)) / STEPS.length) * 100, [step, done]);

  if (done) {
    return <Result answers={answers} valence={valence} arousal={arousal} />;
  }

  return (
    <Section className="py-12 sm:py-16">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="flex items-center justify-between mb-8">
            <div className="text-xs uppercase tracking-widest text-[var(--muted)]">
              Mood intake · step {step + 1} of {STEPS.length}
            </div>
            <Link href="/" className="text-xs text-[var(--muted)] hover:text-[var(--ink)]">
              Save & exit
            </Link>
          </div>

          <div className="h-1 rounded-full bg-[var(--line)] overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-10 chip">{current.tag}</div>

          <h1 className="font-serif text-3xl sm:text-4xl tracking-tight mt-4 leading-[1.15]">
            {current.prompt}
          </h1>

          <div className="mt-8">
            {current.kind === "open" && (
              <Free
                key={current.id}
                placeholder={current.placeholder}
                value={(answers[current.id] as string) || ""}
                onChange={(v) => set(current.id, v)}
              />
            )}
            {current.kind === "free" && (
              <Free
                key={current.id}
                placeholder={current.placeholder}
                value={(answers[current.id] as string) || ""}
                onChange={(v) => set(current.id, v)}
              />
            )}
            {current.kind === "scale" && (
              <Scale
                anchors={current.anchors}
                value={(answers[current.id] as number) ?? 0.5}
                onChange={(v) => set(current.id, v)}
              />
            )}
            {current.kind === "choice" && (
              <Choices
                multi={!!current.multi}
                options={current.options}
                value={
                  current.multi
                    ? ((answers[current.id] as string[]) || [])
                    : (answers[current.id] as string) || ""
                }
                onChange={(v) => set(current.id, v)}
              />
            )}
          </div>

          <div className="mt-10 flex items-center justify-between flex-wrap gap-3">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="btn btn-ghost disabled:opacity-30"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!isAnswered(current, answers) || submitting}
              className="btn btn-primary disabled:opacity-50"
            >
              {step === STEPS.length - 1
                ? submitting
                  ? "Reading the room…"
                  : "See my matches"
                : aiTyping
                ? "Mira is typing…"
                : "Continue →"}
            </button>
          </div>
        </div>

        <aside className="lg:col-span-5 order-1 lg:order-2">
          <div className="card p-6 sticky top-24">
            <div className="flex items-center justify-between mb-3">
              <div className="chip">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
                Mira · clinically supervised
              </div>
              <div className="text-xs text-[var(--muted)]">on-device</div>
            </div>
            <div className="grid place-items-center py-4">
              <MoodOrb size={240} valence={valence} arousal={arousal} />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-3 text-xs">
              <Telemetry label="Valence" v={valence} />
              <Telemetry label="Arousal" v={arousal} />
            </div>

            <div className="divider-line my-5" />

            <div className="text-sm text-[var(--ink-2)] leading-relaxed min-h-[3.5rem]">
              <span className="text-[var(--muted)] uppercase tracking-widest text-[10px] mr-2">Mira</span>
              {aiNote}
            </div>

            <div className="mt-5 text-[11px] text-[var(--muted)] leading-relaxed">
              Mira is a guided intake assistant trained on de-identified clinical interviews and supervised by licensed psychologists. She does not diagnose, prescribe, or replace urgent care. If you’re in crisis, dial <span className="text-[var(--ink)]">988</span>.
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function isAnswered(s: Step, a: Record<string, string | string[] | number>): boolean {
  const v = a[s.id];
  if (s.kind === "scale") return typeof v === "number";
  if (s.kind === "open" || s.kind === "free") return typeof v === "string" && v.trim().length >= 2;
  if (s.kind === "choice") {
    if (s.multi) return Array.isArray(v) && v.length > 0;
    return typeof v === "string" && v.length > 0;
  }
  return false;
}

function Free({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className="w-full rounded-2xl border border-[var(--line)] bg-[var(--bg-elev)] p-5 text-[1.05rem] leading-relaxed font-serif focus-ring focus:outline-none"
    />
  );
}

function Scale({
  anchors,
  value,
  onChange,
}: {
  anchors: [string, string];
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-elev)] p-6">
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(value * 100)}
        onChange={(e) => onChange(parseInt(e.target.value, 10) / 100)}
        className="w-full accent-[var(--accent)]"
      />
      <div className="flex items-center justify-between text-xs text-[var(--muted)] mt-3">
        <span>{anchors[0]}</span>
        <span>{anchors[1]}</span>
      </div>
      <div className="flex items-center justify-center mt-4 text-sm text-[var(--ink-2)]">
        {scaleLabel(value)}
      </div>
    </div>
  );
}

function scaleLabel(v: number) {
  if (v < 0.15) return "very low";
  if (v < 0.35) return "low";
  if (v < 0.55) return "in the middle";
  if (v < 0.75) return "leaning higher";
  return "very high";
}

function Choices({
  options,
  value,
  onChange,
  multi,
}: {
  options: string[];
  value: string | string[];
  onChange: (v: string | string[]) => void;
  multi: boolean;
}) {
  const isOn = (o: string) =>
    multi ? (value as string[]).includes(o) : value === o;

  const toggle = (o: string) => {
    if (multi) {
      const arr = value as string[];
      onChange(arr.includes(o) ? arr.filter((x) => x !== o) : [...arr, o]);
    } else {
      onChange(o);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => toggle(o)}
          className={`px-4 py-2.5 rounded-full text-sm border transition ${
            isOn(o)
              ? "bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]"
              : "bg-[var(--bg-elev)] border-[var(--line)] hover:border-[var(--ink)]/40"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Telemetry({ label, v }: { label: string; v: number }) {
  return (
    <div className="rounded-xl bg-[var(--bg)] border border-[var(--line)] p-3">
      <div className="text-[10px] uppercase tracking-widest text-[var(--muted)]">{label}</div>
      <div className="mt-1 h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
        <div
          className="h-full bg-[var(--accent)]"
          style={{ width: `${v * 100}%`, transition: "width 600ms ease" }}
        />
      </div>
    </div>
  );
}

function Result({
  answers,
  valence,
  arousal,
}: {
  answers: Record<string, string | string[] | number>;
  valence: number;
  arousal: number;
}) {
  const themes = (answers.themes as string[]) || [];
  const support = (answers.support as string) || "weekly therapy";
  const where = (answers.where as string) || "your body";

  const summary =
    themes.length > 0
      ? `Anticipatory ${themes[0].toLowerCase()} surfacing in ${where.toLowerCase()}, with ${
          arousal > 0.6 ? "high activation" : arousal < 0.3 ? "low activation" : "moderate activation"
        } and ${
          valence > 0.6 ? "preserved capacity for joy" : valence < 0.35 ? "reduced positive affect" : "neutral baseline mood"
        }.`
      : "Baseline mood with mild bracing — worth exploring with a clinician.";

  return (
    <Section className="py-12 sm:py-16">
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <div className="chip">intake complete</div>
          <h1 className="font-serif text-3xl sm:text-5xl tracking-tight mt-3 leading-[1.05]">
            Here’s what I heard.
          </h1>
          <p className="text-[var(--muted)] mt-2 text-sm">A draft summary you can edit before any clinician sees it.</p>

          <div className="card mt-8 p-6 sm:p-8">
            <div className="text-xs uppercase tracking-widest text-[var(--muted)]">Working summary</div>
            <p className="font-serif text-xl mt-3 leading-snug">{summary}</p>
            <div className="divider-line my-5" />
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <Field label="Themes" v={themes.length ? themes.join(" · ") : "—"} />
              <Field label="Body" v={(answers.where as string) || "—"} />
              <Field label="Support" v={support} />
              <Field label="Logistics" v={(answers.logistics as string[])?.join(" · ") || "—"} />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-dashed border-[var(--line)] p-5 text-sm text-[var(--ink-2)]">
            <div className="text-xs uppercase tracking-widest text-[var(--muted)] mb-2">What happens next</div>
            We’ll show you three real clinicians who fit. Your intake will be wrapped in a credential you control — no clinician sees it without your tap.
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/therapists" className="btn btn-primary">
              See my 3 matches →
            </Link>
            <Link href="/" className="btn btn-ghost">
              Save for later
            </Link>
          </div>
        </div>
        <aside className="lg:col-span-5">
          <div className="card p-6">
            <div className="grid place-items-center">
              <MoodOrb size={260} valence={valence} arousal={arousal} label="your mood map · today" />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              <Telemetry label="Valence" v={valence} />
              <Telemetry label="Arousal" v={arousal} />
            </div>
            <div className="divider-line my-5" />
            <div className="text-xs text-[var(--muted)]">
              Saved as a verifiable credential <span className="font-mono text-[var(--ink-2)]">vc:tmh:intake.{Date.now().toString(36).slice(-5)}</span>
            </div>
          </div>
        </aside>
      </div>
    </Section>
  );
}

function Field({ label, v }: { label: string; v: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-[var(--muted)]">{label}</div>
      <div className="text-[var(--ink-2)] mt-1">{v}</div>
    </div>
  );
}
