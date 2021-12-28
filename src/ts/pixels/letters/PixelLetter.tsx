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
}

function PixelRect({ textPosition, starPosition }: PixelRectProps) {
  const { x: xTextPos, y: yTextPos } = textPosition
  const { x: xStarPos, y: yStarPos } = starPosition

  const xTransform = (xStarPos - xTextPos) * starPixSizeModifier,
    yTransform = (yStarPos - yTextPos) * starPixSizeModifier

  const delay = timing.getStarShiftDelay()
  const transitionTime = timing.starShiftDuration - delay

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
}

function _PixelLetter({ data, offset, pixelDimensions }: PixelLetterProps) {
  const { x: xOff, y: yOff } = offset
  return (
    <>
      {data.map(({ x, y }, i) => (
        <PixelRect
          key={i}
          textPosition={{ x: x + xOff, y: y + yOff }}
          starPosition={getRandomPosition(pixelDimensions)}
        />
      ))}
    </>
  )
}

function pixelLetterPropsAreEqual(prevProps: PixelLetterProps, nextProps: PixelLetterProps): boolean {
  // Ignore "data" field... it's not gonna change. Just look at xyOffset and pixDimensions
  return (
    xyEqual(prevProps.offset, nextProps.offset) &&
    xyEqual(prevProps.pixelDimensions, nextProps.pixelDimensions)
  )
}

export const PixelLetter = React.memo(_PixelLetter, pixelLetterPropsAreEqual)
