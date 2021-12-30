import { useEffect, useState } from 'react'
import { XY } from '../../common'
import { PixelLetterData, textPixelSize, timing, Z, A, C, K, space, H, E, N, G } from './letters.common'
import { PixelLetter, PixelLetterProps } from './PixelLetter'
import '../../../css/pixels/letters.scss'

// ================== Component: Helpers

const letterArray: PixelLetterData[] = [Z, A, C, K, space, C, H, E, N, G]
const textX = letterArray.reduce((acc, curr) => (acc += curr.width), 0) + letterArray.length - 1
const textY = 5

const pixelPadding = { x: 2, y: 2 }

// ================== Component: PixelLetterField

type PixelLetterFieldProps = {
  windowDimensions: XY
  callback: () => void
}

function PixelLetterField({ windowDimensions, callback }: PixelLetterFieldProps) {
  // Keep track of largest dimensions seen so far
  const [largestWD, setLargestWD] = useState<XY>(windowDimensions)
  // Possibly change largestWD if windowDimensions change
  useEffect(() => {
    if (windowDimensions.x > largestWD.x || windowDimensions.y > largestWD.y) {
      setLargestWD({
        x: Math.max(largestWD.x, windowDimensions.x),
        y: Math.max(largestWD.y, windowDimensions.y),
      })
    }
  }, [windowDimensions])

  // Keep track of own animation state
  const [className, setClassName] = useState('before')
  // Animation state changes on click
  function onClick() {
    setClassName('during')
    setTimeout(() => {
      setClassName('after')
    }, timing.starShiftDuration * 1000)
    setTimeout(() => {
      callback()
    }, (timing.starShiftDuration + timing.textShiftDuration) * 1000)
  }

  // Get text pixel dimensions
  const { x: xDim, y: yDim } = largestWD
  const textPixelDimensions: XY =
    className === 'after'
      ? { x: textX + 2 * pixelPadding.x, y: textY + 2 * pixelPadding.x }
      : { x: Math.floor(xDim / textPixelSize), y: Math.floor(yDim / textPixelSize) }

  // Use state for letters
  const [letters, setLetters] = useState<PixelLetterProps[]>([])
  // Setup letters if textPixelDimensions changes
  useEffect(() => {
    const baseXOffset = textPixelDimensions.x / 2 - textX / 2
    const baseYOffset = textPixelDimensions.y / 2 - textY / 2

    // Populate letter prop arrays
    const lettersTemp: PixelLetterProps[] = []
    let xOffsetAccumulator = 0
    for (let i = 0; i < letterArray.length; i++) {
      const letter = letterArray[i]
      lettersTemp.push({
        data: letter.data,
        // Subsequent information no longer necessary once it becomes text
        offset: { x: xOffsetAccumulator + baseXOffset, y: baseYOffset },
        textPixelDimensions: textPixelDimensions,
        letterDelay: (i / (letterArray.length - 1) - 1) * timing.maxLetterDelay,
      })
      xOffsetAccumulator += letter.width + 1
    }
    setLetters(lettersTemp)
  }, [textPixelDimensions.x, textPixelDimensions.y])

  const divStyle = { height: yDim, width: xDim }
  const svgStyle =
    className === 'after'
      ? { height: textPixelDimensions.y * textPixelSize, width: textPixelDimensions.x * textPixelSize }
      : divStyle
  const otherSvgStyle = { '--svg-transition': `${timing.textShiftDuration}s cubic-bezier(.3,0,.22,1)` }

  return (
    <div id="letters-div" style={divStyle}>
      <svg
        id="letters-svg"
        className={className}
        onClick={className === 'before' ? onClick : undefined}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${textPixelDimensions.x} ${textPixelDimensions.y}`}
        style={{ ...svgStyle, ...otherSvgStyle }}>
        {letters.map((letterProps, i) => (
          <PixelLetter key={i} {...letterProps} />
        ))}
      </svg>
    </div>
  )
}

export default PixelLetterField
