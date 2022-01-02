import src from '../../img/name.svg'
import Planetarium from '../planetarium/Planetarium'
import '../../css/sections/BannerHeader.scss'

type BannerHeaderProps = {
  extraClassName?: string
}

function BannerHeader({ extraClassName }: BannerHeaderProps) {
  return (
    <header id="home" className={extraClassName}>
      <div id="banner-left">
        <h2>{'Hello, World!'}</h2>
      </div>
      <h1 id="banner-right">
        <img src={src} alt="Zack Cheng" />
      </h1>
      <div id="banner-background">
        <Planetarium />
      </div>
    </header>
  )
}

export default BannerHeader