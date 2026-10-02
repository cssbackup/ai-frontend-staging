type NavLinkLike = {
  href?: string;
  label?: string;
  kind?: string;
  hidden?: boolean;
  children?: NavLinkLike[];
};

const normalizeHref = (href?: string) => (href || "").trim().toLowerCase();

const flattenLinks = (links: NavLinkLike[]): NavLinkLike[] =>
  links.flatMap((link) => [link, ...flattenLinks(link.children || [])]);

const hrefSlug = (href?: string) => {
  const value = normalizeHref(href);
  if (!value || value === "/" || value === "#") return "";
  if (value.startsWith("#page-")) return value.slice("#page-".length);
  if (value.startsWith("#")) return value.slice(1);
  const path = value.replace(/^https?:\/\/[^/]+/i, "");
  return path.replace(/^\/+/, "").split(/[/?#]/)[0] || "";
};

/** Hide nav entries whose matching pageLink is marked hidden (Show on website off). */
export function filterMenuByHiddenPageLinks<T extends NavLinkLike>(
  menu: T[] | undefined | null,
  pageLinks: NavLinkLike[] | undefined | null,
): T[] {
  if (!Array.isArray(menu) || !menu.length) return [];
  const flat = flattenLinks(Array.isArray(pageLinks) ? pageLinks : []);
  if (!flat.some((link) => link.hidden)) {
    return menu;
  }

  const isHiddenItem = (item: NavLinkLike) => {
    const itemHref = normalizeHref(item.href);
    const itemSlug = hrefSlug(item.href);
    const itemLabel = (item.label || "").trim().toLowerCase();
    return flat.some((link) => {
      if (!link.hidden) return false;
      const linkHref = normalizeHref(link.href);
      const linkSlug = hrefSlug(link.href);
      const linkLabel = (link.label || "").trim().toLowerCase();
      if (itemHref && linkHref && itemHref === linkHref) return true;
      const canonical = (value: string) => {
        if (value === "service" || value === "services") return "service";
        if (value === "team" || value === "teams") return "team";
        if (value === "blog" || value === "blogs") return "blog";
        if (value === "event" || value === "events") return "event";
        if (value === "gallery" || value === "galleries") return "gallery";
        return value;
      };
      if (itemSlug && linkSlug && canonical(itemSlug) === canonical(linkSlug)) {
        return true;
      }
      if (
        itemLabel &&
        linkLabel &&
        canonical(itemLabel) === canonical(linkLabel)
      ) {
        return true;
      }
      return false;
    });
  };

  return menu.flatMap((item) => {
    if (isHiddenItem(item)) return [];
    const children = Array.isArray(item.children)
      ? filterMenuByHiddenPageLinks(item.children as T[], pageLinks)
      : item.children;
    return [{ ...item, children } as T];
  });
}
