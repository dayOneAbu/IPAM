/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "~/app/_components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from "~/app/_components/ui/command"
import {
  FormControl,
} from "~/app/_components/ui/form"
import { CheckIcon, ChevronsUpDown } from "lucide-react"
import { cn } from "~/lib/utils"
import { Button, } from "./ui/button"
import { useFormContext } from "react-hook-form"


const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const

export default function ComboBox({ onSelect, value, }: {
  onSelect: (value: string) => void
  value: string
  // props: JSX.IntrinsicAttributes & ButtonProps & RefAttributes<HTMLButtonElement>
}) {
  const [open, setOpen] = useState(false)
  const { register } = useFormContext();

  function handleSelect(value: string) {
    onSelect(value);
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[500px] justify-between",
              !value && "text-muted-foreground"
            )}
          // {...props}
          >
            {value
              ? languages.find(
                (language) => language.value === value
              )?.label
              : "Select language"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0">
        <Command>
          <CommandInput
            placeholder="Search framework..."
            className="h-9"
          />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {languages.map((language) => (
              <CommandItem
                value={language.label}
                key={language.value}
                onSelect={handleSelect}
              >
                {language.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    language.value === value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}