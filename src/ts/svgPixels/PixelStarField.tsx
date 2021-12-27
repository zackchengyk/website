import React, { useEffect, useState } from 'react'
import PixelRect from './PixelRect'
import { XY } from './types'
import '../../css/PixelStarField.scss'

type PixelStarProps = {
  position: XY
  color: string
  offsetFrac: number
}

function PixelStar({ position, color, offsetFrac }: PixelStarProps) {
  const scale = { x: 1, y: 1 }
  const duration = 3
  const offset = duration * offsetFrac

  const { x: xPos, y: yPos } = position
  const style = {
    '--duration': duration + 's',
    '--first-delay': duration * offsetFrac + 's',
    '--second-delay': duration * (offsetFrac + 0.6) + 's',
    '--third-delay': duration * (offsetFrac + 0.8) + 's',
  } as React.CSSProperties

  return (
    <>
      <g className="star-group" style={style}>
        <PixelRect extraClass="first" position={position} scale={scale} color={color} />
        <PixelRect extraClass="second" position={{ x: xPos - 1, y: yPos }} scale={scale} color={color} />
        <PixelRect extraClass="second" position={{ x: xPos, y: yPos - 1 }} scale={scale} color={color} />
        <PixelRect extraClass="second" position={{ x: xPos, y: yPos + 1 }} scale={scale} color={color} />
        <PixelRect extraClass="second" position={{ x: xPos + 1, y: yPos }} scale={scale} color={color} />
        <PixelRect extraClass="third" position={{ x: xPos - 2, y: yPos }} scale={scale} color={color} />
        <PixelRect extraClass="third" position={{ x: xPos, y: yPos - 2 }} scale={scale} color={color} />
        <PixelRect extraClass="third" position={{ x: xPos, y: yPos + 2 }} scale={scale} color={color} />
        <PixelRect extraClass="third" position={{ x: xPos + 2, y: yPos }} scale={scale} color={color} />
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
      color: 'white',
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
