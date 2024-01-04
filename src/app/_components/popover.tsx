
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"

export function PopoverDialog({ description, message, onConfirm, changeValue, onCancel }: {
  description: string,
  message: string,
  changeValue: boolean
  onConfirm: () => void
  onCancel: () => void
}) {
  const [open, setOpen] = useState(true)
  return (
    <AlertDialog open={open} onOpenChange={() => setOpen(changeValue)}>
      <AlertDialogContent >
        <AlertDialogHeader>
          <AlertDialogTitle>{message}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}