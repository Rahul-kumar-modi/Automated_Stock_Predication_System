import axios from 'axios'
import { useEffect, useState } from 'react'

function AllocationTable() {

  const [allocations, setAllocations] = useState([])

  useEffect(() => {
    fetchPortfolio()
  }, [])

  const fetchPortfolio = async () => {

    try {

      const response = await axios.get(
        'http://localhost:8000/portfolio'
      )

      setAllocations(response.data.allocations)

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <div className="bg-slate-800 p-5 rounded-2xl shadow-lg border border-slate-700">

      <div className="flex items-center justify-between mb-5">

        <h2 className="text-2xl font-bold">
          Portfolio Allocation
        </h2>

        <span className="text-gray-400">
          {allocations.length} Stocks
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
                Weight
              </th>

              <th className="pb-4 text-right">
                Allocated Amount
              </th>

            </tr>

          </thead>

          <tbody>

            {allocations.map((stock, index) => (

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
  )
}

export default AllocationTable