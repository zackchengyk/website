import React from 'react'
import { PixelStar } from './PixelStar'
import { XY } from '../common'

export type PixelAnimStarProps = {
  position: XY
  color: string
  offsetFrac: number
}

export function PixelAnimStar({ position, color, offsetFrac }: PixelAnimStarProps) {
  const duration = 2.5

  const { x: xPos, y: yPos } = position

  const style = {
    '--duration': duration + 's',
    '--first-delay': duration * -offsetFrac + 's',
    '--second-delay': duration * (-offsetFrac + 0.6) + 's',
    '--third-delay': duration * (-offsetFrac + 0.8) + 's',
  } as React.CSSProperties

  return (
    <>
      <g className="anim-star-group" style={style}>
        <PixelStar extraClass="first" position={position} color={color} />
        <PixelStar extraClass="second" position={{ x: xPos - 1, y: yPos }} color={color} />
        <PixelStar extraClass="second" position={{ x: xPos, y: yPos - 1 }} color={color} />
        <PixelStar extraClass="second" position={{ x: xPos, y: yPos + 1 }} color={color} />
        <PixelStar extraClass="second" position={{ x: xPos + 1, y: yPos }} color={color} />
        <PixelStar extraClass="third" position={{ x: xPos - 2, y: yPos }} color={color} />
        <PixelStar extraClass="third" position={{ x: xPos, y: yPos - 2 }} color={color} />
        <PixelStar extraClass="third" position={{ x: xPos, y: yPos + 2 }} color={color} />
        <PixelStar extraClass="third" position={{ x: xPos + 2, y: yPos }} color={color} />
      </g>
    </>
  )
}
