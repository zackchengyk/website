import { stringToId } from '../common'

export type ArtListItemContentProps = {
  artName: string
  imgSrc: string
}
type ArtListItemProps = {
  sleeved: string
  sleevedStyle: React.CSSProperties
} & ArtListItemContentProps

function ArtListItem({ artName, imgSrc, sleeved, sleevedStyle }: ArtListItemProps) {
  const id = 'art-' + stringToId(artName)

  return (
    <li id={id} className={'art-li'}>
      <div className={'art-li-div ' + sleeved} style={sleevedStyle}>
        <div className={'art-li-img-container'}>
          <img
            className={'art-li-img'}
            srcSet={imgSrc}
            loading="lazy"
            sizes="(max-width: 607px) 100vw, (max-width: 900px) 50vw, 350px"
          />
        </div>
        <div className={'art-li-overlay'}>
          <h3 className={'title-text'}>{artName}</h3>
        </div>
      </div>
    </li>
  )
}

export default ArtListItem
