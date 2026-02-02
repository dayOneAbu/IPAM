"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "~/lib/utils"
import { Input } from "~/app/_components/ui/input"
import { FormProvider, useForm } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/app/_components/ui/form"
import { signIn } from "next-auth/react"
import { useSearchParams } from 'next/navigation'
import { SubmitButton } from "~/app/_components/buttons"
import { useState } from "react"



const formSchema = z.object({
  email: z.string().email({
    message: "please provide Email address"
  }),
  password: z.string().min(5, { message: "please provide password" }),
})

export default function UserAuthForm() {

  const [isSubmitting, setIsSubmitting] = useState(false)
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
    setIsSubmitting(true)
    await signIn("credentials", { ...values, redirect: true, callbackUrl: callbackURL ?? undefined })
    setIsSubmitting(false)
  }
  return (
    <FormProvider {...form}>
      <div className={cn("grid gap-6 max-w-3xl pt-8 my-auto mx-auto")}>
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
          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </div>
    </FormProvider>
  )
}