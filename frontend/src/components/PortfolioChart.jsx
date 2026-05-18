import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
 
import axios from 'axios'
import { useEffect, useState } from 'react'

function PortfolioChart() {

  const [data, setData] = useState([])

  useEffect(() => {
    fetchChartData()
  }, [])

  const fetchChartData = async () => {

    try {

      const response = await axios.get(
        'http://localhost:8000/portfolio/chart'
      )

      setData(response.data.chart_data)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-slate-800 p-5 rounded-2xl shadow-lg h-[400px]">

      <h2 className="text-xl font-bold mb-4">
        Portfolio Growth
      </h2>

      <ResponsiveContainer width="100%" height="90%">

        <LineChart data={data}>

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#06b6d4"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  )
}

export default PortfolioChart