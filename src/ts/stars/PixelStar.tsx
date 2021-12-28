import React from 'react'
import { CSSPropertiesEqual, XY, xyEqual } from '../common'

export type PixelStarProps = {
  position: XY
  color: string
  extraClass?: string
}

function _PixelStar({ position, color, extraClass }: PixelStarProps) {
  const { x: xPos, y: yPos } = position
  return (
    <rect
      id={`${xPos},${yPos}`}
      className={`star-rect fill-${color.slice(1)} ${extraClass}`}
      width="1"
      height="1"
      x={xPos}
      y={yPos}
    />
  )
}

function pixelStarPropsAreEqual(prevProps: PixelStarProps, nextProps: PixelStarProps): boolean {
  return (
    xyEqual(prevProps.position, nextProps.position) &&
    prevProps.color === nextProps.color &&
    prevProps.extraClass === nextProps.extraClass
  )
}

export const PixelStar = React.memo(_PixelStar, pixelStarPropsAreEqual)
