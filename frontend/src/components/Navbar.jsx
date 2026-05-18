import { BarChart3 } from 'lucide-react'

function Navbar({ refreshData }) {

  const handleRefresh = () => {

    console.log("Button clicked")

    console.log(refreshData)

    if (typeof refreshData === 'function') {

      refreshData()

    } else {

      console.log("refreshData is NOT function")

    }
  }

  return (

    <div className="h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-6">

      <div className="flex items-center gap-2">

        <BarChart3 className="text-cyan-400" />

        <h1 className="text-xl font-bold">
          AI Portfolio Manager
        </h1>

      </div>

      <button
        onClick={handleRefresh}
        className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg"
      >
        Refresh Data
      </button>

    </div>
  )
}

export default Navbar