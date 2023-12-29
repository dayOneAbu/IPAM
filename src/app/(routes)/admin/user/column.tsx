"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "~/app/_components/data-table/column-header"
import { DataTableRowActions } from "~/app/_components/data-table/row-actions"

import { type User } from "~/data/schema"

export const columns: ColumnDef<User>[] = [
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
    filterFn: "includesString"

  },
  {
    accessorKey: "isAdmin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Privilege" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-1">
        <span className="truncate font-medium">
          {row.getValue("isAdmin") ? "Admin" : "NON Admin"}
        </span>
      </div>
    ),
    enableColumnFilter: true,
    enableGlobalFilter: false,
    filterFn: "equals",
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
    enableSorting: true
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
    enableSorting: true
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
    enableSorting: true
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions actions={[
      {
        action: 'edit',
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        href: `user/${row.getValue("email")}-edit`
      }
    ]} />,
  },
]