export type InnerBannerAppearance = {
  backgroundType?: "image" | "solid" | "gradient" | string;
  backgroundColor?: string;
  gradientColor?: string;
  textColor?: string;
  height?: number | string;
};

export function getInnerBannerBackground(
  appearance?: InnerBannerAppearance | null,
) {
  if (!appearance || !appearance.backgroundType || appearance.backgroundType === "image") {
    return "";
  }
  if (appearance.backgroundType === "gradient") {
    const from = appearance.backgroundColor || "#031B3D";
    const to = appearance.gradientColor || "#102E50";
    return `linear-gradient(90deg, ${from}, ${to})`;
  }
  return appearance.backgroundColor || "";
}

export function getInnerBannerHeight(appearance?: InnerBannerAppearance | null) {
  if (appearance?.height == null || appearance.height === "") return "";
  return typeof appearance.height === "number"
    ? `${appearance.height}px`
    : String(appearance.height);
}
