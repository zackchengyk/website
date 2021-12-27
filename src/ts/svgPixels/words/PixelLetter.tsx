import { getRandomColor, XY } from '../common'
import { PixelLetterData } from './PixelLetterData'
import PixelRect from '../PixelRect'
import '../../../css/PixelLetter.scss'

export type PixelLetterProps = {
  offset: XY
  data: PixelLetterData
  scale: XY
  pixelDimensions: XY
}

export function PixelLetter({ offset, data, scale, pixelDimensions }: PixelLetterProps) {
  const { x: xOff, y: yOff } = offset
  const { x: xScl, y: yScl } = scale
  let { x: xDim, y: yDim } = pixelDimensions

  function getDisplacement(): XY {
    return {
      x: Math.floor(Math.random() * xDim),
      y: Math.floor(Math.random() * yDim),
    }
  }

  return (
    <g className="letter-group">
      {data.positions.map(({ x, y }, i) => {
        const xPos = x * xScl * xScl + xOff
        const yPos = y * yScl * yScl + yOff

        const displacement = getDisplacement()

        const extraStyle = {
          '--fill-from': getRandomColor(),
          '--transform-from': `translate(${displacement.x - xPos}px, ${displacement.y - yPos}px)`,
        } as React.CSSProperties

        return (
          <PixelRect
            key={i}
            position={{ x: xPos, y: yPos }}
            scale={scale}
            color={''}
            extraStyle={extraStyle}
          />
        )
      })}
    </g>
  )
}
