'use client'
import { api } from "~/trpc/react"
import { usePathname } from "next/navigation"
import NewForm from "./NewForm"
import EditForm from "./EditForm"


export default function NewPage() {
  const intent = usePathname()
  if (intent.split('/').pop()?.split('-').pop() == 'new') {
    const res = api.district.preloadData.useQuery()
    return res.data != undefined && <NewForm preloadData={res.data} />
  }
  if (intent.split('/').pop()?.split('-').pop() == 'edit') {
    const res = api.district.preloadData.useQuery()
    return res.data != undefined && <EditForm preloadData={res.data} />
  }
  return (
    <></>
  )
}