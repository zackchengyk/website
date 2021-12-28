import { XY } from '../../common'
import { pixelSize } from '../pixels.common'

export const starPixSizeModifier = 0.4
export const textPixelSize = pixelSize / starPixSizeModifier
export const starPixMargin = 1

export const timing = {
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

// https://www.fontsquirrel.com/fonts/Munro
// https://www.reddit.com/r/gamedev/comments/1rl412/favorite_free_8bitpixel_font/

export type PixelLetterData = {
  width: number
  data: XY[]
}

export const space: PixelLetterData = {
  width: 3,
  data: [],
}

export const Z: PixelLetterData = {
  width: 3,
  data: [
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
  data: [
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
  data: [
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
  data: [
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
  data: [
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
  data: [
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
  data: [
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
  data: [
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
