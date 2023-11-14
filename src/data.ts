import { Calculator, Landmark, MapPinned, Radar, User } from "lucide-react";
export * as CBElogo from "../public/CBElogo.png";

export const navLinks = [
  { name: "Branches", href: "/branch", icon: Landmark, current: true },
  { name: "ATMs", href: "/atm", icon: Calculator, current: false },
  { name: "Districts", href: "/district", icon: MapPinned, current: false },
];
export const adminNavigation = [
  {
    name: "Manage Users",
    href: "index",
    icon: User,
    current: true,
  },
  {
    name: "Manage Branches",
    href: "category",
    icon: Landmark,
    current: false,
  },
  {
    name: "Manage ATMs",
    href: "benchmark",
    icon: Calculator,
    current: false,
  },
  {
    name: "Manage Districts",
    href: "agent",
    icon: MapPinned,
    current: false,
  },
  {
    name: "Manage Clusters",
    href: "/cluster",
    icon: Radar,
    current: false,
  },
];
