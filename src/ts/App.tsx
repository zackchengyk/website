import '../css/App.scss'
import { useWindowDimensions } from './useWindowDimensions'
import ZackCheng from './ZackCheng'

function App() {
  const hwDimensions = useWindowDimensions()

  const style = {
    '--viewport-height': hwDimensions.height + 'px',
    '--viewport-width': hwDimensions.width + 'px',
  } as React.CSSProperties

  return (
    <div className="App" style={style}>
      <ZackCheng hwDimensions={hwDimensions} />
    </div>
  )
}

export default App
