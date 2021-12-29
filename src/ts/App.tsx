import '../css/App.scss'
import { useWindowDimensions } from './useWindowDimensions'
import PixelStarField from './pixels/stars/PixelStarField'
import PixelLetterField from './pixels/letters/PixelLetterField'
import FixedContentField from './content/FixedContentField'
import { useState } from 'react'

function App() {
  const windowDimensions = useWindowDimensions()
  const [className, setClassName] = useState('hidden')

  const style = {
    '--viewport-height': windowDimensions.y + 'px',
    '--viewport-width': windowDimensions.x + 'px',
  } as React.CSSProperties

  return (
    <div className="App" style={style}>
      <PixelStarField windowDimensions={windowDimensions} />
      <PixelLetterField windowDimensions={windowDimensions} callback={() => setClassName('')} />
      <FixedContentField className={className} />
    </div>
  )
}

export default App
