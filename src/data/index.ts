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
import * as CBElogo from "../../public/CBElogo.png";
export default CBElogo;
export const navLinks = [
  { name: "Branches", href: "/branch", icon: Landmark, current: true },
  { name: "ATMs", href: "/atm", icon: Calculator, current: false },
];
export const otherNavigation = [
  {
    name: "Tunnel Range's",
    href: "/tunnel-range",
    icon: Cone,
    current: false,
  },
  {
    name: "LAN Range's",
    href: "/lan-range",
    icon: Network,
    current: false,
  },
  {
    name: "Leased BranchIps",
    href: "/leased-branch-ips",
    icon: Landmark,
    current: false,
  },
  {
    name: "Leased ATMIps",
    href: "/leased-atm-ips",
    icon: Calculator,
    current: false,
  },
  {
    name: "All LANIps",
    href: "/lan-ips",
    icon: Network,
    current: false,
  },
  {
    name: "All TunnelIps",
    href: "/tunnel-ips",
    icon: Satellite,
    current: false,
  },
];
export const adminNavigation = [
  {
    name: "Manage Users",
    href: "user",
    icon: User,
    current: true,
  },
  {
    name: "Manage Branches",
    href: "branch",
    icon: Landmark,
    current: false,
  },
  {
    name: "Manage ATMs",
    href: "atm",
    icon: Calculator,
    current: false,
  },
  {
    name: "Manage Districts",
    href: "district",
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
