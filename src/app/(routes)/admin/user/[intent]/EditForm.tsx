'use client'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "~/lib/utils"
import { Button } from "~/app/_components/ui/button"
import { Input } from "~/app/_components/ui/input"
import { FormProvider, useForm } from "react-hook-form"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form"
import Link from "next/link"
import { SubmitButton } from "~/app/_components/buttons"
import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "~/app/_components/ui/radio-group"
import { ChevronLeft } from "lucide-react"
import { useToast } from "~/app/_components/ui/use-toast"
import { api } from "~/trpc/react"


const updateUserSchema = z.object({
  email: z.string().email({ message: "Email is required " }).optional(),
  isAdmin: z.string(),
})

export default function EditForm({ user }: {
  user: {
    email: string;
    isAdmin: boolean;
  }
}) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    progressive: true,
    shouldFocusError: true,
    defaultValues: {
      email: user.email,
      isAdmin: user.isAdmin == true ? "admin" : "non admin"
    }
  })

  const updateUser = api.auth.updateUser.useMutation({
    onSuccess: (res) => {
      toast({
        title: `successful`,
        description: `you have updated user ${res.email} successfully`,
      });
      setIsSubmitting(false);
    },
  });

  function onSubmit(values: z.infer<typeof updateUserSchema>) {
    setIsSubmitting(true)

    updateUser.mutate({
      email: user.email,
      isAdmin: values.isAdmin
    })

  }
  return (
    <div className="mx-4 py-6">
      <Link href={`.`} className="space-y-1">
        <Button variant="destructive" className="w-44 my-2 justify-start">
          <ChevronLeft className="text-white h-8 w-4" />Go Back
        </Button>
      </Link>
      <div className="space-y-2 mt-4 mx-6">
        <h2 className="text-2xl font-bold tracking-tight capitalize">
          Edit User
        </h2>
        <p className="text-muted-foreground capitalize">
          you are Editing user {user.email} please modify values carefully!
        </p>
      </div>
      <FormProvider {...form}>
        <div className={cn("min-w-5xl pt-8 my-auto mx-6 px-8")} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
            <FormField
              control={form.control}
              name="email"
              disabled
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input type="text" {...field} value={field.value} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isAdmin"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>User Type</FormLabel>
                  <FormDescription>Choose the type of User privilege</FormDescription>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={"admin"} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Admin
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={"non admin"} />
                        </FormControl>
                        <FormLabel className="font-normal">NON Admin</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        </div>
      </FormProvider>
    </div>

  )
}