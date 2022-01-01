import '../css/App.scss'
import '../css/font.css'
import AboutSection from './content/AboutSection'
import BannerHeader from './content/BannerHeader'
import ExperienceSection from './content/ExperienceSection'
import Navbar from './content/Navbar'
import ProjectsSection from './content/ProjectsSection'
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
