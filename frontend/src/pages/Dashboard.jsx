import axios from 'axios'
import { useEffect, useState } from 'react'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import DashboardCards from '../components/DashboardCards'
import PortfolioChart from '../components/PortfolioChart'
import AllocationTable from '../components/AllocationTable'
import TrainingStatus from '../components/TrainingStatus'

function Dashboard() {

  const [predictions, setPredictions] = useState([])

  useEffect(() => {
    fetchPredictions()
  }, [])

  const fetchPredictions = async () => {

  try {

    console.log("Refreshing data...")

    const response = await axios.get(
      'http://localhost:8000/prediction'
    )

    console.log(response.data)

    setPredictions(response.data.predictions)

  } catch (error) {

    console.log("API ERROR:")
    console.log(error)

  }
}

  return (

    <div className="flex bg-slate-950 text-white min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar refreshData={fetchPredictions} />

        <div className="p-6 space-y-6">

          <DashboardCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="lg:col-span-2">
              <PortfolioChart />
            </div>

            <TrainingStatus />

          </div>

          <AllocationTable />


          <div className="bg-slate-800 p-5 rounded-2xl">

            <h1 className="text-2xl font-bold mb-4">
              AI Predictions
            </h1>

            <div className="space-y-3">

              {predictions.map((stock, index) => (

                <div
                  key={index}
                  className="bg-slate-700 p-3 rounded-lg"
                >
                  {stock.ticker} → {stock.weight}
                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard