import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { PopulationData } from "../types"

interface LineChartProps {
  data: PopulationData[]
  dataKey: string
  yAxisLabel?: string
  tooltipLabel?: string
  lineName?: string
  color?: string
}

export function LineChart({
  data,
  dataKey,
  yAxisLabel = dataKey,
  tooltipLabel = dataKey,
  lineName = dataKey,
  color = "#0ea5e9",
}: LineChartProps) {
  const sortedData = [...data].sort(
    (a, b) => Number(a["Year"]) - Number(b["Year"])
  )

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value)
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
        data={sortedData}
        margin={{
          top: 20,
          right: 30,
          left: 30,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Year" label={{ value: "Year", position: "insideBottomRight", offset: -10 }} />
        <YAxis
          tickFormatter={(value) => (value / 1000000).toFixed(0) + "M"}
          label={{ value: yAxisLabel, angle: -90, position: "insideLeft" }}
        />
        <Tooltip formatter={(value: number) => [formatNumber(value), tooltipLabel]} />
        <Legend />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          activeDot={{ r: 8 }}
          name={lineName}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}
