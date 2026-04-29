export function Avatar({
  accent,
  initials,
  size = 64,
}: {
  accent: "sage" | "warm" | "lavender" | "sun";
  initials: string;
  size?: number;
}) {
  const grad: Record<string, string> = {
    sage: "from-[var(--sage)] to-[var(--accent-2)]",
    warm: "from-[var(--warm-soft)] to-[var(--warm)]",
    lavender: "from-[var(--lavender)] to-[#7d75a0]",
    sun: "from-[var(--sun)] to-[#b48b30]",
  };
  return (
    <div
      className={`rounded-2xl bg-gradient-to-br ${grad[accent]} grid place-items-center text-white font-serif`}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  );
}
