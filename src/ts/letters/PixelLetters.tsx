import React, { useEffect, useState } from 'react'
import { XY } from '../common'
import '../../css/letters.scss'
import { PixelLetterData, Z, A, C, K, space, H, E, N, G } from './PixelLetterData'

const pixSize = 5
const pixelSize = 5
const starPixSizeModifier = 0.6
const starPixMargin = 1

const timing = {
  starShiftDuration: 3.25,
  textShiftDuration: 1.75,
  getStarShiftDelay: () => {
    if (Math.random() < 0.1) {
      return 0
    }
    const roll1 = Math.random()
    const roll2 = Math.random()
    const roll3 = Math.random()
    return (roll1 + roll2 + roll3 - Math.min(roll1, roll2, roll3)) / 2
  },
}

// Stars

const colors = [
  '#f0e5bb', // yellow
  '#fcedb3', // yellow
  '#fabb93', // orange
  '#d16a45', // orange-red
  '#cf5a4a', // red
  '#5992e3', // blue
  '#c7deff', // white-blue
  '#f0bbde', // pink
]
function selectRandomColor() {
  const roll = Math.random()
  if (roll > 0.5) {
    return '#ffffff'
  }
  return colors[(roll * 2 * colors.length) >> 0]
}
function getRandomStarPos(h: number, w: number) {
  return [
    ((Math.random() - 0.5) / starPixSizeModifier + 0.5) * w + starPixMargin,
    ((Math.random() - 0.5) / starPixSizeModifier + 0.5) * h + starPixMargin,
  ]
}

// Components

type XYDimensions = { x: number; y: number }

function Pixel({ xy, pixDimensions }: { xy: number[]; pixDimensions: XYDimensions }) {
  const [x, y] = xy
  let { x: pixWidth, y: pixHeight } = pixDimensions
  pixHeight -= 2 * starPixMargin + 1
  pixWidth -= 2 * starPixMargin + 1

  const [starPosX, starPosY] = getRandomStarPos(pixHeight, pixWidth)
  const starOffsetX = (starPosX - x) * starPixSizeModifier,
    starOffsetY = (starPosY - y) * starPixSizeModifier

  const delay = timing.getStarShiftDelay()
  const transitionTime = timing.starShiftDuration - delay

  const style = {
    '--pix-transition': `${transitionTime}s cubic-bezier(0.7, 0, 0.3, 1) ${delay}s`,
    '--pix-fill': selectRandomColor(),
    '--pix-transform': `translate(${starOffsetX}px, ${starOffsetY}px) scale(${starPixSizeModifier})`,
  } as React.CSSProperties

  return <rect id={`${x},${y}`} className="letter-rect" width="1" height="1" x={x} y={y} style={style} />
}

type PixelLetterSVGFragmentProps = {
  data: PixelLetterData['data']
  xyOffset: XYDimensions
  pixDimensions: XYDimensions
}

function PixelLetterSVGFragment({ data, xyOffset, pixDimensions }: PixelLetterSVGFragmentProps) {
  const { x: xOff, y: yOff } = xyOffset
  return (
    <>
      {data.map(({ x, y }, i) => (
        <Pixel key={i} xy={[x + xOff, y + yOff]} pixDimensions={pixDimensions} />
      ))}
    </>
  )
}

function propsAreEqual(
  prevProps: PixelLetterSVGFragmentProps,
  nextProps: PixelLetterSVGFragmentProps
): boolean {
  // Ignore "data" field... it's not gonna change. Just look at xyOffset and pixDimensions
  return (
    prevProps.xyOffset.x === nextProps.xyOffset.x &&
    prevProps.xyOffset.y === nextProps.xyOffset.y &&
    prevProps.pixDimensions.x === nextProps.pixDimensions.x &&
    prevProps.pixDimensions.y === nextProps.pixDimensions.y
  )
}
const PixelLetterSVGFragmentMemoized = React.memo(PixelLetterSVGFragment, propsAreEqual)

const letterArray: PixelLetterData[] = [Z, A, C, K, space, C, H, E, N, G]
const textX = letterArray.reduce((acc, curr) => (acc += curr.width), 0) + letterArray.length - 1
const textY = 5

type PixelLettersProps = { windowDimensions: XY }

function PixelLetters({ windowDimensions }: PixelLettersProps) {
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
  }

  // Get pixel dimensions
  const { x: xDim, y: yDim } = largestWD
  const pixelDimensions: XY =
    className === 'after'
      ? { x: textX, y: textY }
      : { x: Math.floor(xDim / pixelSize), y: Math.floor(yDim / pixelSize) }

  // Use state for letters
  const [letters, setLetters] = useState<PixelLetterSVGFragmentProps[]>([])
  // Setup letters if pixelDimensions changes
  useEffect(() => {
    const baseXOffset = pixelDimensions.x / 2 - textX / 2
    const baseYOffset = pixelDimensions.y / 2 - textY / 2

    // Populate letter prop arrays
    const lettersTemp: PixelLetterSVGFragmentProps[] = []
    let xOffsetAccumulator = 0
    for (let i = 0; i < letterArray.length; i++) {
      const letter = letterArray[i]
      lettersTemp.push({
        data: letter.data,
        // Subsequent information no longer necessary once it becomes text
        xyOffset: { x: xOffsetAccumulator + baseXOffset, y: baseYOffset },
        pixDimensions: pixelDimensions,
      })
      xOffsetAccumulator += letter.width + 1
    }
    setLetters(lettersTemp)
  }, [pixelDimensions.x, pixelDimensions.y])

  const divStyle = { height: yDim, width: xDim }
  const svgStyle = className === 'after' ? { height: textY * pixSize, width: textX * pixSize } : divStyle
  const otherSvgStyle = { '--svg-transition': `${timing.textShiftDuration}s cubic-bezier(.3,0,.22,1)` }

  return (
    <div id="letters-div" style={divStyle}>
      <svg
        id="letters-svg"
        className={className}
        onClick={className === 'before' ? onClick : undefined}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${pixelDimensions.x} ${pixelDimensions.y}`}
        style={{ ...svgStyle, ...otherSvgStyle }}>
        {letters.map((letterProps, i) => (
          <PixelLetterSVGFragmentMemoized key={i} {...letterProps} />
        ))}
      </svg>
    </div>
  )
}

export default PixelLetters
