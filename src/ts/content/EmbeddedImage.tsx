import { XY } from '../common'

type EmbeddedImageProps = {
  src: string
  alt: string
  aspect: XY
  style?: React.CSSProperties
}

function EmbeddedImage({ src, alt, aspect, style }: EmbeddedImageProps) {
  const embeddedImageCommon = {
    className: 'embedded-image aspect-ratio-inner',
  } as const
  return (
    <div className="border-box" style={style}>
      <div className="aspect-ratio-outer" style={{ paddingTop: (aspect.y / aspect.x) * 100 + '%' }}>
        <img {...embeddedImageCommon} src={src} alt={alt} />
      </div>
    </div>
  )
}

export default EmbeddedImage
