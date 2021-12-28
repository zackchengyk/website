import { PixelStar } from './PixelStar'
import { XY, xyEqual } from '../../common'
import React from 'react'

// ================== Helpers

const offsets = [
  'frame-0',
  'frame-1',
  'frame-2',
  'frame-3',
  'frame-4',
  'frame-5',
  'frame-6',
  'frame-7',
  'frame-8',
  'frame-9',
]

// ================== Component: PixelAnimStar

export type PixelAnimStarProps = {
  position: XY
  color: string
}

export function _PixelAnimStar({ position, color }: PixelAnimStarProps) {
  const { x: xPos, y: yPos } = position

  const i = (Math.random() * offsets.length) >> 0
  const frameA = offsets[i]
  const frameB = offsets[(i + offsets.length - 2) % offsets.length]
  const frameC = offsets[(i + offsets.length - 1) % offsets.length]

  return (
    <g className="anim-star-group">
      <PixelStar extraClass={`core ${frameA}`} position={position} color={color} />
      <PixelStar extraClass={`splash ${frameB}`} position={{ x: xPos - 2, y: yPos }} color={color} />
      <PixelStar extraClass={`splash ${frameB}`} position={{ x: xPos, y: yPos - 2 }} color={color} />
      <PixelStar extraClass={`splash ${frameB}`} position={{ x: xPos, y: yPos + 2 }} color={color} />
      <PixelStar extraClass={`splash ${frameB}`} position={{ x: xPos + 2, y: yPos }} color={color} />
      <PixelStar extraClass={`splash ${frameC}`} position={{ x: xPos - 4, y: yPos }} color={color} />
      <PixelStar extraClass={`splash ${frameC}`} position={{ x: xPos, y: yPos - 4 }} color={color} />
      <PixelStar extraClass={`splash ${frameC}`} position={{ x: xPos, y: yPos + 4 }} color={color} />
      <PixelStar extraClass={`splash ${frameC}`} position={{ x: xPos + 4, y: yPos }} color={color} />
    </g>
  )
}

function pixelAnimStarPropsAreEqual(prevProps: PixelAnimStarProps, nextProps: PixelAnimStarProps): boolean {
  return xyEqual(prevProps.position, nextProps.position) && prevProps.color === nextProps.color
}

export const PixelAnimStar = React.memo(_PixelAnimStar, pixelAnimStarPropsAreEqual)
