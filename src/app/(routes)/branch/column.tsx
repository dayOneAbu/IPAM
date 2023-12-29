"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "~/app/_components/data-table/column-header"
import { DataTableRowActions } from "~/app/_components/data-table/row-actions"

import { type Branch } from "~/data/schema"

export const columns: ColumnDef<Branch>[] = [
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
    filterFn: "includesString"
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
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: true,
  },
  {
    accessorKey: "wanAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="WAN-IP_Address" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("wanAddress")}
        </span>
      </div>
    ),
    filterFn: "includesString"
  },
  {
    accessorKey: "ipAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LAN-IP_Address" />
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
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false,
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
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false,
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
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false,
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
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false,
  },

  {
    id: "actions",
    cell: () => <DataTableRowActions actions={[
      {
        action: 'edit',
        href: 'branch/edit'
      }

    ]} />,
  },
]