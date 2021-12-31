import '../../css/content/AboutSection.scss'
import { personalBlurb, personalIntro } from './text'
import src from '../../img/me.jpg'

type AboutSectionProps = {
  extraClassName: string
}

function AboutSection({ extraClassName }: AboutSectionProps) {
  return (
    <section id="about-section" className={extraClassName}>
      <div id="about-left">
        <h3 className="title-text">{personalIntro}</h3>
        <div className="body-text">{personalBlurb}</div>
      </div>
      <div id="about-right">
        <img src={src} alt="Cropped photo of Zack Cheng" />
      </div>
    </section>
  )
}

export default AboutSection
