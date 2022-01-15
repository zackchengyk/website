import { XY } from '../common'

type PseudoGifProps = {
  webmSrc: string
  mp4Src: string
  aspect: XY
  style?: React.CSSProperties
}

function PseudoGif({ webmSrc, mp4Src, aspect, style }: PseudoGifProps) {
  const pseudoGifCommon = {
    className: 'pseudo-gif aspect-ratio-inner',
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true,
    controls: false,
  } as const
  return (
    <div className="border-box" style={style}>
      <div className="aspect-ratio-outer" style={{ paddingTop: (aspect.y / aspect.x) * 100 + '%' }}>
        <video {...pseudoGifCommon}>
          {webmSrc ? <source src={webmSrc} type="video/webm" /> : undefined}
          {mp4Src ? <source src={mp4Src} type="video/mp4" /> : undefined}
        </video>
      </div>
    </div>
  )
}

export default PseudoGif
