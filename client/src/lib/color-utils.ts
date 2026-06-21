export interface HsvColor {
  h: number;
  s: number;
  v: number;
}

const HEX_PATTERN = /^#?[0-9A-Fa-f]{6}$/;

export function normalizeHex(value: string, fallback = "#000000"): string {
  const withHash = value.startsWith("#") ? value : `#${value}`;
  return HEX_PATTERN.test(withHash) ? withHash.toLowerCase() : fallback;
}

export function hexToRgb(hex: string) {
  const normalized = normalizeHex(hex);
  return {
    r: parseInt(normalized.slice(1, 3), 16),
    g: parseInt(normalized.slice(3, 5), 16),
    b: parseInt(normalized.slice(5, 7), 16),
  };
}

export function rgbToHex(r: number, g: number, b: number) {
  const toHex = (value: number) =>
    Math.max(0, Math.min(255, Math.round(value)))
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function hexToHsv(hex: string): HsvColor {
  const { r, g, b } = hexToRgb(hex);
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rn) h = ((gn - bn) / delta) % 6;
    else if (max === gn) h = (bn - rn) / delta + 2;
    else h = (rn - gn) / delta + 4;
    h *= 60;
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : (delta / max) * 100;
  const v = max * 100;

  return { h, s, v };
}

export function hsvToHex(h: number, s: number, v: number) {
  const saturation = Math.max(0, Math.min(100, s)) / 100;
  const value = Math.max(0, Math.min(100, v)) / 100;
  const hue = ((h % 360) + 360) % 360;

  const chroma = value * saturation;
  const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const match = value - chroma;

  let rn = 0;
  let gn = 0;
  let bn = 0;

  if (hue < 60) [rn, gn, bn] = [chroma, x, 0];
  else if (hue < 120) [rn, gn, bn] = [x, chroma, 0];
  else if (hue < 180) [rn, gn, bn] = [0, chroma, x];
  else if (hue < 240) [rn, gn, bn] = [0, x, chroma];
  else if (hue < 300) [rn, gn, bn] = [x, 0, chroma];
  else [rn, gn, bn] = [chroma, 0, x];

  return rgbToHex((rn + match) * 255, (gn + match) * 255, (bn + match) * 255);
}

export function getPointerPosition(
  clientX: number,
  clientY: number,
  rect: DOMRect
) {
  const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
  return { x, y };
}
