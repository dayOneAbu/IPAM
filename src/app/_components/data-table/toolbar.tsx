"use client"

import { X } from "lucide-react"
import { type Table } from "@tanstack/react-table"

import { Button } from "../ui/button"
import { DataTableFacetedFilter } from "./faceted-filter"
import { DataTableViewOptions } from "./view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  colFilterable?: {
    title: string;
    options: {
      value: string;
      label: string;
    }[];
  }[]
}


export function DataTableToolbar<TData>({
  table,
  colFilterable,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {
          colFilterable?.map((item) => (
            <span key={item.title}>
              {table.getColumn(item.title) && (
                <DataTableFacetedFilter
                  column={table.getColumn(item.title)}
                  title={item.title}
                  options={item.options}
                />
              )}
            </span>
          ))
        }
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}