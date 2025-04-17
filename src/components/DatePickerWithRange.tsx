import type * as React from "react"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { Button } from "./Button"
import { Popover, PopoverContent, PopoverTrigger } from "./Popover"

interface DatePickerWithRangeProps {
  dateRange: DateRange | undefined
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>
  className?: string,
  availableYears: number[]
}

export function DatePickerWithRange({ dateRange, setDateRange, className, availableYears }: DatePickerWithRangeProps) {
  const startYear = dateRange?.from?.getFullYear() || availableYears[0]
  const endYear = dateRange?.to?.getFullYear() || availableYears[availableYears.length - 1]

  const handleYearSelection = (year: number, isStart: boolean) => {
    if (isStart) {
      const newFrom = new Date(year, 0, 1)
      const newTo =
        dateRange?.to && dateRange.to.getFullYear() >= year ? dateRange.to : new Date(Math.max(...availableYears), 0, 1)

      setDateRange({ from: newFrom, to: newTo })
    } else {
      const newTo = new Date(year, 0, 1)
      const newFrom =
        dateRange?.from && dateRange.from.getFullYear() <= year
          ? dateRange.from
          : new Date(Math.min(...availableYears), 0, 1)

      setDateRange({ from: newFrom, to: newTo })
    }
  }

  return (
    <div className={`grid gap-2 ${className}`}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={`w-full justify-start text-left font-normal md:w-auto ${!dateRange && "text-muted-foreground"}`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {startYear} - {endYear}
                </>
              ) : (
                startYear
              )
            ) : (
              <span>Select year range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Start Year</h3>
              <div className="flex flex-wrap gap-2">
                {availableYears.map((year) => (
                  <Button
                    key={`start-${year}`}
                    variant={year === startYear ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleYearSelection(year, true)}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">End Year</h3>
              <div className="flex flex-wrap gap-2">
                {availableYears.map((year) => (
                  <Button
                    key={`end-${year}`}
                    variant={year === endYear ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleYearSelection(year, false)}
                    disabled={year < startYear}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
