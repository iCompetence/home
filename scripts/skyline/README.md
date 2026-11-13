# Hamburg-Skyline (Glas)

Die Skyline am Ende der Nachtseiten (`HamburgGlass`) ist ein Bildpaar mit
transparentem Grund:

- `public/images/hamburg-glas-dunkel.webp` – in Ruhe
- `public/images/hamburg-glas-licht.webp` – dasselbe Glas, beleuchtet (das Licht unter dem Zeiger)

Beide entstehen aus **einem** Rendering per Skript und werden nie von Hand bearbeitet.

- `hamburg-skyline-flux-original.png` – das Rendering (FLORA, FLUX, 3136 × 1344, schwarzer Grund),
  in einem Zug aus einer einheitlich weichgezeichneten Vorlage gerendert
- `skyline_to_webp.py` – setzt die Skulptur waagerecht in die Mitte, schneidet zu, skaliert auf 2600 px Breite, macht den Grund
  transparent und erzeugt beide WebP-Dateien

```bash
python3 scripts/skyline/skyline_to_webp.py scripts/skyline/hamburg-skyline-flux-original.png public/images
```

Braucht `numpy` und `Pillow`. Optionales drittes Argument: die Schwelle, unter der Schwarz
transparent wird (Standard `0.035`).

## Wenn die Skyline ersetzt wird

Diese Stellen hängen am Bild und müssen mit:

- `aspect-ratio` von `.lav-hamburg` in `src/styles/globals.css` (heute `2600 / 1097`)
- `SKYLINE_RATIO` in `src/components/lavender/nightSky.ts` (heute `1097 / 2600`)

## Stand 13.11.2026

Beide Dateien sind mit dem Skript neu erzeugt (2600 × 1097). Seitdem setzt es die Skulptur
waagerecht in die Mitte: Im Rendering hatte die Sockelplatte links 51 px und rechts 2 px Abstand
zum Bildrand, das Skript ergänzt rechts Schwarz, bis beide Abstände gleich sind (je rund 42 px
bei 2600 px Breite). Die Wahrzeichen liegen dadurch um den Faktor 0,9846 weiter links; der
Ruheplatz des Leitsterns (`at` in `nightSky.ts`) ist angepasst. Die Liste der Wahrzeichen
(`LANDMARKS`) gibt es nicht mehr: Ohne Zeiger leuchtet seit dem 13.11.2026 abends die ganze Stadt
im Wechsel auf, statt dass ein Licht von Wahrzeichen zu Wahrzeichen wandert.
