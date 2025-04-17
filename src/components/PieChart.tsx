import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import { PopulationData } from "../types"

interface PieChartProps {
  data: PopulationData[]
}

export function PieChart({ data }: PieChartProps) {
  const sortedData = [...data].sort((a, b) => Number.parseInt(a.Year) - Number.parseInt(b.Year))

  const pieData = sortedData.map((item) => ({
    name: item.Year,
    value: item.Population,
  }))

  const COLORS = ["#0ea5e9", "#0284c7", "#0369a1", "#075985", "#0c4a6e", "#082f49", "#164e63", "#155e75"]

  const formatPopulation = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value)
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => [formatPopulation(value), "Population"]} />
        <Legend />
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}
