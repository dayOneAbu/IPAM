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
import { type ReactNode, useState } from "react"
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronsUpDown, } from "lucide-react"
import { newBranchSchema, type NewBranch } from "~/data/schema"
import { Popover, PopoverContent, PopoverTrigger } from "~/app/_components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "~/app/_components/ui/command"
import { api } from "~/trpc/react"
import { ScrollArea } from "~/app/_components/ui/scroll-area"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/app/_components/ui/card"
import { map } from "lodash"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/app/_components/ui/tabs"
import { type Metadata } from "next"

const steps: {
  id: string;
  name: string;
  fields?: string[] | undefined;
}[] = [
    {
      id: 'Step 1',
      name: 'Pick District',
      fields: ['district']
    },
    {
      id: 'Step 2',
      name: 'Fill Branch Information',
      fields: [
        'name',
        'wanAddress',
        'remark'
      ]
    },
    {
      id: 'Step 3',
      name: 'Pick Branch LAN & Tunnel Address',
      fields: [
        'LanAddress',
        'TunnelAddress',
      ]
    },
    { id: 'Step 4', name: 'Confirm' }
  ]

function TopNav({ currentStep }: {
  currentStep: number
}) {
  return (
    <nav aria-label='Progress'>
      <ol role='list' className='space-y-4 md:flex md:space-x-8 md:space-y-0'>
        {steps.map((step, index) => (
          <li key={step.name} className='md:flex-1'>
            {currentStep > index ? (
              <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                <span className='text-sm font-medium text-sky-600 transition-colors '>
                  {step.id}
                </span>
                <span className='text-sm font-medium'>{step.name}</span>
              </div>
            ) : currentStep === index ? (
              <div
                className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                aria-current='step'
              >
                <span className='text-sm font-medium text-sky-600'>
                  {step.id}
                </span>
                <span className='text-sm font-medium'>{step.name}</span>
              </div>
            ) : (
              <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                <span className='text-sm font-medium text-gray-500 transition-colors'>
                  {step.id}
                </span>
                <span className='text-sm font-medium'>{step.name}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
type Inputs = z.infer<typeof newBranchSchema>
type FieldName = keyof Inputs
export const metadata: Metadata = {
  title: "New Branch",
}
export default function NewBranch({ districts }: {
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

}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [previousStep, setPreviousStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [lanOpen, setLanOpen] = useState(false)
  const [tunnelOpen, setTunnelOpen] = useState(false)
  const [auto, setAuto] = useState(false)
  const form = useForm<z.infer<typeof newBranchSchema>>({
    resolver: zodResolver(newBranchSchema),
    progressive: true,
    shouldFocusError: true,
    defaultValues: {
      name: "",
      district: "",
      LanAddress: "",
      TunnelAddress: "",
      wanAddress: "",
      remark: "",
    }
  })
  let autoFetchedValues;
  //queries
  const allLan = api.lanIps.getNextTenByRange.useQuery(
    { district: form.getValues('district'), intent: "branch" },
    {
      enabled: form.getValues('district') && currentStep === 1 ? true : false
    }
  )
  const allTunnel = api.tunnelIps.getNextTenByRange.useQuery(
    { district: form.getValues('district'), intent: "branch" },
    {
      enabled: form.getValues('district') && currentStep === 1 ? true : false
    }
  )
  const nextLan = api.lanIps.getNextByRange.useQuery(
    { district: form.getValues('district'), intent: "branch" },
    {
      enabled: form.getValues('district') && auto ? true : false
    }
  )
  const nextTunnel = api.tunnelIps.getNextByRange.useQuery(
    { district: form.getValues('district'), intent: "branch" },
    {
      enabled: form.getValues('district') && auto ? true : false
    }
  )

  if (nextLan.data && nextTunnel.data) {
    autoFetchedValues = [
      {
        "title": "LAN IP Address",
        "description": [nextLan.data.ipAddress]
      },
      {
        "title": "Tunnel IP Address",
        "description": [
          nextTunnel.data.TunnelIP_DC_ER21,
          nextTunnel.data.TunnelIP_DC_ER22,
          nextTunnel.data.TunnelIP_DR_ER11,
          nextTunnel.data.TunnelIP_DR_ER12,
        ]
      }
    ]
  }
  if (nextLan.data) form.setValue("LanAddress", nextLan.data.ipAddress)
  if (nextTunnel.data) form.setValue("TunnelAddress", nextTunnel.data.TunnelIP_DC_ER21)

  function onSubmit(values: NewBranch) {
    setIsSubmitting(true)
    console.log("values", values)
    setIsSubmitting(false)
  }
  const next = async () => {
    const fields = steps[currentStep]?.fields
    const output = await form.trigger(fields as FieldName[], { shouldFocus: true })

    if (!output) return

    if (currentStep < steps.length - 1) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step + 1)
    }
  }
  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep)
      setCurrentStep(step => step - 1)
    }
  }

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
        <TopNav currentStep={currentStep} />
      </div>
      <FormProvider {...form}>
        <div className={cn("min-w-5xl mt-5 pt-8 my-auto mx-6 px-8")} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
            {currentStep === 0 && (
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
                            disabled={item.name == "atms"}
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
            {currentStep === 1 && (
              <>
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
              </>
            )}
            {currentStep === 2 && (
              <Tabs defaultValue="auto" className="">
                <TabsList className="grid w-full grid-cols-2 gap-1">
                  <TabsTrigger value="auto">
                    Automatic
                  </TabsTrigger>
                  <TabsTrigger value="manual">
                    Manual
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="auto">
                  <Card>
                    <CardHeader>
                      <CardTitle>Automatic</CardTitle>
                      <CardDescription>
                        Automatically Fetch the Next available LAN and Tunnel ip Address based on the schema.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {autoFetchedValues && (
                        <ShowAutoInput values={autoFetchedValues} />
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() => setAuto(true)}
                        type="button">
                        Fetch LAN & Tunnel IP Address
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="manual">
                  <Card>
                    <CardHeader>
                      <CardTitle>Manual</CardTitle>
                      <CardDescription>
                        Manually Insert the Next available LAN and Tunnel ip Address.
                        <br />
                        This method is error prune so please make sure you are accurate.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {allLan.data && (
                        <FormField
                          control={form.control}
                          name="LanAddress"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>LAN Address</FormLabel>
                              <Popover open={lanOpen} onOpenChange={setLanOpen}>
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
                                          (lan) => lan.ipAddress === field.value
                                        )?.ipAddress
                                        : "Select  LAN Address"}
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
                                              value={lan.ipAddress}
                                              key={lan.ipAddress}
                                              onSelect={() => {
                                                form.setValue("LanAddress", lan.ipAddress)
                                                setLanOpen(false)
                                              }}
                                            >
                                              {lan.ipAddress}
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
                      )}
                      {allTunnel.data && (
                        <FormField
                          control={form.control}
                          name="TunnelAddress"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Tunnel Address</FormLabel>
                              <Popover open={tunnelOpen} onOpenChange={setTunnelOpen}>
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
                                        ? allTunnel.data.find(
                                          (tunnel) => tunnel.TunnelIP_DC_ER21 === field.value
                                        )?.TunnelIP_DC_ER21
                                        : "Select  Tunnel Address"}
                                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <ScrollArea>
                                  <PopoverContent className="w-[500px] p-0">
                                    <Command>
                                      <CommandInput
                                        placeholder="Search Tunnel Address..."
                                        className="h-9"
                                      />
                                      <CommandList>
                                        <CommandEmpty>No Tunnel Address found.</CommandEmpty>
                                        <CommandGroup>
                                          {allTunnel.data.map((tunnel) => (
                                            <CommandItem
                                              value={tunnel.TunnelIP_DC_ER21}
                                              key={tunnel.TunnelIP_DC_ER21}
                                              onSelect={() => {
                                                form.setValue("TunnelAddress", tunnel.TunnelIP_DC_ER21)
                                                setTunnelOpen(false)
                                              }}
                                            >
                                              {tunnel.TunnelIP_DC_ER21}
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
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
            {currentStep === 3 && (
              <ConfirmationCard
                footer={<SubmitButton isSubmitting={isSubmitting} />}
                values={map(form.getValues(), (value, key) => ({
                  title: key,
                  description: value
                }))}
              />
            )}
            <div className='mt-8 pt-5 bottom-4'>
              <div className='flex justify-between'>
                <Button
                  variant="default"
                  type='button'
                  onClick={prev}
                  disabled={currentStep === 0}
                  className="w-44 my-6 capitalize justify-start"
                >
                  <ArrowLeft className="text-brand-white mx-3 h-8 w-4" />
                  back
                </Button>

                <Button
                  type='button'
                  variant={"default"}
                  onClick={next}
                  disabled={currentStep === steps.length - 1}
                  className="w-44 my-6 capitalize justify-start"
                >
                  next
                  <ArrowRight className="text-brand-white mx-3 h-8 w-4" />
                </Button>
              </div>
            </div>
          </form>
        </div>
      </FormProvider>
    </div>
  )
}


export function ShowAutoInput({ values }: {
  values: {
    title: string,
    description: (string | undefined)[]
  }[],
}) {
  return (
    <>
      {
        values.map(value => (
          <div
            key={value.title}
            className="mb-4 col-span-1 flex  items-start pb-4 last:mb-0 last:pb-0"
          >
            <span className="flex h-2 w-2 mx-2 translate-y-1 rounded-full bg-sky-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {value.title}
              </p>
              {value.description.map(item => (
                <p key={item} className="text-sm break-words break-all text-muted-foreground">
                  {item}
                </p>
              ))}

            </div>
          </div>
        ))
      }
    </>
  )
}
export function ConfirmationCard({ values, footer }: {
  footer: ReactNode
  values: {
    title: string;
    description: string;
  }[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirmation</CardTitle>
        <CardDescription>
          You have inserted the following values for the new Branch.
          <br />
          please Check carefully and edit by going back.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 flex-wrap">
        <div className="grid grid-cols-3 items-start">
          {values.map((value, index) => (
            <div
              key={index}
              className="mb-4 col-span-1 flex  items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 mx-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {value.title}
                </p>
                <p className="text-sm break-words break-all text-muted-foreground">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        {footer}
      </CardFooter>
    </Card>
  )
}