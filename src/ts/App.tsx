import '../css/App.scss'
import '../css/font.css'
import AboutSection from './content/AboutSection'
import BannerSection from './content/BannerSection'
import { useWindowDimensions } from './useWindowDimensions'

function App() {
  const windowDimensions = useWindowDimensions()

  const style = {
    '--viewport-height': windowDimensions.y + 'px',
    '--viewport-width': windowDimensions.x + 'px',
  } as React.CSSProperties

  return (
    <div id="App" style={style}>
      <BannerSection extraClassName={''} />
      {/* <NavBar extraClassName={''} /> */}
      <AboutSection extraClassName={''} />
    </div>
  )
}

export default App
