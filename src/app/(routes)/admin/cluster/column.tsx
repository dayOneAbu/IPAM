/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { MapPinned } from "lucide-react"
import { DataTableColumnHeader } from "~/app/_components/data-table/column-header"
import { type Cluster } from "~/data/schema"

export const columns: ColumnDef<Cluster>[] = [
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
      <DataTableColumnHeader column={column} title="Cluster Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex min-w-[100px] items-center">
          <span className="truncate capitalize font-medium">
            {row.getValue("name")}
          </span>
        </div>
      )
    },
    filterFn: "includesString"
  },
  {
    accessorKey: "districts",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Districts" />
    ),
    cell: ({ row }) => {
      const districts: [
        {
          name: string;
        }
      ] = row.getValue("districts")
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
    filterFn: "includesString"
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