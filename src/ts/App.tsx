import '../css/App.scss'
import { useWindowDimensions } from './useWindowDimensions'
import ZackCheng from './ZackCheng'

function App() {
  const hwDimensions = useWindowDimensions()

  return (
    <div className="App">
      <ZackCheng hwDimensions={hwDimensions} />
    </div>
  )
}

export default App
