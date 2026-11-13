# Hamburg-Skyline (Glas)

Die Skyline am Ende der Nachtseiten (`HamburgGlass`) ist ein Bildpaar mit
transparentem Grund:

- `public/images/hamburg-glas-dunkel.webp` – in Ruhe
- `public/images/hamburg-glas-licht.webp` – dasselbe Glas, beleuchtet (das Licht unter dem Zeiger)

Beide entstehen aus **einem** Rendering per Skript und werden nie von Hand bearbeitet.

- `hamburg-skyline-flux-original.png` – das Rendering (FLORA, FLUX, 3136 × 1344, schwarzer Grund),
  in einem Zug aus einer einheitlich weichgezeichneten Vorlage gerendert
- `skyline_to_webp.py` – schneidet es zu, skaliert auf 2600 px Breite, macht den Grund
  transparent und erzeugt beide WebP-Dateien

```bash
python3 scripts/skyline/skyline_to_webp.py scripts/skyline/hamburg-skyline-flux-original.png public/images
```

Braucht `numpy` und `Pillow`. Optionales drittes Argument: die Schwelle, unter der Schwarz
transparent wird (Standard `0.035`).

## Wenn die Skyline ersetzt wird

Diese Stellen hängen am Bild und müssen mit:

- `LANDMARKS` in `src/components/lavender/HamburgGlass.tsx` – Positionen der Wahrzeichen,
  zwischen denen das Licht ohne Zeiger wandert
- `aspect-ratio` von `.lav-hamburg` in `src/styles/globals.css` (heute `2600 / 1114`)
- `SKYLINE_RATIO` in `src/components/lavender/nightSky.ts` (heute `1114 / 2600`)

## Stand 13.11.2026

Das Skript erzeugt `hamburg-glas-dunkel.webp` aus diesem Rendering bis auf
Encoder-Rauschen gleich. `hamburg-glas-licht.webp` weicht leicht ab (im Mittel 2 von 255,
die neue Datei wäre 589 statt 484 KB): Die eingecheckte Fassung stammt aus einem etwas
früheren Stand des Skripts. Beim nächsten Durchlauf werden beide neu erzeugt.
