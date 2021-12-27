import { PixelStarField } from './stars/PixelStarField'
import { XY } from './common'
import { PixelLetterData, Z, A, C, K, space, H, E, N, G } from './words/PixelLetterData'
import { PixelWord } from './words/PixelWord'

const pixelSize = 2

type PixelSVGProps = {
  containerDimensions: XY
}

export function PixelSVG({ containerDimensions }: PixelSVGProps) {
  const { x: xDim, y: yDim } = containerDimensions

  const pixelDimensions: XY = { x: Math.floor(xDim / pixelSize), y: Math.floor(yDim / pixelSize) }

  const style = {
    position: 'fixed',
    inset: '0',
    height: yDim + 'px',
    width: xDim + 'px',
  } as React.CSSProperties

  const word: PixelLetterData[] = [Z, A, C, K, space, C, H, E, N, G]

  return (
    <svg
      id="PixelSVG"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${pixelDimensions.x} ${pixelDimensions.y}`}
      style={style}>
      <PixelWord pixelDimensions={pixelDimensions} word={word} />
      <PixelStarField pixelDimensions={pixelDimensions} />
    </svg>
  )
}
