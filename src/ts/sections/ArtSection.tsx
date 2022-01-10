import React, { useEffect, useState } from 'react'
import { XY } from '../common'
import artContent, { artNames } from '../content/artContent'
import ArtListItem from './ArtListItem'
import '../../css/sections/ArtSection.scss'

type ArtSectionProps = {
  windowDimensions: XY
  scrollTop: number
}

const ArtSection = React.forwardRef<HTMLElement, ArtSectionProps>(({ windowDimensions, scrollTop }, ref) => {
  // ================== Animate
  const [sleeved, setSleeved] = useState<string>('sleeved')
  useEffect(() => {
    // @ts-ignore
    if (sleeved && scrollTop + 0.75 * windowDimensions.y > ref?.current!.offsetTop) {
      setSleeved('')
    }
  }, [scrollTop, windowDimensions.x, windowDimensions.y])

  return (
    <section id="art" ref={ref}>
      <h2 id="art-header" className="section-header">
        <span>{'ART'}</span>
      </h2>
      <div id="art-body" className="section-body">
        <ul id="art-ul">
          {artNames.map((artName, i) => (
            <ArtListItem
              key={artName}
              sleeved={sleeved}
              sleevedStyle={{ '--slide-up-delay': i / 8 + 's' } as React.CSSProperties}
              {...artContent[artName]}
            />
          ))}
        </ul>
      </div>
    </section>
  )
})

export default ArtSection
