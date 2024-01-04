'use client'
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { api } from "~/trpc/react"
import { usePathname } from "next/navigation"
import NewBranch from "./NewForm"
import EditForm from "./EditForm"
import { PopoverDialog } from "~/app/_components/popover"
import { toast } from "~/app/_components/ui/use-toast";
import { useState } from "react";



export default function NewPage() {
  const router = useRouter();
  const intent = usePathname()
  const data = useSearchParams()
  const [open, setOpen] = useState(true)
  const id = data.get('id')
  const remove = api.district.delete.useMutation({
    onSuccess: (res) => {
      toast({
        title: `successful`,
        description: `you have deleted district ${res.name} successfully`,
      });
      router.back()
      router.refresh()
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: `Error`,
        description: `${err.message}`,
      });
    },
  })

  if (intent.split('/').pop() == 'new') {
    const res = api.district.getAll.useQuery()

    return res.data != undefined && <NewBranch districts={res.data} />
  } else if (intent.split('/').pop() == 'edit') {
    const res = api.district.getAll.useQuery()
    if (id == null) {
      return notFound();
    }
    const branch = api.branch.getOne.useQuery({ id: parseInt(id) })
    if (res.data != undefined && branch.data != undefined) {
      return <EditForm districts={res.data} branch={branch.data} />
    }
  } else if (intent.split('/').pop() == 'delete') {

    return <PopoverDialog
      description="Deleting this branch will remove it form database completely and release the LAN & Tunnel Address, please make sure you are not deleting branch which is currently up & running!"
      message='Are You Sure About Deleting This branch'
      onCancel={() => router.back()}
      onConfirm={() => {
        id && remove.mutate({ id: parseInt(id) })
        setOpen(false)
        router.back()
      }}
      changeValue={open}
    />
  } else {
    router.back()
  }
}