export interface NavLink {
  id: string;
  label: string;
  href: string;
  active?: boolean;
}

export interface CtaButton {
  label: string;
  href: string;
}

export interface LogoConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface FooterFeature {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkSection {
  title: string;
  links: FooterLink[];
}

export interface FooterContactAddress {
  title: string;
  lines: string[];
}

export interface FooterContactPhone {
  title: string;
  numbers: string[];
}

export interface FooterContactEmail {
  title: string;
  emails: string[];
}

export interface FooterContactInfo {
  title: string;
  address: FooterContactAddress;
  phone: FooterContactPhone;
  email: FooterContactEmail;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface FooterBottomBar {
  copyright: string;
  loveText: string;
  followText: string;
  socialLinks: SocialLink[];
}

export interface ServiceStat {
  id: string;
  value: string;
  label: string;
  icon: string;
}

export type StatisticItem = ServiceStat;

export interface StatisticsProps {
  stats?: StatisticItem[];
  className?: string;
}

export interface BlogPostItem {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  link: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export interface SitemapLink {
  label: string;
  href: string;
}

export interface SitemapItem {
  id: string;
  number: string;
  title: string;
  links: SitemapLink[];
}

export interface LocationFacilityItem {
  id: string | number;
  title: string;
  description: string;
  icon: string;
}

export interface LocationFacilitiesSection {
  title: string;
  items: LocationFacilityItem[];
}