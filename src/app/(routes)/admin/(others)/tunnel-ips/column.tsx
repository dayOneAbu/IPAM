/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "~/app/_components/data-table/column-header"
import { Check, X } from "lucide-react";
import { type AllTunnelIps } from "~/data/schema"

export const columns: ColumnDef<AllTunnelIps>[] = [
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
    accessorKey: "cluster",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cluster" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex min-w-[100px] items-center">
          <span className="truncate font-medium">
            {row.getValue("cluster")}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "TunnelIP_DR_ER11",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TunnelIP_DR_ER11" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("TunnelIP_DR_ER11")}
        </span>
      </div>
    ),
    filterFn: "includesString"
  },
  {
    accessorKey: "TunnelIP_DR_ER12",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TunnelIP_DR_ER12" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("TunnelIP_DR_ER12")}
        </span>
      </div>
    ),
    filterFn: "includesString"
  },
  {
    accessorKey: "TunnelIP_DC_ER21",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TunnelIP_DC_ER21" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("TunnelIP_DC_ER21")}
        </span>
      </div>
    ),
    filterFn: "includesString"
  },
  {
    accessorKey: "TunnelIP_DC_ER22",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TunnelIP_DC_ER22" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("TunnelIP_DC_ER22")}
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