import { AlertOctagon } from "lucide-react"
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>
        <AlertOctagon className="h-8 w-4 text-red-600" />
        Could not find requested resource
      </p>
      <Link href="/">Return Home</Link>
    </div>
  )
}