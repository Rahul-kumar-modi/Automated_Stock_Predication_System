import axios from 'axios'
import { useEffect, useState } from 'react'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import PortfolioPieChart from '../components/PortfolioPieChart'

function Portfolio() {

  const [portfolio, setPortfolio] = useState(null)

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const fetchPortfolio = async () => {

    try {

      const response = await axios.get(
        'http://localhost:8000/portfolio'
      )

      setPortfolio(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div className="flex bg-slate-950 text-white min-h-screen">

      <Sidebar />

      <div className="flex-1">

        {/* <Navbar refreshData={fetchPortfolio} /> */}

        <div className="p-6 space-y-6">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                Portfolio Management
              </h1>

              <p className="text-gray-400 mt-2">
                AI-powered portfolio allocation dashboard
              </p>

            </div>

            <button
              onClick={fetchPortfolio}
              className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-xl font-semibold"
            >
              Refresh Portfolio
            </button>

          </div>

          {portfolio && (

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="bg-slate-800 p-5 rounded-2xl shadow-lg border border-slate-700">

                <h2 className="text-gray-400">
                  Portfolio Value
                </h2>

                <p className="text-3xl font-bold mt-3 text-cyan-400">
                  ${portfolio.portfolio_value}
                </p>

              </div>

              <div className="bg-slate-800 p-5 rounded-2xl shadow-lg border border-slate-700">

                <h2 className="text-gray-400">
                  Daily Return
                </h2>

                <p className="text-3xl font-bold mt-3 text-green-400">
                  {portfolio.daily_return}%
                </p>

              </div>

              <div className="bg-slate-800 p-5 rounded-2xl shadow-lg border border-slate-700">

                <h2 className="text-gray-400">
                  Sharpe Ratio
                </h2>

                <p className="text-3xl font-bold mt-3">
                  {portfolio.sharpe_ratio}
                </p>

              </div>

            </div>

          )}

          <PortfolioPieChart />

          {portfolio && (

            <div className="bg-slate-800 p-5 rounded-2xl shadow-lg border border-slate-700">

              <div className="flex items-center justify-between mb-5">

                <h2 className="text-2xl font-bold">
                  Portfolio Allocation
                </h2>

                <span className="text-gray-400">
                  Total Stocks: {portfolio.allocations.length}
                </span>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="text-left text-gray-400 border-b border-slate-700">

                      <th className="pb-4">
                        Ticker
                      </th>

                      <th className="pb-4">
                        Allocation Weight
                      </th>

                      <th className="pb-4 text-right">
                        Allocated Amount
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {portfolio.allocations.map((stock, index) => (

                      <tr
                        key={index}
                        className="border-b border-slate-700 hover:bg-slate-700/30 transition"
                      >

                        <td className="py-4 font-semibold">
                          {stock.ticker}
                        </td>

                        <td className="py-4">

                          <div className="flex items-center gap-3">

                            <div className="w-full bg-slate-700 h-3 rounded-full">

                              <div
                                className="bg-cyan-500 h-3 rounded-full"
                                style={{
                                  width: `${stock.weight}%`
                                }}
                              ></div>

                            </div>

                            <span className="min-w-[60px]">
                              {stock.weight}%
                            </span>

                          </div>

                        </td>

                        <td className="py-4 text-right text-green-400 font-bold">

                          ${stock.allocated_amount}

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  )
}

export default Portfolio