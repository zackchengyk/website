import React from 'react'
import { CSSPropertiesEqual, XY, xyEqual } from '../common'

export type PixelStarProps = {
  position: XY
  color: string
  extraClass?: string
  extraStyle?: React.CSSProperties
}

function _PixelStar({ position, color, extraClass, extraStyle }: PixelStarProps) {
  const { x: xPos, y: yPos } = position

  const style = {
    ...extraStyle,
  } as React.CSSProperties

  return (
    <rect
      id={`${xPos},${yPos}`}
      className={`star-rect fill-${color.slice(1)} ${extraClass}`}
      width="1"
      height="1"
      x={xPos}
      y={yPos}
      style={style}
    />
  )
}

function pixelStarPropsAreEqual(prevProps: PixelStarProps, nextProps: PixelStarProps): boolean {
  return (
    xyEqual(prevProps.position, nextProps.position) &&
    prevProps.color === nextProps.color &&
    prevProps.extraClass === nextProps.extraClass &&
    CSSPropertiesEqual(prevProps.extraStyle, nextProps.extraStyle)
  )
}

export const PixelStar = React.memo(_PixelStar, pixelStarPropsAreEqual)
