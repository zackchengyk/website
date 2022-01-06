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

const ExperienceSection = React.forwardRef<HTMLElement, ExperienceSectionProps>(
  ({ windowDimensions, scrollTop, extraClassName }, ref) => {
    // ================== Animate
    const [sleeved, setSleeved] = useState<string>('sleeved')
    useEffect(() => {
      // @ts-ignore
      if (sleeved && scrollTop + 0.75 * windowDimensions.y > ref?.current.offsetTop) {
        setSleeved('')
      }
    }, [scrollTop, windowDimensions])

    return (
      <section id="experience" className={extraClassName} ref={ref}>
        <h2 id="experience-header" className="section-header">
          <span>{'EXPERIENCE'}</span>
        </h2>
        <div id="experience-body" className="section-body">
          <ul id="experience-right">
            {experienceNames.map((experienceName, i) => (
              <ExperienceListItem
                key={i}
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
)

export default ExperienceSection
