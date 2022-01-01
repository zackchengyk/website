import React from 'react'

// ======================================================================== Helpers

export function stringToId(str: string) {
  return str
    .replace(/\s/gi, '-')
    .replace(/[^\dA-Z\-]+/gi, '')
    .toLowerCase()
}

// ======================================================================== Types

export type XY = { x: number; y: number }

// ======================================================================== Comparison functions

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
