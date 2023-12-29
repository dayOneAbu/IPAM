'use client'
import { api } from "~/trpc/react"
import { usePathname } from "next/navigation"
import NewForm from "./NewForm"
import EditForm from "./EditForm"


export default function NewPage() {
  const intent = usePathname()
  const userName = intent.split('/').pop()?.split('-')[0]

  if (userName != undefined && intent.split('/').pop()?.split('-').pop() == 'edit') {
    const user = api.auth.getUser.useQuery({
      email: userName
    })
    return user.data != undefined && <EditForm user={user.data} />
  }
  return (
    <NewForm />
  )
}