import { useState } from 'react'
import '../css/App.scss'
import ZackCheng from './ZackCheng'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <ZackCheng />
    </div>
  )
}

export default App
