# TeleMood Health

> Therapy that meets your nervous system where it actually is.

TeleMood pairs people with vetted clinicians through a gentle, AI-led mood
intake — then keeps each session held by encrypted video, on-device AR
emotion tracking, and a portable identity the user controls.

## What's in this app

- `/` — landing experience with hero, principles, therapist showcase, AR strip
- `/assessment` — multi-step AI mood intake with live mood-orb feedback
- `/therapists` — searchable therapist directory with rich filtering
- `/therapists/[id]` — clinician profile with a real booking flow
- `/session` — live video session UI with AR overlay, captions, co-authored notes
- `/ar-tools` — interactive AR emotion-tracking sandbox (grounding, weather, face map, compass)
- `/privacy` — DID + verifiable credential privacy paper

## Stack

- Next.js (App Router) · React 19 · TypeScript
- Tailwind CSS v4 with custom design tokens
- Geist + Fraunces (variable serif) typography

## Run locally

```bash
npm install
npm run dev
```

Visit <http://localhost:3000>.

## Build

```bash
npm run build
```

## License

UNLICENSED — concept project.
