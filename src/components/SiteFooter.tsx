import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--line)] bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <span className="relative h-8 w-8 grid place-items-center">
              <span className="absolute inset-0 rounded-full bg-[var(--accent)]" />
              <span className="absolute inset-[3px] rounded-full bg-[var(--bg)]" />
              <span className="absolute inset-[6px] rounded-full bg-[var(--accent)]" />
            </span>
            <span className="font-serif text-[1.15rem] tracking-tight">TeleMood Health</span>
          </div>
          <p className="mt-4 text-sm text-[var(--muted)] max-w-sm leading-relaxed">
            Therapy that meets your nervous system where it is. Decentralized identity, end-to-end
            encryption, and clinicians who actually listen.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 chip">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
            All systems calm
          </div>
        </div>

        <FooterCol
          title="Care"
          links={[
            { href: "/assessment", label: "Mood intake" },
            { href: "/therapists", label: "Find a therapist" },
            { href: "/session", label: "Live session" },
            { href: "/ar-tools", label: "AR emotion tools" },
          ]}
        />

        <FooterCol
          title="Trust"
          links={[
            { href: "/privacy", label: "Privacy & DID" },
            { href: "/privacy#hipaa", label: "HIPAA, GDPR" },
            { href: "/privacy#research", label: "Research ethics" },
            { href: "/privacy#crisis", label: "Crisis resources" },
          ]}
        />

        <FooterCol
          title="Company"
          links={[
            { href: "/", label: "About" },
            { href: "/", label: "For employers" },
            { href: "/", label: "Press" },
            { href: "/", label: "Careers" },
          ]}
        />
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between text-xs text-[var(--muted)]">
          <p>© {new Date().getFullYear()} TeleMood Health PBC. Licensed in 38 states. Not a substitute for emergency care.</p>
          <p className="max-w-md">
            If you are in crisis, dial <span className="text-[var(--ink)] font-medium">988</span> (US) or your local emergency line.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-widest text-[var(--muted)]">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link className="text-sm hover:text-[var(--accent)] transition" href={l.href}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
