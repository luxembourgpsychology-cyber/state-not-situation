#!/usr/bin/env python3
"""
Master one narration file for the web.

    python3 audio/master.py "The Pilot NEW.mp3"
    python3 audio/master.py chapter-01.wav --out public/audio/chapter-01.m4a

What it does, in order: high-pass, spectral denoise learned from the file's own
room tone, slow gain riding to remove level drift, gentle compression, optional
presence lift, soft limit, normalise. It never changes a word and never changes
timing. It prints a measurement report before and after.

Needs numpy, and macOS afconvert for the mp3 decode and the m4a encode.
"""
import argparse, subprocess, sys, wave
from pathlib import Path
import numpy as np

SR_TARGET = 44100


def decode(src: Path) -> Path:
    """Anything afconvert can read becomes a mono 44.1 kHz WAV."""
    if src.suffix.lower() == ".wav":
        return src
    out = Path("/tmp") / (src.stem + ".master.wav")
    subprocess.run(["afconvert", "-f", "WAVE", "-d", f"LEI16@{SR_TARGET}", "-c", "1",
                    str(src), str(out)], check=True)
    return out


def read(p: Path):
    w = wave.open(str(p), "rb")
    sr = w.getframerate()
    x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0
    return x - x.mean(), sr


def moving_avg(sig, k):
    """O(n) moving average; np.convolve is far too slow at these lengths."""
    k = max(1, int(k))
    c = np.cumsum(np.concatenate([[0.0], sig.astype(np.float64)]))
    half = k // 2
    lo = np.clip(np.arange(len(sig)) - half, 0, len(sig))
    hi = np.clip(np.arange(len(sig)) - half + k, 0, len(sig))
    return ((c[hi] - c[lo]) / np.maximum(hi - lo, 1)).astype(np.float32)


def measure(x, sr, name):
    fl = int(sr * 0.05)
    fr = x[: len(x) // fl * fl].reshape(-1, fl)
    db = 20 * np.log10(np.sqrt((fr ** 2).mean(axis=1)) + 1e-12)
    thr = db.max() - 35
    sp, si = db[db > thr], db[db <= thr]
    blk = int(30 / 0.05)
    meds = []
    for i in range(0, len(db) - blk, blk):
        b = db[i:i + blk]; b = b[b > thr]
        if len(b) > 20:
            meds.append(np.median(b))
    drift = (max(meds) - min(meds)) if len(meds) > 1 else 0.0
    print(f"  {name:9s} level {np.median(sp):6.1f} dBFS · noise {np.median(si):6.1f} · "
          f"SNR {np.median(sp) - np.median(si):4.1f} dB · drift {drift:4.1f} dB · "
          f"peak {20 * np.log10(np.abs(x).max() + 1e-12):5.1f} dBFS")
    return drift


def master(x, sr, presence_db=0.0, target_rms_db=-20.0):
    N, H = 2048, 512
    win = np.hanning(N).astype(np.float32)
    pad = (-(len(x) - N)) % H
    xp = np.concatenate([x, np.zeros(pad, np.float32)])
    nf = (len(xp) - N) // H + 1
    frames = np.lib.stride_tricks.as_strided(
        xp, shape=(nf, N), strides=(xp.strides[0] * H, xp.strides[0])) * win
    S = np.fft.rfft(frames, axis=1)
    mag, ph = np.abs(S).astype(np.float32), np.angle(S).astype(np.float32)
    del S
    freqs = np.fft.rfftfreq(N, 1 / sr)

    # room tone from the quietest eighth of frames
    fr_db = 20 * np.log10(np.sqrt((frames ** 2).mean(axis=1)) + 1e-12)
    quiet = fr_db < np.percentile(fr_db, 12)
    noise = np.median(mag[quiet], axis=0) if quiet.sum() > 20 else np.percentile(mag, 5, axis=0)

    g = np.maximum(mag - 2.0 * noise, 0.12 * mag) / (mag + 1e-9)
    g *= np.clip((freqs - 40.0) / 40.0, 0.0, 1.0).astype(np.float32)          # high-pass
    if presence_db:
        lift = 10 ** (presence_db / 20) - 1.0
        g *= (1.0 + lift * np.clip((freqs - 3000.0) / 3000.0, 0.0, 1.0)).astype(np.float32)
    g[1:-1] = (g[:-2] + 2 * g[1:-1] + g[2:]) / 4.0                            # smooth over time
    rec = np.fft.irfft((mag * g) * np.exp(1j * ph), axis=1).astype(np.float32) * win
    del mag, ph, g, frames

    out = np.zeros(len(xp), np.float32); nrm = np.zeros(len(xp), np.float32)
    w2 = win ** 2
    for j in range(nf):
        i = j * H
        out[i:i + N] += rec[j]; nrm[i:i + N] += w2
    y = (out / np.maximum(nrm, 1e-8))[: len(x)]
    del out, nrm, rec

    env = np.sqrt(moving_avg(y ** 2, sr * 3.0) + 1e-12)                       # level the drift
    target = np.percentile(env[env > np.percentile(env, 55)], 50)
    y = y * moving_avg(np.clip(target / np.maximum(env, target / 8), 0.35, 3.0), sr * 1.0)

    thr = 10 ** (-24 / 20)                                                    # 2.5:1 compression
    envc = np.sqrt(moving_avg(y ** 2, sr * 0.030) + 1e-12)
    y = y * np.power(np.maximum(envc / thr, 1.0), 1 / 2.5 - 1).astype(np.float32)

    sp = np.abs(y) > np.percentile(np.abs(y), 60)
    y = y * (10 ** (target_rms_db / 20) / np.sqrt((y[sp] ** 2).mean()))
    y = np.tanh(y / 0.89) * 0.89
    y = y * (0.97 / np.abs(y).max())
    f = int(sr * 0.05)
    y[:f] *= np.linspace(0, 1, f); y[-f:] *= np.linspace(1, 0, f)
    return y


def main():
    ap = argparse.ArgumentParser(description="Master a narration file for the web.")
    ap.add_argument("source")
    ap.add_argument("--out", default="public/audio/extract-en.m4a")
    ap.add_argument("--presence", type=float, default=0.0,
                    help="dB of shelf above 3 kHz; use 3-4 if the take sounds distant")
    ap.add_argument("--bitrate", type=int, default=96000)
    a = ap.parse_args()

    src = Path(a.source)
    if not src.exists():
        sys.exit(f"no such file: {src}")
    wav = decode(src)
    x, sr = read(wav)
    print(f"{src.name} — {len(x)/sr/60:.2f} min")
    measure(x, sr, "before")
    y = master(x, sr, presence_db=a.presence)
    measure(y, sr, "after")

    tmp = Path("/tmp") / (src.stem + ".mastered.wav")
    w = wave.open(str(tmp), "wb"); w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
    w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()

    out = Path(a.out); out.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", "-b", str(a.bitrate), "-s", "3",
                    str(tmp), str(out)], check=True)
    print(f"  wrote {out} — {out.stat().st_size/1024/1024:.1f} MB")


if __name__ == "__main__":
    main()
