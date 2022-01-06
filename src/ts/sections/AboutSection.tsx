import { personalBlurb, personalIntro } from '../content/aboutContent'
import src from '../../img/me.jpg'
import '../../css/sections/AboutSection.scss'
import React from 'react'

type AboutSectionProps = {}

const AboutSection = React.forwardRef<HTMLElement, AboutSectionProps>(({}, ref) => {
  return (
    <section id="about" ref={ref}>
      <h2 id="about-header" className="section-header">
        <span>{'ABOUT'}</span>
      </h2>
      <div id="about-body" className="section-body">
        <div id="about-left">
          <h3 className="title-text">{personalIntro}</h3>
          <div className="body-text">{personalBlurb}</div>
        </div>
        <div id="about-right">
          <img src={src} alt="Cropped photo of Zack Cheng" />
        </div>
      </div>
    </section>
  )
})

export default AboutSection
