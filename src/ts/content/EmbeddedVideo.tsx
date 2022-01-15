import { XY } from '../common'

type EmbeddedVideoProps = {
  webmSrc: string
  mp4Src: string
  posterSrc: string
  aspect: XY
  style?: React.CSSProperties
}

function EmbeddedVideo({ webmSrc, mp4Src, posterSrc, aspect, style }: EmbeddedVideoProps) {
  const embeddedVideoCommon = {
    className: 'embedded-video aspect-ratio-inner',
    preload: 'metadata',
    loop: true,
    muted: true,
    playsInline: true,
    controls: true,
  } as const
  return (
    <div className="border-box" style={style}>
      <div className="aspect-ratio-outer" style={{ paddingTop: (aspect.y / aspect.x) * 100 + '%' }}>
        <video {...embeddedVideoCommon} poster={posterSrc}>
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

export default EmbeddedVideo
