import { type Metadata } from "next"
import { DataTable } from "~/app/_components/DataTable";
import { columns } from "./column";

import { Button } from "~/app/_components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { api } from "~/trpc/server";



export const metadata: Metadata = {
  title: "users",
}
export default async function BranchPage() {
  const users = await api.auth.getAllUser.query()
  const filtered = users.map(user => {
    return {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin ? "Admin" : "NON Admin",
      branchCreated: user._count.branchCreated,
      atmCreated: user._count.atmCreated,
      districtCreated: user._count.districtCreated,
      updatedAt: user.updatedAt
    }
  })
  const filterOps = [
    {
      title: "isAdmin",
      options: [
        {
          value: "Admin",
          label: "ADMIN",
        },
        {
          value: "NON Admin",
          label: "NON ADMIN",
        },
      ],
    },
  ]
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of Users!
          </p>
        </div>
        <Link href={`user/new`} className="space-y-1">
          <Button variant="default" className="w-44 my-1 justify-start">
            <Plus className="text-white mx-2 h-8 w-4" /> Add New User
          </Button>
        </Link>
      </div>
      <DataTable data={filtered} columns={columns} colFilterable={filterOps} />
    </div>

  )
}