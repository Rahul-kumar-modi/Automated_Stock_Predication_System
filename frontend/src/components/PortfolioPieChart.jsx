import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

import axios from 'axios'
import { useEffect, useState } from 'react'

function PortfolioPieChart() {

  const [data, setData] = useState([])

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const fetchPortfolio = async () => {

    try {

      const response = await axios.get(
        'http://localhost:8000/portfolio'
      )

      const allocations = response.data.allocations

      const formattedData = allocations.map((stock) => ({
        name: stock.ticker,
        value: stock.weight,
      }))

      setData(formattedData)

    } catch (error) {
      console.log(error)
    }
  }

  const COLORS = [
    '#06b6d4',
    '#3b82f6',
    '#8b5cf6',
    '#10b981',
    '#f59e0b',
    '#ef4444',
  ]

  return (

    <div className="bg-slate-800 p-5 rounded-2xl shadow-lg h-[450px]">

      <h2 className="text-2xl font-bold mb-4 text-white">
        Portfolio Allocation
      </h2>

      <ResponsiveContainer width="100%" height="90%">

        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label
          >

         {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  )
}

export default PortfolioPieChart