import { useEffect, useState } from 'react'
import '../../css/sections/Navbar.scss'
import { sectionNames } from '../App'
import { XY } from '../common'

// ======================================================================== Helpers

function getActiveSection() {
  if (window.location.hash) {
    const id = window.location.hash.slice(1)
    if (sectionNames.includes(id)) {
      return id
    }
  }
  return sectionNames[0]
}

// ======================================================================== Component: Navbar

type NavbarProps = {
  windowDimensions: XY
  scrollTop: number
  extraClassName?: string
}

function Navbar({ windowDimensions, scrollTop, extraClassName }: NavbarProps) {
  const [active, setActive] = useState<string>(getActiveSection())
  const [sortedNamesAndTops, setSortedNamesAndTops] = useState<{ name: string; offsetTop: number }[]>([])

  // Get list of section names and offsetTops when window dimensions change
  useEffect(() => {
    setSortedNamesAndTops(
      sectionNames
        .map((sectionName) => {
          const navbarTarget = document.getElementById(sectionName)
          return { name: sectionName, offsetTop: navbarTarget!.offsetTop }
        })
        .sort((a, b) => a.offsetTop - b.offsetTop)
    )
  }, [windowDimensions])

  // Change active navbar item based on scrollTop
  useEffect(() => {
    // Find our current position
    for (let i = 0; i < sortedNamesAndTops.length; i++) {
      if (scrollTop > sortedNamesAndTops[i].offsetTop) {
        if (sortedNamesAndTops[i + 1] == null || scrollTop < sortedNamesAndTops[i + 1].offsetTop) {
          setActive(sortedNamesAndTops[i].name)
          return
        }
      }
    }
  }, [scrollTop])

  return (
    <nav id="navbar" className={extraClassName}>
      <div id="navbar-right">
        {sectionNames.map((x, i) => (
          <a
            key={i}
            id={`navbar-${x}`}
            className={'navbar-item ' + (active === x ? 'active' : 'inactive')}
            onClick={() => setActive(x)}
            href={`#${x}`}>
            {x}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
