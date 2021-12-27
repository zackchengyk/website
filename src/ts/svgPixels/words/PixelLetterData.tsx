import { XY } from '../common'

export type PixelLetterData = {
  width: number
  positions: XY[]
}

export const space: PixelLetterData = {
  width: 3,
  positions: [],
}

export const Z: PixelLetterData = {
  width: 3,
  positions: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 2, y: 1 },
    { x: 1, y: 2 },
    { x: 0, y: 3 },
    { x: 0, y: 4 },
    { x: 1, y: 4 },
    { x: 2, y: 4 },
  ],
}
export const A: PixelLetterData = {
  width: 4,
  positions: [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 3, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 0, y: 3 },
    { x: 3, y: 3 },
    { x: 0, y: 4 },
    { x: 3, y: 4 },
  ],
}
export const C: PixelLetterData = {
  width: 3,
  positions: [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 0, y: 3 },
    { x: 1, y: 4 },
    { x: 2, y: 4 },
  ],
}
export const K: PixelLetterData = {
  width: 4,
  positions: [
    { x: 0, y: 0 },
    { x: 3, y: 0 },
    { x: 0, y: 1 },
    { x: 2, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 0, y: 3 },
    { x: 2, y: 3 },
    { x: 0, y: 4 },
    { x: 3, y: 4 },
  ],
}

export const H: PixelLetterData = {
  width: 4,
  positions: [
    { x: 0, y: 0 },
    { x: 3, y: 0 },
    { x: 0, y: 1 },
    { x: 3, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 0, y: 3 },
    { x: 3, y: 3 },
    { x: 0, y: 4 },
    { x: 3, y: 4 },
  ],
}
export const E: PixelLetterData = {
  width: 3,
  positions: [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 0, y: 3 },
    { x: 0, y: 4 },
    { x: 1, y: 4 },
    { x: 2, y: 4 },
  ],
}
export const N: PixelLetterData = {
  width: 4,
  positions: [
    { x: 0, y: 0 },
    { x: 3, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 0, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 0, y: 3 },
    { x: 3, y: 3 },
    { x: 0, y: 4 },
    { x: 3, y: 4 },
  ],
}
export const G: PixelLetterData = {
  width: 4,
  positions: [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 0, y: 3 },
    { x: 3, y: 3 },
    { x: 1, y: 4 },
    { x: 2, y: 4 },
  ],
}
