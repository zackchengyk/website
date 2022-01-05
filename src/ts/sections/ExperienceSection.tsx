import { XY } from '../common'
import React, { useEffect, useRef, useState } from 'react'
import experienceContent, { experienceNames } from '../content/experienceContent'
import ExperienceListItem from './ExperienceListItem'
import '../../css/sections/ExperienceSection.scss'

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
  }, [scrollTop, windowDimensions])

  return (
    <section id="experience" className={extraClassName} ref={self}>
      <h2 id="experience-header" className="section-header">
        <span>{'EXPERIENCE'}</span>
      </h2>
      <div id="experience-body" className="section-body">
        <ul id="experience-right">
          {experienceNames.map((experienceName, i) => (
            <ExperienceListItem
              sleeved={sleeved}
              sleevedStyle={{ '--slide-up-delay': i / 8 + 's' } as React.CSSProperties}
              {...experienceContent[experienceName]}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ExperienceSection
