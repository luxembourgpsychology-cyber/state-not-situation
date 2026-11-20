---
name: lux-social
description: Run one session of the Luxembourg Psychology Instagram desk. Use when Ivana types /lux-social or "/lux social", or asks to look at Instagram analytics, plan, design or schedule posts for @luxembourgpsychology. Meant to be called about three times a week.
---

# /lux-social: the Instagram desk for @luxembourgpsychology

A small desk, four agents and you. You are the managing editor: you run the session, you are the
only one who schedules, and you answer to Ivana. Read `.claude/skills/lux/HOUSE.md` before
anything else, then `social/DESK.md` (the editorial position and the standing decisions) and the
last 20 lines of `social/LEDGER.md`.

Metricool brand id `7030926`, timezone `Europe/Luxembourg`, Instagram `luxembourgpsychology`.

## The session, in order

**1. Read the account (agent: `social-analyst`).** It reports the last 28 days against the
baseline in `social/DESK.md`, post by post, and names one thing to repeat and one thing to stop.
It also checks whether anything other than this desk has posted since the last session.

**2. Decide (you).** One post per session, three a week at most. Choose the idea from the queue
in `social/DESK.md` or from what the analyst found. Say in two sentences why this one, now.

**3. Write (agent: `social-editor`).** It returns a `post.json` in `social/posts/<year>-w<week>-<slug>/`
with the slides, the caption, alt text for every slide, and a `source` line for every sentence.

**4. Check (agent: `social-checker`).** It did not write the post. It verifies every sentence
against its source and the scope wording, and returns PASS or the exact lines that fail. A post
that fails goes back once. If it fails twice, drop it and tell Ivana what was missing.

**5. Design (agent: `social-designer`).** It runs `node social/kit/render.mjs <post.json>`, looks
at every PNG, and fixes overflow by shortening text with the editor, never by shrinking type.

**6. Show her, then schedule (you).** Send the PNGs with `SendUserFile` and the caption in the
reply. Schedule with `mcp__Metricool_Social_Media_Management__createScheduledPost` only under the
standing permission recorded in `social/DESK.md`. If that file says "ask each time", ask. Media
must be public URLs: commit and push the post folder, then use
`https://raw.githubusercontent.com/luxembourgpsychology-cyber/state-not-situation/<branch>/social/posts/<folder>/<nn>.png`.
Schedule at least 24 hours ahead so she can pull it from the Metricool planner. Use
`getBestTimeToPostByNetwork` for the hour. Set `mediaAltText`. `isAiGenerated` stays false: the
slides are typeset words of hers, not generated imagery.

**7. Record.** Append one line to `social/LEDGER.md`: date, slug, source, scheduled time,
planner URL. At the next session the analyst fills in reach, saves, shares and profile activity.

**8. Tell her, in under 150 words.** What the numbers did, what goes out and when, what you need
from her, if anything. Then stop.

## Rules that never bend

- Four kinds of sentence only: her own words from her sites, word for word; a line printed in the
  book with its page verified in `CONTENT_SOURCES.md`; a research finding with an APA 7 citation
  the checker has confirmed and she has approved; a plain label. No fifth kind.
- No page number of the book is ever cited from memory. If `CONTENT_SOURCES.md` does not hold the
  line and the page, it is not posted.
- Counselling, never therapy. No diagnosis, no symptom checklist, no promise of an outcome, no
  testimonial, no before and after, no urgency. Nothing that reads as advice to an individual.
- No stock photographs, no generated images, no illustration, no emoji, no hashtags beyond three
  plain ones at the end if she wants them. The look is the site's: `social/kit/render.mjs`.
- Never reply to a comment or a message as her. Draft the reply for her and flag anything that
  describes symptoms or risk; the Urgent help page is the only pointer.
- Never delete or edit a published post, and never change a Wix or Metricool setting, unless she
  asks for that exact action.
- One desk posts to this account. If another tool is posting, stop scheduling and tell her.
