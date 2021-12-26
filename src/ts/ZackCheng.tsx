import React, { useEffect, useState } from 'react'
import '../css/ZackCheng.scss'
import { PixelLetter, Z, A, C, K, space, H, E, N, G } from './PixelLetter.type'
import useWindowDimensions from './useWindowDimensions'

const pixSize = 5
const starPixSizeModifier = 0.6
const starPixMargin = 5

const timing = {
  overallDuration: 2.5,
  getDelay: () => {
    if (Math.random() < 0.1) {
      return 0
    }
    const roll1 = Math.random()
    const roll2 = Math.random()
    const roll3 = Math.random()
    return (2 / 3) * (roll1 + roll2 + roll3 - Math.min(roll1, roll2, roll3))
  },
}

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
  if (Math.random() < 0.6) {
    return 'white'
  }
  return colors[(Math.random() * colors.length) >> 0]
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

  const delay = timing.getDelay()
  const transitionTime = timing.overallDuration - delay

  const style = {
    '--transition-reduced-motion': `0s ${delay}s`,
    '--transition': `${transitionTime}s cubic-bezier(0.7, 0, 0.3, 1) ${delay}s`,
    '--fill': selectRandomColor(),
    '--transform': `translate(${starOffsetX}px, ${starOffsetY}px) scale(${starPixSizeModifier})`,
  } as React.CSSProperties

  return <rect id={`${x},${y}`} className="pixel" width="1" height="1" x={x} y={y} style={style} />
}

function PixelLetterSVGFragment({
  xyOffset,
  data,
  pixDimensions,
}: {
  xyOffset: number[]
  data: PixelLetter['data']
  pixDimensions: XYDimensions
}) {
  const [xOff, yOff] = xyOffset
  return (
    <>
      {data.map(({ x, y }, i) => (
        <Pixel key={i} xy={[x + xOff, y + yOff]} pixDimensions={pixDimensions} />
      ))}
    </>
  )
}

function ZackCheng() {
  const letterArray: PixelLetter[] = [Z, A, C, K, space, C, H, E, N, G]
  const textX = letterArray.reduce((acc, curr) => (acc += curr.width), 0) + letterArray.length - 1
  const textY = 5

  const { height, width } = useWindowDimensions()
  const [className, setClassName] = useState('stars')

  const pixDimensions: XYDimensions =
    className === 'text' ? { x: textX, y: textY } : { x: width / pixSize, y: height / pixSize }
  const style: React.CSSProperties =
    className === 'text' ? { height: textY * pixSize, width: textX * pixSize } : { height, width }
  const otherStyle = { '--transition': 'transform 1.75s cubic-bezier(0.7, 0, 0.3, 1)' } as React.CSSProperties

  const baseXOffset = pixDimensions.x / 2 - textX / 2
  const baseYOffset = pixDimensions.y / 2 - textY / 2

  const svgFragment: any[] = []
  let xOffsetAccumulator = 0
  for (let i = 0; i < letterArray.length; i++) {
    const letter = letterArray[i]
    svgFragment.push(
      <PixelLetterSVGFragment
        key={i}
        xyOffset={[xOffsetAccumulator + baseXOffset, baseYOffset]}
        data={letter.data}
        pixDimensions={pixDimensions}
      />
    )
    xOffsetAccumulator += letter.width + 1
  }

  function onClick() {
    setClassName('coalesce')
    setTimeout(() => {
      setClassName('text')
    }, timing.overallDuration * 1000)
  }

  return (
    <div id="ZackCheng">
      <svg
        id="ZackCheng-svg"
        className={className}
        onClick={className === 'stars' ? onClick : undefined}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${pixDimensions.x} ${pixDimensions.y}`}
        style={{ ...style, ...otherStyle }}>
        {svgFragment}
      </svg>
    </div>
  )
}

export default ZackCheng
