import { cn } from "~/lib/utils"
import { Button } from "./ui/button"
import { adminNavigation, navLinks, otherNavigation } from "~/data"
import Link from "next/link"
import Image from "next/image"
import { getServerAuthSession } from "~/server/auth"
import { LogoutButton } from "./buttons"
import { Separator } from "./ui/separator"
import CBElogo from "~/data"

export async function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const session = await getServerAuthSession();
  return (
    <>
      <div className="bg-brand-black">
        <Link href={"/"} className="mt-8 mx-2">
          <Image src={CBElogo} sizes="100vw" className="h-20 w-full" alt="cbe logo" />
        </Link>
        <h2 className="text-white">premium Intl card</h2>
      </div>
      <div className={cn("pt-4 px-4", className)}>
        <div className="px-1 py-2">
          <h2 className="mb-2 text-lg text-brand-white font-semibold tracking-tight">
            Links
          </h2>
          {navLinks.map((item) => (
            <Link key={item.name} href={item.href} className="space-y-1">
              <Button variant="default" className="my-1 w-full justify-start">
                <item.icon className="mx-1 text-brand-golden" />
                {item.name}
              </Button>
            </Link>
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
                  <Link key={item.name} href={`/admin/${item.href}`} className="space-y-1">
                    <Button variant="default" className="w-full my-1 justify-start">
                      <item.icon className="text-brand-golden mx-1" />
                      {item.name}
                    </Button>
                  </Link>
                )
              )}
              <Separator className="bg-brand-black my-2" />
              <h2 className="mb-2 text-brand-white text-lg font-semibold tracking-tight">
                Other Links
              </h2>
              {
                otherNavigation.map((item) => (
                  <Link key={item.name} href={`/admin/${item.href}`} className="space-y-1">
                    <Button variant="default" className="w-full my-1 justify-start">
                      <item.icon className="text-brand-golden mx-1" />
                      {item.name}
                    </Button>
                  </Link>
                ))
              }
              <LogoutButton />
            </div>
          )
        }
      </div>
    </>
  )
}