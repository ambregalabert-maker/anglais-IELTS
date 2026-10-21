"""Enregistre les voix neuronales du site (Kokoro) dans public/audio/.

Usage (après bash scripts/audio/setup.sh et npm run audio:texts) :
    scripts/audio/model/venv/bin/python scripts/audio/generate.py

Seules les phrases nouvelles sont enregistrées ; les fichiers qui ne servent plus sont supprimés.
"""

import glob
import hashlib
import json
import os
import re
import subprocess
import sys
import time

import numpy as np
from kokoro_onnx import Kokoro

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MODEL = os.path.join(ROOT, 'scripts', 'audio', 'model')
OUT = os.path.join(ROOT, 'public', 'audio')

# Mêmes voix que src/lib/voices.ts
VOICES = {
    'emma': ('bf_emma', 'en-gb'), 'george': ('bm_george', 'en-gb'), 'isabella': ('bf_isabella', 'en-gb'),
    'daniel': ('bm_daniel', 'en-gb'), 'lily': ('bf_lily', 'en-gb'), 'lewis': ('bm_lewis', 'en-gb'),
    'heart': ('af_heart', 'en-us'), 'michael': ('am_michael', 'en-us'),
}
BITRATE = '40k'


def for_speech(text):
    """Petites corrections pour que la voix lise correctement (prix, abréviations)."""
    text = re.sub(r'£(\d+)\.(\d\d)\b', lambda m: f'{m[1]} pounds {int(m[2])}', text)
    text = re.sub(r'£(\d+)', r'\1 pounds', text)
    text = re.sub(r'\$(\d+)', r'\1 dollars', text)
    text = text.replace('e.g.', 'for example').replace('i.e.', 'that is')
    return text


def encode(samples, sr, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    pcm = (np.clip(samples, -1, 1) * 32767).astype('<i2').tobytes()
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 's16le', '-ar', str(sr), '-ac', '1', '-i', '-',
                    '-b:a', BITRATE, path], input=pcm, check=True)


def main():
    data = json.load(open(os.path.join(ROOT, 'scripts', 'audio', 'texts.json')))
    voices = {}
    for f in glob.glob(os.path.join(MODEL, '*.bin')):
        voices[os.path.basename(f)[:-4]] = np.fromfile(f, dtype=np.float32).reshape(-1, 1, 256)
    npz = os.path.join(MODEL, 'voices.npz')
    np.savez(npz, **voices)
    tts = Kokoro(os.path.join(MODEL, 'model_quantized.onnx'), npz)

    def synth(text, voice):
        vid, lang = VOICES[voice]
        return tts.create(for_speech(text), voice=vid, speed=1.0, lang=lang)

    # ----- Phrases -----
    wanted = {}
    todo = []
    for c in data['clips']:
        rel = f"{c['voice']}/{c['id']}.mp3"
        wanted.setdefault(c['voice'], []).append(c['id'])
        if not os.path.exists(os.path.join(OUT, rel)):
            todo.append((c, rel))
    print(f"{len(data['clips'])} phrases, {len(todo)} à enregistrer", flush=True)
    t0 = time.time()
    for i, (c, rel) in enumerate(todo, 1):
        try:
            s, sr = synth(c['text'], c['voice'])
            encode(s, sr, os.path.join(OUT, rel))
        except Exception as e:  # une phrase ratée ne bloque pas les autres
            print('  ÉCHEC', c['voice'], c['text'][:60], e, flush=True)
            wanted[c['voice']].remove(c['id'])
        if i % 100 == 0:
            rate = (time.time() - t0) / i
            print(f"  {i}/{len(todo)} · reste ~{(len(todo) - i) * rate / 60:.0f} min", flush=True)

    # ----- Pistes (dialogues) -----
    tracks = {}
    for t in data['tracks']:
        h = hashlib.sha1(json.dumps(t['lines'], sort_keys=True).encode()).hexdigest()[:8]
        rel = f"tracks/{t['id']}-{h}.mp3"
        tracks[t['id']] = rel
        if os.path.exists(os.path.join(OUT, rel)):
            continue
        parts = []
        sr = 24000
        for j, line in enumerate(t['lines']):
            s, sr = synth(line['text'], line['voice'])
            if j:
                # Pause plus longue quand la personne qui parle change
                same = t['lines'][j - 1]['voice'] == line['voice']
                parts.append(np.zeros(int(sr * (0.35 if same else 0.6)), dtype=np.float32))
            parts.append(s)
        encode(np.concatenate(parts), sr, os.path.join(OUT, rel))
        print('  piste', t['id'], flush=True)

    # ----- Nettoyage et index -----
    keep = {f"{v}/{i}.mp3" for v, ids in wanted.items() for i in ids} | set(tracks.values())
    removed = 0
    for f in glob.glob(os.path.join(OUT, '*', '*.mp3')):
        if os.path.relpath(f, OUT) not in keep:
            os.remove(f)
            removed += 1
    index = {'clips': {v: sorted(ids) for v, ids in sorted(wanted.items())}, 'tracks': dict(sorted(tracks.items()))}
    with open(os.path.join(OUT, 'index.json'), 'w') as fh:
        json.dump(index, fh, separators=(',', ':'))
    print(f'Terminé : {len(keep)} fichiers, {removed} supprimés.')


if __name__ == '__main__':
    sys.exit(main())
