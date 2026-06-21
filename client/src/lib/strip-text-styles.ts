export const STRIP_FONT_OPTIONS = [
  {
    id: "georgia",
    label: "Classic Serif",
    family: "Georgia, serif",
    weight: "bold",
  },
  {
    id: "arial",
    label: "Clean Sans",
    family: "Arial, sans-serif",
    weight: "normal",
  },
  {
    id: "bebas",
    label: "Bold Display",
    family: '"Bebas Neue", sans-serif',
    weight: "normal",
  },
  {
    id: "oswald",
    label: "Condensed",
    family: "Oswald, sans-serif",
    weight: "500",
  },
  {
    id: "playfair",
    label: "Elegant",
    family: '"Playfair Display", serif',
    weight: "700",
  },
  {
    id: "pacifico",
    label: "Script",
    family: "Pacifico, cursive",
    weight: "normal",
  },
] as const;

export type StripFontStyle = (typeof STRIP_FONT_OPTIONS)[number]["id"];
export type FontType = StripFontStyle;

export const DEFAULT_NAME_FONT: StripFontStyle = "georgia";
export const DEFAULT_DATE_FONT: StripFontStyle = "arial";
export const DEFAULT_NAME_FONT_SIZE = 28;
export const DEFAULT_DATE_FONT_SIZE = 18;
export const MIN_STRIP_FONT_SIZE = 12;
export const MAX_NAME_FONT_SIZE = 48;
export const MAX_DATE_FONT_SIZE = 36;

export const STRIP_TEXT_GAP = 10;
export const STRIP_TEXT_TOP_PADDING = 12;
export const STRIP_TEXT_BOTTOM_PADDING = 12;

export interface StripTextLayout {
  textSpace: number;
  nameY: number;
  dateY: number;
}

export interface StripTextStyleOptions {
  showName: boolean;
  showDate: boolean;
  nameFont: StripFontStyle;
  dateFont: StripFontStyle;
  nameFontSize: number;
  dateFontSize: number;
}

export function getCanvasFont(style: StripFontStyle, size: number): string {
  const option =
    STRIP_FONT_OPTIONS.find((item) => item.id === style) ?? STRIP_FONT_OPTIONS[0];
  return `${option.weight} ${size}px ${option.family}`;
}

export function getStripTextLayout(options: {
  showName: boolean;
  showDate: boolean;
  nameFontSize: number;
  dateFontSize: number;
}): StripTextLayout {
  if (!options.showName && !options.showDate) {
    return { textSpace: 0, nameY: 0, dateY: 0 };
  }

  const nameHeight = options.showName ? options.nameFontSize : 0;
  const dateHeight = options.showDate ? options.dateFontSize : 0;
  const gap = options.showName && options.showDate ? STRIP_TEXT_GAP : 0;

  const textSpace =
    STRIP_TEXT_TOP_PADDING + nameHeight + gap + dateHeight + STRIP_TEXT_BOTTOM_PADDING;

  return {
    textSpace,
    nameY: STRIP_TEXT_TOP_PADDING,
    dateY: options.showName
      ? STRIP_TEXT_TOP_PADDING + nameHeight + gap
      : STRIP_TEXT_TOP_PADDING,
  };
}

export function getStripTextSpace(options: {
  showName: boolean;
  showDate: boolean;
  nameFontSize: number;
  dateFontSize: number;
}): number {
  return getStripTextLayout(options).textSpace;
}

export function drawStripText(
  ctx: CanvasRenderingContext2D,
  options: {
    canvasWidth: number;
    textAreaStartY: number;
    name?: string;
    dateText: string;
    nameColor: string;
    dateColor: string;
  } & StripTextStyleOptions
) {
  const layout = getStripTextLayout({
    showName: options.showName,
    showDate: options.showDate,
    nameFontSize: options.nameFontSize,
    dateFontSize: options.dateFontSize,
  });

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "top";

  if (options.showName) {
    ctx.font = getCanvasFont(options.nameFont, options.nameFontSize);
    ctx.fillStyle = options.nameColor;
    ctx.fillText(
      options.name || "Photo Strip",
      options.canvasWidth / 2,
      options.textAreaStartY + layout.nameY
    );
  }

  if (options.showDate) {
    ctx.font = getCanvasFont(options.dateFont, options.dateFontSize);
    ctx.fillStyle = options.dateColor;
    ctx.fillText(
      options.dateText,
      options.canvasWidth / 2,
      options.textAreaStartY + layout.dateY
    );
  }

  ctx.restore();
}

export function isStripFontStyle(value: string): value is StripFontStyle {
  return STRIP_FONT_OPTIONS.some((item) => item.id === value);
}

export function parseStripFontStyle(
  value: unknown,
  fallback: StripFontStyle
): StripFontStyle {
  return typeof value === "string" && isStripFontStyle(value) ? value : fallback;
}

export function parseStripFontSize(
  value: unknown,
  fallback: number,
  min = MIN_STRIP_FONT_SIZE,
  max = MAX_NAME_FONT_SIZE
): number {
  if (typeof value !== "number" || Number.isNaN(value)) return fallback;
  return Math.min(max, Math.max(min, Math.round(value)));
}

export function resolveStripTextStyle(source: {
  nameFont?: unknown;
  dateFont?: unknown;
  nameFontSize?: unknown;
  dateFontSize?: unknown;
  fontName?: unknown;
  fontDate?: unknown;
}) {
  return {
    nameFont: parseStripFontStyle(source.nameFont ?? source.fontName, DEFAULT_NAME_FONT),
    dateFont: parseStripFontStyle(source.dateFont ?? source.fontDate, DEFAULT_DATE_FONT),
    nameFontSize: parseStripFontSize(
      source.nameFontSize,
      DEFAULT_NAME_FONT_SIZE,
      undefined,
      MAX_NAME_FONT_SIZE
    ),
    dateFontSize: parseStripFontSize(
      source.dateFontSize,
      DEFAULT_DATE_FONT_SIZE,
      undefined,
      MAX_DATE_FONT_SIZE
    ),
  };
}

export async function waitForStripFonts(options: StripTextStyleOptions): Promise<void> {
  if (typeof document === "undefined" || !document.fonts) return;

  const loads: Promise<FontFace[] | unknown>[] = [];

  if (options.showName) {
    loads.push(document.fonts.load(getCanvasFont(options.nameFont, options.nameFontSize)));
  }

  if (options.showDate) {
    loads.push(document.fonts.load(getCanvasFont(options.dateFont, options.dateFontSize)));
  }

  await Promise.allSettled(loads);
  await document.fonts.ready;
}
