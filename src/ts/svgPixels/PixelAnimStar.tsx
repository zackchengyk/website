import React from 'react'
import PixelRect from './PixelRect'
import { XY } from './types'
import '../../css/PixelAnimStar.scss'

export type PixelAnimStarProps = {
  position: XY
  color: string
  scale: XY
  offsetFrac: number
}

export function PixelAnimStar({ position, color, scale, offsetFrac }: PixelAnimStarProps) {
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
      <g className="anim-star-group" style={style}>
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
