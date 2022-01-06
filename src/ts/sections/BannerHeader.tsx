import src from '../../img/name.svg'
import Planetarium from '../planetarium/Planetarium'
import React from 'react'
import '../../css/sections/BannerHeader.scss'

type BannerHeaderProps = {}

const BannerHeader = React.forwardRef<HTMLElement, BannerHeaderProps>(({}, ref) => {
  return (
    <header id="home" ref={ref}>
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
})

export default BannerHeader
