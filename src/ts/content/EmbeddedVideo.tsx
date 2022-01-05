type EmbeddedVideoProps = {
  webmSrc?: string
  mp4Src?: string
  posterSrc?: string
  style?: React.CSSProperties
}

function EmbeddedVideo({ webmSrc, mp4Src, posterSrc, style }: EmbeddedVideoProps) {
  const embeddedVideoCommon = {
    className: 'embedded-video',
    preload: 'metadata',
    loop: true,
    muted: true,
    playsInline: true,
    controls: true,
  }
  return (
    <video {...embeddedVideoCommon} poster={posterSrc} style={style}>
      <source src={webmSrc} type="video/webm" />
      <source src={mp4Src} type="video/mp4" />
    </video>
  )
}

export default EmbeddedVideo
