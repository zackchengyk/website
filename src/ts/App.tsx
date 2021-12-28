import '../css/App.scss'
import { PixelStarField } from './stars/PixelStarField'
import { useWindowDimensions } from './useWindowDimensions'
import PixelLetters from './letters/PixelLetters'

function App() {
  const hwDimensions = useWindowDimensions()

  const style = {
    '--viewport-height': hwDimensions.height + 'px',
    '--viewport-width': hwDimensions.width + 'px',
  } as React.CSSProperties

  return (
    <div className="App" style={style}>
      <PixelStarField windowDimensions={{ x: hwDimensions.width, y: hwDimensions.height }} />
      <PixelLetters windowDimensions={{ x: hwDimensions.width, y: hwDimensions.height }} />
    </div>
  )
}

export default App
