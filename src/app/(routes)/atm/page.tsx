import { type Metadata } from "next"
import { DataTable } from "~/app/_components/DataTable";
import { columns } from "./column";
import { Button } from "~/app/_components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { api } from "~/trpc/server";

export const metadata: Metadata = {
  title: "atm's",
}

export default async function atmPage() {
  const atm = await api.atm.getAll.query()
  const formatted = atm.map(item => {
    return {
      id: item.id,
      name: item.name,
      district: item.district.name,
      wanAddress: item.wanAddress,
      loopBackAddress: item.loopBackAddress,
      isOutlet: item.isOutlet,
      ipAddress: item.ipWithTunnel?.lanIpAddress.ipAddress,
      TunnelIP_DR_ER11: item.ipWithTunnel?.tunnelIpAddress.TunnelIP_DR_ER11,
      TunnelIP_DR_ER12: item.ipWithTunnel?.tunnelIpAddress.TunnelIP_DR_ER12,
      TunnelIP_DC_ER21: item.ipWithTunnel?.tunnelIpAddress.TunnelIP_DC_ER21,
      TunnelIP_DC_ER22: item.ipWithTunnel?.tunnelIpAddress.TunnelIP_DC_ER22,
      updatedAt: item.updatedAt
    }
  })
  // const districts = await api.district.getAll.query()
  const filterOps = [
    // {
    //   title: "district",
    //   options: districts.map(item => {
    //     return {
    //       value: item.name,
    //       label: item.name.toUpperCase(),
    //     }
    //   }),
    // },
    {
      title: "isOutlet",
      options: [
        {
          value: "Outlet",
          label: "OUTLET",
        },
        {
          value: "Branch Based",
          label: "BRANCH BASED",
        }
      ]
    }
  ]
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">ATM&apos;s</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of GTS ATM with all valuable information!
          </p>
        </div>
        <Link href={`atm/new`} className="space-y-1">
          <Button variant="default" className="w-44 my-1 justify-start">
            <Plus className="text-white mx-2 h-8 w-4" />  Add New ATM
          </Button>
        </Link>
      </div>
      <DataTable data={formatted} columns={columns} colFilterable={filterOps} />
    </div>

  )
}