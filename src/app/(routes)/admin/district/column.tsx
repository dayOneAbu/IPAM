/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client"

import { type ColumnDef, type Row } from "@tanstack/react-table"
import { MoveHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { DataTableColumnHeader } from "~/app/_components/data-table/column-header"
import { DataTableRowActions } from "~/app/_components/data-table/row-actions"
import { type District } from "~/data/schema"

const ActionCell = ({ row }: { row: Row<District> }) => {
  const router = useRouter();

  return (
    <DataTableRowActions actions={[
      {
        action: 'edit',
        onClick: () => {
          router.push(`district/edit?id=${String(row.getValue("id"))}`)
        }
      },
      {
        action: 'delete',
        onClick: () => {
          router.push(`district/delete?id=${String(row.getValue("id"))}`)
        }
      }
    ]} />
  )
}
export const columns: ColumnDef<District>[] = [
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
    accessorKey: "branches",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No. of Branches" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-1">
        <span className="truncate font-medium">
          {row.getValue("branches")}
        </span>
      </div>
    ),
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: true,
  },
  {
    accessorKey: "ATM",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No. of ATM's" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("ATM")}
        </span>
      </div>
    ),
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: true,
  },
  {
    accessorKey: "usableLANRange",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="LAN-Range" />
    ),
    cell: ({ row }) => {
      const usableLANRange: {
        lowerLimit: string
        upperLimit: string
      } = row.getValue("usableLANRange")
      return (
        <div className="flex min-w-[100px] items-center">
          <p className="truncate font-medium">
            <span className="flex items-center justify-between">
              {usableLANRange.lowerLimit}
              <MoveHorizontal className="h-6 w-8 mx-2 text-brand-purple" />
              {usableLANRange.upperLimit}
            </span>
          </p>
        </div>
      )
    },
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "usableTunnelRange",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tunnel-Range" />
    ),
    cell: ({ row }) => {
      const usableTunnelRange: {
        lowerLimit: string
        upperLimit: string
      } = row.getValue("usableTunnelRange")
      return (
        <div className="flex min-w-[100px] items-center">
          <p className="truncate font-medium">
            <span className="flex items-center justify-between">
              {usableTunnelRange.lowerLimit}
              <MoveHorizontal className="h-6 w-8 mx-2 text-brand-purple" />
              {usableTunnelRange.upperLimit}
            </span>
          </p>
        </div>
      )
    },
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created-By" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex min-w-[100px] items-center">
          <span className="truncate font-medium">
            {row.getValue("email")}
          </span>
        </div>
      )
    },
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ActionCell
  },
]