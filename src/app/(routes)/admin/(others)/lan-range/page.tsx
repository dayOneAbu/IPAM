
import { type Metadata } from "next"
import { DataTable } from "~/app/_components/DataTable";
import { columns } from "./column";
import { api } from "~/trpc/server";


export const metadata: Metadata = {
  title: "lanIp ranges",
}
export default async function TunnelRangePage() {
  const lanRanges = await api.lanRange.getAll.query()
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All possible LAN ranges</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all LAN IP ranges, information related to lanIp range schema designated by CBE Network infrastructure team
          </p>
        </div>
      </div>
      {lanRanges && <DataTable data={lanRanges} columns={columns} />}
    </div>

  )
}