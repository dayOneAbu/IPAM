import { type Metadata } from "next"
import { DataTable } from "~/app/_components/DataTable";
import { columns } from "./column";
import { api } from "~/trpc/server";

export const metadata: Metadata = {
  title: "Leased Branch IPs",
}

export default async function BranchPage() {
  const branches = await api.branch.leasedBranchIps.query()
  const formatted = branches.map(branch => {
    return {
      id: branch.id,
      remark: branch.remark,
      ipAddress: branch.lanIpAddress?.ipAddress,
      TunnelIP_DR_ER11: branch.tunnelIpAddress?.TunnelIP_DR_ER11,
      TunnelIP_DR_ER12: branch.tunnelIpAddress?.TunnelIP_DR_ER12,
      TunnelIP_DC_ER21: branch.tunnelIpAddress?.TunnelIP_DC_ER21,
      TunnelIP_DC_ER22: branch.tunnelIpAddress?.TunnelIP_DC_ER22,
      authorizedBy: branch.authorizedBy.email,
      updatedAt: branch.updatedAt
    }
  })

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">leasedBranchIps</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of Leased Branch Ips which are either Assigned or Reserved !
          </p>
        </div>
      </div>
      <DataTable data={formatted} columns={columns} />
    </div>
  )
}