import '../../css/content/ExperienceSection.scss'
import { stringToId } from '../common'
import { experienceText } from './text'

export type ExperienceListItemProps = {
  experienceName: string
  extraClassName?: string
  imgSrc: string
  experienceTitle: React.ReactNode
  experienceSubtitle: React.ReactNode
  experienceBody: React.ReactNode
}

function ExperienceListItem({
  experienceName,
  extraClassName,
  imgSrc,
  experienceTitle,
  experienceSubtitle,
  experienceBody,
}: ExperienceListItemProps) {
  const id = 'experience-' + stringToId(experienceName)

  const liId = id
  const imgId = id + '-img'
  const divId = id + '-content'

  return (
    <li id={liId} className={'experience-li ' + extraClassName}>
      <img id={imgId} className={'experience-li-img'} src={imgSrc} />
      <div id={divId} className={'experience-li-div'}>
        <h4 className={'title-text'}>{experienceTitle}</h4>
        <h5 className={'subtitle-text'}>{experienceSubtitle}</h5>
        <div className={'body-text'}>{experienceBody}</div>
      </div>
    </li>
  )
}

type ExperienceSectionProps = {
  extraClassName: string
}

function ExperienceSection({ extraClassName }: ExperienceSectionProps) {
  return (
    <section id="experience-section" className={extraClassName}>
      {/* <div id="experience-left"></div> */}
      <div className="line"></div>
      <div id="experience-right">
        <ul id="experience-ul">
          <ExperienceListItem {...experienceText.govtech} />
          <ExperienceListItem {...experienceText.brgd} />
          <ExperienceListItem {...experienceText.csci1430} />
          <ExperienceListItem {...experienceText.engn0031} />
        </ul>
      </div>
    </section>
  )
}

export default ExperienceSection
