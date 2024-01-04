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


export function DataTableRowActions({ actions }: {
  actions: {
    action: string,
    onClick: () => void
  }[]
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
            <DropdownMenuItem onClick={item.onClick}>
              {item.action}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </span>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}