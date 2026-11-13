"""FLUX rendering on black -> the unlit and the lit skyline with a transparent ground (2600 px wide)."""
import sys, os
import numpy as np
from PIL import Image
src, outdir = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
a = np.asarray(im).astype(np.float32) / 255
b = a.max(axis=2)
rows = np.where(b.max(axis=1) > 0.08)[0]
top = max(0, rows[0] - int(im.height * 0.015))
crop = im.crop((0, top, im.width, im.height))
W = 2600; H = round(crop.height * W / crop.width)
crop = crop.resize((W, H), Image.LANCZOS)
a = np.asarray(crop).astype(np.float32) / 255
b = a.max(axis=2); cut = float(sys.argv[3]) if len(sys.argv) > 3 else 0.035
alpha = np.clip((b - cut) / (1 - cut), 0, 1)
# the reflection on the floor runs out softly instead of ending at the picture's lower edge
fade = np.clip((H - 1 - np.arange(H)) / (H * 0.085), 0, 1)
fade = (fade * fade * (3 - 2 * fade))[:, None]
alpha = alpha * fade
# one glass for all buildings: the picture's own cool tint everywhere (a rendering may tint single buildings, e.g. brick)
sel = b > 0.3
tint0 = (a[sel] / b[sel][:, None]).mean(axis=0)
rgb = np.broadcast_to(tint0, a.shape).copy(); rgb[alpha == 0] = 0
Image.fromarray((np.dstack([rgb, alpha]) * 255 + 0.5).astype(np.uint8), 'RGBA').save(os.path.join(outdir, 'hamburg-glas-dunkel.webp'), quality=74, method=6, alpha_quality=82)
# ---- the lit picture: the same glass glowing in the double star's colours.
# The colour runs from blue to violet and back in slanted bands, so one light spot always holds both;
# the glass itself is strongly coloured, its edges go towards white, and the light spills over the edges (bloom).
from PIL import ImageFilter
yy, xx = np.mgrid[0:H, 0:W]
phase = xx / W * 2.6 + yy / H * 0.9
m = (0.5 + 0.5 * np.sin(phase * 2 * np.pi))[..., None]
blue = np.array([0x22, 0xb0, 0xff]) / 255; violet = np.array([0xa2, 0x55, 0xff]) / 255
tint = blue * (1 - m) + violet * m
bb = np.clip(b, 0, 1)[..., None]
hi = bb ** 2.4 * 0.62                                  # bright edges and bevels towards white
lit = tint * (1 - hi) + 1.0 * hi
la = np.clip(alpha ** 0.55 * 1.12, 0, 1)               # also the darker glass faces take the colour
def gb(arr, r):
    return np.asarray(Image.fromarray((np.clip(arr, 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r))).astype(np.float32) / 255
P = lit * la[..., None]
edge = tint * (bb ** 1.3)                              # what shines: the brighter the glass, the more it spills
for r, gain in ((7, 0.85), (22, 0.6), (60, 0.35)):
    Bp = np.dstack([gb(edge[..., c], r) for c in range(3)]) * gain
    Ba = np.clip(Bp.max(axis=2), 0, 1)
    P = P + Bp * (1 - la[..., None])
    la = la + Ba * (1 - la)
la = np.clip(la, 0, 1) * fade
out = np.where(la[..., None] > 1e-3, P / np.maximum(la[..., None], 1e-3), 0)
out = np.clip(out, 0, 1); out[la < 0.004] = 0
Image.fromarray((np.dstack([out, la]) * 255 + 0.5).astype(np.uint8), 'RGBA').save(os.path.join(outdir, 'hamburg-glas-licht.webp'), quality=76, method=6, alpha_quality=80)
print('size', W, H, [(f, os.path.getsize(os.path.join(outdir, f)) // 1024) for f in ('hamburg-glas-dunkel.webp', 'hamburg-glas-licht.webp')])
