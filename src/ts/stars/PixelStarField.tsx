import { useEffect, useState } from 'react'
import { getRandomColor, XY } from '../common'
import { PixelAnimStarProps, PixelAnimStar } from './PixelAnimStar'
import { PixelStar, PixelStarProps } from './PixelStar'
import '../../css/stars.scss'

const pixelSize = 3

// Helper function
function getRandomPosition(pixelDimensions: XY, avoidCenterXFrac: number, avoidCenterYFrac: number): XY {
  // Modify distribution to avoid center
  let normalized = { x: Math.random() - 0.5, y: Math.random() - 0.5 }
  while (Math.abs(normalized.x) < avoidCenterXFrac / 2 && Math.abs(normalized.y) < avoidCenterYFrac / 2) {
    normalized = { x: Math.random() - 0.5, y: Math.random() - 0.5 }
  }

  return {
    x: Math.round((normalized.x + 0.5) * pixelDimensions.x),
    y: Math.round((normalized.y + 0.5) * pixelDimensions.y),
  }
}

type PixelStarFieldProps = {
  windowDimensions: XY
}

export function PixelStarField({ windowDimensions }: PixelStarFieldProps) {
  // Get pixel dimensions
  const { x: xDim, y: yDim } = windowDimensions
  const pixelDimensions: XY = { x: Math.floor(xDim / pixelSize), y: Math.floor(yDim / pixelSize) }

  // Use state for stars
  const [animStars, setAnimStars] = useState<PixelAnimStarProps[]>([])
  const [stars, setStars] = useState<PixelStarProps[]>([])

  // Figure out how many stars to spawn
  const areaRatio = (pixelDimensions.x * pixelDimensions.y) / 10000
  const numAnimStars = Math.floor(1.5 * areaRatio)
  const numStars = Math.floor(10 * areaRatio)
  console.log(numAnimStars, numStars)

  // Setup stars if pixelDimensions change
  useEffect(() => {
    const animStarsTemp: PixelAnimStarProps[] = [...Array(numAnimStars).keys()].map(() => ({
      position: getRandomPosition(pixelDimensions, 0, 0),
      color: getRandomColor(),
    }))
    setAnimStars(animStarsTemp)
    const starsTemp: PixelStarProps[] = [...Array(numStars).keys()].map(() => ({
      position: getRandomPosition(pixelDimensions, 0, 0),
      color: getRandomColor(),
    }))
    setStars(starsTemp)
  }, [windowDimensions])

  return (
    <div id="stars-div">
      <svg
        id="stars-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${pixelDimensions.x} ${pixelDimensions.y}`}>
        {animStars.map((starProps, i) => (
          <PixelAnimStar key={i} {...starProps} />
        ))}
        {stars.map((starProps, i) => (
          <PixelStar key={i} {...starProps} />
        ))}
      </svg>
    </div>
  )
}
