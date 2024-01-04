
import { type Metadata } from "next"
import { DataTable } from "~/app/_components/DataTable";
import { columns } from "./column";
import { api } from "~/trpc/server";


export const metadata: Metadata = {
  title: "all possible LAN ips",

}
export default async function TunnelRangePage() {
  const cluster = await api.cluster.getAll.query()

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
  const lanIps = await api.lanIps.getAll.query()
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All possible LAN-Ips</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all LAN IP address, generated based on the designated LAN ip ranges address formula used by CBE.
          </p>
        </div>
      </div>
      {lanIps && <DataTable data={lanIps.map(item => {
        return {
          cluster: item.cluster.name,
          id: item.id,
          updatedAt: item.updatedAt,
          ipAddress: item.ipAddress,
          isTaken: item.isTaken,
          isReserved: item.isReserved,
          isFlagged: item.isFlagged,
        }
      })} columns={columns} colFilterable={filterOps} />}
    </div>

  )
}