export const pixelSize = 3

const pixelColors = [
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
  if (roll > 0.75) {
    return '#ffffff'
  }
  return pixelColors[(((roll * 4) / 3) * pixelColors.length) >> 0]
}
