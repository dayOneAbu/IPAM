/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "~/app/_components/data-table/column-header"
import { type LeasedBranch, } from "~/data/schema"


export const columns: ColumnDef<LeasedBranch>[] = [
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
      <DataTableColumnHeader column={column} title="LAN-IP_Address" />
    ),
    cell: ({ row }) => (
      <div className="flex max-w-[140px] items-center">
        <span className="truncate font-medium">
          {row.getValue("ipAddress")}
        </span>
      </div>
    ),
    enableColumnFilter: false,
    filterFn: "includesString"
  },
  {
    accessorKey: "TunnelIP_DR_ER11",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TunnelIP_DR_ER11" />
    ),
    cell: ({ row }) => (
      <div className="flex max-w-[140px] items-center">
        <span className="truncate font-medium">
          {row.getValue("TunnelIP_DR_ER11")}
        </span>
      </div>
    ),
    enableColumnFilter: false,
    filterFn: "includesString"
  },
  {
    accessorKey: "TunnelIP_DR_ER12",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TunnelIP_DR_ER12" />
    ),
    cell: ({ row }) => (
      <div className="flex max-w-[140px] items-center">
        <span className="truncate font-medium">
          {row.getValue("TunnelIP_DR_ER12")}
        </span>
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
    enableGlobalFilter: false
  },
  {
    accessorKey: "TunnelIP_DC_ER21",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TunnelIP_DC_ER21" />
    ),
    cell: ({ row }) => (
      <div className="flex max-w-[140px] items-center">
        <span className="truncate font-medium">
          {row.getValue("TunnelIP_DC_ER21")}
        </span>
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
    enableGlobalFilter: false
  },
  {
    accessorKey: "TunnelIP_DC_ER22",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TunnelIP_DC_ER22" />
    ),
    cell: ({ row }) => (
      <div className="flex max-w-[140px] items-center">
        <span className="truncate font-medium">
          {row.getValue("TunnelIP_DC_ER22")}
        </span>
      </div>
    ),
    enableSorting: false,
    enableColumnFilter: false,
    enableGlobalFilter: false
  },
  {
    accessorKey: "authorizedBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Authorized By" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-1">
        <span className="truncate capitalize font-medium">
          {row.getValue("authorizedBy")}
        </span>
      </div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableGlobalFilter: false,
    enableSorting: true,
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
            {updatedAt.toLocaleDateString()}
          </span>
        </div>
      )
    },
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false
  },

]