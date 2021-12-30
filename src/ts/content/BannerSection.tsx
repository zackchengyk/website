import '../../css/content/BannerSection.scss'
import NameSVG from './NameSVG'

type BannerSectionProps = {
  extraClassName: string
}

function BannerSection({ extraClassName }: BannerSectionProps) {
  return (
    <section id="banner-section" className={extraClassName}>
      <div id="banner-left">
        <h2>{'Hello, World!'}</h2>
      </div>
      <div id="banner-right">
        <NameSVG />
      </div>
      <div id="banner-background" />
    </section>
  )
}

export default BannerSection
