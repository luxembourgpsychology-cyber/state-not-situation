# Motion pieces for episode 1

Eight short motion graphics for the cortisol episode, made 17 October 2026 after the author asked for the mechanics and parts of the body shown in simple sketches with a few words, instead of static cards. Each is a self-contained HTML file with inline SVG animated by CSS, no library, 1920 by 1080 on the cream ground, that plays once from a still state and holds its end frame. Line weight is 3px at frame width. Words are set in the serif, anything measured in the mono, and the labels in the condensed caps, as `IDENTITY.md` fixes; cover red appears on at most one thing per frame. Every number drawn comes from `episodes/01-cortisol/RESEARCH.md` and the research source is named below for each. A curve's shape between its stated points is a drawing, not a measurement, and the README says so where that applies. The pieces are keyed to section numbers in `episodes/01-cortisol/SCRIPT.md`, which are stable while the sentences are being reworded.

## The pieces

M1, the chain, twelve seconds, for section 6. A side profile of a head is drawn in one stroke. The hypothalamus and the pituitary appear as two points inside it, each with its label in the mono and a leader in ink at fourteen percent. A line is drawn from the pituitary down to a kidney, which is drawn next with the adrenal gland capping it and the label adrenal. A single red dot then travels the line from the pituitary to the gland, the word cortisol appears beside the gland in the serif, and the feedback line is drawn back up from the gland to the hypothalamus, ending in a small chevron. The chain and its feedback on the first two glands are as Ulrich-Lai and Herman (2009) set them out in `RESEARCH.md` section 2. Nothing on the frame is a measurement.

M2, a day, ten seconds, for section 7. A 24-hour axis in the mono, marked 06, 12, 18 and 24. The daily curve is drawn left to right, high in the morning and low at night, then the hourly pulses are drawn riding on it as small bumps. Last, a single red dot is placed on the steep morning rise, with the words one sample in the serif. The shape is the circadian rhythm with an ultradian pulse roughly every hour that Lightman and Conway-Campbell (2010) describe in `RESEARCH.md` section 2. The only measured things on the frame are the hours on the axis; the height of the curve and the size of the pulses are a drawing of that description, not data.

M3, the first thirty minutes after waking, six seconds, for the second half of section 7. An axis from 0 to 30 minutes in the mono, labelled minutes after waking, with the waking level carried across as a rule at fourteen percent. The curve rises from that level to its top at thirty minutes, and as it reaches the top the figure 50 to 75 percent appears in the mono, in ink. The figure is Pruessner et al. (1997) as `RESEARCH.md` section 2 states it: free cortisol rises by roughly fifty to seventy-five percent in the thirty minutes after waking. The shape of the rise between its two ends is a drawing.

M4, the clock, eleven seconds, for section 9. A 60-minute axis in the mono with a starting mark labelled stressor begins in the serif. Two lines leave the mark. The autonomic line jumps within seconds and then runs level; the cortisol line stays flat, then rises slowly, peaks, and comes down. A band in ink at fourteen percent opacity is then laid over the window from 21 to 40 minutes, labelled 21 to 40 min in the mono. The window and the two timings are Dickerson and Kemeny (2004) as `RESEARCH.md` sections 2 and 3 state them: the autonomic response comes in seconds, cortisol is the slower second wave, and it peaks in saliva twenty-one to forty minutes after the stressor begins. The height of either line, the level the autonomic line holds, and the cortisol line's fall after its peak are a drawing, not data.

M5, chronic stress, eight seconds, for section 10. Two small daily curves side by side on their own 24-hour axes in the mono. The left, labelled near onset in the serif, rises high. The right, labelled persisting, is lower and flatter. Nothing on the frame is red. The relation between the two is Miller, Chen and Zhou (2007) as `RESEARCH.md` section 3 states it: output is highest near the onset of a stressor and declines as it persists. The curves carry no values; the hours on the axes are the only measured things on the frame.

M6, hair and saliva, eight seconds, for section 14. A single hair strand is drawn as a line with three marks along it numbered 1, 2 and 3 in the mono, and the word months in the serif beneath it. Beside it a drop is drawn, in red because the drop is what a kit measures, with the word minutes beneath. That hair cortisol integrates months is Stalder et al. (2017) as `RESEARCH.md` section 3 states it. The number of marks on the strand is a drawing device and claims nothing about the length of hair that holds a month.

M7, the three questions, ten seconds, for section 23. The three questions that page 9 of the book prints, in the form the script prints them, each with its name, drawn in one at a time: Time, then Attention, then Safety, the name entering first and its question half a second after. Everything is in the serif at LEAD and in ink. Nothing else is on the frame. The words are the script's exactly; the straight quotation marks of the script's source file are set as typographic quotation marks on screen.

M8, the verdict, six seconds, for sections 2 and 21. The verdict card as motion, in the TEXT layout of `PRODUCTION.md`: THE VERDICT in the condensed caps in the label column, and the nine words A cortisol level says little about a person's stress. in the serif at DISPLAY, entering one word at a time. The word level turns red last, at four seconds and a fifth, and is the only red thing on the frame.

## How the motion is made

Every mark is a path with `pathLength` set to 1, drawn by animating its dash offset from 1 to 0, so a line is seen being made from its start to its end at a steady speed. Everything that appears rather than being drawn uses the site's one transition, opacity and an 8px rise over 400ms. The travelling dot in M1 is an HTML element on a CSS motion path that follows the chain exactly. All timing is CSS; a `motion:duration` meta tag in each file states the piece's length in milliseconds, and the renderer reads it.

## Fonts

Each file declares the design system's faces, Instrument Serif, IBM Plex Mono and Barlow Semi Condensed, from Google Fonts, with real fallbacks behind them: Liberation Serif, DejaVu Sans Mono and Liberation Sans, which are installed on the rendering machine. In the render of 17 October 2026 the Google faces did arrive through the proxy and were used, and the renderer prints which faces loaded for each piece. If a future render cannot reach Google Fonts, the fallbacks draw instead; the fallback serif is wider than Instrument Serif, so M7 and M8 should be checked for line breaks after such a render. The Adobe faces of `IDENTITY.md` are not involved; these pieces are made again from them when the kit is available.

## Rendering

The renderer is `render.mjs` in this folder. From the repository root:

    node series/motion/render.mjs
    node series/motion/render.mjs M2 M5

renders every piece, or only the ones named, to `M1.mp4` and so on beside the HTML, at 1920 by 1080, 25 frames a second, H.264 with yuv420p at CRF 18, and writes a poster PNG of each piece's end frame as `M1.png` and so on. It needs the global Playwright 1.56 with Chromium under `/opt/pw-browsers` and ffmpeg on the path, and installs nothing.

Frames are captured at a fixed timestep. The renderer pauses every animation on the page the moment the document is parsed, then for each frame sets every animation's current time to the frame's time, waits two animation frames so that Chromium has painted the change, and screenshots. Nothing runs on the browser's own clock, so a render is the same on any machine however slow it is, and a page that would stutter if captured in real time does not. The last frame of each file is the end state, held; the MP4 is one frame longer than the stated duration for that reason.

When the script changes, edit the words in the HTML, keep the section numbers in this file and in the files' description tags in step, and re-render.
