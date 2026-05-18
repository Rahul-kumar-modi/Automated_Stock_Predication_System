import axios from 'axios'
import { useEffect, useState } from 'react'

import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

function Training() {

  const [training, setTraining] = useState(null)

  const [loading, setLoading] = useState(false)

  useEffect(() => {

    fetchTraining()

    const interval = setInterval(() => {
      fetchTraining()
    }, 1000)

    return () => clearInterval(interval)

  }, [])

  const fetchTraining = async () => {

    try {

      const response = await axios.get(
        'http://localhost:8000/training/status'
      )

      setTraining(response.data)

    } catch (error) {

      console.log(error)

    }
  }

  const startTraining = async () => {

    try {

      setLoading(true)

      await axios.post(
        'http://localhost:8000/training/start'
      )

      fetchTraining()

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }
  }

  return (

    <div className="flex bg-slate-950 text-white min-h-screen">

      <Sidebar />

      <div className="flex-1">

        {/* <Navbar /> */}

        <div className="p-6 space-y-6">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                AI Training
              </h1>

              <p className="text-gray-400 mt-2">
                Train reinforcement learning model from frontend
              </p>

            </div>

            <button
              onClick={startTraining}
              disabled={loading}
              className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
            >

              {loading
                ? 'Training...'
                : 'Start Training'}

            </button>

          </div>

          {training && (

            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700">

              <div className="flex items-center justify-between mb-4">

                <h2 className="text-2xl font-bold">
                  Training Status
                </h2>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    training.status === 'completed'
                      ? 'bg-green-500/20 text-green-400'
                      : training.status === 'training'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-slate-700 text-gray-300'
                  }`}
                >

                  {training.status}

                </span>

              </div>

              <div className="w-full bg-slate-700 h-5 rounded-full overflow-hidden">

                <div
                  className="bg-cyan-500 h-5 transition-all duration-500"
                  style={{
                    width: `${training.progress}%`
                  }}
                ></div>

              </div>

              <div className="flex justify-between mt-3">

                <span className="text-gray-400">
                  Progress
                </span>

                <span className="font-bold">
                  {training.progress}%
                </span>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  )
}

export default Training