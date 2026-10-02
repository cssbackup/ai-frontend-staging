const GH = "https://raw.githubusercontent.com/abhishekk969389/DODO-Cares/main/public";

export function petAsset(src?: string) {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith("/")) return GH + src;
  return GH + "/" + src;
}

export default function PetImage({
  src,
  alt,
  fill,
  className,
  width,
  height,
  style,
}: {
  src?: string;
  alt?: string;
  fill?: boolean;
  className?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  priority?: boolean;
  sizes?: string;
}) {
  const url = petAsset(typeof src === "string" ? src : "");
  if (fill) {
    return (
      <img
        src={url}
        alt={alt || ""}
        className={`absolute inset-0 h-full w-full ${className || ""}`}
        style={style}
      />
    );
  }
  return (
    <img
      src={url}
      alt={alt || ""}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  );
}
