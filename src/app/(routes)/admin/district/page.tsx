import { type Metadata } from "next"
import { DataTable } from "~/app/_components/DataTable";
import { columns } from "./column";
import { api } from "~/trpc/server";
import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "districts",
  description: "watch all information related to districts",
}
export default async function BranchPage() {
  const district = await api.district.getAll.query()
  const formatted = district.map(dis => {
    return {
      id: dis.id,
      name: dis.name,
      branches: dis._count.branches.toString(),
      ATM: dis._count.ATM.toString(),
      usableTunnelRange: dis.usableTunnelRange,
      usableLANRange: dis.usableLANRange,
      email: dis.createdBy.email,
      updatedAt: dis.updatedAt
    }
  })

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of CBE District&apos;s with all valuable information!
          </p>
        </div>
        <Link href={`district/new`} className="space-y-1">
          <Button variant="default" className="w-44 my-1 justify-start">
            <Plus className="text-white mx-2 h-8 w-4" /> Add New District
          </Button>
        </Link>
      </div>
      <DataTable data={formatted} columns={columns} />
    </div>

  )
}