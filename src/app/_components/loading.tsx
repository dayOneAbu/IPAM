import { Loader } from "lucide-react";

export default function Loading({ text }: {
  text: string
}) {
  return (
    <p className="text-brand-purple flex justify-start self-start">
      <Loader className="mr-2 h-8 w-8 m-4 animate-spin" />
      we are trying to load {text} Please wait a while...
    </p>
  )
}