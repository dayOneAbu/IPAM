'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "~/lib/utils"
import { Button } from "~/app/_components/ui/button"
import { FormProvider, useForm } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/app/_components/ui/form"
import Link from "next/link"
import { useState } from "react"
import { ChevronLeft, ChevronsUpDown, } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "~/app/_components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "~/app/_components/ui/command"
import { ScrollArea } from "~/app/_components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/app/_components/ui/select"
import { api } from "~/trpc/react"
import { RadioGroup, RadioGroupItem } from "~/app/_components/ui/radio-group"
import { SubmitButton } from "~/app/_components/buttons"
import Loading from "~/app/_components/loading"

const manageLanIps = z.object({
  from: z
    .string({ required_error: "please set starting LAN-Ip" }),
  to: z
    .string({ required_error: "please set ending LAN-Ip" }),
  district: z
    .string({ required_error: "District Id is required" }),
  intent: z
    .string({ required_error: "please Describe your Intent" }),
});


export default function ManageTunnel() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fromOpen, setFromOpen] = useState(false)
  const [toOpen, setToOpen] = useState(false)

  const form = useForm<z.infer<typeof manageLanIps>>({
    resolver: zodResolver(manageLanIps),
    progressive: true,
    shouldFocusError: true,
    defaultValues: {
      from: "",
      to: "",
      district: "",
      intent: ''
    }
  })
  const allLan = api.lanIps.getByDistrict.useQuery(
    { district: form.getValues('district') },
    {
      enabled: form.getValues('district') ? true : false
    }
  )
  const districts = api.district.getAll.useQuery()

  function onSubmit(values: z.infer<typeof manageLanIps>) {
    setIsSubmitting(true)
    console.log("values", values)
    setIsSubmitting(false)
  }


  return (
    <div className="mx-4 py-6">
      <Link href={`.`} className="space-y-1">
        <Button variant="destructive" className="w-44 my-6 justify-start">
          <ChevronLeft className="text-white h-8 w-4" /> Go Back
        </Button>
      </Link>
      <div className="space-y-2 mb-5 mx-6">
        <h2 className="text-2xl max-w-3xl font-bold tracking-tight">Manage LANIps</h2>
        <p className="text-muted-foreground break-words">
          Here&apos;s a list of  LAN Ips you can select range of ip address and make them either reserved or flagged, which makes the selected ips un-usable.
          please be careful while taking this operations
        </p>
      </div>
      <FormProvider {...form}>
        <div className={cn("min-w-5xl mt-5 pt-8 my-auto mx-6 px-8")} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
            {districts.isFetching && (<Loading text="available districts" />)}
            {districts.data && (
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
                          <SelectValue placeholder="Select a District in which you want to modify Ips" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {districts.data.map(item => (
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
            )}
            {allLan.isFetching && (<Loading text="available LAN Ips" />)}
            {allLan.data && (
              <div className="flex gap-2 mx-auto flex-row items-center justify-between max-w-4xl">
                <FormField
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Starting LAN Ip Address</FormLabel>
                      <Popover open={fromOpen} onOpenChange={setFromOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[500px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? allLan.data.find(
                                  (lan) => lan === field.value
                                )
                                : "Select Starting LAN Ip Address"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <ScrollArea>
                          <PopoverContent className="w-[500px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search LAN Address..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>No LAN Address found.</CommandEmpty>
                                <CommandGroup>
                                  {allLan.data.map((lan) => (
                                    <CommandItem
                                      value={lan}
                                      key={lan}
                                      onSelect={() => {
                                        form.setValue("from", lan)
                                        setFromOpen(false)

                                      }}
                                    >
                                      {lan}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </ScrollArea>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Ending LAN Ip Address</FormLabel>
                      <Popover open={toOpen} onOpenChange={setToOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-[500px] justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? allLan.data.find(
                                  (lan) => lan === field.value
                                )
                                : "Select Ending LAN Ip Address"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <ScrollArea>
                          <PopoverContent className="w-[500px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search LAN Address..."
                                className="h-9"
                              />
                              <CommandList>
                                <CommandEmpty>No LAN Address found.</CommandEmpty>
                                <CommandGroup>
                                  {allLan.data.map((lan) => (
                                    <CommandItem
                                      value={lan}
                                      key={lan}
                                      onSelect={() => {
                                        form.setValue("to", lan)
                                        setToOpen(false)
                                      }}
                                    >
                                      {lan}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </ScrollArea>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <FormField
              control={form.control}
              name="intent"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Action Type</FormLabel>
                  <FormDescription>Choose the type of action you want to perform</FormDescription>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={"reserve"} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Reserve range of LAN Ips
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={"flag"} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Flag Range of LAN Ips
                        </FormLabel>
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
      </FormProvider >
    </div >
  )
}
