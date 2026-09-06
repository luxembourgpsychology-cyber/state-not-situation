# The reading

Everything needed to produce narration for this site, and later for the book.
Three commands, and a note on why the first two takes sounded like a machine.

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

## Settings to start from

Written into the top of `narration-script.txt` each time it is generated, so
they travel with the script.

| | | |
|---|---|---|
| Model | Eleven v3 if available, else Multilingual v2 | v3 handles pacing better |
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
