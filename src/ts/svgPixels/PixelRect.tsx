import React from 'react'
import { XY, xyEqual } from './types'

type PixelRectProps = {
  extraClass: string
  position: XY
  scale: XY
  color: string
}

function _PixelRect({ extraClass, position, scale, color }: PixelRectProps) {
  const { x: xPos, y: yPos } = position
  const { x: xScl, y: yScl } = scale

  const transformX = xPos / xScl
  const transformY = yPos / yScl

  const style = {
    transform: `translate(${transformX}px, ${transformY}px) scale(${xScl}, ${yScl})`,
    fill: color,
  }

  return (
    <rect
      id={`${xPos},${yPos}`}
      className={'pixel ' + extraClass}
      width="1"
      height="1"
      x="0"
      y="0"
      style={style}
    />
  )
}

function pixelRectPropsAreEqual(prevProps: PixelRectProps, nextProps: PixelRectProps): boolean {
  return (
    xyEqual(prevProps.position, nextProps.position) &&
    xyEqual(prevProps.scale, nextProps.scale) &&
    prevProps.color === nextProps.color
  )
}
const PixelRect = React.memo(_PixelRect, pixelRectPropsAreEqual)

export default PixelRect
