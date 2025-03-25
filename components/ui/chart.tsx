"use client"

import { Bar, Line, Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js"
import { useMemo } from "react"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement)

interface ChartProps {
  data: any
  className?: string
}

export function BarChart({ data, className }: ChartProps) {
  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: false,
        },
      },
    }),
    [],
  )

  return <Bar options={options} data={data} className={className} />
}

export function LineChart({ data, className }: ChartProps) {
  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: false,
        },
      },
    }),
    [],
  )
  return <Line options={options} data={data} className={className} />
}

export function PieChart({ data, className }: ChartProps) {
  return <Pie data={data} className={className} />
}

