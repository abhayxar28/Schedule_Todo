"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function formatDate(date: Date | undefined) {
  if (!date) return ""
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

export function DatePicker() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [month, setMonth] = React.useState<Date | undefined>(new Date())
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="w-full flex items-center justify-between border rounded-md px-3 py-2 text-left text-sm text-black hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <span className={value ? "" : "text-muted-foreground"}>
            {value || "dd-mm-yyyy"}
          </span>
          <CalendarIcon className="w-4 h-4 opacity-70" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start" sideOffset={8}>
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          month={month}
          onMonthChange={setMonth}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate)
              setValue(formatDate(selectedDate))
              setOpen(false)
            }
          }}
          disabled={(date) => {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            return date < today
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
