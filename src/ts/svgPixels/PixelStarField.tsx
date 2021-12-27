import { useEffect, useState } from 'react'
import { XY } from './types'
import { PixelAnimStarProps, PixelAnimStar } from './PixelAnimStar'
import { PixelStar, PixelStarProps } from './PixelStar'

// Helper functions

const colors = [
  '#f0e5bb', // yellow
  '#fcedb3', // yellow
  '#fabb93', // orange
  '#d16a45', // orange-red
  '#cf5a4a', // red
  '#5992e3', // blue
  '#c7deff', // white-blue
  '#f0bbde', // pink
]
function selectRandomColor(): string {
  const roll = Math.random()
  if (roll > 0.5) {
    return '#ffffff'
  }
  return colors[(roll * 2 * colors.length) >> 0]
}

function getAnimStarPosition(pixelDimensions: XY): XY {
  // Modify distribution to favour edges of screen using quad ease-in-out
  function randomFunction(): number {
    const x = Math.random()
    if (x < 0.5) {
      return 2 * x * x
    }
    return 1 - Math.pow(-2 * x + 2, 2) / 2
  }

  return {
    x: Math.round(randomFunction() * pixelDimensions.x),
    y: Math.round(randomFunction() * pixelDimensions.y),
  }
}

type PixelStarFieldProps = {
  pixelDimensions: XY
}

export function PixelStarField({ pixelDimensions }: PixelStarFieldProps) {
  const [animStars, setAnimStars] = useState<PixelAnimStarProps[]>([])
  const [stars, setStars] = useState<PixelStarProps[]>([])

  const numAnimStars = 20
  const numStars = 40

  useEffect(() => {
    const { x: xDim, y: yDim } = pixelDimensions

    const animStarsTemp: PixelAnimStarProps[] = [...Array(numAnimStars).keys()].map(() => ({
      position: getAnimStarPosition(pixelDimensions),
      color: selectRandomColor(),
      scale: { x: 1, y: 1 },
      offsetFrac: Math.random(),
    }))
    setAnimStars(animStarsTemp)

    const starsTemp: PixelStarProps[] = [...Array(numStars).keys()].map(() => ({
      position: {
        x: Math.round(Math.random() * xDim),
        y: Math.round(Math.random() * yDim),
      },
      color: selectRandomColor(),
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
