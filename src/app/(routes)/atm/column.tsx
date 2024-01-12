/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "~/app/_components/data-table/column-header"
import { type ATM } from "~/data/schema"


export const columns: ColumnDef<ATM>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-1">
        <span className="truncate capitalize font-medium">
          {row.getValue("name")}
        </span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "district",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="District" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-1">
        <span className="truncate capitalize font-medium">
          {row.getValue("district")}
        </span>
      </div>
    ),
    enableGlobalFilter: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },

  },
  {
    accessorKey: "wanIpAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="WAN_IP" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("wanIpAddress")}
        </span>
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
    enableGlobalFilter: false
  },
  {
    accessorKey: "loopBackAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LoopBack_IP" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("loopBackAddress")}
        </span>
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
    enableGlobalFilter: false
  },
  {
    accessorKey: "isOutlet",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ATM Type" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("isOutlet") ? "Outlet" : "Branch Based"}
        </span>
      </div>
    )
    ,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "lanIpAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LAN_IP" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("lanIpAddress")}
        </span>
      </div>
    )

  },

  {
    accessorKey: "tunnelIP_DR_ER11",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TunnelIP_DR_ER11" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("tunnelIP_DR_ER11")}
        </span>
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
    enableGlobalFilter: false
  },
  {
    accessorKey: "tunnelIP_DR_ER12",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TunnelIP_DR_ER12" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("tunnelIP_DR_ER12")}
        </span>
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
    enableGlobalFilter: false

  },
  {
    accessorKey: "tunnelIP_DC_ER21",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TunnelIP_DC_ER21" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("tunnelIP_DC_ER21")}
        </span>
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
    enableGlobalFilter: false
  },
  {
    accessorKey: "tunnelIP_DC_ER22",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TunnelIP_DC_ER22" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("tunnelIP_DC_ER22")}
        </span>
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
    enableGlobalFilter: false
  },
]
