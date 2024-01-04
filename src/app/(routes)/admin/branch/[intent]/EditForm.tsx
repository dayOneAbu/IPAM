'use client'

import type * as z from "zod"
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
import { ChevronLeft, } from "lucide-react"
import { newBranchSchema, type NewBranch } from "~/data/schema"
import { api } from "~/trpc/react"
import { type Metadata } from "next"

export const metadata: Metadata = {
  title: "Edit Branch",
}

export default function EditBranch({ districts, branch }: {
  districts: {
    name: string;
    usableTunnelRange: {
      lowerLimit: string;
      upperLimit: string;
    } | null;
    usableLANRange: {
      lowerLimit: string;
      upperLimit: string;
    } | null;
  }[]
  branch: {
    id: number;
    name: string;
    district: {
      name: string;
      id: number;
    };
    wanAddress: string;
    remark: string;
    updatedAt: Date;
    ipWithTunnel: {
      id: number;
      lanIpAddress: {
        id: number;
        ipAddress: string;
      };
      tunnelIpAddress: {
        id: number
        TunnelIP_DC_ER21: string;
        TunnelIP_DC_ER22: string;
        TunnelIP_DR_ER11: string;
        TunnelIP_DR_ER12: string
      };
    } | null;
    createdBy: {
      email: string;
    };
  } | null
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [check, setCheck] = useState(false)
  const form = useForm<z.infer<typeof newBranchSchema>>({
    resolver: zodResolver(newBranchSchema),
    progressive: true,
    shouldFocusError: true,
    defaultValues: {
      name: branch?.name,
      district: branch?.district.name,
      LanAddress: branch?.ipWithTunnel?.lanIpAddress.ipAddress,
      TunnelAddress: branch?.ipWithTunnel?.tunnelIpAddress.TunnelIP_DC_ER21,
      wanAddress: branch?.wanAddress,
      remark: branch?.remark,
    }
  })
  const allLan = api.lanIps.getOne.useQuery(
    { ipAddress: form.getValues('LanAddress') },
    { enabled: check }
  )
  const allTunnel = api.tunnelIps.getOne.useQuery(
    { ipAddress: form.getValues('TunnelAddress') },
    { enabled: check }
  )

  function onSubmit(values: NewBranch) {
    setIsSubmitting(true)
    console.log("values", values)
    setIsSubmitting(false)
  }
  function handleCheck() {
    console.log("clicked")
    setCheck(true)
  }
  console.log("lan", allLan.data)
  console.log("tunnel", allTunnel.data)


  return (
    <div className="mx-4 py-6">
      <Link href={`.`} className="space-y-1">
        <Button variant="destructive" className="w-44 my-6 justify-start">
          <ChevronLeft className="text-white h-8 w-4" /> Go Back
        </Button>
      </Link>
      <div className="space-y-2 mb-5 mx-6">
        <h2 className="text-2xl font-bold tracking-tight">New Branch</h2>
        <p className="text-muted-foreground">
          Here&apos;s a  multi step form with list of required information to be inserted for creating Branch <br />
          please fill all required information
        </p>

      </div>
      <FormProvider {...form}>
        <div className={cn("min-w-5xl mt-5 pt-8 my-auto mx-6 px-8")} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a District in which the branch is located" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {districts?.map(item => (
                        <SelectItem
                          key={item.name}
                          value={item.name}
                        >
                          <div className="flex flex-row justify-between items-center">
                            <p className="mx-1 uppercase font-medium">
                              {item.name}
                            </p>
                          </div>
                        </SelectItem>
                      ))
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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
            <div className="flex justify-between items-end">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="LanAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LAN Address</FormLabel>
                      <FormMessage />
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="TunnelAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tunnel Address</FormLabel>
                      <FormMessage />
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                className="mx-2 px-2"
                disabled={
                  !form.formState.touchedFields.LanAddress ??
                  !form.formState.touchedFields.TunnelAddress
                }
                variant={"secondary"}
                onClick={handleCheck}
              >
                Check Availability
              </Button>
            </div>

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
