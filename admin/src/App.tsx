import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Hello welcome admin panel</h1>
        <p className="text-green-800 font-bold">In development mode!!</p>
      </div>
      
    </>
  )
}

export default App
