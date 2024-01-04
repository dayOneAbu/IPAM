import { type Metadata } from "next"
import { DataTable } from "~/app/_components/DataTable";
import { columns } from "./column";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "~/app/_components/ui/button";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "CBE ATM's",
  description: "watch all information related to ATM",
}

export default async function ATMPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/api/auth/signin");
  }
  const atm = [{
    id: 1,
    name: "string",
    district: "x",
    wanIpAddress: " 102.610.204.128/25",
    lanIpAddress: " 102.610.204.128/25",
    isOutlet: true,
    loopBackAddress: "192.168.0.0",
    tunnelIP_DR_ER11: " 102.610.204.128/25",
    tunnelIP_DR_ER12: " 102.610.204.128/25",
    tunnelIP_DC_ER21: " 102.610.204.128/25",
    tunnelIP_DC_ER22: " 102.610.204.128/25",
    createdBy: "string",
    updatedAt: "string",
  },
  {
    id: 2,
    name: "string",
    district: "arada",
    wanIpAddress: " 102.610.204.128/25",
    lanIpAddress: " 102.610.204.128/25",
    isOutlet: false,
    loopBackAddress: "192.168.0.0",
    tunnelIP_DR_ER11: " 102.610.204.128/25",
    tunnelIP_DR_ER12: " 102.610.204.128/25",
    tunnelIP_DC_ER21: " 102.610.204.128/25",
    tunnelIP_DC_ER22: " 102.610.204.128/25",
    createdBy: "string",
    updatedAt: "string",
  },
  {
    id: 3,
    name: "string",
    district: "arada",
    wanIpAddress: " 102.610.204.128/25",
    lanIpAddress: " 102.610.204.128/25",
    isOutlet: false,
    loopBackAddress: "192.168.0.0",
    tunnelIP_DR_ER11: " 102.610.204.128/25",
    tunnelIP_DR_ER12: "78/25",
    tunnelIP_DC_ER21: " 102.610.204.128/25",
    tunnelIP_DC_ER22: " 102.610.204.128/25",
    createdBy: "string",
    updatedAt: "string",
  }]
  const filterOps = [
    {
      title: "district",
      options: [
        {
          value: "arada",
          label: "ARADA",
          // icon: QuestionMarkCircledIcon,
        },
        {
          value: "x",
          label: "X",
          // icon: QuestionMarkCircledIcon,
        },
        {
          value: "y",
          label: "Y",
          // icon: QuestionMarkCircledIcon,
        },
      ],
    },
    {
      title: "name",
      options: [
        {
          value: "x",
          label: "X",
          // icon: QuestionMarkCircledIcon,
        },
        {
          value: "y",
          label: "Y",
          // icon: QuestionMarkCircledIcon,
        },
        {
          value: "e",
          label: "E",
          // icon: QuestionMarkCircledIcon,
        },
      ]
    }
  ]
  return (

    <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">ATM&apos;s</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of CBE ATM&apos;s with all valuable information!
          </p>
        </div>
        <Link href={`atm/new`} className="space-y-1">
          <Button variant="default" className="w-44 my-1 justify-start">
            <Plus className="text-white mx-2 h-8 w-4" /> Add New ATM
          </Button>
        </Link>
      </div>
      <DataTable data={atm} columns={columns} colFilterable={filterOps} />
    </div>

  )
}