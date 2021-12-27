import { useEffect, useState } from 'react'
import { getRandomColor, XY } from '../common'
import { PixelAnimStarProps, PixelAnimStar } from './PixelAnimStar'
import { PixelStar, PixelStarProps } from './PixelStar'

// Helper function
function getPositionAvoidingCenter(
  pixelDimensions: XY,
  avoidCenterXFrac: number,
  avoidCenterYFrac: number
): XY {
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
  pixelDimensions: XY
}

export function PixelStarField({ pixelDimensions }: PixelStarFieldProps) {
  const [animStars, setAnimStars] = useState<PixelAnimStarProps[]>([])
  const [stars, setStars] = useState<PixelStarProps[]>([])

  const areaRatio = (pixelDimensions.x * pixelDimensions.y) / 90000
  const numAnimStars = Math.floor(30 * areaRatio)
  const numStars = Math.floor(120 * areaRatio)

  useEffect(() => {
    const animStarsTemp: PixelAnimStarProps[] = [...Array(numAnimStars).keys()].map(() => ({
      position: getPositionAvoidingCenter(pixelDimensions, 0.4, 0.2),
      color: getRandomColor(),
      scale: { x: 1, y: 1 },
      offsetFrac: Math.random(),
    }))
    setAnimStars(animStarsTemp)

    const starsTemp: PixelStarProps[] = [...Array(numStars).keys()].map(() => ({
      position: getPositionAvoidingCenter(pixelDimensions, 0.3, 0.15),
      color: getRandomColor(),
      scale: { x: 1, y: 1 },
    }))
    setStars(starsTemp)
  }, [pixelDimensions])

  return (
    <>
      {animStars.map((starProps, i) => (
        <PixelAnimStar key={i} {...starProps} />
      ))}
      {stars.map((starProps, i) => (
        <PixelStar key={i} {...starProps} />
      ))}
    </>
  )
}
