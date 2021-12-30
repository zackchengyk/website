import { useEffect, useState } from 'react'
import { XY } from '../../common'
import { PixelAnimStarProps, PixelAnimStar } from './PixelAnimStar'
import { PixelStar, PixelStarProps } from './PixelStar'
import { getRandomColor, pixelSize } from '../pixels.common'
import '../../../css/pixels/stars.scss'

// ================== Helpers

let count = 0
let layer = 1
function getRandomStarPosition(pixelDimensions: XY): XY {
  if (count >= pixelDimensions.x) {
    count = 0
    layer += 2
  }
  count += layer
  const x = count
  const y = (x % 2) - layer + Math.floor(1 * (pixelDimensions.y - 56))
  return {
    x: x,
    y: y,
  }
}

// ================== Component: PixelStarField

type PixelStarFieldProps = { windowDimensions: XY }

function PixelStarField({ windowDimensions }: PixelStarFieldProps) {
  // Keep track of largest dimensions seen so far
  const [largestWD, setLargestWD] = useState<XY>(windowDimensions)
  // Possibly change largestWD if windowDimensions change
  useEffect(() => {
    if (windowDimensions.x > largestWD.x || windowDimensions.y > largestWD.y) {
      setLargestWD({
        x: Math.max(largestWD.x, windowDimensions.x),
        y: Math.max(largestWD.y, windowDimensions.y),
      })
    }
  }, [windowDimensions])

  // Get pixel dimensions
  const { x: xDim, y: yDim } = largestWD
  const pixelDimensions: XY = { x: Math.floor(xDim / pixelSize), y: Math.floor(yDim / pixelSize) }

  // Use state for stars
  const [animStars, setAnimStars] = useState<PixelAnimStarProps[]>([])
  const [stars, setStars] = useState<PixelStarProps[]>([])
  // Setup stars if pixelDimensions changes
  useEffect(() => {
    const areaRatio = (pixelDimensions.x * pixelDimensions.y) / 10000
    const numAnimStars = Math.floor(0 * areaRatio)
    const numStars = Math.floor(160 * areaRatio)

    // Populate star props arrays
    const animStarsTemp: PixelAnimStarProps[] = [...Array(numAnimStars).keys()].map(() => ({
      position: getRandomStarPosition(pixelDimensions),
      color: getRandomColor(),
    }))
    setAnimStars(animStarsTemp)
    const starsTemp: PixelStarProps[] = [...Array(numStars).keys()].map(() => ({
      position: getRandomStarPosition(pixelDimensions),
      color: getRandomColor(),
    }))
    setStars(starsTemp)
  }, [pixelDimensions.x, pixelDimensions.y])

  const style = {
    height: largestWD.y + 'px',
    width: largestWD.x + 'px',
  }

  return (
    <div id="stars-div" style={style}>
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

export default PixelStarField
