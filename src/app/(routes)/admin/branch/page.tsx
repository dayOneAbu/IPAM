import { type Metadata } from "next"
import { DataTable } from "~/app/_components/DataTable";
import { columns } from "./column";

import { Button } from "~/app/_components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { api } from "~/trpc/server";
import { districts } from "~/data";


export const metadata: Metadata = {
  title: "branches",
  description: "watch all information related to branch",
}
export default async function BranchPage() {
  const branches = await api.branch.getAll.query()
  const formatted = branches.map(branch => {
    return {
      id: branch.id,
      name: branch.name,
      district: branch.district.name,
      wanAddress: branch.wanAddress,
      ipAddress: branch.ipWithTunnel?.lanIpAddress.ipAddress,
      TunnelIP_DR_ER11: branch.ipWithTunnel?.tunnelIpAddress.TunnelIP_DR_ER11,
      TunnelIP_DR_ER12: branch.ipWithTunnel?.tunnelIpAddress.TunnelIP_DR_ER12,
      TunnelIP_DC_ER21: branch.ipWithTunnel?.tunnelIpAddress.TunnelIP_DC_ER21,
      TunnelIP_DC_ER22: branch.ipWithTunnel?.tunnelIpAddress.TunnelIP_DC_ER22,
      email: branch.createdBy.email,
      updatedAt: branch.updatedAt
    }
  })
  const filterOps = [
    {
      title: "district",
      options: districts.map(item => {
        return {
          value: item.toLowerCase(),
          label: item.toUpperCase(),
        }
      }),
    },
  ]
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of CBE Branches with all valuable information!
          </p>
        </div>
        <Link href={`branch/new`} className="space-y-1">
          <Button variant="default" className="w-44 my-1 justify-start">
            <Plus className="text-white mx-2 h-8 w-4" />  Add New Branch
          </Button>
        </Link>
      </div>
      <DataTable data={formatted} columns={columns} colFilterable={filterOps} />
    </div>

  )
}