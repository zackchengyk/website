import React, { useEffect, useState } from 'react'
import PixelRect from './PixelRect'
import { XY } from './types'
import '../../css/PixelStarField.scss'

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

type PixelStarProps = {
  position: XY
  color: string
  scale: XY
  offsetFrac: number
}

function PixelStar({ position, color, scale, offsetFrac }: PixelStarProps) {
  const duration = 2.5

  const { x: xPos, y: yPos } = position
  const { x: xScl, y: yScl } = scale
  const x1 = xScl * xScl
  const y1 = yScl * yScl

  const style = {
    '--duration': duration + 's',
    '--first-delay': duration * -offsetFrac + 's',
    '--second-delay': duration * (-offsetFrac + 0.6) + 's',
    '--third-delay': duration * (-offsetFrac + 0.8) + 's',
  } as React.CSSProperties

  return (
    <>
      <g className="star-group" style={style}>
        <PixelRect extraClass="first" position={position} scale={scale} color={color} />
        <PixelRect extraClass="second" position={{ x: xPos - x1, y: yPos }} scale={scale} color={color} />
        <PixelRect extraClass="second" position={{ x: xPos, y: yPos - y1 }} scale={scale} color={color} />
        <PixelRect extraClass="second" position={{ x: xPos, y: yPos + y1 }} scale={scale} color={color} />
        <PixelRect extraClass="second" position={{ x: xPos + x1, y: yPos }} scale={scale} color={color} />
        <PixelRect extraClass="third" position={{ x: xPos - 2 * x1, y: yPos }} scale={scale} color={color} />
        <PixelRect extraClass="third" position={{ x: xPos, y: yPos - 2 * y1 }} scale={scale} color={color} />
        <PixelRect extraClass="third" position={{ x: xPos, y: yPos + 2 * y1 }} scale={scale} color={color} />
        <PixelRect extraClass="third" position={{ x: xPos + 2 * x1, y: yPos }} scale={scale} color={color} />
      </g>
    </>
  )
}

type PixelStarFieldProps = {
  pixelDimensions: XY
}

function PixelStarField({ pixelDimensions }: PixelStarFieldProps) {
  const [stars, setStars] = useState<PixelStarProps[]>([])

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
        <PixelStar key={i} {...starProps} />
      ))}
    </>
  )
}

export default PixelStarField
