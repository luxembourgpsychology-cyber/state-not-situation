# Identity: how the book carries to the channel

For *Bifurcation: Dynamical Systems. The Biology of a State*, the discussion series
described in `BRIEF.md`. Written 17 October 2026. A working draft until the author has
read it; nothing here is committed.

The rule is the same as the site's. The channel may use nothing the book's system does not
already contain. Every value below is taken from `DESIGN_SYSTEM.md` and
`BRAND_BASELINE.md`, and where this document is silent, those two govern. The book is the
room the series is recorded in, not its subject, so the book's devices stay in the
background here too: the identity is typography, one red, cream, and the mark, and it
stops there.

## The materials

Four families, one job each, as on the site. IvyPresto Display, weight 400 and never bold,
for everything display. Source Sans 3 for prose. DIN Alternate, 700, tracked caps at
0.16em, for labels. IBM Plex Mono, 400, caps at 0.08em, for anything measured: an episode
number, a time, a page, a source. Where the Adobe fonts are not available, Instrument Serif
stands in for IvyPresto Display and Barlow Semi Condensed 700 for DIN Alternate. Source
Sans 3 and IBM Plex Mono are open source themselves. All four substitutes are on Google
Fonts.

Six steps and no seventh: COVER, DISPLAY, HEAD, LEAD, BODY, LABEL. On the site they are
clamps in rem; on a video frame there is no viewport, so the frame is given a rem and the
steps keep their largest values: COVER 4.5rem, DISPLAY 3.75rem, HEAD 2.5rem, LEAD 1.6rem,
BODY 1.1875rem, LABEL 0.75rem. A 1920 by 1080 frame is set at 1rem = 48px, that is 40rem
across. The steps on the frame are therefore COVER 216px, DISPLAY 180px, HEAD 120px,
LEAD 77px, BODY 57px, LABEL 36px. Line heights and tracking are the site's: COVER 1.02 at
-0.012em, DISPLAY 1.06 at -0.008em, HEAD 1.12 at -0.005em, LEAD 1.3, BODY 1.58, LABEL 1.35.
Mono at DISPLAY takes the site's timestamp setting, line height 1 and -0.03em, in ink.

Colour: cream `#F7F3EC` is the ground of everything. Ink `#111111` for type. Quiet
`#6F6A62` for mono and for anything secondary. Cover red `#B5291C` for the one red word
on a frame, for the eyebrow where a frame has one, and for the mark. Rules are ink at 14%.
The page tone `#FFFDF9`, the three system inks and the three evidence colours are the
book's and are not used on the channel, for the reasons given below.

Space: the frame's gutter is 2rem, 96px on all four sides, which is the proportion of the
cover's cream panel inside its red border. Between blocks, 3rem. Between lines of a
block, 1.1em. Nothing else.

## The title

The series title is set as the book's is on the site: in the display serif, at COVER,
weight 400, never bold, with one word in red. *Bifurcation* is that word. It sits alone on
its line, in cover red, at COVER. *Dynamical Systems* follows on the next line at HEAD, in
ink, in the same serif. The subtitle *The Biology of a State* follows after a 1.1em gap at
LEAD, in ink, in the same serif. Three steps, one family, one colour change. The DIN caps
and the mono are not used in the title.

The colon of the written title is not printed on a card. The line break does its work,
and printing it would hang a mark on the red word that belongs to neither line. In
metadata, in the YouTube title and in running prose the title keeps its colon.

The cover sets STATE in heavy DIN. The site does not: it sets the book's title in the
serif at COVER, because the heavy caps are the cover's own object and are not reproduced
anywhere else. The channel follows the site, so there is no heavy DIN title on the
channel. The cover's large word belongs to the cover.

## The thumbnail

Sixteen by nine, 1920 by 1080, flat cream `#F7F3EC` from edge to edge. Not red. The red
ground is the cover's frame and would make every thumbnail a second cover; red at 168px
also reads as alarm, and flat cream survives YouTube's compression where a red field
blotches. Nothing else is behind the type: no photograph, no footage still, no face.

