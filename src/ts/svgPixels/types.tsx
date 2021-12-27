import React from 'react'

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
