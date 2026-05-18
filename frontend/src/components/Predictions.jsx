import axios from 'axios'
import { useEffect, useState } from 'react'

function Predictions() {

  const [actions, setActions] = useState([])

  useEffect(() => {
    fetchPredictions()
  }, [])

  const fetchPredictions = async () => {

    try {

      const response = await axios.get(
        'http://localhost:8000/prediction'
      )

      setActions(response.data.predicted_action)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bg-slate-800 p-5 rounded-2xl">

      <h1 className="text-2xl font-bold mb-4">
        AI Portfolio Predictions
      </h1>

      <div className="space-y-2">

        {actions.map((value, index) => (
          <div
            key={index}
            className="bg-slate-700 p-3 rounded-lg"
          >
            Stock {index + 1}: {value}
          </div>
        ))}
    
      </div> 
    </div>
  )
}

export default Predictions