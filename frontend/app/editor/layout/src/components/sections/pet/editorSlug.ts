export function editorSlug(value: string) {
  let slug = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
  if (slug === "about-us") slug = "about";
  if (slug === "contact-us") slug = "contact";
  if (slug === "team") slug = "teams";
  if (slug === "service") slug = "services";
  return slug;
}
