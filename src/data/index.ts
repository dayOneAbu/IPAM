import {
  Calculator,
  Cone,
  Landmark,
  MapPinned,
  Network,
  Radar,
  Satellite,
  User,
} from "lucide-react";
import * as GTSlogo from "../../public/GTSlogo.png";
export default GTSlogo;
export const navLinks = [
  { name: "Branches", href: "/branch", icon: Landmark, current: true },
  { name: "ATMs", href: "/atm", icon: Calculator, current: false },
];
export const otherNavigation = [
  {
    name: "Leased BranchIps",
    href: "/admin/leased-branch-ips",
    icon: Landmark,
    current: false,
  },
  {
    name: "Leased ATMIps",
    href: "/admin/leased-atm-ips",
    icon: Calculator,
    current: false,
  },
  {
    name: "All LANIps",
    href: "/admin/lan-ips",
    icon: Network,
    current: false,
  },
  {
    name: "All TunnelIps",
    href: "/admin/tunnel-ips",
    icon: Satellite,
    current: false,
  },
];
export const adminNavigation = [
  {
    name: "Manage Users",
    href: "/admin/user",
    icon: User,
    current: true,
  },
  {
    name: "Manage Branches",
    href: "/admin/branch",
    icon: Landmark,
    current: false,
  },
  {
    name: "Manage ATMs",
    href: "/admin/atm",
    icon: Calculator,
    current: false,
  },
  {
    name: "Districts",
    href: "/admin/district",
    icon: MapPinned,
    current: false,
  },
  {
    name: "Clusters",
    href: "/admin/cluster",
    icon: Radar,
    current: false,
  },
  {
    name: "Tunnel Range's",
    href: "/admin/tunnel-range",
    icon: Cone,
    current: false,
  },
  {
    name: "LAN Range's",
    href: "/admin/lan-range",
    icon: Network,
    current: false,
  },
];

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    // icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    // icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    // icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    // icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    // icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    // icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    // icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    // icon: ArrowUpIcon,
  },
];
export const districts = [
  "ARADA",
  "AMBO",
  "YEKA",
  "BOLE",
  "MEGENAGNA",
  "DEBRE BIRHAN",
  "Gulele",
  "KIRKOS",
  "NIFAS SILK",
  "KALITY",
  "MERKATO",
  "KOLFE",
  "ADAMA",
  "ASSELA",
  "BAHIR DAR",
  "DEBRE MARKOS",
  "GONDER",
  "DESSIE",
  "WOLDIYA",
  "SEMERA",
  "MEKELE",
  "SHIRE",
  "DIRE DAWA",
  "JIJIGA",
  "HAWASSA",
  "DILLA",
  "SHASHEMENE",
  "BALE ROBE",
  "WELAYTA SODO",
  "HOSSANA",
  "JIMMA",
  "METTU",
  "NEKEMTE",
];
