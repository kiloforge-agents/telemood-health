export type Therapist = {
  id: string;
  name: string;
  initials: string;
  pronouns: string;
  title: string;
  modalities: string[];
  specialties: string[];
  languages: string[];
  states: string[];
  rate: number;
  insurances: string[];
  bio: string;
  rating: number;
  sessions: number;
  nextSlot: string;
  accent: "sage" | "warm" | "lavender" | "sun";
};

export const therapists: Therapist[] = [
  {
    id: "ada-okonkwo",
    name: "Dr. Ada Okonkwo",
    initials: "AO",
    pronouns: "she/her",
    title: "Licensed Clinical Psychologist, PhD",
    modalities: ["CBT", "ACT", "Trauma-focused"],
    specialties: ["Anxiety", "Burnout", "Identity"],
    languages: ["English", "Igbo"],
    states: ["NY", "NJ", "CA", "TX"],
    rate: 165,
    insurances: ["Aetna", "Cigna", "Out-of-network superbill"],
    bio: "Warm, paced sessions that braid cognitive tools with somatic awareness. Specializes in high-achievers untangling their nervous system from their inbox.",
    rating: 4.95,
    sessions: 1820,
    nextSlot: "Tomorrow · 9:30 AM",
    accent: "sage",
  },
  {
    id: "miguel-arroyo",
    name: "Miguel Arroyo, LMFT",
    initials: "MA",
    pronouns: "he/him",
    title: "Licensed Marriage & Family Therapist",
    modalities: ["EFT", "Gottman Method", "IFS"],
    specialties: ["Couples", "Attachment", "Grief"],
    languages: ["English", "Spanish"],
    states: ["CA", "WA", "AZ", "FL"],
    rate: 180,
    insurances: ["Anthem", "Kaiser", "UHC"],
    bio: "Couples often arrive carrying years of tension. We slow down, name the dance, and make space for what each partner has been quietly hoping for.",
    rating: 4.92,
    sessions: 2340,
    nextSlot: "Thu · 6:15 PM",
    accent: "warm",
  },
  {
    id: "priya-shah",
    name: "Priya Shah, LCSW",
    initials: "PS",
    pronouns: "she/her",
    title: "Trauma-informed Clinical Social Worker",
    modalities: ["EMDR", "Somatic Experiencing"],
    specialties: ["Complex trauma", "PTSD", "First-gen"],
    languages: ["English", "Hindi", "Gujarati"],
    states: ["IL", "MI", "OH", "NY"],
    rate: 155,
    insurances: ["BCBS", "Optum", "Out-of-pocket"],
    bio: "Trauma is not the story — it’s how the body remembers. We work gently, titrating activation, until your system trusts that the danger is past.",
    rating: 4.97,
    sessions: 980,
    nextSlot: "Mon · 11:00 AM",
    accent: "lavender",
  },
  {
    id: "noor-haddad",
    name: "Dr. Noor Haddad",
    initials: "NH",
    pronouns: "they/them",
    title: "Psychiatrist, MD · Therapy + Med Mgmt",
    modalities: ["Psychodynamic", "Pharmacotherapy"],
    specialties: ["Mood disorders", "ADHD", "OCD"],
    languages: ["English", "Arabic"],
    states: ["MA", "NY", "PA", "CT"],
    rate: 240,
    insurances: ["Aetna", "Harvard Pilgrim", "Tufts"],
    bio: "Med decisions made together, not at you. Sessions blend psychodynamic listening with rigorous, side-effect-aware prescribing.",
    rating: 4.89,
    sessions: 1410,
    nextSlot: "Fri · 8:00 AM",
    accent: "sun",
  },
  {
    id: "june-park",
    name: "June Park, LMHC",
    initials: "JP",
    pronouns: "she/they",
    title: "Mental Health Counselor",
    modalities: ["DBT", "Mindfulness-based"],
    specialties: ["Emotion regulation", "Disordered eating"],
    languages: ["English", "Korean"],
    states: ["WA", "OR", "CA"],
    rate: 140,
    insurances: ["Premera", "Regence", "Self-pay"],
    bio: "You don’t need to white-knuckle through another week. We’ll build a kit of skills you actually use, so feelings stop running the show.",
    rating: 4.96,
    sessions: 760,
    nextSlot: "Wed · 5:45 PM",
    accent: "sage",
  },
  {
    id: "samuel-ortiz",
    name: "Samuel Ortiz, LPC",
    initials: "SO",
    pronouns: "he/him",
    title: "Licensed Professional Counselor",
    modalities: ["Narrative", "Existential"],
    specialties: ["Men’s mental health", "Meaning", "Career"],
    languages: ["English", "Spanish", "Portuguese"],
    states: ["TX", "CO", "NM"],
    rate: 130,
    insurances: ["Out-of-network superbill"],
    bio: "Honest, unhurried conversation. Together we look at the stories you’ve inherited and the ones still worth writing.",
    rating: 4.91,
    sessions: 540,
    nextSlot: "Today · 7:30 PM",
    accent: "warm",
  },
];

export const allModalities = Array.from(
  new Set(therapists.flatMap((t) => t.modalities))
).sort();

export const allSpecialties = Array.from(
  new Set(therapists.flatMap((t) => t.specialties))
).sort();

export const allLanguages = Array.from(
  new Set(therapists.flatMap((t) => t.languages))
).sort();
