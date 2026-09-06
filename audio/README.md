# The reading

**Taken off the site on 6 September 2026.** The author listened and judged the
reading not good enough to carry the book: *"take out the reading… it's bad."*
`editions.en.audioUrl` in `site.config.ts` is now `null`, which removes the
section from the home page, from `/read` and from the footer in one value. The
pipeline below still works and nothing was deleted. Read the next section before
spending anything on this again.

Everything needed to produce narration for this site, and later for the book.
Three commands, and a note on why the first two takes sounded like a machine.

## What the tests actually showed, 6 September 2026

Four generations from the author's own Professional Voice Clone, same paragraph
— the Kennedy reveal, the one place a reader expects a held pause. Two on
Eleven v3 with inline direction, two on Multilingual v2. Cost: 23 cents.

| | v3, directed | Multilingual v2 |
|---|---|---|
| The pause where 2.0 s was written | 0.56 s / 0.91 s | **2.24 s / 2.19 s** |
| Pitch range | 6.8 / 7.8 st | **10.1 / 9.5 st** |
| Signal to noise | 25 dB | **58 dB** |
| Noise floor between phrases | −49 dB | −91 dB |

Three things follow, and they are worth more than the recording was.

1. **Multilingual v2 honours `<break>` exactly; v3 compresses it to about half.**
   Every earlier take was v3, which is why nothing in five minutes was ever held
   longer than 1.40 s. That ceiling was the model's, not the reading's.
2. **The direction tags flattened it.** `[slow, grave]` cost roughly 2.5
   semitones of pitch range against plain text on v2. The tags did the opposite
   of what they promise.
3. **v3 emits a −49 dB noise floor; v2 emits −91 dB.** The between-phrase
   "dips" the author heard were partly this and partly the old mastering chain,
   which moved gain more than 3 dB inside 10 ms on 144 occasions. `master.py`
   was rewritten to a single slew-limited envelope (0.35 dB per 10 ms, forward
   and backward) and now moves a median 0.03 dB per frame inside speech.

So: **generate on Multilingual v2, write the breaks in, and add no direction
tags.** A full five-minute take of the site extract costs about a dollar at the
rate these four were charged, and the whole book on the same basis is a
two-figure sum, not a four-figure one. Money was never the problem here.

The remaining problem is that a generated reading of *this* book is a claim the
site cannot make. See "What the site may say" below.

## The three commands

```bash
# 1. Turn a passage into a narration script with the breaths written in
node audio/narration-script.mjs                    # the site's extract
node audio/narration-script.mjs chapter-01.txt     # any plain text file

# 2. Master whatever comes back
python3 audio/master.py "The Pilot NEW.mp3" --out public/audio/extract-en.m4a
python3 audio/master.py take.wav --presence 3.5    # if the take sounds distant

# 3. Check it before it goes anywhere
python3 audio/qc.py "The Pilot NEW.mp3" 753
```

`master.py` never changes a word and never changes timing. It removes level
drift, lifts the voice off the room, and sets the loudness. `qc.py` cannot tell
you whether a reading is good; it tells you whether it is uneven, noisy, rushed
or flat.

## What the numbers should say

| | Aim for | The two takes so far |
|---|---|---|
| Level drift across the file | under 3 dB | 9.0 dB, then 4.8 dB |
| Signal to noise | over 40 dB | 22.5 dB, then 26.8 dB |
| Pace | 115 to 145 words a minute | 141, then 140 |
| Pitch range | 8 semitones or more | 9.8, then 9.0 |
| Pause variety | 0.6 or more | 0.56, then 0.53 |
| Longest hold | 2 s or more in five minutes | 1.32 s, then 1.40 s |

Mastering fixes the first two rows. It cannot fix the last two, and those are
what make a reading sound automated.

## Why it sounds like a machine

It is not the pitch. Both takes move 9 semitones, which is inside the range of
engaged human narration. **It is the timing.** The pauses are all roughly the
same length — mean 0.47 s, standard deviation 0.25 — and nothing in five minutes
is held longer than 1.4 seconds. A person reading this passage aloud takes two
or three seconds before "The pilot's name was John F. Kennedy Jr.", because that
is the reveal. Uniform silence is the tell.

The two takes are also almost identical to each other: 140 against 141 words a
minute, 61 against 65 pauses, 0.53 against 0.56 variability. Two human
performances of the same page do not land that close together.

So: the fix is not a slider marked *stability*. Raising stability makes the
delivery **more** uniform, which is the direction the problem is already in.

**Resolved on 6 September 2026.** The 1.4 s ceiling was Eleven v3 compressing
the written `<break>` tags, not the reading. Multilingual v2 honours them to
within 0.25 s, which puts the two-second hold before the reveal within reach.
The paragraph above stands as the diagnosis; the cause is now known.

## Settings to start from

Written into the top of `narration-script.txt` each time it is generated, so
they travel with the script.

| | | |
|---|---|---|
| Model | **Multilingual v2** | measured 6 September: v2 honours the written breaks, v3 halves them |
| Direction tags | **none** | `[slow, grave]` cost 2.5 semitones of pitch range against plain text |
| Stability | **0.40** | higher is steadier *and flatter*; this is the slider that causes the problem |
| Similarity | 0.80 | how close to your own voice |
| Style | 0.15 | above about 0.35 it starts to wobble |
| Speaker boost | on | |

**Generate one paragraph at a time.** A single five-minute generation holds one
tempo throughout and drifts in level — which is exactly what both takes did.
Per-paragraph generation gives each paragraph its own delivery, removes the
drift, and lets one bad paragraph be re-rolled without redoing the rest.
`narration-script.mjs` chunks the text for this and numbers the chunks.

**The breaks are the point.** They are written into the script, sixteen of them
for the extract: 1.4 s between paragraphs, 0.6 s where a long sentence lands on
a short one. Do not add more by hand — too many breaks in one chunk make the
model unstable, which is the opposite of what is wanted.

## To sound like you

An Instant Voice Clone is built from a couple of minutes and will not hold up
across a book. A Professional Voice Clone is trained on around thirty minutes of
your own clean speech and is the thing that actually sounds like a person.

If the whole book is going to be narrated, record those thirty minutes first,
with the same microphone and room each time. `qc.py` will tell you whether the
source is clean enough before it is used for training: aim for signal to noise
over 40 dB and no clipping. The second take was recorded 4.5 dB darker than the
first, which reads as standing further away — worth fixing at the microphone
rather than with the `--presence` flag.

## What the site may say

`listen.subtitle` in the content files reads "Read by the author". **It is not
rendered.** A site whose whole rule is that it does not claim what it cannot
stand behind cannot describe a generated reading as a performance. When the
voice is settled, decide what is true — the author reading, or the author's
voice — and the line goes back in one edit.

## The whole book, later

The same three commands scale. Per chapter:

```bash
node audio/narration-script.mjs chapters/01.txt
# generate the numbered chunks, concatenate them in order
python3 audio/master.py chapters/01-joined.wav --out public/audio/chapter-01.m4a
python3 audio/qc.py chapters/01-joined.wav 4200
```

Keep every raw generation. Mastering is repeatable; a re-generation is not.
