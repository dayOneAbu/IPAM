import { Calculator, Landmark, MapPinned, Radar, User } from "lucide-react";
export * as CBElogo from "../../public/CBElogo.png";

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
