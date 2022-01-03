import { XY } from '../common'
import { experienceText } from '../content/text'
import '../../css/sections/ExperienceSection.scss'
import React, { useEffect, useRef, useState } from 'react'
import ExperienceListItem from './ExperienceListItem'

const experienceNames = ['govtech', 'brgd', 'csci1430', 'engn0031']
export type ExperienceName = typeof experienceNames[number]

type ExperienceSectionProps = {
  windowDimensions: XY
  scrollTop: number
  extraClassName?: string
}

function ExperienceSection({ windowDimensions, scrollTop, extraClassName }: ExperienceSectionProps) {
  // Animate

  const self = useRef<any>()
  const [sleeved, setSleeved] = useState<string>('sleeved')

  useEffect(() => {
    if (sleeved && scrollTop + 0.75 * windowDimensions.y > self.current!.offsetTop) {
      setSleeved('')
    }
  }, [scrollTop])

  return (
    <section id="experience" className={extraClassName} ref={self}>
      <h2 id="experience-header" className="section-header">
        <span>{'EXPERIENCE'}</span>
      </h2>
      <div id="experience-body" className="section-body">
        <div id="experience-body-grid">
          <ul id="experience-ul">
            {experienceNames.map((experienceName, i) => (
              <ExperienceListItem
                sleeved={sleeved}
                sleevedStyle={{ '--slide-up-delay': i / 8 + 's' } as React.CSSProperties}
                {...experienceText[experienceName]}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
