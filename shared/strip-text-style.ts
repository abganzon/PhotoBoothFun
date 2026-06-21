export type StripTextStylePayload = {
  nameFont?: unknown;
  dateFont?: unknown;
  nameFontSize?: unknown;
  dateFontSize?: unknown;
  fontName?: unknown;
  fontDate?: unknown;
};

export function extractStripTextStyle(
  source: StripTextStylePayload | Record<string, unknown>
): {
  nameFont?: string;
  dateFont?: string;
  nameFontSize?: number;
  dateFontSize?: number;
} {
  const style: {
    nameFont?: string;
    dateFont?: string;
    nameFontSize?: number;
    dateFontSize?: number;
  } = {};

  const nameFont =
    typeof source.nameFont === "string"
      ? source.nameFont
      : typeof source.fontName === "string"
        ? source.fontName
        : undefined;
  const dateFont =
    typeof source.dateFont === "string"
      ? source.dateFont
      : typeof source.fontDate === "string"
        ? source.fontDate
        : undefined;

  if (nameFont) style.nameFont = nameFont;
  if (dateFont) style.dateFont = dateFont;
  if (typeof source.nameFontSize === "number") style.nameFontSize = source.nameFontSize;
  if (typeof source.dateFontSize === "number") style.dateFontSize = source.dateFontSize;

  return style;
}

export function mergeStripTextStyle<T extends Record<string, unknown>>(
  photoStrip: T,
  body: StripTextStylePayload
): T & {
  nameFont?: string;
  dateFont?: string;
  nameFontSize?: number;
  dateFontSize?: number;
} {
  const style = extractStripTextStyle(body);
  return Object.keys(style).length > 0 ? { ...photoStrip, ...style } : photoStrip;
}
