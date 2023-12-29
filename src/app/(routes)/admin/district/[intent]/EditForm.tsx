'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "~/lib/utils"
import { Button } from "~/app/_components/ui/button"
import { Input } from "~/app/_components/ui/input"
import { FormProvider, useForm } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/app/_components/ui/form"
import Link from "next/link"
import { SubmitButton } from "~/app/_components/buttons"
import { useState } from "react"
import { ChevronLeft, MoveHorizontal } from "lucide-react"
import { useToast } from "~/app/_components/ui/use-toast"
import { api } from "~/trpc/react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/app/_components/ui/select"
import { type NewDistrict, NewDistrictSchema } from "~/data/schema"

import Loading from "~/app/_components/loading"


export default function NewForm({ preloadData }: {
  preloadData: {
    lanRange: {
      id: number;
      clusterName: string;
      lowerLimit: string;
      upperLimit: string;
    }[];
    tunnelRange: {
      id: number;
      clusterName: string;
      lowerLimit: string;
      upperLimit: string;
    }[];
  }
}) {
  const { toast } = useToast()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<NewDistrict>({
    resolver: zodResolver(NewDistrictSchema),
    progressive: true,
    shouldFocusError: true,
  })
  const [filteredLAN, setFilteredLAN] = useState<{
    id: number;
    clusterName: string;
    lowerLimit: string;
    upperLimit: string;
  }[]>()


  const [filteredTunnel, setFilteredTunnel] = useState<{
    id: number;
    clusterName: string;
    lowerLimit: string;
    upperLimit: string;
  }[]>()
  const utils = api.useUtils()
  const createDistrict = api.district.create.useMutation({
    onSuccess: (res) => {
      toast({
        title: `successful`,
        description: `you have created user ${res.name} successfully`,
      });
      setIsSubmitting(false);
      void utils.district.getAll.invalidate();
    },
  });
  function onSubmit(values: NewDistrict) {
    setIsSubmitting(true)
    createDistrict.mutate(values)

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
          New District
        </h2>
        <p className="text-muted-foreground capitalize">
          you are about to create a District, creating a district means allocating LAN Range & Tunnel Range which is going to be used by the system while creating a brach.  <br />
          please be careful while doing so!
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
                  <FormLabel>District Name</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {preloadData ? (
              <>
                <FormField
                  control={form.control}
                  name="clusterName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="hidden">Cluster Name</FormLabel>
                      <FormMessage />
                      <FormControl>
                        <Input type="hidden"{...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="usableLANRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LAN Range</FormLabel>
                      <Select onValueChange={(value) => {
                        form.setValue('usableLANRange', value)
                        const item = preloadData.lanRange.find((item) => item.id == parseInt(value))
                        if (form.getValues('clusterName') == undefined) { form.setValue('clusterName', item?.clusterName) }
                        if (item?.clusterName != undefined) {
                          setFilteredTunnel(preloadData.tunnelRange.filter(tunnel => tunnel.clusterName == item?.clusterName))
                        }
                      }} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a LAN Range to be used by this District" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {
                            filteredLAN != undefined ? filteredLAN.map(range => (
                              <SelectItem key={range.id} value={range.id.toString()}>
                                <span className="flex items-center justify-between">
                                  {range.lowerLimit}
                                  <MoveHorizontal className="h-6 w-8 mx-2 text-brand-purple" />
                                  {range.upperLimit}
                                </span>
                              </SelectItem>
                            )) :
                              preloadData.lanRange.map(range => (
                                <SelectItem key={range.id} value={range.id.toString()}>
                                  <span className="flex items-center justify-between">
                                    {range.lowerLimit}
                                    <MoveHorizontal className="h-6 w-8 mx-2 text-brand-purple" />
                                    {range.upperLimit}
                                  </span>
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
                  name="usableTunnelRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tunnel Range</FormLabel>
                      {/* <Select onValueChange={field.onChange} defaultValue={field.value}> */}
                      <Select onValueChange={(value) => {
                        form.setValue('usableTunnelRange', value)
                        const item = preloadData.tunnelRange.find((item) => item.id == parseInt(value))
                        if (form.getValues('clusterName') == undefined) { form.setValue('clusterName', item?.clusterName) }
                        if (item?.clusterName != undefined) {
                          setFilteredLAN(() => preloadData.lanRange.filter(lan => lan.clusterName == item?.clusterName))
                        }
                      }} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Tunnel Range to be used by This District" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {
                            filteredTunnel != undefined ? filteredTunnel.map(range => (
                              <SelectItem key={range.id} value={range.id.toString()}>
                                <span className="flex items-center justify-between">
                                  {range.lowerLimit}
                                  <MoveHorizontal className="h-6 w-8 mx-2 text-brand-purple" />
                                  {range.upperLimit}
                                </span>
                              </SelectItem>
                            )) :
                              preloadData.tunnelRange.map(range => (
                                <SelectItem key={range.id} value={range.id.toString()}>
                                  <span className="flex items-center justify-between">
                                    {range.lowerLimit}
                                    <MoveHorizontal className="h-6 w-8 mx-2 text-brand-purple" />
                                    {range.upperLimit}
                                  </span>
                                </SelectItem>
                              ))
                          }
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) :
              <Loading />
            }
            <br />
            <SubmitButton isSubmitting={isSubmitting} />
          </form>
        </div>
      </FormProvider>
    </div>

  )
}
