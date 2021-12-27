import { PixelStarField } from './PixelStarField'
import { XY } from './common'

const pixelSize = 3

type PixelSVGProps = {
  containerDimensions: XY
}

export function PixelSVG({ containerDimensions }: PixelSVGProps) {
  const { x: xDim, y: yDim } = containerDimensions

  const pixelDimensions: XY = { x: Math.floor(xDim / pixelSize), y: Math.floor(yDim / pixelSize) }

  return (
    <svg
      id="PixelSVG"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${pixelDimensions.x} ${pixelDimensions.y}`}
      style={{
        position: 'fixed',
        inset: '0',
        height: yDim + 'px',
        width: xDim + 'px',
      }}>
      <PixelStarField pixelDimensions={pixelDimensions} />
    </svg>
  )
}
