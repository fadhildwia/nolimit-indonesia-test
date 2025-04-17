import { useState } from "react"
import {
  CardHeader,
  CardTitle,
  Card,
  CardContent,
  CardDescription,
} from "./components/Card"
import { DatePickerWithRange } from "./components/DatePickerWithRange"
import { mockData } from "./mocks"
import { DateRange } from "react-day-picker"
import { LineChart } from "./components/LineChart"
import { format } from "date-fns"

function App() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2013, 0, 1),
    to: new Date(2020, 0, 1),
  })

  const filteredData = mockData.data.filter((item) => {
    const year = Number.parseInt(item.Year)
    const fromYear = dateRange?.from?.getFullYear() || 0
    const toYear = dateRange?.to?.getFullYear() || 3000

    return year >= fromYear && year <= toYear
  })

  return (
    <main className="flex min-h-screen flex-col p-4 md:p-8 lg:p-12">
      <h1 className="text-3xl font-bold mb-6">US Population Data Dashboard</h1>

      <>
        <CardTitle>Organization Information</CardTitle>
        {mockData.source.map((item, index) => (
          <Card className="mb-6 mt-6" key={index}>
            <CardContent>
              <h3 className="text-xl font-semibold">
                {item.annotations.source_name}
              </h3>
              <p className="text-gray-600 mt-2">
                {item.annotations.source_description}
              </p>
            </CardContent>
          </Card>
        ))}

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Filter by Year Range</h2>
          <DatePickerWithRange
            availableYears={[2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Population Trend Over Time</CardTitle>
            <CardDescription>
              US population changes from
              {dateRange?.from ? format(dateRange.from, "yyyy") : "2013"} to{" "}
              {dateRange?.to ? format(dateRange.to, "yyyy") : "2020"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <LineChart yAxisLabel="Population in (Millions)" dataKey="Population" data={filteredData} />
            </div>
          </CardContent>
        </Card>
      </>
    </main>
  )
}

export default App
