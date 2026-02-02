'use client'
import { cn } from "~/lib/utils"
import { adminNavigation, navLinks, otherNavigation } from "~/data"
import Link from "next/link"
import Image from "next/image"
// import { getServerAuthSession } from "~/server/auth"
import { LogoutButton } from "./buttons"
import { Separator } from "./ui/separator"
import GTSlogo from "~/data"
import NavBarLink from "./NavBarLink"
import { type Session } from "next-auth"
import { ScrollArea } from "./ui/scroll-area"


export function Sidebar({ className, session }: {
  session: Session | null;
} & React.HTMLAttributes<HTMLDivElement>) {

  return (
    <ScrollArea className=" w-full">
      <div className="bg-brand-black">
        <Link href={"/"} className="mt-8 mx-2">
          <Image src={GTSlogo} sizes="100vw" className="h-20 w-full" alt="gts logo" />
        </Link>
      </div>

      <div className={cn("pt-4 px-4", className)}>
        <div className="px-1 py-2">
          <h2 className="mb-2 text-lg text-brand-white font-semibold tracking-tight">
            Links
          </h2>
          {navLinks.map((item) => (
            <NavBarLink key={item.name} item={item} />
          ))}
        </div>
        {
          session?.user.isAdmin && (
            <div className="px-1 py-2">
              <Separator className="bg-brand-black my-2" />
              <h2 className="mb-2 text-brand-white text-lg font-semibold tracking-tight">
                Admin Links
              </h2>
              {adminNavigation.map(
                (item) => (
                  <NavBarLink key={item.name} item={item} />
                )
              )}
              <Separator className="bg-brand-black my-2" />
              <h2 className="mb-2 text-brand-white text-lg font-semibold tracking-tight">
                Informational Links
              </h2>
              {
                otherNavigation.map((item) => (
                  <NavBarLink key={item.name} item={item} />
                ))
              }
              <LogoutButton />
            </div>
          )
        }
      </div>
    </ScrollArea>
  )
}
