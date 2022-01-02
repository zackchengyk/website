import { useEffect, useState } from 'react'
import '../../css/sections/Navbar.scss'
import { stringToId } from '../common'

// ======================================================================== Helpers

const sectionNames = ['home', 'about', 'experience', 'projects']
function helper() {
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
  scrollTop: number
  extraClassName?: string
}

function Navbar({ scrollTop, extraClassName }: NavbarProps) {
  const [active, setActive] = useState<string>(helper())

  // Change active navbar item based on scrollTop
  useEffect(() => {
    // Get list of names and their respective offsetTops
    const sortedNamesAndTops = sectionNames
      .map((sectionName) => {
        const navbarTarget = document.getElementById(sectionName)
        return { name: sectionName, offsetTop: navbarTarget!.offsetTop }
      })
      .sort((a, b) => a.offsetTop - b.offsetTop)

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
        {sectionNames.map((x) => (
          <a
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
