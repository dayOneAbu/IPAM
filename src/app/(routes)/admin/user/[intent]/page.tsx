'use client'
import { api } from "~/trpc/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import NewForm from "./NewForm"
import EditForm from "./EditForm"
import { PopoverDialog } from "~/app/_components/popover"
import { toast } from "~/app/_components/ui/use-toast"
import { useState } from "react"


export default function NewPage() {
  const router = useRouter();
  const intent = usePathname()
  const data = useSearchParams()
  const utils = api.useUtils()
  const [open, setOpen] = useState(true)

  const userName = data.get('email')

  const remove = api.auth.delete.useMutation({
    async onSuccess(res) {
      toast({
        title: `successful`,
        description: `you have deleted user ${res.email} successfully`,
      });
      await utils.auth.getAllUser.invalidate(undefined, { refetchType: "all" });
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
    return <NewForm />
  } else if (userName != null && intent.split('/').pop() == 'edit') {
    const user = api.auth.getUser.useQuery({
      email: userName
    })
    return user.data != null && <EditForm user={user.data} />

  } else if (intent.split('/').pop() == 'delete') {
    return <PopoverDialog
      description="Deleting this user will remove it form database completely, please make sure you are not deleting user mistakenly"
      message='Are You Sure About Deleting This User'
      onCancel={() => router.back()}
      onConfirm={() => {
        userName && remove.mutate({ email: userName })
        setOpen(false)

      }}
      changeValue={open}
    />
  } else {
    router.back()
  }
}