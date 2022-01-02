import AboutSection from './sections/AboutSection'
import BannerHeader from './sections/BannerHeader'
import ExperienceSection from './sections/ExperienceSection'
import Navbar from './sections/Navbar'
import ProjectsSection from './sections/ProjectsSection'
import { useWindowDimensions } from './useWindowDimensions'
import '../css/App.scss'
import '../css/font.css'
import { useEffect, useRef, useState } from 'react'

function App() {
  const windowDimensions = useWindowDimensions()

  const scrollContainer = useRef<any>()
  const [scrollTop, setScrollTop] = useState<number>(0)

  // Attach passive scroll listener to self
  useEffect(() => {
    const throttleDelay = 100
    let waiting = false
    function scrollHandler() {
      // Throttle
      if (waiting) return
      waiting = true
      setTimeout(() => (waiting = false), throttleDelay)
      // Set scrollTop
      setScrollTop(scrollContainer.current.scrollTop)
    }
    scrollContainer.current.addEventListener('scroll', scrollHandler, { passive: true })
    return () => scrollContainer.current.removeEventListener('scroll', scrollHandler)
  }, [])

  const style = {
    '--viewport-height': windowDimensions.y + 'px',
    '--viewport-width': windowDimensions.x + 'px',
  } as React.CSSProperties

  return (
    <div id="scroll-container" ref={scrollContainer} style={style}>
      <BannerHeader />
      <div>
        <Navbar scrollTop={scrollTop} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
      </div>
    </div>
  )
}

export default App
