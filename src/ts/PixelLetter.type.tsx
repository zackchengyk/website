// https://www.fontsquirrel.com/fonts/Munro
// https://www.reddit.com/r/gamedev/comments/1rl412/favorite_free_8bitpixel_font/

export type PixelLetter = {
  width: number
  data: { x: number; y: number }[]
}

export const space: PixelLetter = {
  width: 3,
  data: [],
}

export const Z: PixelLetter = {
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
export const A: PixelLetter = {
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
export const C: PixelLetter = {
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
export const K: PixelLetter = {
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

export const H: PixelLetter = {
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
export const E: PixelLetter = {
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
export const N: PixelLetter = {
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
export const G: PixelLetter = {
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
