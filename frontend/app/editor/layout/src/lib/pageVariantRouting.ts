/** Turn a plumbing template href into the preview page id. */
export function getPageNameFromHref(href: string) {
  const path = href.split("?")[0].split("#")[0].replace(/\/+$/, "");
  const slug = path.replace(/^\//, "").trim();
  return slug || "Home";
}
