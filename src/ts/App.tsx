import '../css/App.scss'
import { useWindowDimensions } from './useWindowDimensions'
import PixelStarField from './pixels/stars/PixelStarField'
import PixelLetterField from './pixels/letters/PixelLetterField'

function App() {
  const hwDimensions = useWindowDimensions()

  const style = {
    '--viewport-height': hwDimensions.height + 'px',
    '--viewport-width': hwDimensions.width + 'px',
  } as React.CSSProperties

  return (
    <div className="App" style={style}>
      <PixelStarField windowDimensions={{ x: hwDimensions.width, y: hwDimensions.height }} />
      <PixelLetterField windowDimensions={{ x: hwDimensions.width, y: hwDimensions.height }} />
    </div>
  )
}

export default App