Three things sit on the cream, in the TEXT layout's spirit, all left-aligned at the
gutter. At the top, the series label in DIN caps at LABEL, quiet: BIFURCATION · DYNAMICAL
SYSTEMS. Under it, the episode number in mono at DISPLAY, in ink, two digits with a
leading zero: 02. It is set exactly as the site sets a timestamp, and it is read the way a
folio is read. The word *Episode* is not printed on the thumbnail; the channel is its
context. At the foot, with its baseline at the bottom gutter, the episode's one red word,
or two or three if the idea needs them, in the serif at COVER, in cover red, at most two
lines: *Hysteresis*; *Sudden change*; *Critical slowing down*. It is the only red thing
on the thumbnail. No mark, no cover, no name, no second colour.

Legibility at 168px wide, which is a 0.0875 reduction, is ensured by scale and by
subtraction. At that width the COVER word is 19px high, the size of the site's body type
on a phone, and it is the only thing the thumbnail asks to be read at that size. The
episode number is 16px and still reads. The label is 3px and is not expected to read; it
is there for the full frame and for the channel page, where thumbnails are shown at
around 360px. Nothing on a thumbnail is at LABEL that must be read. Nothing is on a
thumbnail that competes with the word. `identity-preview.html` renders the thumbnail at
168px beside the full frame so the author can check this herself.

The red word is chosen by the episode's idea, not its title, and it must be a word the
episode earns. It is never a question, never an imperative, never a number dressed as a
claim. If an episode's idea cannot be held in three words, the episode has more than one
idea, which the brief forbids anyway.

## The title card and the end card

The title card opens every episode and is the same on every episode. Cream, 1920 by 1080,
the TEXT layout: a label column at the left, content from a third of the way across. In
the label column, at the top, the pulse mark in cover red, 3rem wide, stroke as the site
draws it; under it, the episode number in mono at LABEL, quiet: EPISODE 02. In the content
column the title as specified above: *Bifurcation* red at COVER, *Dynamical Systems* ink
at HEAD, the subtitle at LEAD. At the foot of the content column, aligned to the bottom
gutter, the host's name in the serif at LEAD, in ink, and under it her credential in mono
at LABEL, quiet, as the cover's red band and the site's hero credential set them: Ivana
Budišin, CLINICAL PSYCHOLOGIST. The credential is the one the cover prints and no other.

The title card is still. It may arrive with the site's one transition, opacity and an 8px
rise over 400ms, once; the mark may draw itself once, as it does on `/explore`, which is
the "subtle signal movement" the author's brief allows. Nothing loops and nothing moves
after that. Under three seconds on screen, then the recording.

The episode has no second title card. The thumbnail composition, the number and the red
word, is the episode's own card and may be used as the frame between the series title and
the first words, so that what a viewer clicked is what they see.

The end card is cream and carries the book, once, flat and front-on, as the site's hero
does: the front cover, `public/images/cover-front.jpg`, at the right, 12rem wide, with no
shadow, because the site's one shadow belongs to the cover on the site and does not
transfer to video. At the left, in the content column, the wordmark STATE. NOT SITUATION.
in DIN caps at LABEL, in ink, and under it the site's address in mono at BODY, in ink,
and nothing else: no "subscribe", no arrows, no boxes drawn where YouTube's own end-screen
elements will sit. YouTube's end-screen elements are placed in the empty cream at the
left, below the address, and are the only interface on the card. The end card is the
only place on the channel the cover appears.

## Lower thirds

A lower third is a cream band across the full width of the frame's foot, with a rule of
ink at 14% along its top edge. Not a box, not a panel, not a card: a band, as the site's
footer is a band, and full width so it does not read as an object placed on the picture.
Type sits at the left gutter. The band is as tall as its type and 2rem of padding above
and below, and no taller.

For the host: her name in the serif at LEAD, in ink, and under it CLINICAL PSYCHOLOGIST
in mono at LABEL, quiet. For a guest, the same, with the guest's affiliation as they give
it, in mono at LABEL.

