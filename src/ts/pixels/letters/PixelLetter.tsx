import React from 'react'
import { XY, xyEqual } from '../../common'
import { getRandomColor } from '../pixels.common'
import { PixelLetterData, starPixSizeModifier, timing } from './letters.common'

// ================== Helpers

function getRandomPosition(pixelDimensions: XY): XY {
  return {
    x: ((Math.random() - 0.5) / starPixSizeModifier + 0.5) * pixelDimensions.x,
    y: ((Math.random() - 0.5) / starPixSizeModifier + 0.5) * pixelDimensions.y,
  }
}

// ================== Component: PixelRect

type PixelRectProps = {
  textPosition: XY
  starPosition: XY
  letterDelay: number
}

function PixelRect({ textPosition, starPosition, letterDelay }: PixelRectProps) {
  const { x: xTextPos, y: yTextPos } = textPosition
  const { x: xStarPos, y: yStarPos } = starPosition

  const xTransform = (xStarPos - xTextPos) * starPixSizeModifier,
    yTransform = (yStarPos - yTextPos) * starPixSizeModifier

  const delay = timing.getStarShiftDelay() + letterDelay
  const transitionTime = timing.starShiftDuration + letterDelay - delay

  const style = {
    '--letter-rect-transition': `${transitionTime}s cubic-bezier(0.7, 0, 0.3, 1) ${delay}s`,
    '--letter-rect-fill': getRandomColor(),
    '--letter-rect-transform': `translate(${xTransform}px, ${yTransform}px) scale(${starPixSizeModifier})`,
  } as React.CSSProperties

  return (
    <rect
      id={`${xTextPos},${yTextPos}`}
      className="letter-rect"
      width="1"
      height="1"
      x={xTextPos}
      y={yTextPos}
      style={style}
    />
  )
}

// ================== Component: PixelLetter

export type PixelLetterProps = {
  data: PixelLetterData['data']
  offset: XY
  pixelDimensions: XY
  letterDelay: number
}

function _PixelLetter({ data, offset, pixelDimensions, letterDelay }: PixelLetterProps) {
  const { x: xOff, y: yOff } = offset

  return (
    <>
      {data.map(({ x, y }, i) => (
        <PixelRect
          key={i}
          textPosition={{ x: x + xOff, y: y + yOff }}
          starPosition={getRandomPosition(pixelDimensions)}
          letterDelay={letterDelay}
        />
      ))}
    </>
  )
}

function pixelLetterPropsAreEqual(prevProps: PixelLetterProps, nextProps: PixelLetterProps): boolean {
  // Ignore "data" field... it's not gonna change. Just look at xyOffset and pixDimensions
  return (
    xyEqual(prevProps.offset, nextProps.offset) &&
    xyEqual(prevProps.pixelDimensions, nextProps.pixelDimensions) &&
    prevProps.letterDelay === nextProps.letterDelay
  )
}

export const PixelLetter = React.memo(_PixelLetter, pixelLetterPropsAreEqual)
