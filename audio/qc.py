#!/usr/bin/env python3
"""
Report on a narration file: is it stable, and does the voice move?

    python3 audio/qc.py "The Pilot NEW.mp3"

Prints level stability, room noise, pace and prosody, each against the range a
publisher would accept. It cannot tell you whether a reading is good; it can
tell you whether it is flat, uneven, noisy or rushed.
"""
import subprocess, sys, wave
from pathlib import Path
import numpy as np

def load(p: Path):
    if p.suffix.lower() != ".wav":
        out = Path("/tmp") / (p.stem + ".qc.wav")
        subprocess.run(["afconvert", "-f", "WAVE", "-d", "LEI16@44100", "-c", "1", str(p), str(out)], check=True)
        p = out
    w = wave.open(str(p), "rb"); sr = w.getframerate()
    return np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0, sr

def verdict(value, good, label_good="ok", label_bad="look at this"):
    return f"{label_good}" if good else f"{label_bad}"

def main():
    if len(sys.argv) < 2:
        sys.exit("usage: qc.py <audio file> [words]")
    p = Path(sys.argv[1]); words = int(sys.argv[2]) if len(sys.argv) > 2 else None
    x, sr = load(p)
    mins = len(x) / sr / 60

    fl = int(sr * 0.05); fr = x[: len(x)//fl*fl].reshape(-1, fl)
    db = 20*np.log10(np.sqrt((fr**2).mean(axis=1)) + 1e-12)
    thr = db.max() - 35; sp, si = db[db > thr], db[db <= thr]
    blk = int(30/0.05); meds = []
    for i in range(0, len(db)-blk, blk):
        b = db[i:i+blk]; b = b[b > thr]
        if len(b) > 20: meds.append(np.median(b))
    drift = (max(meds)-min(meds)) if len(meds) > 1 else 0.0
    snr = np.median(sp) - np.median(si)

    fl2 = int(sr*0.02); f2 = x[: len(x)//fl2*fl2].reshape(-1, fl2)
    d2 = 20*np.log10(np.sqrt((f2**2).mean(axis=1)) + 1e-12)
    sil = d2 < (np.median(d2[d2 > d2.max()-30]) - 22)
    runs = []; c = 0
    for v in sil:
        if v: c += 1
        else:
            if c: runs.append(c*0.02)
            c = 0
    runs = np.array([r for r in runs if r > 0.15])

    flen = int(sr*0.040); hop = int(sr*0.020)
    lo, hi = int(sr/350), int(sr/60); f0 = []
    for i in range(0, len(x)-flen, hop):
        f = x[i:i+flen]
        if np.sqrt((f**2).mean()) < 0.006: continue
        f = f - f.mean()
        ac = np.correlate(f, f, mode="full")[flen-1:]
        if ac[0] <= 0: continue
        seg = ac[lo:hi]
        if not len(seg): continue
        k = int(np.argmax(seg)) + lo
        if ac[k]/ac[0] < 0.30: continue
        f0.append(sr/k)
    f0 = np.array(f0); f0 = f0[(f0 > 70) & (f0 < 320)]
    semis = 12*np.log2(f0/np.median(f0))
    rng = np.percentile(semis, 90) - np.percentile(semis, 10)
    cv = runs.std()/runs.mean()

    print(f"\n{p.name} — {mins:.2f} min\n")
    print(f"  level drift      {drift:5.1f} dB      {verdict(drift, drift < 3, 'steady', 'uneven, master it')}")
    print(f"  signal to noise  {snr:5.1f} dB      {verdict(snr, snr > 40, 'clean', 'noisy, master it')}")
    print(f"  peak             {20*np.log10(np.abs(x).max()+1e-12):5.1f} dBFS    {verdict(1, np.abs(x).max() < 0.99, 'no clipping', 'clipping')}")
    if words:
        print(f"  pace             {words/mins:5.0f} wpm     {verdict(1, 115 <= words/mins <= 145, 'deliberate', 'fast for narration')}")
    print(f"  pitch range      {rng:5.1f} st       {verdict(rng, rng >= 8, 'expressive', 'flat')}   (engaged narration 8-14)")
    print(f"  pause variety    {cv:5.2f}          {verdict(cv, cv >= 0.6, 'natural', 'metronomic')}   (human 0.6-1.0)")
    print(f"  longest pause    {runs.max():5.2f} s      {verdict(1, runs.max() >= 2.0, 'has room to breathe', 'no real holds')}")
    print()

if __name__ == "__main__":
    main()
