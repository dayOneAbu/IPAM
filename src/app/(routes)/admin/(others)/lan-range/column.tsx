/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { MapPinned } from "lucide-react"
import { DataTableColumnHeader } from "~/app/_components/data-table/column-header"
import { type LANRange, } from "~/data/schema"

export const columns: ColumnDef<LANRange>[] = [
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
    accessorKey: "clusterName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cluster Name" />
    ),
    cell: ({ row }) => (
      <div className="flex min-w-[100px] items-center">
        <span className="truncate font-medium">
          {row.getValue("clusterName")}
        </span>
      </div>
    ),
    filterFn: "includesString"
  },
  {
    accessorKey: "lowerLimit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lower Limit" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-1">
        <span className="truncate font-medium">
          {row.getValue("lowerLimit")}
        </span>
      </div>
    ),
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false
  },
  {
    accessorKey: "upperLimit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Upper Limit" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-1">
        <span className="truncate font-medium">
          {row.getValue("upperLimit")}
        </span>
      </div>
    ),

    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false
  },

  {
    accessorKey: "District",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Districts" />
    ),
    cell: ({ row }) => {
      const districts: { name: string }[] = row.getValue("District")
      return (
        <>
          {districts.map((item, idx) => (
            <div key={idx}
              className="flex py-1 min-w-[100px] items-center">
              <MapPinned className="mx-1 text-brand-golden" />
              <span className="truncate font-medium">
                {item.name}
              </span>
            </div>

          ))}
        </>
      )
    },
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableSorting: false,

  },
  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created-By" />
    ),
    cell: ({ row }) => {
      const user: {
        email: string
      } = row.getValue("createdBy")
      return (
        <div className="flex min-w-[100px] items-center">
          <span className="truncate font-medium">
            {user.email}
          </span>
        </div>
      )
    },
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
]