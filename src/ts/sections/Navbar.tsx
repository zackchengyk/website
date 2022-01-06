import { useEffect, useState } from 'react'
import '../../css/sections/Navbar.scss'
import { SectionName, orderedSectionNames } from '../App'
import { XY } from '../common'

// ======================================================================== Component: Navbar

type NavbarProps = {
  scrollTop: number
  sortedSections: { name: SectionName; element: HTMLElement }[]
}

function Navbar({ scrollTop, sortedSections }: NavbarProps) {
  const [active, setActive] = useState<SectionName>(orderedSectionNames[0])

  // Change active navbar item based on scrollTop
  useEffect(() => {
    // Find our current position
    for (let i = 0; i < sortedSections.length; i++) {
      if (scrollTop >= sortedSections[i].element.offsetTop) {
        if (sortedSections[i + 1] == null || scrollTop < sortedSections[i + 1].element.offsetTop) {
          setActive(sortedSections[i].name)
          return
        }
      }
    }
  }, [active, sortedSections, scrollTop])

  return (
    <nav id="navbar">
      <div id="navbar-right">
        {orderedSectionNames.map((sectionName) => (
          <a
            key={sectionName}
            className={'navbar-item ' + (active === sectionName ? 'active' : 'inactive')}
            href={`#${sectionName}`}>
            {sectionName}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
