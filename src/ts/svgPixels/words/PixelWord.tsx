import { useEffect, useState } from 'react'
import { XY } from '../common'
import { PixelLetter, PixelLetterProps } from './PixelLetter'
import { PixelLetterData } from './PixelLetterData'

type PixelWordProps = {
  pixelDimensions: XY
  word: PixelLetterData[]
  scale: XY
}

export function PixelWord({ pixelDimensions, word, scale }: PixelWordProps) {
  const [letters, setLetters] = useState<Omit<PixelLetterProps, 'scale' | 'pixelDimensions'>[]>([])

  const pixelWordStyle = {
    '--duration': '1s',
    '--delay': '1s',
    '--transform-to': 'translate(0)',
    '--fill-to': 'gold',
  } as React.CSSProperties

  useEffect(() => {
    const { x: xDim, y: yDim } = pixelDimensions
    const { x: xScl, y: yScl } = scale

    const textX = (word.reduce((acc, curr) => (acc += curr.width), 0) + word.length - 1) * xScl
    const textY = 5 * yScl

    const baseXOffset = (xDim / 2 - textX / 2) * xScl
    const baseYOffset = (yDim / 2 - textY / 2) * yScl

    const lettersTemp: Omit<PixelLetterProps, 'scale' | 'pixelDimensions'>[] = []
    let xOffsetAccumulator = 0
    for (let i = 0; i < word.length; i++) {
      lettersTemp.push({
        data: word[i],
        offset: { x: xOffsetAccumulator + baseXOffset, y: baseYOffset },
      })
      xOffsetAccumulator += (word[i].width + 1) * xScl * xScl
    }
    setLetters(lettersTemp)
  }, [pixelDimensions, word])

  return (
    <g className="word-group" style={pixelWordStyle}>
      {letters.map((letterProps, i) => (
        <PixelLetter key={i} {...letterProps} scale={scale} pixelDimensions={pixelDimensions} />
      ))}
    </g>
  )
}
