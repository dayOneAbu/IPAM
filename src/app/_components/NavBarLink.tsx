'use client'

import { usePathname } from "next/navigation"
import { type LucideIcon } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"

export default function NavBarLink({ item, }: {

  item: {
    name: string;
    href: string;
    icon: LucideIcon;
    current: boolean;
  }
}) {
  const pathname = usePathname()

  return (
    <Link key={item.name} href={item.href}>
      <Button
        className={`my-1 py-2 flex h-14 justify-start ${pathname == item.href
          ? 'text-brand-golden bg-brand-white'
          : 'text-brand-golden'} py-2 w-full justify-start`}
      >
        <item.icon className="text-brand-golden hidden md:block md:h-8 w-4 mx-1" />
        {item.name}
      </Button>
    </Link>
  )
}