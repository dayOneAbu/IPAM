import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <p className="text-brand-purple flex justify-center self-center">
      <Loader className="mr-2 h-16 w-16 m-4  animate-spin" />
      Please wait
    </p>
  )
}