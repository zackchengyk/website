import { stringToId } from '../common'

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

export default ExperienceListItem
