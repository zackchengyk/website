import '../css/App.scss'
import '../css/font.css'
import AboutSection from './sections/AboutSection'
import BannerHeader from './sections/BannerHeader'
import ExperienceSection from './sections/ExperienceSection'
import Navbar from './sections/Navbar'
import ProjectsSection from './sections/ProjectsSection'
import { useWindowDimensions } from './useWindowDimensions'

function App() {
  const windowDimensions = useWindowDimensions()

  const style = {
    '--viewport-height': windowDimensions.y + 'px',
    '--viewport-width': windowDimensions.x + 'px',
  } as React.CSSProperties

  return (
    <div id="App" style={style}>
      <BannerHeader />
      <div>
        <Navbar />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
      </div>
    </div>
  )
}

export default App
