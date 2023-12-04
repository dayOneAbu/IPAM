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
      <DataTableColumnHeader column={column} title="District Name" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-1">
        <span className="truncate font-medium">
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

    filterFn: "includesString"
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
    filterFn: "includesString"
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Update" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("updatedAt")}
        </span>
      </div>
    ),
    enableColumnFilter: false,
    enableSorting: false,
  },
  // {
  //   accessorKey: "usableTunnel",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="TunnelIP_DR_ER11" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="flex min-w-[100px] items-center">
  //       <span className="truncate font-medium">
  //         {row.getValue("usableTunnel")}
  //       </span>
  //     </div>
  //   ),
  //   filterFn: "includesString"
  // },
  // {
  //   accessorKey: "tunnelIP_DR_ER12",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="TunnelIP_DR_ER12" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="flex min-w-[100px] items-center">
  //       <span className="truncate font-medium">
  //         {row.getValue("tunnelIP_DR_ER12")}
  //       </span>
  //     </div>
  //   ),
  //   filterFn: "includesString"
  // },
  // {
  //   accessorKey: "tunnelIP_DC_ER21",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="TunnelIP_DC_ER21" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="flex min-w-[100px] items-center">
  //       <span className="truncate font-medium">
  //         {row.getValue("tunnelIP_DC_ER21")}
  //       </span>
  //     </div>
  //   ),
  //   filterFn: "includesString"
  // },
  // {
  //   accessorKey: "tunnelIP_DC_ER22",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="TunnelIP_DC_ER22" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="flex min-w-[100px] items-center">
  //       <span className="truncate font-medium">
  //         {row.getValue("tunnelIP_DC_ER22")}
  //       </span>
  //     </div>
  //   ),
  //   filterFn: "includesString"
  // },
  {
    id: "actions",
    cell: () => <DataTableRowActions actions={[
      'edit',
    ]} />,
  },
]