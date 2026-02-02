/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client"

import type { ColumnDef, Row } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { DataTableColumnHeader } from "~/app/_components/data-table/column-header"
import { DataTableRowActions } from "~/app/_components/data-table/row-actions"

import { type User } from "~/data/schema"


const ActionCell = ({ row }: { row: Row<User> }) => {
  const router = useRouter();

  return (
    <DataTableRowActions actions={[
      {
        action: 'edit',
        onClick: () => {
          router.push(`user/edit?email=${String(row.getValue("email"))}`)
        }
      },
      {
        action: 'delete',
        onClick: () => {
          router.push(`user/delete?email=${String(row.getValue("email"))}`)
        }
      }
    ]} />
  )
}
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No." />
    ),
    cell: ({ row }) => <div className="w-[20px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-1">
        <span className="truncate font-medium">
          {row.getValue("email")}
        </span>
      </div>
    ),
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false,

  },
  {
    accessorKey: "isAdmin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Privilege" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-1">
        <span className="truncate font-medium">
          {row.getValue("isAdmin")}
        </span>
      </div>
    ),
    // enableColumnFilter: false,
    enableSorting: true,
    enableGlobalFilter: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "branchCreated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch's Created" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("branchCreated")}
        </span>
      </div>
    ),
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "atmCreated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ATM Created" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("atmCreated")}
        </span>
      </div>
    ),
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "districtCreated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="District Created" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("districtCreated")}
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
            {updatedAt.toLocaleDateString()}
          </span>
        </div>
      )
    },
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false
  },
  {
    id: "actions",
    cell: ActionCell
  },
]