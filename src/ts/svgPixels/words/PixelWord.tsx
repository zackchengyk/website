import { useEffect, useState } from 'react'
import { XY } from '../common'
import { PixelLetter, PixelLetterProps } from './PixelLetter'
import { PixelLetterData } from './PixelLetterData'

const timing = {
  duration: 1,
  delay: 1,
}

type PixelWordProps = {
  pixelDimensions: XY
  word: PixelLetterData[]
}

export function PixelWord({ pixelDimensions, word }: PixelWordProps) {
  const { x: xDim, y: yDim } = pixelDimensions

  const [letters, setLetters] = useState<Omit<PixelLetterProps, 'endScale' | 'pixelDimensions'>[]>([])
  const [extraClassName, setExtraClassName] = useState<string>('stars')

  const textX = word.reduce((acc, curr) => (acc += curr.width), 0) + word.length - 1
  const textY = 5
  const endScale = 2
  const baseXOffset = xDim / 2 - (textX / 2) * endScale
  const baseYOffset = yDim / 2 - (textY / 2) * endScale

  const wordStyle = {
    '--duration': timing.duration + 's',
  } as React.CSSProperties

  useEffect(() => {
    const lettersTemp: Omit<PixelLetterProps, 'endScale' | 'pixelDimensions'>[] = []
    let xOffsetAccumulator = 0
    for (let i = 0; i < word.length; i++) {
      lettersTemp.push({
        data: word[i],
        offset: { x: xOffsetAccumulator + baseXOffset, y: 0 + baseYOffset },
      })
      xOffsetAccumulator += (word[i].width + 1) * endScale
    }
    setLetters(lettersTemp)
  }, [pixelDimensions, word])

  useEffect(() => {
    const startStarToText = () => setExtraClassName('text')
    const timeoutHandle = setTimeout(startStarToText, timing.delay * 1000)
    return () => clearTimeout(timeoutHandle)
  }, [])

  return (
    <g className={'word-group ' + extraClassName} style={wordStyle}>
      {letters.map((letterProps, i) => (
        <PixelLetter key={i} {...letterProps} endScale={endScale} pixelDimensions={pixelDimensions} />
      ))}
    </g>
  )
}
