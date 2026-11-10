# Book event app

This app belongs to **State. Not Situation.** It has no connection to another product or project.

## For the host

Open `/live/host` and sign in with the private host key. Create a test room, share its QR code with at least two people, press **Pair the guests**, then **Start Card 01**. Everyone stays on the same step until you continue. People do not need phone numbers or accounts.

Use the main action to move forward. **Look up** holds the phone screens during conversation. **Pause session** is under Room tools. Pairing and saved answers survive refreshing the browser. For an odd number, one guest waits through the pair activities and can join the individual games. A helper can join as an extra real participant before pairing.

The first message, its meaning, the interpretation, replies and expectations are entered by real participants. Typing dots come only from recent input in a partner's reply field. They expire after three seconds and stop during host pauses. The host explicitly controls reply delivery. No sample people, simulated typing or generated answers are used.

Before Card 04, save how many people you expect to select each answer. This prediction locks when Card 04 opens. **Open the final reveal** requires confirmation. The room screen has its own link and never projects pair messages.

## Access

Test rooms are separate from event rooms and require the private guest link. Public event participation is blocked before 3 December 2026, 18:00 Europe/Luxembourg (`2026-12-03T17:00:00Z`), including direct API requests. Host access remains available for preparation. The event room can be created in advance and stays available through the day after opening. Test-room data expires after 24 hours; create a fresh room when preparing on another day.

Host passwords and session keys live only in private environment variables. They must never be committed, copied into issue descriptions or put in guest links. Guest membership uses secure HttpOnly cookies, distinct for each room. Do not share the host key with guests.

## Implementation

Next.js route handlers, a separate Vercel-managed Neon database, versioned compare-and-swap writes, and a pure game engine. Each state response is built from an explicit permission-specific object. Polling updates guests approximately every 1.5 seconds. Host commands include a request ID and expected version to prevent duplicate advancement.

Tables are `book_live_rooms`, `book_live_typing` and `book_live_limits`. `npm run db:live` creates only these namespaced tables. Use environment variables supplied by the linked book Vercel project. Never use another project's database.

Required environment variables: `DATABASE_URL`, `LIVE_HOST_PASSWORD`, `LIVE_SESSION_SECRET` and `CRON_SECRET`. `ADOBE_FONTS_KIT_ID` is optional; the book-only published kit is the default. Fonts are served by Adobe, never uploaded as desktop font software. The CSS uses the actual returned font-family names.

Expired rooms cannot be read by the application. The daily Vercel cleanup job removes expired rows, so physical deletion may follow expiry by up to a day. Provider backups have their own retention. Message contents are excluded from application logging and analytics; the live route does not load marketing analytics.

## Verification

`npm test`, `npm run test:live`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`.

`node scripts/live-smoke.mjs` exercises independent HTTP cookie jars against a running server and the real database. Set `LIVE_TEST_ORIGIN` for the corresponding deployment. It checks invitations, pairing, late joining, immutable answers, typing expiry, pause, global reveal, projector privacy, refresh and the opening-time gate. It uses explicitly created test rooms, never a room selected by an event host.

Rehearse on actual phones at the venue before the event. A sleeping phone or closed tab cannot be controlled by the host; on return, it fetches the current step. Keep a paper or spoken fallback for Wi-Fi problems.