For a source: one line in mono at BODY, in ink, in the form the source is recorded in
`CITATIONS.md`, author, year, journal, volume: Scheffer et al., 2009. Nature 461. Mono
because the site sets anything measured in mono, and a citation is the measurement a
viewer could check. BODY rather than LABEL because a 1080 frame is watched at phone width
and LABEL on a frame is 6px on a phone; BODY is 10px there and reads. Sentence case, not
caps, because names are not labels. The source band stays on screen for as long as the
claim it supports is being made and for at least four seconds, so that it can be read, and
it appears for every factual sentence that rests on a source, which the brief says is
every factual sentence. It never appears for a sentence marked as proposed; the absence
of a citation is part of how the series marks what is shown from what is proposed.

The two lower thirds are never on screen together. If a source must appear while the
name is up, the name goes first.

## The three system inks

Time `#2C6E8A`, Attention `#8C7432` and Safety `#BF372A` are the keys of page 5's map.
On the site they appear in exactly two places, the three variable words and the rule
beside each case moment, and on the press page's chapter map. They are the book's
organising device.

On the channel they do not appear. Not as episode colours, not as a stripe on the
thumbnail, not as a tint behind the lower third, not as a progress mark. The brief says
the book's three variables stay in the background and do not structure an episode. Three
inks on the channel would say the opposite: that the series is organised by Time,
Attention and Safety, which it is not, and a viewer who then went to the book would find
the channel had promised a structure the book does not share with it. There is also the
simpler reason. On a 168px thumbnail a second colour halves the red word's authority, and
three colours and red on one card is the feature-grid pattern the author's brief lists
among the things to remove.

The one case in which they may appear is the one in which the site uses them: if a frame
in an episode displays the three words Time. Attention. Safety. as the site's spread
does, each word takes its ink, at COVER, in the serif, and nothing else on that frame is
coloured. Nowhere else, and never as a code.

The evidence colours, high, medium and low, are likewise the book's. The series marks
shown from proposed in words, on camera, and with the presence or absence of a source
band, not with a colour.

## Banner and avatar

The banner is 2560 by 1440, flat cream, and composes only inside YouTube's safe area of
1546 by 423 at the centre, because everything outside it is cropped on one device or
another. In the safe area, left-aligned, at the frame rem: *Bifurcation* in cover red at
COVER and *Dynamical Systems* in ink at HEAD on the next line, in the serif. The subtitle
is left to the channel description; at 423px there is room for two lines and not three,
and the system says a section that will not fit the scale is rewritten, not shrunk.
Nothing outside the safe area but cream.

The avatar is 800 by 800, flat cream, with the pulse mark in cover red, centred, 60% of
the width, stroke scaled with it. No letter, no initial, no cover. The site has no other
logo and the channel does not get one. A single red stroke on cream reads at 32px where
a wordmark would not, which is why the avatar is the mark and the banner is the words.

## What is forbidden

Carried over from the author's brief, which governs here as it governs the site.

No scroll choreography and nothing driven by position or time beyond the one transition:
no kinetic type, no animated counters, no parallax in an opening, no particles, no pulse
that loops. No 3D: no spinning book, no mockup, no perspective, no render; the book
appears once, flat, on the end card. No gradients, no glass, no blur behind type, no glow.
No icon set, no play symbol drawn on a thumbnail, no arrow, no emoji. No cards: no
rounded panel, no box around a name, no drop shadow under anything; the site's one shadow
is the cover's and does not transfer. No faces on thumbnails and no reaction expressions.
No stock imagery, no neuron illustration, no abstract network, no fake data
visualisation; a diagram in an episode is drawn from data the episode cites or it is not
drawn, which is the Zahler and Sussmann lesson the brief names. No statistics on a card.
No second red, no fifth colour, no seventh size, no bold serif, no italic used as a
hierarchy. No claim on a card that the book or the episode's sources do not make, and no
sentence describing the series on the site that is not the author's own and recorded as
such.

Every card is tested as the site's pages are: what is the first thing the eye sees, is it
the right thing, and can anything be removed.

## Files

`identity-preview.html` is one thumbnail and one title card at 1920 by 1080, with the
thumbnail repeated at 168px as the legibility check, flat colour only, Google Fonts for
the four substitutes. `identity-preview.png` is its render, for the author to look at.
Neither is a production asset; the frames are made again from the Adobe faces when the
kit is available.
