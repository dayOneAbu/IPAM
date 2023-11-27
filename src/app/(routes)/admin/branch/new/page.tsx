'use client'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "~/lib/utils"
import { Button } from "~/app/_components/ui/button"
import { Input } from "~/app/_components/ui/input"
import { FormProvider, useForm } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/app/_components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select"
import Link from "next/link"
import { Textarea } from "~/app/_components/ui/textarea"
import { SubmitButton } from "~/app/_components/buttons"
import { useState } from "react"


const formSchema = z.object({
  name: z.string({ required_error: "branch Name is required " })
    .min(3, { message: "please provide the exact Name" }),
  districtId: z.string({ required_error: "District Id is required" })
    .min(3, { message: "please provide District Id" }),
  // ipWithTunnel: z.string({ required_error: "please Pick and assign IP Address With Tunnel address" }),
  wanAddress: z.string({ required_error: "WAN Address is required" })
    .min(8, { message: "please provide the exact WAN Address" }),
  remark: z.string({ required_error: "required field" })
    .min(10, { message: "please provide some justification for your action" }),
})

export default function NewPage() {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    progressive: true,
    shouldFocusError: true
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
    }, 3000);
  }
  return (
    <div className="mx-4 py-6">
      <Link href={`.`} className="space-y-1">
        <Button variant="destructive" className="w-44 my-6 justify-start">
          Back
        </Button>
      </Link>
      <div className="space-y-2 mx-6">
        <h2 className="text-2xl font-bold tracking-tight">New Branch</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of required information to be inserted for CBE Branch <br />
          please fill all required information
        </p>
      </div>
      <FormProvider {...form}>
        <div className={cn("min-w-5xl pt-8 my-auto mx-6 px-8")} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch Name</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="districtId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District ID</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a District in which the branch is located" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Arada">Arada</SelectItem>
                      <SelectItem value="merkato">merkato</SelectItem>
                      <SelectItem value="kirkos">kirkos</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wanAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WAN Address</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remark</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Textarea rows={10} {...field} />
                  </FormControl>
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