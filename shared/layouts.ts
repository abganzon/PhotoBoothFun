export const LAYOUT_OPTIONS = [
  {
    id: "single",
    name: "Single",
    subtitle: "1×1 portrait",
    description: "One perfect shot",
    photoCount: 1,
    gridLabel: "1×1",
  },
  {
    id: "duo",
    name: "Duo",
    subtitle: "1×2 vertical",
    description: "Two stacked photos",
    photoCount: 2,
    gridLabel: "1×2",
  },
  {
    id: "strip",
    name: "Photo Strip",
    subtitle: "1×4 vertical",
    description: "Classic four-photo strip",
    photoCount: 4,
    gridLabel: "1×4",
  },
  {
    id: "collage",
    name: "Collage",
    subtitle: "2×2 grid",
    description: "Four photos in a square grid",
    photoCount: 4,
    gridLabel: "2×2",
  },
] as const;

export type PhotoLayout = (typeof LAYOUT_OPTIONS)[number]["id"];

export function isPhotoLayout(value: string): value is PhotoLayout {
  return LAYOUT_OPTIONS.some((layout) => layout.id === value);
}

export function getLayoutConfig(layout: PhotoLayout) {
  return LAYOUT_OPTIONS.find((item) => item.id === layout) ?? LAYOUT_OPTIONS[2];
}

export function getLayoutPhotoCount(layout: PhotoLayout): number {
  return getLayoutConfig(layout).photoCount;
}

export function getLayoutGridLabel(layout: PhotoLayout): string {
  return getLayoutConfig(layout).gridLabel;
}

export function getLayoutDisplayName(layout: PhotoLayout): string {
  return getLayoutConfig(layout).name;
}

export function isVerticalStackLayout(layout: PhotoLayout): boolean {
  return layout === "single" || layout === "duo" || layout === "strip";
}

export function isGridLayout(layout: PhotoLayout): boolean {
  return layout === "collage";
}
