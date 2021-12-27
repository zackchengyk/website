import { useEffect, useState } from 'react'
import { XY } from './types'
import { PixelAnimStarProps, PixelAnimStar } from './PixelAnimStar'

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
function selectRandomColor() {
  const roll = Math.random()
  if (roll > 0.5) {
    return '#ffffff'
  }
  return colors[(roll * 2 * colors.length) >> 0]
}

type PixelStarFieldProps = {
  pixelDimensions: XY
}

export function PixelStarField({ pixelDimensions }: PixelStarFieldProps) {
  const [stars, setStars] = useState<PixelAnimStarProps[]>([])

  const numStars = 30

  useEffect(() => {
    const { x: xDim, y: yDim } = pixelDimensions
    const numTemp: number[] = [...Array(numStars).keys()]

    const starsTemp: PixelStarProps[] = numTemp.map(() => ({
      position: {
        x: Math.round(Math.random() * xDim),
        y: Math.round(Math.random() * yDim),
      },
      color: selectRandomColor(),
      scale: { x: 1, y: 1 },
      offsetFrac: Math.random(),
    }))
    setStars(starsTemp)
  }, [pixelDimensions])

  return (
    <>
      {stars.map((starProps, i) => (
        <PixelAnimStar key={i} {...starProps} />
      ))}
    </>
  )
}
