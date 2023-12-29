"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "~/app/_components/data-table/column-header"
import { Check, X } from "lucide-react";
import { type AllLANIps, } from "~/data/schema"

export const columns: ColumnDef<AllLANIps>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No." />
    ),
    cell: ({ row }) => <div className="w-[20px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "ipAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LAN-IP Address" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("ipAddress")}
        </span>
      </div>
    ),
    filterFn: "includesString"
  },
  {
    accessorKey: "isTaken",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Taken" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-1">
        <span className="truncate font-medium">
          {row.getValue("isTaken") === true ? <Check className="text-brand-purple h-8" /> : <X className="text-brand-purple h-8" />}
        </span>
      </div>
    ),
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false
  },
  {
    accessorKey: "isReserved",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reserved" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-1">
        <span className="truncate font-medium">
          {row.getValue("isReserved") === true ? <Check className="text-brand-purple h-8" /> : <X className="text-brand-purple h-8" />}
        </span>
      </div>
    ),

    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false
  },
  {
    accessorKey: "isFlagged",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Flagged" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("isFlagged") === true ? <Check className="text-brand-purple h-8" /> : <X className="text-brand-purple h-8" />}
        </span>
      </div>
    ),
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false,

  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Modified" />
    ),
    cell: ({ row }) => {
      const updatedAt: Date = row.getValue("updatedAt")

      return (
        <div className="flex min-w-[100px] items-center">
          <span className="truncate font-medium">
            {updatedAt.toUTCString()}
          </span>
        </div>
      )
    },
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false
  },
]