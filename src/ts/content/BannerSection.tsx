import '../../css/content/BannerSection.scss'
import src from '../../img/name.svg'

type BannerSectionProps = {
  extraClassName: string
}

function BannerSection({ extraClassName }: BannerSectionProps) {
  return (
    <header id="banner-section" className={extraClassName}>
      <div id="banner-left">
        <h2>{'Hello, World!'}</h2>
      </div>
      <h1 id="banner-right">
        <img src={src} alt="Zack Cheng" />
      </h1>
      <div id="banner-background" />
    </header>
  )
}

export default BannerSection
