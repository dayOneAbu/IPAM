/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client"

import { type ColumnDef, type Row } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { DataTableColumnHeader } from "~/app/_components/data-table/column-header"
import { DataTableRowActions } from "~/app/_components/data-table/row-actions"

import { type Branch } from "~/data/schema"

const ActionCell = ({ row }: { row: Row<Branch> }) => {
  const router = useRouter();

  return (
    <DataTableRowActions actions={[
      {
        action: 'edit',
        onClick: () => {
          router.push(`branch/edit?id=${String(row.getValue("id"))}`)
        }
      },
      {
        action: 'delete',
        onClick: () => {
          router.push(`branch/edit?id=${String(row.getValue("id"))}`)
        }
      }
    ]} />
  )
}
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
      <div className="flex space-x-1 max-w-[180px]">
        <span className="truncate capitalize break-words font-medium">
          {row.getValue("name")}
        </span>
      </div>
    ),
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: true,
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
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
  },
  {
    accessorKey: "wanAddress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="WAN-IP_Address" />
    ),
    cell: ({ row }) => (
      <div className="flex max-w-[140px] items-center">
        <span className="truncate font-medium">
          {row.getValue("wanAddress")}
        </span>
      </div>
    ),
    enableColumnFilter: false,
    filterFn: "includesString",
    enableSorting: false,
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
    id: "actions",
    cell: ActionCell
  },
]