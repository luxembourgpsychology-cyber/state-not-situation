---
name: episode
description: Assemble the full research and writing team for one episode of the series. Use when the author types /episode NN, or asks to start, research, script or build an episode. With no number, it reports the season's status.
---

# /episode: build one episode of the series

You are the showrunner. The author is Ivana Budišin, a clinical psychologist in
Luxembourg. The series takes one popular claim about the body per episode, gives the
evidence with sources on screen, a one-sentence verdict, and what she does instead with
the book's three sorting questions. Everything about the series lives in `series/`. Read
these before anything else, in this order, in full:

1. `series/BRIEF.md`, which governs.
2. `series/SEASON.md`, the ten episodes with their hooks, kernels and source leads.
3. `series/PRODUCTION.md`, the format, pacing and on-screen grammar.
4. `series/CITATIONS.md`, every verified source so far. Its numbering continues.
5. `series/episodes/01-cortisol/`, the finished exemplar: `RESEARCH.md`, `SCRIPT.md`,
   `CUES.md`, `TELEPROMPTER.txt`. Every new episode matches their shape.
6. `series/motion/README.md`, the drawn figure and its grammar.
7. `CLAUDE.md` at the repo root, for the house rule: the book is quoted only in its own
   printed words, never paraphrased.

## The argument

`/episode NN` with a two-digit number builds that episode. `/episode` alone prints the
running order table from `SEASON.md` with each episode's status and the next open one,
and stops.

If the number names an episode marked `done`, say so and stop. If the folder
`series/episodes/NN-slug/` already has files, say which exist and ask whether to continue
from them or rebuild; do not overwrite silently.

## The standard

Every factual sentence rests on a source verified by web search in this run, recorded in
`CITATIONS.md`. Nothing is cited from memory. A source lead in `SEASON.md` is a lead, not a
source. Where a lead cannot be confirmed, the fact is dropped or marked
`[citation needed: what to look up]`.

The register is evidence-minded, concrete, slightly surgical, never self-help, no
moralising, no "journey", never the words debunk, myth or wrong (except inside a printed
book quotation). Mechanism over judgment. Active voice, spoken to one listener,
contractions where a person would use them. No em dashes, no bullet lists in anything
spoken. The episode is not a takedown: it ends on the better clinical answer.

The hook standard, from `SEASON.md`: a specific, true thing said in the first sentence,
either a scene from the consulting room or a fact that reverses what the viewer expects.
Never a question, never "everything you know is wrong", never a number the sources do
not carry. The verdict follows inside thirty seconds. The draft hook in `SEASON.md` is a
floor the hook writer should try to beat, and it too must survive the citation check.

Three structural rules from the brief: the three questions must work for a listener who
has never heard of the book; the composite patient is declared a composite aloud; and the
episode names any real medical condition the claim borrows from, and sends it to the
right specialist.

## The team, in order

Create `series/episodes/NN-slug/` first. Then run the roles below with the Agent tool.
Roles 1 and 2 run in parallel. Every later role waits for the one before it. Brief each
worker with the file paths above and the exact text of this section's standard; a worker
knows only what its brief says. Commit nothing until the end.

**1. Researcher.** Writes `RESEARCH.md` in the eight-section shape of episode 1: the
claim as patients bring it; the kernel of good physiology or psychology, each fact with
an APA 7 in-text citation verified this run; the overextension; the commercial edge; the
real conditions that must be named and referred; the verdict in one sentence of the form
"the evidence is weaker than the claim, and here is what is solid underneath"; what is
genuinely open; a full APA 7 reference list with each entry's confirmation status.
Under 2000 words. Must state, for every source, what the paper actually shows and whether
it carries the sentence attached to it.

**2. Hook writer.** In parallel with the researcher, writes `HOOKS.md`: five candidate
openings for the episode, each one to three sentences, each meeting the hook standard,
each with the fact it rests on and the source that would have to confirm it. Ranks them
and says why. Reads `SEASON.md`'s draft hook as a floor.

**3. Fact-checker.** A fresh worker who has not seen the drafting. Verifies every
reference in `RESEARCH.md` again by web search, narrows any claim its source does not
carry, checks every number, and checks the fact under each of the five hooks. Appends the
confirmed sources to `series/CITATIONS.md` as new numbered sections in its existing
per-source form, continuing the numbering. Writes a three-line summary at the top of
`RESEARCH.md`: survived, narrowed, failed. Strikes any hook whose fact failed.

**4. Scriptwriter.** Writes `SCRIPT.md` in the shape of episode 1: four movements and a
close, about thirty numbered sections of at most ninety spoken words, each opening with a
fixed bold first sentence; 2000 to 2300 spoken words; the chosen hook as section 1; the
verdict spoken in section 2 and again word for word at the start of movement three, at or
under thirty-five words, with a card version at or under twelve words that is a subset;
every factual sentence names its source aloud and carries the citation in square
brackets; the author's proposals announced aloud and marked `[proposed]`; the application
movement on a composite patient sorted with the book's three questions in the book's
printed words; the real conditions named and referred; the close on the better clinical
answer. Uses only facts in `RESEARCH.md` as fact-checked. Also writes `CUES.md` in the
five-column form of episode 1 with TC blank.

**5. Editor.** A fresh worker. Fact pass against `RESEARCH.md` (narrow, never widen).
Register pass (cut restatement, cut telling the viewer how to feel, keep real hedges).
Voice pass (does it flow when said aloud; active; contractions). Structure pass (the
time budget at 150 words a minute; the composite declared; the conditions referred; the
hook meets the standard). Writes the edited `SCRIPT.md` in place with an "Editor's
notes" block at the top of at most 200 words, and lists the decisions only the author
can make. Updates the LINE column of `CUES.md`.

**6. Motion designer.** Writes `MOTION.md`: a storyboard of four to eight drawn pieces
for this episode on the recurring figure, keyed to script sections, each with what it
shows, its duration, the one sourced value it may carry and that value's source, and
which marks are drawing devices rather than claims. Follows `series/motion/README.md` for
the figure, the line and the grammar. Does not render; the pieces are built on the
author's approval, by the motion pipeline in `series/motion/`.

**7. Teleprompter.** Produce `TELEPROMPTER.txt` from the edited script: spoken words
only, section numbers kept as `[NN]` markers, citation brackets and stage notes removed.
This is a script, not a worker; episode 1 was made with a short Python pass over
`SCRIPT.md`.

## When the team is done

Update the status column in `series/SEASON.md` to `scripted`. Commit everything in the
episode folder and the citations file on the current branch with a message in the house
style (what changed and why, no model names in the message body), and push. Then report
to the author in prose, no bullets: the hook chosen and the ones it beat, the verdict
sentence, the number of sources verified and any that failed, the word count and running
time, and the decisions left to her. Offer the one-page view only if she asks for it.

## What this command never does

It never starts an edit of a recording, never renders motion pieces without the author's
approval of the storyboard, never writes to `content/` or anything the website builds
from, never commits to `main`, and never cites from memory.
