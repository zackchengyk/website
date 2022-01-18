import { personalBlurb, personalIntro } from '../content/aboutContent'
import photoSrc from '../../img/me.jpg'
import resumeSrc from '../../img/resume.pdf'
import React from 'react'
import OutLink from '../content/OutLink'
import '../../css/sections/AboutSection.scss'

type AboutSectionProps = {}

const AboutSection = React.forwardRef<HTMLElement, AboutSectionProps>(({}, ref) => {
  return (
    <section id="about" ref={ref}>
      <h2 id="about-header" className="section-header">
        <span>{'ABOUT'}</span>
      </h2>
      <div id="about-body" className="section-body">
        <div id="about-upper">
          <div id="about-text">
            <h3 className="title-text">{personalIntro}</h3>
            <div className="body-text">{personalBlurb}</div>
          </div>
          <div id="about-photo">
            <img src={photoSrc} alt="Cropped photo of Zack Cheng" />
          </div>
        </div>
        <nav id="about-lower">
          <OutLink href="mailto:zack_cheng@brown.edu">
            <strong>{'> Email'}</strong>
          </OutLink>
          <OutLink href="https://www.linkedin.com/in/zackcheng/">
            <strong>{'> LinkedIn'}</strong>
          </OutLink>
          <OutLink href={resumeSrc}>
            <strong>{'> Resume'}</strong>
          </OutLink>
          <OutLink href="https://github.com/zackchengyk">
            <strong>{'> GitHub'}</strong>
          </OutLink>
        </nav>
      </div>
    </section>
  )
})

export default AboutSection
