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
        <div className="title-text">{personalIntro}</div>
        <div className="body-text">{personalBlurb}</div>
      </div>
      <div id="about-right">
        <img src={src} alt="todo" />
      </div>
    </section>
  )
}

export default AboutSection
