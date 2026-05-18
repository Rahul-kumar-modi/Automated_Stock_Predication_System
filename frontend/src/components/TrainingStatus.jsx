function TrainingStatus() {
  return (
    <div className="bg-slate-800 p-5 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Model Training</h2>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span>A2C Training</span>
            <span>80%</span>
          </div>

          <div className="w-full bg-slate-700 rounded-full h-3">
            <div className="bg-cyan-500 h-3 rounded-full w-[80%]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrainingStatus