"use client"

import * as React from "react"
import Link from "next/link"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/app/_components/ui/navigation-menu"
import Image from "next/image"
import CBElogo from "../../../public/CBElogo.png"

export function NavigationBar() {
  return (
    <div className="bg-red-100 h-24">
      <NavigationMenu className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8 relative flex items-center justify-between">
        <NavigationMenuList className="h-full">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={
                navigationMenuTriggerStyle()
              }>
                <Image src={CBElogo} sizes="100vw" className="h-full w-52" alt="cbe logo" />
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList>

          <NavigationMenuItem>
            <NavigationMenuLink className={
              navigationMenuTriggerStyle()
            }>
              Branches
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={
              navigationMenuTriggerStyle()
            }>
              ATMs
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
