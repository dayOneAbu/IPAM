import { type Metadata } from "next"
import { DataTable } from "~/app/_components/DataTable";
import { columns } from "./column";
import { api } from "~/trpc/server";




export const metadata: Metadata = {
  title: "cluster",

}
export default async function BranchPage() {
  const cluster = await api.cluster.getAll.query()
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Cluster!</h2>
          <p className="text-muted-foreground">
            Clusters are created by grouping districts together Based on common  LAN IP range and Tunnel IP range
          </p>
        </div>

      </div>
      <DataTable data={cluster} columns={columns} />
    </div>

  )
}