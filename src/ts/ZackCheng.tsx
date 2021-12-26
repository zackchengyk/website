import { useState } from 'react'
import '../css/ZackCheng.scss'
import { PixelLetter, Z, A, C, K, space, H, E, N, G } from './PixelLetter.type'
import useWindowDimensions from './useWindowDimensions'

const starPixMargin = 0

const timing = {
  overallDuration: 4,
  getDelay: () => Math.max(Math.random(), Math.random()),
}

function Pixel({ xy, svgDimensions }: { xy: number[]; svgDimensions: number[] }) {
  const [x, y] = xy
  let [pixHeight, pixWidth] = svgDimensions
  pixHeight -= 2 * starPixMargin
  pixWidth -= 2 * starPixMargin

  const starPosX = Math.floor(Math.random() * pixWidth) + starPixMargin,
    starPosY = Math.floor(Math.random() * pixHeight) + starPixMargin
  const starOffsetX = starPosX - x,
    starOffsetY = starPosY - y

  const delay = timing.getDelay()
  const transitionTime = timing.overallDuration - delay
  // setTimeout(() => setIsStar(false), delay * 1000)

  const style = {
    transition: `transform ${transitionTime}s cubic-bezier(0.7, 0, 0.3, 1) ${delay}s`,
    '--star-transform': `translate(${starOffsetX}px, ${starOffsetY}px)`,
  } as React.CSSProperties

  return <rect id={`${x},${y}`} className="pixel" width="1" height="1" x={x} y={y} style={style} />
}

function PixelLetterSVGFragment({
  xyOffset,
  data,
  svgDimensions,
}: {
  xyOffset: number[]
  data: PixelLetter['data']
  svgDimensions: number[]
}) {
  const [xOff, yOff] = xyOffset
  return (
    <>
      {data.map(({ x, y }, i) => (
        <Pixel key={i} xy={[x + xOff, y + yOff]} svgDimensions={svgDimensions} />
      ))}
    </>
  )
}

function ZackCheng() {
  const pixelSize = 4
  const letterArray: PixelLetter[] = [Z, A, C, K, space, C, H, E, N, G]
  const { height, width } = useWindowDimensions()
  const [className, setClassName] = useState('')

  const pixHeight = height / pixelSize,
    pixWidth = width / pixelSize

  const textXWidth = letterArray.reduce((acc, curr) => (acc += curr.width), 0) + letterArray.length - 1
  console.log(textXWidth)
  const baseYOffset = pixHeight / 2 - 2.5,
    baseXOffset = pixWidth / 2 - textXWidth / 2

  const svgFragment: any[] = []
  let xOffsetAccumulator = 0
  for (let i = 0; i < letterArray.length; i++) {
    const letter = letterArray[i]
    svgFragment.push(
      <PixelLetterSVGFragment
        key={i}
        xyOffset={[xOffsetAccumulator + baseXOffset, baseYOffset]}
        data={letter.data}
        svgDimensions={[pixHeight, pixWidth]}
      />
    )
    xOffsetAccumulator += letter.width + 1
  }

  setTimeout(() => setClassName('start-animation'), 0) // todo

  return (
    <div id="ZackCheng">
      <svg
        id="ZackCheng-svg"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${pixWidth} ${pixHeight}`}>
        {svgFragment}
      </svg>
    </div>
  )
}

export default ZackCheng
