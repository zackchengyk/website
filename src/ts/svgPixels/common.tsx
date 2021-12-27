import React from 'react'

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
export function getRandomColor(): string {
  const roll = Math.random()
  if (roll > 0.5) {
    return '#ffffff'
  }
  return colors[(roll * 2 * colors.length) >> 0]
}

export type XY = { x: number; y: number }

export function xyEqual(left: XY, right: XY): boolean {
  return left.x === right.x && left.y === right.y
}

export function CSSPropertiesEqual(
  left: React.CSSProperties | undefined,
  right: React.CSSProperties | undefined
): boolean {
  // Note: shallow, string-y comparison only
  if (!left || !right) {
    return (!left || Object.keys(left).length === 0) && (!right || Object.keys(right).length === 0)
  }
  return Object.entries(left).sort().toString() === Object.entries(right).sort().toString()
}

// Tests
// console.log(CSSPropertiesEqual({}, {}) === true)
// console.log(CSSPropertiesEqual(undefined, {}) === true)
// console.log(CSSPropertiesEqual({}, undefined) === true)
// console.log(CSSPropertiesEqual({ inset: 0 }, {}) === false)
// console.log(CSSPropertiesEqual({ color: 'white' }, {}) === false)
// console.log(CSSPropertiesEqual({}, { color: 'white' }) === false)
// console.log(CSSPropertiesEqual({ color: 'white' }, { color: 'white' }) === true)
// console.log(
//   CSSPropertiesEqual(
//     { inset: 0, display: 'grid', position: 'absolute', '--damn': 1 } as React.CSSProperties,
//     { inset: 0, display: 'grid', position: 'absolute', '--damn': 1 } as React.CSSProperties
//   ) === true
// )
