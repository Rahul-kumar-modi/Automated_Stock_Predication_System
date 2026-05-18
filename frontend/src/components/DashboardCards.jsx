import { useEffect, useState } from 'react'
import axios from 'axios'

function DashboardCards() {

  const [portfolio, setPortfolio] = useState(null)

  useEffect(() => {
    fetchPortfolio()
  }, [])                                            

  const fetchPortfolio = async () => {    

    const response = await axios.get(
      'http://localhost:8000/portfolio'
    )

    setPortfolio(response.data)
  }

  const cards = [
    {
      title: 'Portfolio Value',
      value: portfolio
        ? `$${portfolio.portfolio_value}`
        : 'Loading...',
    },
    {
      title: 'Daily Return',
      value: portfolio
        ? `${portfolio.daily_return}%`
        : 'Loading...',
    },
    {
      title: 'Sharpe Ratio',
      value: portfolio
        ? portfolio.sharpe_ratio                                   
        : 'Loading...',
    },
  ]   
   
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-slate-800 p-5 rounded-2xl"
        >
          <h2>{card.title}</h2>

          <p className="text-2xl font-bold mt-2">
            {card.value}
          </p>
        </div>
      ))}

    </div>
  )
}

export default DashboardCards