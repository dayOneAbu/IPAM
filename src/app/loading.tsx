import { Loader } from "lucide-react";

export default function Loading() {
  // return <Loader className="h-20 w-14 text-brand-golden" />
  return (
    <div className="flex h-screen flex-col justify-center items-center self-center">
      <Loader className="mr-2 h-16 w-16 m-4 text-brand-purple  animate-spin" />
      <p className="text-brand-purple text-base">
        Please wait...
      </p>
    </div>
  )
}