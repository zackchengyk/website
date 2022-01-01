import { useEffect, useState } from 'react'
import { XY } from '../common'
import '../../css/content/PlanetariumBackground.scss'

const pixelSize = 2
const numColors = 10

// ======================================================================== Component: PixelStar

type PixelStarProps = {
  position: XY
  colorIndex: number
}

function PixelStar({ position, colorIndex }: PixelStarProps) {
  const { x: xPos, y: yPos } = position
  return <rect className={`fill-${colorIndex}`} width="1" height="1" x={xPos} y={yPos} />
}

// ======================================================================== Component: PlanetariumBackground

function PlanetariumBackground() {
  // Get pixel dimensions
  const screenDimensions: XY = { x: screen.width, y: screen.height }
  const pixelDimensions: XY = { x: screenDimensions.x / pixelSize, y: screenDimensions.y / pixelSize }

  // Use state for stars
  const [stars, setStars] = useState<PixelStarProps[]>([])

  // Setup stars if pixelDimensions changes
  useEffect(() => {
    const areaRatio = (pixelDimensions.x * pixelDimensions.y) / 10000
    const numStars = Math.floor(20 * areaRatio)

    // Populate star props arrays
    const starsTemp: PixelStarProps[] = [...Array(numStars).keys()].map(() => ({
      position: getRandomPixelPosition(pixelDimensions),
      colorIndex: getRandomInt(numColors),
    }))
    setStars(starsTemp)
  }, [pixelDimensions.x, pixelDimensions.y])

  const style = {
    height: screenDimensions.y + 'px',
    width: screenDimensions.x + 'px',
  }

  return (
    <svg
      id="planetarium-background"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${pixelDimensions.x} ${pixelDimensions.y}`}
      style={style}>
      {stars.map((starProps, i) => (
        <PixelStar key={i} {...starProps} />
      ))}
    </svg>
  )
}

export default PlanetariumBackground

function getRandomPixelPosition(pixelDimensions: XY): XY {
  return {
    x: Math.floor(Math.random() * (pixelDimensions.x - 1)),
    y: Math.floor(Math.random() * (pixelDimensions.y - 1)),
  }
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max)
}
