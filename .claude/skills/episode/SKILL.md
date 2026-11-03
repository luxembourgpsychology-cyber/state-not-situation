---
name: episode
description: Assemble the full research and writing team for one episode of the series, in the six-beat format. Use when the author types /episode NN, or asks to start, research, script or build an episode. With no number, it reports the season's status.
---

# /episode: build one episode of the series

You are the showrunner. The author is Ivana Budišin, a clinical psychologist in
Luxembourg. The series takes one popular claim about the body per episode: a sentence a
patient has said, a verdict as a headline, the viewer's own commitment, three stories
that trace the sentence from the finding it started as to what is true underneath, the
room where the composite is sorted with the book's three questions and the viewer does
one thing on their own body, and the return to what they wrote. Everything lives in
`series/`. Read these first, in this order, in full:

1. `series/BRIEF.md`, which governs the claims.
2. `series/FORMAT.md`, which governs the shape: the six beats, the stories, the thing you
   do, the retraction line, continuity.
3. `series/SEASON.md`, the ten episodes with their claims, draft hooks, kernels and source
   leads.
4. `series/PRODUCTION.md`, the on-screen grammar, bands, cards, recording and publishing.
   Its four-movement time budget is superseded by `FORMAT.md`.
5. `series/CITATIONS.md`, every verified source so far. Its numbering continues.
6. `series/episodes/01-cortisol/`, the first episode, in the earlier evidence-first form.
   Match its files' shapes (`RESEARCH.md` sections, `CUES.md` columns,
   `TELEPROMPTER.txt`), not its script structure.
7. `series/motion/README.md`, the drawn figure and its grammar.
8. `CLAUDE.md` at the repo root, for the house rule: the book is quoted only in its own
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
spoken. The episode is not a takedown: whoever stretched the claim is named without
contempt, and the episode ends on the better clinical answer.

The three questions must work for a listener who has never heard of the book. The
composite is declared a composite aloud. Any real medical condition the claim borrows from
is named and sent to the right specialist. The author's proposals are announced aloud,
marked `[proposed]`, and carry no band.

Six to nine sources per episode, not twenty. Each story carries two or three. A source
that no story needs is cut from the script and kept in `RESEARCH.md`.

## The team, in order

Create `series/episodes/NN-slug/` first. Then run the roles below with the Agent tool.
Roles 1 and 2 run in parallel. Every later role waits for the one before it. Brief each
worker with the file paths above and the exact text of this section's standard and of the
relevant parts of `FORMAT.md`; a worker knows only what its brief says. Commit nothing
until the end.

**1. Researcher.** Writes `RESEARCH.md` in the eight-section shape of episode 1: the
claim as patients bring it, with the one sentence that will be the cold-open card; the
kernel, each fact with an APA 7 in-text citation verified this run; the overextension;
the commercial edge, naming who gained; the real conditions to name and refer; the
verdict in one sentence; what is genuinely open; a full APA 7 reference list with each
entry's confirmation status. Under 2000 words. States for every source what it actually
shows and whether it carries the sentence attached to it. Also, in a ninth section,
proposes the thing the viewer does: one action under a minute, on the body or the day,
tied to the claim, that the viewer cannot fail.

**2. Story finder.** In parallel with the researcher, writes `STORIES.md`: for each of
the three slots in `FORMAT.md` (where the sentence was born, where it broke, what is true
underneath), two or three candidate stories, each with its person, year and place, the
measurement or decision at its centre, the mechanism it pays off as in one repeatable
sentence, the sources that would have to confirm it, and a length estimate. Ranks the
candidates per slot and proposes the first sentence of the first story as the hook,
meeting the hook standard in `SEASON.md` and `FORMAT.md`. Also proposes the retraction
line: the evidence that would overturn the verdict.

**3. Fact-checker.** A fresh worker who has not seen the drafting. Verifies every
reference in `RESEARCH.md` and under every candidate story by web search, narrows any
claim its source does not carry, checks every number, date, name and place in the
stories. Appends the confirmed sources to `series/CITATIONS.md` as new numbered sections
in its existing per-source form, continuing the numbering. Writes a three-line summary
at the top of `RESEARCH.md` and of `STORIES.md`: survived, narrowed, failed. Strikes any
story whose central fact failed.

**4. Scriptwriter.** Writes `SCRIPT.md` in the six beats of `FORMAT.md`, with its time
budget, as numbered sections of at most ninety spoken words, each opening with a fixed
bold first sentence; 2000 to 2300 spoken words in all. Beat 1 is the card's sentence and
a stage note, not spoken. Beat 2 carries the verdict, identical in wording to the card
version's superset, and the host's one-sentence introduction. Beat 3 is the commitment,
word for word from `FORMAT.md`, with the ten-second clock as a stage note. Beat 4 is the
three stories chosen from `STORIES.md` as fact-checked, each with its sources named aloud
and bracketed, each paying off in its one repeatable sentence. Beat 5 is the composite,
the three questions in the book's printed words, the thing the viewer does, the real
conditions referred, and the better clinical answer. Beat 6 is the return, the retraction
line, and the close. Uses only facts in `RESEARCH.md` and `STORIES.md` as fact-checked.
Also writes `CUES.md` in the five-column form of episode 1 with TC blank, adding a row for
the cold-open card and the commitment clock.

**5. Editor.** A fresh worker. Fact pass against `RESEARCH.md` and `STORIES.md` (narrow,
never widen). Story pass: does each story have a person, a year, a place, a measurement
and a one-sentence payoff; is any story merely interesting; cut it if so. Register pass
(cut restatement, cut telling the viewer how to feel, keep real hedges, no contempt for
whoever gained). Voice pass (does it flow when said aloud; active; contractions).
Structure pass (the six beats and their budget at 150 words a minute; the verdict under
twenty seconds; the commitment word for word; the thing you do under a minute and tied to
the claim; the retraction line specific enough for a researcher to bring). Writes the
edited `SCRIPT.md` in place with an "Editor's notes" block at the top of at most 200
words, and lists the decisions only the author can make. Updates the LINE column of
`CUES.md`.

**6. Motion designer.** Writes `MOTION.md`: a storyboard of one drawn piece per story and
one for the thing you do, on the recurring figure, keyed to script sections, each with
what it shows, its duration, the one sourced value it may carry and that value's source,
which marks are drawing devices rather than claims, and the continuity link to an earlier
or later episode as `FORMAT.md` describes. Follows `series/motion/README.md` for the
figure, the line and the grammar. Does not render; the pieces are built on the author's
approval, by the motion pipeline in `series/motion/`.

**7. Teleprompter.** Produce `TELEPROMPTER.txt` from the edited script: spoken words
only, section numbers kept as `[NN]` markers, citation brackets and stage notes removed,
the ten-second silence marked as `[TEN SECONDS]`. This is a script, not a worker; episode
1 was made with a short Python pass over `SCRIPT.md`.

## When the team is done

Update the status column in `series/SEASON.md` to `scripted`. Commit everything in the
episode folder and the citations file on the current branch with a message in the house
style (what changed and why, no model names in the message body), and push. Then report
to the author in prose, no bullets: the card sentence, the verdict, the three stories
chosen and the ones they beat, the thing the viewer does, the retraction line, the number
of sources verified and any that failed, the word count and running time, and the
decisions left to her. Offer the one-page view only if she asks for it.

## What this command never does

It never starts an edit of a recording, never renders motion pieces without the author's
approval of the storyboard, never writes to `content/` or anything the website builds
from, never commits to `main`, never names the beats on camera, and never cites from
memory.
