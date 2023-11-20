import { type Metadata } from "next"
import { DataTable } from "~/app/_components/DataTable";
import { columns } from "./column";



export const metadata: Metadata = {
  title: "branches",
  description: "watch all information related to branch",
}
// // Simulate a database read for tasks.
// async function getTasks() {
//   const data = await fs.readFile(
//     path.join(process.cwd(), "app/examples/tasks/data/tasks.json")
//   )

//   const tasks = JSON.parse(data.toString())

//   return z.array(taskSchema).parse(tasks)
// }

export default function BranchPage() {
  // const branches: Branch[] = await getTasks()
  const branches = [{
    id: 1,
    name: "string",
    district: "x",
    wanIpAddress: " 102.610.204.128/25",
    lanIpAddress: " 102.610.204.128/25",
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
    <>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-4 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of CBE Branches with all valuable information!
            </p>
          </div>
        </div>
        <DataTable data={branches} columns={columns} colFilterable={filterOps} />
      </div>
    </>
  )
}