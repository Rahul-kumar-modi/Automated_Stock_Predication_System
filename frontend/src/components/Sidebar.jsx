import {
  LayoutDashboard,
  TrendingUp,
  Brain,
  PieChart,
} from 'lucide-react'

import { Link } from 'react-router-dom'

function Sidebar() {

  return (

    <div className="w-64 bg-slate-900 border-r border-slate-700 min-h-screen p-4">

      <div className="space-y-4 mt-6">

        <Link
          to="/"
          className="flex items-center gap-3 hover:bg-slate-800 p-3 rounded-lg cursor-pointer"
        >
          <LayoutDashboard />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/stocks"
          className="flex items-center gap-3 hover:bg-slate-800 p-3 rounded-lg cursor-pointer"
        >
          <TrendingUp />
          <span>Stocks</span>
        </Link>

        <Link
          to="/training"
          className="flex items-center gap-3 hover:bg-slate-800 p-3 rounded-lg cursor-pointer"
        >
          <Brain />
          <span>AI Training</span>
        </Link>

        <Link
          to="/portfolio"
          className="flex items-center gap-3 hover:bg-slate-800 p-3 rounded-lg cursor-pointer"
        >
          <PieChart />
          <span>Portfolio</span>
        </Link>

      </div>

    </div>
  )
}

export default Sidebar