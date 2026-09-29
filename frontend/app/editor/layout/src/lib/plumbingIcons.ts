import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Banknote,
  Building,
  Building2,
  Calendar,
  Clock,
  DollarSign,
  Droplets,
  Eye,
  Factory,
  GraduationCap,
  HardHat,
  Headset,
  Heart,
  Home,
  Layers,
  Leaf,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  SearchCheck,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShowerHead,
  ShoppingBag,
  Tag,
  Target,
  ThumbsUp,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
  Utensils,
  Warehouse,
  Wrench,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "arrow-right": ArrowRight,
  award: Award,
  "award-star": Award,
  "badge-check": BadgeCheck,
  banknote: Banknote,
  building: Building,
  "building-2": Building2,
  calendar: Calendar,
  clock: Clock,
  "clock-24": Clock,
  "clock-history": Clock,
  cross: Shield,
  "dollar-sign": DollarSign,
  drain: Droplets,
  eye: Eye,
  factory: Factory,
  faucet: Droplets,
  "graduation-cap": GraduationCap,
  "hard-hat": HardHat,
  headset: Headset,
  heart: Heart,
  "heart-handshake": Heart,
  "heart-smile": Heart,
  home: Home,
  "kitchen-sink": Droplets,
  layers: Layers,
  leaf: Leaf,
  lightbulb: Lightbulb,
  mail: Mail,
  "map-pin": MapPin,
  phone: Phone,
  pipe: Wrench,
  "pipe-burst": Droplets,
  "search-check": SearchCheck,
  settings: Settings,
  shield: Shield,
  "shield-alert": ShieldAlert,
  "shield-check": ShieldCheck,
  "shield-dollar": Shield,
  "shield-star": Shield,
  "shopping-bag": ShoppingBag,
  shower: ShowerHead,
  tag: Tag,
  target: Target,
  "thumbs-up": ThumbsUp,
  toilet: Droplets,
  toolbox: Wrench,
  tools: Wrench,
  "trending-up": TrendingUp,
  trophy: Trophy,
  "user-check": UserCheck,
  users: Users,
  "users-check": Users,
  "users-group": Users,
  utensils: Utensils,
  warehouse: Warehouse,
  "water-heater": Droplets,
  wrench: Wrench,
  address: MapPin,
  email: Mail,
  "working hours": Clock,
};

export const PLUMBING_ICON_NAMES = Object.keys(ICONS);

export function getPlumbingIcon(name?: string | null): LucideIcon {
  const key = String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-");
  return ICONS[key] || Wrench;
}

export type PlumbingSocialItem = { label: string; href: string };

export function getPlumbingSocialItems(socials: unknown): PlumbingSocialItem[] {
  if (!socials || typeof socials !== "object" || Array.isArray(socials)) {
    return [];
  }
  return Object.entries(socials as Record<string, unknown>)
    .filter(([, href]) => typeof href === "string" && href.trim())
    .map(([label, href]) => ({ label, href: String(href) }));
}

export function plumbingSocialHref(social: { label?: string; href?: string }) {
  const href = (social.href || "").trim();
  const label = (social.label || "").trim().toLowerCase();
  if ((label === "email" || label === "mail") && href && !/^mailto:/i.test(href)) {
    return `mailto:${href}`;
  }
  if ((label === "phone" || label === "tel") && href && !/^tel:/i.test(href) && href !== "#") {
    return `tel:${href}`;
  }
  return href || "#";
}

export function plumbingItemsPerRowClass(itemsPerRow: unknown, fallback = 3) {
  const count = Number(itemsPerRow) || fallback;
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
}
