import AboutSection from './sections/AboutSection'
import BannerHeader from './sections/BannerHeader'
import ExperienceSection from './sections/ExperienceSection'
import Navbar from './sections/Navbar'
import ProjectsSection from './sections/ProjectsSection'
import { useWindowDimensions } from './useWindowDimensions'
import '../css/App.scss'
import '../css/font.css'
import { useEffect, useRef, useState } from 'react'

export const sectionNames = ['home', 'about', 'experience', 'projects']

function fragmentIsSubsection(): boolean {
  if (window.location.hash) {
    const id = window.location.hash.slice(1)
    if (id !== 'home' && sectionNames.includes(id)) {
      return false
    }
  }
  return true
}

function App() {
  const windowDimensions = useWindowDimensions()

  // Attach passive scroll listener to self

  const scrollContainer = useRef<any>()
  const [scrollTop, setScrollTop] = useState<number>(0)
  useEffect(() => {
    // Set first value
    setScrollTop(scrollContainer.current.scrollTop)
    // Create listener handler
    const throttleDelay = 50
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

  // Prevent loading animation when reloading to specific area

  const [allowAnimation, _] = useState<boolean>(fragmentIsSubsection())

  return (
    <div id="scroll-container" ref={scrollContainer}>
      <BannerHeader />
      <div className={allowAnimation ? 'allow-animation' : ''}>
        <Navbar windowDimensions={windowDimensions} scrollTop={scrollTop} />
        <AboutSection />
        <ExperienceSection windowDimensions={windowDimensions} scrollTop={scrollTop} />
        <ProjectsSection windowDimensions={windowDimensions} scrollTop={scrollTop} />
      </div>
    </div>
  )
}

export default App
