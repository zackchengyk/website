import AboutSection from './sections/AboutSection'
import BannerHeader from './sections/BannerHeader'
import ExperienceSection from './sections/ExperienceSection'
import Navbar from './sections/Navbar'
import ProjectsSection from './sections/ProjectsSection'
import { useWindowDimensions } from './useWindowDimensions'
import React, { useEffect, useRef, useState } from 'react'
import '../css/App.scss'
import '../css/font.css'
import { projectNames } from './content/projectsContent'
import ArtSection from './sections/ArtSection'

export const orderedSectionNames = ['home', 'about', 'experience', 'projects', 'art'] as const
export type SectionName = typeof orderedSectionNames[number]

function allowAnimationBasedOnURLHash(): boolean {
  if (window.location.hash) {
    const id = window.location.hash.slice(1)
    return (
      id === 'home' || !(orderedSectionNames.includes(id as any) || projectNames.includes(id.slice(9) as any))
    )
  }
  return true
}

function App() {
  const windowDimensions = useWindowDimensions()

  // ================== Prevent loading animation when reloading to specific area
  const [allowAnimation, _] = useState<boolean>(allowAnimationBasedOnURLHash())

  // ================== Keep track of scrollTop
  const [scrollTop, setScrollTop] = useState<number>(0)
  const scrollContainer = useRef<any>()
  // Set first value
  useEffect(() => setScrollTop(scrollContainer.current.scrollTop), [])
  // Define scroll handler
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

  // ================== Keep track of section elements
  const [sortedSections, setSortedSections] = useState<{ name: SectionName; element: HTMLElement }[]>([])
  const sectionRefs = useRef<Record<SectionName, React.RefObject<HTMLElement>>>(
    orderedSectionNames.reduce(
      (acc, ele) => ((acc[ele] = React.createRef()), acc),
      {} as Record<SectionName, React.RefObject<HTMLElement>>
    )
  )
  // Get sorted list of sections
  useEffect(() => {
    setSortedSections(
      orderedSectionNames.map((sectionName) => {
        // Could (but almost certainly will not) be null, so use a random div as a fallback
        const sectionElement = sectionRefs.current[sectionName].current || document.createElement('div')
        return { name: sectionName, element: sectionElement }
      })
    )
  }, [sectionRefs])

  return (
    <div id="scroll-container" ref={scrollContainer} onScroll={scrollHandler}>
      <BannerHeader ref={sectionRefs.current.home} />
      <div className={allowAnimation ? 'allow-animation' : ''}>
        <Navbar scrollTop={scrollTop} sortedSections={sortedSections} />
        <AboutSection ref={sectionRefs.current.about} />
        <ExperienceSection
          ref={sectionRefs.current.experience}
          windowDimensions={windowDimensions}
          scrollTop={scrollTop}
        />
        <ProjectsSection
          ref={sectionRefs.current.projects}
          windowDimensions={windowDimensions}
          scrollTop={scrollTop}
        />
        <ArtSection ref={sectionRefs.current.art} windowDimensions={windowDimensions} scrollTop={scrollTop} />
      </div>
    </div>
  )
}

export default App
