type PseudoGifProps = {
  webmSrc?: string
  mp4Src?: string
  style?: React.CSSProperties
}

function PseudoGif({ webmSrc, mp4Src, style }: PseudoGifProps) {
  const pseudoGifCommon = {
    className: 'pseudo-gif',
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true,
    controls: false,
  }
  return (
    <video {...pseudoGifCommon} style={style}>
      {webmSrc ? <source src={webmSrc} type="video/webm" /> : undefined}
      {mp4Src ? <source src={mp4Src} type="video/mp4" /> : undefined}
    </video>
  )
}

export default PseudoGif
