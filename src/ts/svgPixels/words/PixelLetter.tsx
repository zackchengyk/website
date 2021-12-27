import { getRandomColor, XY } from '../common'
import { PixelLetterData } from './PixelLetterData'
import PixelRect from '../PixelRect'
import '../../../css/PixelLetter.scss'
import { useEffect, useState } from 'react'

export type PixelLetterProps = {
  offset: XY
  data: PixelLetterData
  pixelDimensions: XY
  endScale: number
}

export function PixelLetter({ offset, data, endScale, pixelDimensions }: PixelLetterProps) {
  const { x: xOff, y: yOff } = offset
  let { x: xDim, y: yDim } = pixelDimensions

  const [rects, setRects] = useState<any[]>([])

  function getDisplacement(): XY {
    return {
      x: Math.floor(Math.random() * xDim),
      y: Math.floor(Math.random() * yDim),
    }
  }

  useEffect(() => {
    console.log(xOff)
    const rectsTemp: any[] = []
    for (let i = 0; i < data.positions.length; i++) {
      const xPos = data.positions[i].x * endScale + xOff
      const yPos = data.positions[i].y * endScale + yOff
      const displacement = getDisplacement()

      const style = {
        '--pixel-fill-from': getRandomColor(),
        '--pixel-fill-to': 'gold',
        '--pixel-transform-from': `translate(${displacement.x}px, ${displacement.y}px)`,
        '--pixel-transform-to': `translate(${xPos}px, ${yPos}px) scale(${endScale})`,
      } as React.CSSProperties

      rectsTemp.push({
        style: style,
      })
    }
    setRects(rectsTemp)
  }, [data, pixelDimensions])

  return (
    <g className="letter-group">
      {rects.map((rectProps, i) => (
        <rect key={i} {...rectProps} className={'pixel'} width="1" height="1" x="0" y="0" />
      ))}
    </g>
  )
}
