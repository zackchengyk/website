import { stringToId, XY } from '../common'
import { experienceText } from '../content/text'
import '../../css/sections/ExperienceSection.scss'
import React, { useEffect, useRef, useState } from 'react'

// ======================================================================== Component: ExperienceListItem

export type ExperienceListItemContentProps = {
  experienceName: string
  extraClassName?: string
  imgSrc: string
  experienceTitle: React.ReactNode
  experienceSubtitle: React.ReactNode
  experienceBody: React.ReactNode
}
type ExperienceListItemProps = {
  sleeved: string
  sleevedStyle: React.CSSProperties
} & ExperienceListItemContentProps

function ExperienceListItem({
  experienceName,
  extraClassName,
  imgSrc,
  experienceTitle,
  experienceSubtitle,
  experienceBody,
  sleeved,
  sleevedStyle,
}: ExperienceListItemProps) {
  const id = 'experience-' + stringToId(experienceName)

  const liId = id
  const imgId = id + '-img'
  const divId = id + '-content'

  return (
    <li id={liId} className={'experience-li ' + extraClassName}>
      <div className={'experience-li-div ' + sleeved} style={sleevedStyle}>
        <img id={imgId} className={'experience-li-img'} src={imgSrc} />
        <div id={divId} className={'experience-li-inner-div'}>
          <h3 className={'title-text'}>{experienceTitle}</h3>
          <h4 className={'subtitle-text'}>{experienceSubtitle}</h4>
          <div className={'body-text'}>{experienceBody}</div>
        </div>
      </div>
    </li>
  )
}

// ======================================================================== Component: ExperienceSection

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
      <h2 id="experience-header" className="section-header subtitle-text">
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
