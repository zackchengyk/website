import PixelRect from './PixelRect'
import { XY } from './types'

export type PixelStarProps = {
  position: XY
  color: string
  scale: XY
}

export function PixelStar({ position, color, scale }: PixelStarProps) {
  return (
    <>
      <g className="star-group">
        <PixelRect position={position} scale={scale} color={color} />
      </g>
    </>
  )
}
