import { cn } from "~/lib/utils"
import { Button } from "./ui/button"
import { CBElogo, adminNavigation, navLinks } from "~/data"
import Link from "next/link"
import Image from "next/image"
import { getServerAuthSession } from "~/server/auth"
import { LogoutButton } from "./buttons"

export async function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const session = await getServerAuthSession();
  return (
    <div className={cn("pt-14 px-4", className)}>
      <Link href={"/"} className="mt-8 mx-2">
        <Image src={CBElogo} sizes="100vw" className="h-28 w-full" alt="cbe logo" />
      </Link>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Links
          </h2>
          {navLinks.map((item) => (
            <Link key={item.name} href={item.href} className="space-y-1">
              <Button variant="default" className="my-1 w-full justify-start">
                <item.icon className="mx-2" />
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
        {
          session?.user.isAdmin && (
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Admin Links
              </h2>
              {adminNavigation.map(
                (item) => (
                  <div key={item.name} className="space-y-1 ">
                    <Button variant="default" className="w-full my-1 justify-start">
                      <item.icon className="mx-2" />
                      {item.name}
                    </Button>
                  </div>
                )
              )}
              <LogoutButton />
            </div>
          )
        }
      </div>
    </div>
  )
}