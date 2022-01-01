import src from '../../img/name.svg'
import Planetarium from '../planetarium/Planetarium'
import '../../css/sections/BannerHeader.scss'

type BannerHeaderProps = {
  extraClassName?: string
}

function BannerHeader({ extraClassName }: BannerHeaderProps) {
  return (
    <header id="banner-header" className={extraClassName}>
      <div id="banner-left" className="no-select">
        <h2>{'Hello, World!'}</h2>
      </div>
      <h1 id="banner-right" className="no-select">
        <img src={src} alt="Zack Cheng" />
      </h1>
      <div id="banner-background" className="no-select">
        <Planetarium />
      </div>
    </header>
  )
}

export default BannerHeader
