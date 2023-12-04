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
          {row.getValue("isAdmin") ? "Admin" : "Normal User"}
        </span>
      </div>
    ),

    filterFn: "includesString"
  },
  {
    accessorKey: "branchCreated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="branch's Created" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("branchCreated")}
        </span>
      </div>
    ),
    filterFn: "includesString"
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
    filterFn: "includesString"
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
    filterFn: "includesString"
  },
  {
    accessorKey: "clusterCreated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cluster Created" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("clusterCreated")}
        </span>
      </div>
    ),
    filterFn: "includesString"
  },

  {
    id: "actions",
    cell: () => <DataTableRowActions actions={[
      'edit',
      'delete'
    ]} />,
  },
]