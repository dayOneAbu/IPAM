"use client"

import { MoreHorizontalIcon } from "lucide-react"

import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import Link from "next/link"



export function DataTableRowActions({ actions }: {
  actions: [{
    href: string,
    action: string
  }]
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {actions.map(item => (
          <span key={item.action}>
            <Link href={item.href} >
              <DropdownMenuItem >
                {item.action}
                <DropdownMenuSeparator />
              </DropdownMenuItem>
            </Link>
          </span>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}