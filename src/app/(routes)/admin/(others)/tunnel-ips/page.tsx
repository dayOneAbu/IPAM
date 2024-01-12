
import { type Metadata } from "next"
import { DataTable } from "~/app/_components/DataTable";
import { columns } from "./column";
import { api } from "~/trpc/server";
import Link from "next/link";
import { Button } from "~/app/_components/ui/button";


export const metadata: Metadata = {
  title: "all possible tunnel ips",

}
export default async function TunnelRangePage() {
  const cluster = await api.cluster.getAll.query()
  const tunnelIps = await api.tunnelIps.getAll.query()

  const filterOps = [
    {
      title: "cluster",
      options: cluster.map(item => {
        return {
          value: item.name,
          label: item.name,
        }
      }),
    },
  ]


  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Possible Tunnel-Ips</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all tunnel IP address, generated based on the designated tunnel ip address formula used by CBE.
          </p>
        </div>
        <Link href={`tunnel-ips/manage`} className="space-y-1">
          <Button variant="default" className="w-44 my-1 justify-start">
            Manage Tunnel-Ips
          </Button>
        </Link>
      </div>
      {tunnelIps && <DataTable data={tunnelIps.map(item => {
        return {
          id: item.id,
          isFlagged: item.isFlagged,
          cluster: item.cluster.name,
          isReserved: item.isReserved,
          isTaken: item.isTaken,
          TunnelIP_DC_ER21: item.TunnelIP_DC_ER21,
          TunnelIP_DC_ER22: item.TunnelIP_DC_ER22,
          TunnelIP_DR_ER11: item.TunnelIP_DR_ER11,
          TunnelIP_DR_ER12: item.TunnelIP_DR_ER12,
          updatedAt: item.updatedAt
        }
      })
      }
        columns={columns}
        colFilterable={filterOps}
      />}
    </div>

  )
}