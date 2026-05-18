import axios from 'axios'
import { useEffect, useState } from 'react'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

function Stocks() {

  const [stocks, setStocks] = useState([])

  useEffect(() => {
    fetchStocks()
  }, [])

  const fetchStocks = async () => {

    try {

      const response = await axios.get(
        'http://localhost:8000/prediction'
      )

      setStocks(response.data.predictions)

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div className="flex bg-slate-950 text-white min-h-screen">

      <Sidebar />

      <div className="flex-1">

        {/* <Navbar refreshData={fetchStocks} /> */}

        <div className="p-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h1 className="text-3xl font-bold">
                Stock Predictions
              </h1>

              <p className="text-gray-400 mt-2">
                AI-powered portfolio allocation and stock recommendations
              </p>

            </div>

            <button
              onClick={fetchStocks}
              className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-xl font-semibold"
            >
              Refresh Predictions
            </button>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {stocks.map((stock, index) => (

              <div
                key={index}
                className="bg-slate-800 border border-slate-700 p-5 rounded-2xl shadow-lg hover:scale-[1.02] transition duration-300"
              >

                <div className="flex items-center justify-between">

                  <h2 className="text-2xl font-bold">
                    {stock.ticker}
                  </h2>

                  <div className="bg-slate-700 px-3 py-1 rounded-full text-sm">
                    ${stock.price}
                  </div>

                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">

                  <div className="bg-slate-700 p-4 rounded-xl">

                    <p className="text-gray-400 text-sm">
                      AI Prediction
                    </p>

                    <p className="text-cyan-400 text-2xl font-bold mt-2">
                      {stock.weight}
                    </p>

                  </div>

                  <div className="bg-slate-700 p-4 rounded-xl">

                    <p className="text-gray-400 text-sm">
                      Stock Prediction
                    </p>

                    <p
                      className={`text-xl font-bold mt-2 ${
                        stock.signal === 'Strong Buy'
                          ? 'text-green-400'
                          : stock.signal === 'Buy'
                          ? 'text-cyan-400'
                          : stock.signal === 'Hold'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}
                    >
                      {stock.signal}
                    </p>

                  </div>

                </div>

                <div className="mt-6">

                  <div className="flex justify-between mb-2">

                    <span className="text-gray-400">
                      AI Confidence
                    </span>

                    <span className="font-semibold">
                      {(stock.weight * 100).toFixed(0)}%
                    </span>

                  </div>

                  <div className="w-full bg-slate-700 h-3 rounded-full">

                    <div
                      className="bg-cyan-500 h-3 rounded-full"
                      style={{
                        width: `${stock.weight * 100}%`
                      }}
                    ></div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  )
}

export default Stocks