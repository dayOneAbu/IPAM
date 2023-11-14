"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "~/lib/utils"
import { Button } from "~/app/_components/ui/button"
import { Input } from "~/app/_components/ui/input"
import { FormProvider, useForm } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/app/_components/ui/form"
import { signIn } from "next-auth/react"
import { useSearchParams } from 'next/navigation'



const formSchema = z.object({
  email: z.string().email({
    message: "please provide Email address"
  }),
  password: z.string().min(5, { message: "please provide password" }),
})

export default function UserAuthForm({ ...props }) {
  const params = useSearchParams()
  const callbackURL = params.get("callbackUrl")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    progressive: true
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await signIn("credentials", { ...values, redirect: true, callbackUrl: callbackURL ?? undefined })
  }
  return (
    <FormProvider {...form}>
      <div className={cn("grid gap-6 max-w-3xl pt-8 my-auto mx-auto")} {...props}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormMessage className="text-brand-white text-sm" />
                <FormControl>
                  <Input type="email" placeholder="someone@cbe.com.et" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormMessage className="text-brand-white text-sm" />
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </FormProvider>
  )
}