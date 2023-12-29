
import { type Metadata } from "next"
import { DataTable } from "~/app/_components/DataTable";
import { columns } from "./column";
import { api } from "~/trpc/server";


export const metadata: Metadata = {
  title: "all possible tunnel ips",

}
export default async function TunnelRangePage() {

  const tunnelIps = await api.tunnelIps.getAll.query()
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All possible Tunnel-Ips</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all tunnel IP address, generated based on the designated tunnel ip address formula used by CBE.
          </p>
        </div>
      </div>
      {tunnelIps && <DataTable data={tunnelIps} columns={columns} />}
    </div>

  )
}