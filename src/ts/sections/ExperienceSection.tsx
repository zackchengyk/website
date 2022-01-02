import { stringToId } from '../common'
import { experienceText } from '../content/text'
import '../../css/sections/ExperienceSection.scss'

// ======================================================================== Component: ExperienceListItem

export type ExperienceListItemContentProps = {
  experienceName: string
  extraClassName?: string
  imgSrc: string
  experienceTitle: React.ReactNode
  experienceSubtitle: React.ReactNode
  experienceBody: React.ReactNode
}
type ExperienceListItemProps = {} & ExperienceListItemContentProps

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
        <h3 className={'title-text'}>{experienceTitle}</h3>
        <h4 className={'subtitle-text'}>{experienceSubtitle}</h4>
        <div className={'body-text'}>{experienceBody}</div>
      </div>
    </li>
  )
}

// ======================================================================== Component: ExperienceSection

const experienceNames = ['govtech', 'brgd', 'csci1430', 'engn0031']
export type ExperienceName = typeof experienceNames[number]

type ExperienceSectionProps = {
  extraClassName?: string
}

function ExperienceSection({ extraClassName }: ExperienceSectionProps) {
  return (
    <section id="experience" className={extraClassName}>
      <h2 id="experience-header" className="section-header subtitle-text">
        <span>{'EXPERIENCE'}</span>
      </h2>
      <div id="experience-body" className="section-body">
        <div id="experience-body-grid">
          <ul id="experience-ul">
            {experienceNames.map((experienceName) => (
              <ExperienceListItem {...experienceText[experienceName]} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
