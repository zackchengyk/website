import React from 'react'
import { CSSPropertiesEqual, XY, xyEqual } from './common'
import '../../css/PixelRect.scss'

type PixelRectProps = {
  extraClass?: string
  position: XY
  scale?: XY
  color: string
  extraStyle?: React.CSSProperties
}

function _PixelRect({ extraClass, position, color, extraStyle }: PixelRectProps) {
  const { x: xPos, y: yPos } = position
  const { x: xScl, y: yScl } = { x: 1, y: 1 }

  const transformX = xPos / xScl
  const transformY = yPos / yScl

  const style = {
    '--pixel-transform': `translate(${transformX}px, ${transformY}px)`,
    '--pixel-fill': color,
    ...extraStyle,
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
    prevProps.extraClass === nextProps.extraClass &&
    xyEqual(prevProps.position, nextProps.position) &&
    prevProps.color === nextProps.color &&
    CSSPropertiesEqual(prevProps.extraStyle, nextProps.extraStyle)
  )
}
const PixelRect = React.memo(_PixelRect, pixelRectPropsAreEqual)

export default PixelRect
